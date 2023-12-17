import { Server, Socket } from "socket.io"
import Redis from "ioredis"
import "dotenv/config"
import db from "./prisma"

const redisConfig = {
    host: "redis-scalable-ws-chat.a.aivencloud.com",
    port: 10192,
    username: "default",
    password: process.env.REDIS_PASSWD,
    maxRetriesPerRequest: 5,
}

const pub = new Redis(redisConfig) // Publisher
const sub = new Redis(redisConfig) // Subscriber

export class SocketService {
    private _io: Server

    constructor(){
        console.log("Web socket server started")
        this._io = new Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*",
            }
        })
        sub.subscribe("MESSAGES")
    }

    get io(){
        return this._io
    }

    public initListeners(){
        const io = this._io
        console.log("Initialsied web socket event listeners")

        io.on("connect", (socket) => {  
            console.log("New web socket connectin established", socket.id)
            socket.on("event:message", async ({ message, username }: { message: string, username: string }) => {
                console.log(username, message)
                await pub.publish("MESSAGES", JSON.stringify({ message, username }))
            })
        })

        sub.on("message", async (channel, msg) => {
            if(channel === "MESSAGES"){
                const { message, username } = JSON.parse(msg)
                io.emit("message", { message , username })
                await db.message.create({
                    data: {
                       content: message,
                       username
                    }
                })
            }
        })
    }
}
