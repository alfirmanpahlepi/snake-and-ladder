import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import { IMessages, Message, Messages } from "@/types"
import socket from "@/config/socket"
import { limitString } from "@/config/constants"

export default function Chat(): JSX.Element {
    const [message, setMessage] = useState<string>()
    const [messages, setMessages] = useState<IMessages>([])


    useEffect(() => {
        socket.on("message", ({ text, user, color }: Message): void => setMessages((msg): Messages => [...msg, { text, user, color }]))
        return () => setMessages([])
    }, [])

    const sendMessage = (e: FormEvent): void => {
        e.preventDefault()
        if (message) socket.emit("sendMessage", { message }, (): void => setMessage(""))
    }

    return (
        <div className="flex flex-col h-full w-full">
            <ScrollToBottom className="flex-grow overflow-y-auto overflow-x-hidden border bg-white/50 pl-2">
                {messages.map((msg: Message, i: number): JSX.Element => (
                    <li key={i} className="list-none my-1">
                        <div className="flex items-center space-x-2">
                            <span style={{
                                backgroundColor: msg.user !== "system" ? msg.color : "#000",
                                color: msg.user !== "system" ? "rgb(17, 24, 39)" : "#fff"
                            }}
                                className="h-8 w-8 rounded-full border border-white shadow uppercase text-sm font-semibold grid place-items-center">
                                {msg.user[0]}
                            </span>
                            <div className="w-[calc(100%-3rem)] flex flex-wrap">
                                <p className={msg.user !== "system" ? "text-gray-900" : "text-[#149414]"}>
                                    <span className="mr-3 text-gray-600 font-semibold">{limitString(msg.user)}</span>
                                    {msg.text}
                                </p>
                            </div>
                        </div>
                    </li>))}
            </ScrollToBottom>
            <form onSubmit={(e: FormEvent): void => sendMessage(e)} className="flex items-center mt-3 space-x-3">
                <input value={message} onChange={(e: ChangeEvent<HTMLInputElement>): void => setMessage(e.target.value)} className="flex-grow border bg-white/50 px-2" />
                <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-400 text-white px-3">SEND</button>
            </form>
        </div>
    )
}