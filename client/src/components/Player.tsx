interface UserProps {
    user: {
        name: String,
        id: String
    }
}

export default function Player({ user }: UserProps) {
    return (
        <div className="h-40 w-40 flex flex-col justify-center items-center space-y-3">
            <div className="h-20 w-20 rounded-full border-2 grid place-items-center text-2xl font-semibold">{user.name[0]}</div>
            <h6 className="font-semibold">{user.name}</h6>
        </div>
    )
}
