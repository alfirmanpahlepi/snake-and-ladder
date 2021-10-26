import { useEffect, useState } from "react"
import { useGlobalState } from "./_app"
import { IMovements, Movements, Movement } from "@/types"
import socket from "@/config/socket"
import Board from "@/components/Board"
import Chat from "@/components/Chat"
import Layout from "@/components/Layout"
import { useRouter } from "next/router"

export default function Play(): JSX.Element {
    const [dice1, setDice1] = useState<number>(6)
    const [dice2, setDice2] = useState<number>(6)
    const [movements, setMovements] = useState<IMovements>([])
    const [nowPlayer, setNowPlayer] = useState<string>()
    const { replace } = useRouter()

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
            socket.emit("play", { movement: random1 + random2 }, (error: string): void => { if (error) return alert(error) })
        }, 2000);
    }

    useEffect((): any => {
        if (!users.length || !name) return replace("/")
        if (!nowPlayer) {
            const userIndex: number = users?.findIndex((user) => user.name === name)
            const admin: string = users[userIndex]?.room.admin
            setNowPlayer(admin)
        }
        return () => setNowPlayer("")
    }, [])

    useEffect(() => {
        socket.on("play", ({ username, movement, nextPlayer, color }: Movement): void => {
            setMovements((crr: Movements): Movements => {
                const userIndex: number = crr.findIndex((u) => u.username === username)
                const arr: Movements = crr
                if (userIndex === -1) {
                    const grid: number = snakeAndLadder(movement)

                    return [...arr, { movement: grid, username, color }]
                }
                else {
                    const grid: number = snakeAndLadder(movement + arr[userIndex].movement)
                    arr[userIndex].movement = grid


                    if (grid > 100) {
                        const prevGrid: number = grid - movement
                        arr[userIndex].movement = 100 - (movement - (100 - prevGrid))
                    }

                    /**
                     * example of if grid > 100
                     * 
                     * player in grid  = 98
                     * movement        = 6
                     * 
                     * expect result => 99, 100, 99, 98, 97, 96
                     */

                    return arr
                }
            });
            // if player grid has 100 than he has won, and he doesnt need to play anymore
            const playerIndex: number = movements.findIndex((user) => user.username === nextPlayer)
            if (movements[playerIndex]?.movement === 100) {
                if (playerIndex + 1 === movements.length) setNowPlayer(movements[0].username)
                else setNowPlayer(movements[playerIndex + 1].username)
            }
            else setNowPlayer(nextPlayer)


        })
        return () => { setNowPlayer(""); setMovements([]); }
    }, [])

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

/**
 * ladder
 *  1 => 38
 *  4 => 14
 *  8 => 30
 * 28 => 76
 * 21 => 42
 * 50 => 67
 * 71 => 92
 * 80 => 99
 * 
 * snake
 * 97 => 78
 * 95 => 56
 * 88 => 24
 * 63 => 18
 * 48 => 26
 * 36 => 6
 * 32 => 10
 *
 */

const snakeAndLadder = (grid: number): number => {
    switch (grid) {
        // ladder 
        case 1:
            return 38;
        case 4:
            return 14;
        case 8:
            return 30;
        case 21:
            return 42;
        case 28:
            return 76;
        case 50:
            return 67;
        case 71:
            return 92;
        case 80:
            return 99;

        // ladder 
        case 97:
            return 78;
        case 95:
            return 56;
        case 88:
            return 24;
        case 63:
            return 18;
        case 48:
            return 26;
        case 36:
            return 6;
        case 32:
            return 10;
        default:
            return grid;
    }
}