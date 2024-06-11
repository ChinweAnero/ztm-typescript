import path from "path"
import cookie from "@fastify/cookie"
import formBody from "@fastify/formBody"
import staticFiles from "@fastify/static"
import dotenv from "dotenv"
import { FLASH_MSG_COOKIE, clearFlashCookie } from "./flash"
import Fastify from "fastify"
import nunjucks from "nunjucks"
import {z} from "zod"
import { comparePassword, hashPassword } from "./auth"
import{ connect, newDb, SqliteSession, SqliteUserRepository, } from "./db"
import type { FastifyRequest } from "fastify"
import { FastifyReply } from "fastify/types/reply"
import { request } from "http"

// set up user environment and cookie
dotenv.config();

//
const SESSION_COOKIE = "SESSION_ID";


const environment = process.env.NODE_ENV;
const cookieSecret = process.env.COOKIE_SECRET;
if(cookieSecret === undefined){
    console.log("must set COOKIE_SECRET environment variable")
    process.exit(1);
}

// Load the frontend templates
const templates = new nunjucks.Environment(new nunjucks.FileSystemLoader("src/backend/templates"));
const USERS_DB = "./users.sqlite"

const fastify = Fastify({
    logger: true,
})

const accountLoginRequestSchema = z.object({
    email: z.string(),
    password: z.string(),
})
type AccountLoginRequest = z.infer<typeof accountLoginRequestSchema>;

const accountCreateRequestSchema = z.object({
    email: z.string(),
    password: z.string(),
    agreedToTerms: z.string().optional()
})
type accountCreateRequest = z.infer<typeof accountCreateRequestSchema>;

// register middlewares
{
    fastify.register(formBody);
    fastify.register(cookie, {
        secret: cookieSecret,
    })
    fastify.register(clearFlashCookie);
    fastify.register(staticFiles, {
        root: path.join(__dirname, "../../dist")
    })
}
function setFlashCookie(reply:FastifyReply, msg: string):void{
    reply.setCookie(FLASH_MSG_COOKIE, msg,{
        path:"/"

    })
}

function readFlashCookie(request: FastifyRequest): string | undefined {
    return request.cookies[FLASH_MSG_COOKIE]
}

function SetSessionCookie(reply:FastifyReply, sessionID: string):void{
    reply.setCookie(SESSION_COOKIE, sessionID,{
        path:"/"

    })
}

function readSessionCookie(request: FastifyRequest): string | undefined {
    return request.cookies[SESSION_COOKIE]
}

fastify.get("/", async (request, reply) =>{
    await reply.redirect("/signin")
    
})

fastify.get("/signin", async (request, reply) =>{
    const rendered = templates.render("signin.njk", {environment})
    return await reply
        .header("Content-Type", "text/html; charset=utf-8")
        .send(rendered)
    
})
fastify.post("/account/signin", async (request, reply) =>{
    let requestData: AccountLoginRequest;
    try{
        requestData = accountCreateRequestSchema.parse(request.body)
    }
    catch(error){
        setFlashCookie(reply, "There was an error processing your request")
        return await reply.redirect("/signup");
    }

    const db = await connect(USERS_DB);
    const UserRepository = new SqliteUserRepository(db)
    try{
        const user = await UserRepository.findByEmail(requestData.email)
        if(user === undefined){
            setFlashCookie(reply, "Invalid Login Credentials")
            return await reply.redirect("/signin")
        }
        const passwordMatches = await comparePassword(requestData.password, user.hashedPassword);
        if(!passwordMatches){
            setFlashCookie(reply, "Invalid login Credentials")
            return await reply.redirect("/signin");
        }

        const sessions = new SqliteSession(db);
        const session_id = await sessions.create(user.id)
        SetSessionCookie(reply, session_id);

        return await reply.redirect("/welcome");
    }catch(error){
        setFlashCookie(reply, "Invalid Login Credentials")
        return await reply.redirect("/signin")

    }
})

fastify.get("/signup", async (request, reply) =>{
    const rendered = templates.render("signup.njk", {environment})
    return await reply
        .header("Content-Type", "text/html; charset=utf-8")
        .send(rendered)
})

fastify.post("/account/signup", async (request, reply) =>{
    let requestData: accountCreateRequest;
    try{
        requestData = accountCreateRequestSchema.parse(request.body)
    }
    catch(error){
        setFlashCookie(reply, "There was an error processing your request")
        return await reply.redirect("/signup");
    }
    if (requestData.agreedToTerms !== "on"){
        setFlashCookie(reply, "You must agree to the terms to sign up")
        return await reply.redirect("/signup");
    }

const db = await connect(USERS_DB);
const UserRepository = new SqliteUserRepository(db);

const hashedPassword = await hashPassword(requestData.password)


    // then add new user
    try{
        const newUser  = {
            ...requestData,
            id: 0,
            agreedToTerms: true,
            hashedPassword

        }
        const user = await UserRepository.create(newUser);
        //console.log(user);

        const sessions = new SqliteSession(db);
        const session_id = await sessions.create(user.id)
        SetSessionCookie(reply, session_id);

        return await reply.redirect("/welcome");
    } catch(error){
        setFlashCookie(reply, "That Account already exists")
        return await reply.redirect("/signup");
    }
})


//start DB server
const start = async():Promise<void> =>{
    try{
        const db = await connect(USERS_DB);
        newDb(db)
        await fastify.listen({port: 9090});
    }
    catch(error){
        (fastify.log.error(error));
        process.exit(1);
    };
    
}
start();
