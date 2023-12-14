import { Server, Socket } from "socket.io"
import Redis from "ioredis"

const redisConfig = {
    host: "scaleable-chat-scaleable-ws-chat.a.aivencloud.com",
    port: 10193,
    username: "default",
    password: process.env.REDIS_PASSWD,
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
            socket.on("event:message", async ({ message }: { message: string }) => {
                await pub.publish("MESSAGES", JSON.stringify({ message }))

            })
        })

        sub.on("message", async (channel, message) => {
            if(channel === "MESSAGES"){
                io.emit("messages", message)
            }
        })
    }
}