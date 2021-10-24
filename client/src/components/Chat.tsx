import socket from "@/config/socket"
import { useEffect, useState } from "react"

interface Message {
    user: string,
    text: string,
}
export default function Chat() {
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])


    useEffect(() => {
        socket.on("message", ({ text, user }: Message) => {
            setMessages((msg): any => [...msg, { text, user }])
        })
    }, [])

    const sendMessage = (e: any) => {
        e.preventDefault()
        if (message) socket.emit("sendMessage", { message }, () => setMessage(""))
    }

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex-grow overflow-auto border bg-white/50">
                {
                    messages.map((msg: Message, i: number): any => (
                        <p key={i}>{msg.user} : {msg.text}</p>
                    ))
                }
            </div>
            <form onSubmit={(e) => sendMessage(e)} className="flex items-center mt-3 space-x-3">
                <input value={message} onChange={(e) => setMessage(e.target.value)} className="flex-grow border bg-white/50" />
                <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-400 text-white px-3">SEND</button>
            </form>
        </div>
    )
}
