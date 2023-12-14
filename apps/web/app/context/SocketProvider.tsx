"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { Socket, io } from "socket.io-client"

interface SocketProviderProps {
    children: React.ReactNode
}

interface ISocketContext {
    sendMessage: (message: string) => void,
}

const SocketContext = createContext<ISocketContext | null>(null)

export const useSocket = () => {
    const state = useContext(SocketContext)
    if (!state) throw new Error("State is un defined")
    return state
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
    const [socket, setSocket] = useState<Socket>()

    const sendMessage: ISocketContext["sendMessage"] = useCallback((message) => {
        console.log(message)
        if(socket){
            socket.emit("event:message", { message })
        }
    }, [socket])

    useEffect(() => {
        const _socket = io("http://localhost:8000")
        setSocket(_socket)

        return () => {
            _socket.disconnect()
            setSocket(undefined)
        }
    }, [])

    return (
        <SocketContext.Provider value={{ sendMessage }}>
            {children}
        </SocketContext.Provider>
    )
}