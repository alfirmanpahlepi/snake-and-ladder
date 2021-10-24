interface UserProps {
    user: {
        name: string,
        id: string,
        room: string,
        color: string
    }
}

export default function Player({ user }: UserProps) {
    return (
        <div className="h-40 w-40 flex flex-col justify-center items-center space-y-3">
            <div style={{ backgroundColor: user.color || "#fff" }}
                className="h-20 w-20 rounded-full border-4 border-white grid place-items-center text-2xl font-semibold uppercase">
                {user.name[0]}
            </div>
            <h6 className="font-semibold">{user.name}</h6>
        </div>
    )
}
