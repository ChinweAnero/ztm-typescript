import fp from "fastify-plugin"
import type { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify"
import fastify from "fastify"

export const FLASH_MSG_COOKIE = "flash"

const pluginCallback: FastifyPluginCallback = (fastify, options, next) => {
    fastify.addHook("onRequest", async (_request:FastifyRequest, reply: FastifyReply) => {
        reply.setCookie(FLASH_MSG_COOKIE, "", {
            path: "/"

        })
        
    })
    next()
}
export const clearFlashCookie = fp(pluginCallback)