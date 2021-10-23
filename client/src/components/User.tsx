interface UserProps {
    user: {
        name: String,
        id: String
    }
}

export default function User({ user }: UserProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div style={{ backgroundColor: "#" + ((1 << 24) * Math.random() | 0).toString(16) }} className="h-10 w-10 rounded-full flex justify-center items-center">
                    {user.name[0]}
                </div>
                <p className="font-semibold">{user.name}</p>
            </div>
            <button className="px-4 border bg-gray-300 hover:bg-gray-400 active:bg-gray-200 text-gray-700 rounded">invite</button>
        </div>
    )
}
