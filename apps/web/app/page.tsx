"use client"

import { useSocket } from "./context/SocketProvider"
import { useState } from "react"

export default function HomePage(){
    const { sendMessage } = useSocket()

    const [message, setMessage] = useState<string>("")

    return (
        <main>
            <div>

            </div>
            <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" name="" id="" />
            <button onClick={() => sendMessage(message)}>Send</button>
        </main>
    )
}