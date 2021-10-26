import { ChangeEvent } from "react"
import { Users } from "@/types"
import socket from "@/config/socket"
import { useGlobalState } from "@/pages/_app"

interface SettingsProps { roomMate: Users }

export default function Settings({ roomMate }: SettingsProps): JSX.Element {
    const { name } = useGlobalState()
    const currentPlayer: number = roomMate.length
    const maxPlayer: number = roomMate[0]?.room.maxPlayer
    const isAdmin: boolean = roomMate[0]?.room.admin === name

    const setMaxPlayer = (e: ChangeEvent<HTMLSelectElement>): void => {
        if (currentPlayer <= parseInt(e.target.value) && isAdmin)
            socket.emit("settings", { maxPlayer: e.target.value }, (error: string): void => { if (error) alert(error) })
    }
    return (
        <div className="h-full w-full">
            <p className="text-right">number of player :
                <select onChange={(e: ChangeEvent<HTMLSelectElement>): void => setMaxPlayer(e)} value={maxPlayer}>
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
