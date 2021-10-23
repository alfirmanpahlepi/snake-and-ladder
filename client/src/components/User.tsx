import socket from "@/config/socket"

interface Room {
    name: String,
    id: String
}

interface UserProps {
    user: {
        id: String
        name: String,
        room: Room
    }
}

export default function User({ user }: UserProps) {

    const inviteUser = (): void => {
        if (!user.room.id)
            socket.emit("inviteUser", { target: user }, (error: string) => { if (error) alert(error) })

    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div style={{ backgroundColor: "#" + ((1 << 24) * Math.random() | 0).toString(16) }} className="h-10 w-10 rounded-full flex justify-center items-center">
                    {user.name[0]}
                </div>
                <p className="font-semibold">{user.name}</p>
            </div>
            <button
                disabled={!!user.room.id}
                onClick={inviteUser}
                className={`${user.room.id ? "cursor-not-allowed bg-gray-200 text-gray-400" : "bg-gray-300 hover:bg-gray-400 active:bg-gray-200 text-gray-700"} px-4 border rounded`}>
                invite
            </button>
        </div>
    )
}
