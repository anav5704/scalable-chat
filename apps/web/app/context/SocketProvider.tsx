"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { Socket, io } from "socket.io-client"

interface SocketProviderProps {
    children: React.ReactNode
}

interface ISocketContext {
    sendMessage: ({ message }: { message: string, username: string}) => void,
    messages: { message: string, username: string }[]
}

const SocketContext = createContext<ISocketContext | null>(null)

export const useSocket = () => {
    const state = useContext(SocketContext)
    if (!state) throw new Error("State is un defined")
    return state
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
    const [socket, setSocket] = useState<Socket>()
    const [messages, setMessages] = useState<{ message: string, username: string }[]>([])

    const sendMessage: ISocketContext["sendMessage"] = useCallback(({ message, username }: { message: string, username: string}) => {
        if(socket){
            socket.emit("event:message", { message, username })
        }
    }, [socket])

    const  onMessgeRecieved = useCallback(({ message, username }: { message: string, username: string}) => {
        setMessages((prev) => [...prev, { message, username }])
        console.log(messages)
    }, [])

    useEffect(() => {
        const _socket = io("https://scaleable-chat.onrender.com")
        _socket.on("message", onMessgeRecieved)
        setSocket(_socket)

        return () => {
            _socket.disconnect()
            _socket.off("message", onMessgeRecieved)
            setSocket(undefined)
        }
    }, [])

    return (
        <SocketContext.Provider value={{ sendMessage, messages }}>
            {children}
        </SocketContext.Provider>
    )
}
