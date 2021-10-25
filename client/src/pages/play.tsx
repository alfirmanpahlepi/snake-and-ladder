import { useEffect, useState } from "react"
import Board from "@/components/Board"
import Chat from "@/components/Chat"
import Layout from "@/components/Layout"
import { useGlobalState } from "./_app"
import socket from "@/config/socket"

type IMovements = { username: string, movement: number, color: string }[]

export default function Play(): JSX.Element {
    const [dice1, setDice1] = useState<number>(6)
    const [dice2, setDice2] = useState<number>(6)
    const [movements, setMovements] = useState<IMovements>([])
    const [nowPlayer, setNowPlayer] = useState<string>("")

    const { name, users } = useGlobalState()

    const rollDice = (): void => {
        if (nowPlayer !== name) return
        const start: number = new Date().getTime()
        let random1: number = 0
        let random2: number = 0

        setInterval(() => {
            if (new Date().getTime() - start > 2000) {
                clearInterval()
                return
            }
            random1 = Math.floor(Math.random() * 6) + 1 // output : 1,2,3,4,5,6
            random2 = Math.floor(Math.random() * 6) + 1 // output : 1,2,3,4,5,6
            setDice1(random1)
            setDice2(random2)
            // setResult(random1 + random2)
        }, 50);

        setTimeout(() => {
            socket.emit("play", { movement: random1 + random2 }, (error: string) => { if (error) return alert(error) })
        }, 2000);
    }

    useEffect(() => {
        if (!nowPlayer) {
            const userIndex: number = users.findIndex((user) => user.name === name)
            const admin: string = users[userIndex]?.room.admin
            setNowPlayer(admin)
        }
    }, [])

    useEffect(() => {
        socket.on("play", ({ username, movement, nextPlayer, color }) => {
            setMovements((crr: IMovements): IMovements => {
                const userIndex: number = crr.findIndex((u) => u.username === username)
                if (userIndex === -1) return [...crr, { movement, username, color }]
                else {
                    const arr: IMovements = crr
                    arr[userIndex].movement += movement
                    return arr
                }
            });
            setNowPlayer(nextPlayer)
        })
    }, [])

    // console.log(movements);

    return (
        <Layout blur={true}>
            <div className="h-full w-full space-x-10 flex z-20 p-4 justify-center items-center">
                <div className="h-[600px] w-[25rem] border z-20 bg-gray-50/50 p-5 space-y-4 flex flex-col">
                    <div className="h-1/4 flex justify-center items-center flex-col">
                        <h3 className="text-4xl font-bold text-green-800">{nowPlayer} is playing</h3>
                    </div>
                    <div className="h-2/4">
                        <Chat />
                    </div>
                    <div className="h-1/4 flex justify-center items-center">
                        <button
                            onClick={rollDice}
                            disabled={nowPlayer !== name}
                            className={`${nowPlayer !== name && "cursor-not-allowed"} h-24 w-24 relative focus:outline-none`}>
                            <img src={`/dice/${dice1}.png`} alt="1" className="object-cover" />
                        </button>
                        <button
                            onClick={rollDice}
                            disabled={nowPlayer !== name}
                            className={`${nowPlayer !== name && "cursor-not-allowed"} h-24 w-24 relative focus:outline-none`}>
                            <img src={`/dice/${dice2}.png`} alt="1" className="object-cover" />
                        </button>
                    </div>
                </div>
                <Board movements={movements} />
            </div>
        </Layout>
    )
}