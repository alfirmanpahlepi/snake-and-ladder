import { useState } from "react"
import { User } from "@/types"
import socket from "@/config/socket"
import { limitString } from "@/config/constants"

interface UserProps { user: User }

export default function OnlineUser({ user }: UserProps): JSX.Element {
    const [isDisable, setDisable] = useState<boolean>(false)

    const inviteUser = (): void => {
        setDisable(true)
        if (!user.room.id)
            socket.emit("inviteUser", { target: user }, (error: string): void => { if (error) alert(error) })

        setTimeout(() => {
            setDisable(false)
        }, 5000);

    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <span style={{ backgroundColor: user.color || "#fff" }} className="h-10 w-10 uppercase rounded-full flex justify-center items-center font-semibold">
                    {user.name[0]}
                </span>
                <p className="font-semibold">{limitString(user.name, 21)}</p>
            </div>
            <button
                disabled={!!user.room.id || isDisable}
                onClick={inviteUser}
                className={`${user.room.id || isDisable ? "cursor-not-allowed bg-gray-200 text-gray-400" : "bg-gray-300 hover:bg-gray-400 active:bg-gray-200 text-gray-700"} px-4 border rounded`}>
                invite
            </button>
        </div>
    )
}
