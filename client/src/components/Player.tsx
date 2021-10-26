import { useGlobalState } from "@/pages/_app"
import { User } from "@/types"
import socket from "@/config/socket"

interface UserProps { user: User }

export default function Player({ user }: UserProps): JSX.Element {
    const { name } = useGlobalState()

    const kickUser = (): void => socket.emit("kickUser", { target: user }, (error: string): void => { if (error) alert(error) })

    return (
        <div className="h-40 w-40 flex flex-col justify-center items-center space-y-3">
            <div style={{ backgroundColor: user.color || "#fff" }}
                className="h-20 w-20 rounded-full border-4 border-white grid place-items-center text-2xl font-semibold uppercase group relative">
                {user.name[0]}
                {
                    user.room.admin === name &&
                    <button
                        onClick={kickUser}
                        className={`${user.name !== user.room.admin && "group-hover:inline"} absolute -top-3 -right-1 font-extrabold text-red-700 text-lg hidden`}>
                        x
                    </button>
                }
                {
                    user.isReady &&
                    <div className="absolute -bottom-2 w-full grid place-items-center">
                        <span className="bg-green-700 text-white text-xs text-center rounded-md px-3">Ready</span>
                    </div>
                }
            </div>
            <h6 className="font-semibold">{user.name}</h6>
        </div>
    )
}
