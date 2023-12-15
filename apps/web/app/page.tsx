"use client"

import { useSocket } from "./context/SocketProvider"
import { useState } from "react"

export default function HomePage() {
    const { sendMessage, messages } = useSocket()
    const [username, setUsername] = useState("")
    const [user, setUser] = useState(false)
    const [message, setMessage] = useState<string>("")

    const handleSend = (e: any) => {
        if(e.key === "Enter"){
            e.preventDefault()
            sendMessage({ message, username })
            setMessage("")
        }
    }

    return (
        <main>
            <div className="aurora">
                <div className="canvas-wrapper">
                    <div className='circle circle-0' />
                    <div className='circle circle-1' />
                    <div className='circle circle-2' />
                    <div className='circle circle-3' />
                </div>
            </div>
            { !user ? (
                <div className="box">
                    <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" type="text" name="" id="" />
                    <button onClick={() => setUser(true)}>Continue</button>
                </div>
            ) : (
                <div className="box3">
                    <div className="msgbox">
                        {messages.map((msg, index) => (
                        <div key={index} className={`${msg.username === username && "right"} msg`}>
                            <p className="name">{msg.username}</p>
                            <p className="cont">{msg.message}</p>
                            </div>
                        ))}
                    </div>
                    <div className="box box2">
                        <input onKeyDown    ={(e) => handleSend(e)} placeholder="Enter message" value={message} onChange={(e) => setMessage(e.target.value)} type="text" name="" id="" />
                    </div>

                </div>
            )}
        </main>
    )
}