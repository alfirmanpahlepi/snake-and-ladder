import socket from "@/config/socket"
import { useEffect, useState } from "react"

interface message {
    user: string,
    text: string,
}
export default function Chat() {
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])


    useEffect(() => {
        socket.on("message", ({ text, user }: message) => {
            setMessages((msg): any => [...msg, { text, user }])
        })
    }, [])
    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex-grow overflow-auto border bg-white/50">
                {
                    messages.map((msg: message, i: number) => (
                        <p key={i}>{msg?.user} : {msg?.text}</p>
                    ))
                }
            </div>
            <div className="flex items-center mt-3 space-x-3">
                <input className="flex-grow border bg-white/50" />
                <button className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-400 text-white px-3">SEND</button>
            </div>
        </div>
    )
}
