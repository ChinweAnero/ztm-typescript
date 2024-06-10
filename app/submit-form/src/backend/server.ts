import path from "path"
import cookie from "@fastify/cookie"
import formBody from "@fastify/formBody"
import staticFiles from "@fastify/static"
import dotenv from "dotenv"
import Fastify from "fastify"
import nunjucks from "nunjucks"
import {z} from "zod"

import{ connect, newDb, SqliteSession, SqliteUserRepository, } from "./db"
import { request } from "http"

// set up user environment and cookie
dotenv.config();

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

const accountCreateRequestSchema = z.object({
    email: z.string(),
    password: z.string(),
    agreedToTerms: z.string()
})
type accountCreateRequest = z.infer<typeof accountCreateRequestSchema>;

// register middlewares
{
    fastify.register(formBody);
    fastify.register(cookie, {
        secret: cookieSecret,
    })
    fastify.register(staticFiles, {
        root: path.join(__dirname, "../../dist")
    })
}

fastify.get("/", async (request, reply) =>{
    await reply.redirect("/signin")
    
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
        return await reply.redirect("/signup");
    }
    if (requestData.agreedToTerms !== "on"){
        return await reply.redirect("/signup");
    }
    
    // connect to database
    const db = await connect(USERS_DB);
    const UserRepository = new SqliteUserRepository(db);
    // then add new user
    try{
        const newUser  = {
            ...requestData,
            id: 0,
            agreedToTerms: true,
            hashedPassword: "FIXME",

        }
        const user = await UserRepository.create(newUser);
        return await reply.redirect("/welcome")
    } catch(error){
        //TO DO NEXT: SHOW ERROR MESSAGE
        return await reply.redirect("/signup");
    }
})

fastify.get("/signin", async (request, reply) =>{
    const rendered = templates.render("signin.njk", {environment})
    return await reply
        .header("Content-Type", "text/html; charset=utf-8")
        .send(rendered)
    
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
