"use client"

import { useSocket } from "./context/SocketProvider"
import { useState } from "react"

export default function HomePage(){
    const { sendMessage, messages } = useSocket()

    const [message, setMessage] = useState<string>("")

    return (
        <main>
            <div>
                {messages.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
            </div>
            <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" name="" id="" />
            <button onClick={() => sendMessage(message)}>Send</button>
        </main>
    )
}