import socket from "@/config/socket"
import { useGlobalState } from "@/pages/_app"

interface Room {
    id: string,
    name: string,
    admin: string,
}

interface UserProps {
    user: {
        name: string,
        id: string,
        room: Room,
        color: string
    }
}

export default function Player({ user }: UserProps) {
    const { name } = useGlobalState()

    const kickUser = () => {
        socket.emit("kickUser", { target: user }, (error: string) => { if (error) alert(error) })
    }

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
            </div>
            <h6 className="font-semibold">{user.name}</h6>
        </div>
    )
}
