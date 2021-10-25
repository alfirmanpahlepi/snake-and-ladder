import { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from "react"
import socket from "@/config/socket"

interface Message {
    user: string,
    text: string,
}

type IMessages = Message[]

export default function Chat(): JSX.Element {
    const [message, setMessage] = useState<string>("")
    const [messages, setMessages] = useState<IMessages>([])


    useEffect(() => {
        socket.on("message", ({ text, user }: Message) => setMessages((msg): Message[] => [...msg, { text, user }]))
        return () => setMessages([])
    }, [])

    const sendMessage = (e: FormEvent): void => {
        e.preventDefault()
        if (message) socket.emit("sendMessage", { message }, () => setMessage(""))
    }

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex-grow overflow-auto border bg-white/50">
                {
                    messages.map((msg: Message, i: number): ReactNode => (
                        <p key={i}>{msg.user} : {msg.text}</p>
                    ))
                }
            </div>
            <form onSubmit={(e: FormEvent) => sendMessage(e)} className="flex items-center mt-3 space-x-3">
                <input value={message} onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)} className="flex-grow border bg-white/50" />
                <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-400 text-white px-3">SEND</button>
            </form>
        </div>
    )
}
