import { useGlobalState } from "@/pages/_app"
import { Users } from "@/types"
import socket from "@/config/socket"

interface SettingsProps { roomMate: Users }

export default function ToggleReady({ roomMate }: SettingsProps): JSX.Element {
    const { name } = useGlobalState()
    const isReady: boolean | any = roomMate.find((user) => user.name === name)?.isReady

    const toggleReady = (): void => { socket.emit("toggleReady", (error: string): void => { if (error) alert(error) }) }

    return (
        <button
            onClick={toggleReady}
            className={`
                ${!isReady
                    ? "bg-green-500 hover:bg-green-600 active:bg-green-400 border-green-600 active:border-green-400"
                    : "bg-red-500 hover:bg-red-600 active:bg-red-400 border-red-600 active:border-red-400"
                }
                 h-[200px] w-[200px] border-4 shadow-lg rounded-full text-white flex justify-center items-center text-4xl font-bold uppercase tracking-widest duration-500`}>
            {!isReady ? "ready" : "cancel"}
        </button>
    )
}
