import { Server, Socket } from "socket.io"

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
                console.log("New message recieved", message)
            })
        })
    }
}