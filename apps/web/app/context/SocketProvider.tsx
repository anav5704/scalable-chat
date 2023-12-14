"use client"

import { createContext, useCallback, useEffect } from "react"
import { io } from "socket.io-client"

interface SocketProviderProps {
    children: React.ReactNode
}

interface ISocketContext {
    sendMessage: (message: string) => void,
}

const SocketContext = createContext<ISocketContext | null>(null)

export const SocketProvider = ({ children }: SocketProviderProps) => {
    const sendMessage: ISocketContext["sendMessage"] = useCallback((message) => {
        console.log(message)
    }, [])

    useEffect(() => {
        const _socket = io("http://localhost:8000")

        return () => {
            _socket.disconnect()
        }
    }, [])

    return (
        <SocketContext.Provider value={{ sendMessage }}>
            {children}
        </SocketContext.Provider>
    )
}