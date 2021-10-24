import socket from "@/config/socket"
import { useGlobalState } from "@/pages/_app"

export default function Settings({ currentPlayer }: { currentPlayer: number }) {
    const { name, users } = useGlobalState()
    const maxPlayer: any = users.find((user) => user.name === name)?.room.maxPlayer
    const userIndex: number = users.findIndex((user) => user.name === name)
    const isAdmin: boolean = users[userIndex]?.room.admin === name

    const setMaxPlayer = (e: any) => {
        if (currentPlayer <= e.target.value && isAdmin)
            socket.emit("settings", { maxPlayer: e.target.value }, (error: string) => { if (error) alert(error) })
    }
    return (
        <div className="h-full w-full">
            <p className="text-right">number of player :
                <select onChange={(e) => setMaxPlayer(e)} value={maxPlayer}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </p>
            <p className="text-right">number of dice :
                <select>
                    <option>2</option>
                    <option disabled>1</option>
                </select>
            </p>
            <p className="text-right">timer :
                <select>
                    <option disabled>10s</option>
                    <option>7s</option>
                    <option disabled>5s</option>
                </select>
            </p>
        </div>
    )
}
