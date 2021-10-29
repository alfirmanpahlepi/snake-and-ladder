import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useGlobalState } from "./_app"
import { IPlayers, Players, Player } from "@/types"
import socket from "@/config/socket"
import Board from "@/components/Board"
import Chat from "@/components/Chat"
import Layout from "@/components/Layout"

export default function Play(): JSX.Element {
    const [dice1, setDice1] = useState<number>(6)
    const [dice2, setDice2] = useState<number>(6)
    const [players, setPlayers] = useState<IPlayers>([])
    const [nowPlayer, setNowPlayer] = useState<string>()
    const [isDisabled, setDisabled] = useState<boolean>(false)

    const { replace } = useRouter()

    const { name, users } = useGlobalState()

    const rollDice = (): void => {
        if (nowPlayer !== name || isDisabled) return
        setDisabled(true)
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
        }, 50);

        setTimeout(() => {
            let result: number = random1 + random2;
            const user: Player | any = players.find((user) => user.username === name);
            if (user) {
                if (result + user.grid === 100) {
                    socket.emit("win")
                }
                if (result + user.grid > 100) {
                    /**
                     * example of if grid > 100
                     * 
                     * user grid  = 98
                     * movement   = 6
                     * 
                     * expect result => 99, 100, 99, 98, 97, 96
                     */
                    const gridNeeded: number = 100 - user.grid;
                    const movement: number = result;
                    result = 100 - (movement - gridNeeded)
                }
                else result += user.grid

            }
            socket.emit("play", { grid: result }, (error: string): void => { if (error) return alert(error) })
        }, 2000);
    }

    useEffect((): any => {
        if (!users.length || !name) return replace("/")

        const userIndex: number = users?.findIndex((user) => user.name === name)

        if (!nowPlayer) {
            const admin: string = users[userIndex]?.room.admin
            setNowPlayer(admin)
            setDisabled(false)
        }
        return () => setNowPlayer("")
    }, [])

    useEffect(() => {
        socket.on("play", ({ username, grid, color, nextPlayer }: Player): void => {
            setPlayers((crr: Players): Players => {
                const userIndex: number = crr.findIndex((u) => u.username === username);
                const arr: Players = crr;

                if (userIndex === -1) return [...arr, { grid: snakeAndLadder(grid), username, color }];

                else {
                    const result: number = snakeAndLadder(grid);
                    arr[userIndex].grid = result;
                    return arr
                }
            })
            setNowPlayer(nextPlayer)
            setDisabled(false)
        })
        return () => { setNowPlayer(""); setPlayers([]); }
    }, [])

    return (
        <Layout blur={true}>
            <div className="h-full w-full space-x-6 flex z-20 p-4 justify-center items-center">
                <div className="h-[600px] flex-grow border z-20 bg-gray-50/50 p-5 space-y-4 flex flex-col">
                    <div className="h-3/4 space-y-5">
                        <h1 className="font-extrabold text-4xl text-center text-green-500">Rank</h1>
                        <ul className="space-y-2">
                            {players
                                .sort((a: Player, b: Player) => b.grid - a.grid)
                                .map((player: Player, i: number): JSX.Element =>
                                    <li className="flex items-center space-x-3">
                                        <span className="font-semibold">{i + 1}.</span>
                                        <div className="flex items-center space-x-2">
                                            <div style={{ backgroundColor: player.color }} className="h-10 w-10 rounded-full border border2 border-white shadow"></div>
                                            <h6 className="font-semibold">{player.username}</h6>
                                        </div>
                                    </li>)}
                        </ul>
                    </div>
                    <div className="h-1/4 flex justify-center items-center">
                        <button
                            onClick={rollDice}
                            disabled={nowPlayer !== name || isDisabled}
                            className={`${nowPlayer !== name || isDisabled && "cursor-not-allowed"} h-24 w-24 relative focus:outline-none`}>
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
                <div className="w-[600px] h-[600px] z-20">
                    <Board Players={players} />
                </div>
                <div className="flex-grow h-[600px] border z-20 bg-gray-50/50 p-5 flex flex-col">
                    <h3 className="text-4xl font-bold text-green-500 pb-6 text-center">{nowPlayer} is playing</h3>
                    <div className="flex-grow">
                        <Chat />
                    </div>
                </div>
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

        // snake 
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