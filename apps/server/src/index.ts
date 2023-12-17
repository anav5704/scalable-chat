import { consumeMessage } from "./services/kafka"
import { SocketService } from "./services/socket"
import http from "http"

(async () => {
    consumeMessage()
    const socketService = new SocketService()
    const httpServer = http.createServer()
    const PORT = process.env.PORT || 8000

    socketService.io.attach(httpServer)
    socketService.initListeners()

    httpServer.listen(PORT, () => {
        console.log("Http server started at port:", PORT)
    })
})()

