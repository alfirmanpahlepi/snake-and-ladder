import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import useSound from "use-sound"
import { useGlobalState } from "./_app"
import { IPlayers, Players, Player } from "@/types"
import socket from "@/config/socket"
import Board from "@/components/Board"
import Chat from "@/components/Chat"
import Layout from "@/components/Layout"
import PlayerRank from "@/components/PlayerRank"
import { limitString } from "@/config/constants"

import rolling_dice from "@public/audio/rolling_dice.mp3"
import win from "@public/audio/win.mp3"
import dice_2 from "@public/audio/dice/Dadu_2.mp3"
import dice_3 from "@public/audio/dice/Dadu_3.mp3"
import dice_4 from "@public/audio/dice/Dadu_4.mp3"
import dice_5 from "@public/audio/dice/Dadu_5.mp3"
import dice_6 from "@public/audio/dice/Dadu_6.mp3"
import dice_7 from "@public/audio/dice/Dadu_7.mp3"
import dice_8 from "@public/audio/dice/Dadu_8.mp3"
import dice_9 from "@public/audio/dice/Dadu_9.mp3"
import dice_10 from "@public/audio/dice/Dadu_10.mp3"
import dice_11 from "@public/audio/dice/Dadu_11.mp3"
import dice_12 from "@public/audio/dice/Dadu_12.mp3"

export default function Play(): JSX.Element {
    const [dice1, setDice1] = useState<number>(6)
    const [dice2, setDice2] = useState<number>(6)
    const [players, setPlayers] = useState<IPlayers>([])
    const [nowPlayer, setNowPlayer] = useState<string>()
    const [isDisabled, setDisabled] = useState<boolean>(false)

    const { replace } = useRouter()

    const { name, users } = useGlobalState()

    const [play2] = useSound(dice_2, { volume: 0.3 })
    const [play3] = useSound(dice_3, { volume: 0.3 })
    const [play4] = useSound(dice_4, { volume: 0.3 })
    const [play5] = useSound(dice_5, { volume: 0.3 })
    const [play6] = useSound(dice_6, { volume: 0.3 })
    const [play7] = useSound(dice_7, { volume: 0.3 })
    const [play8] = useSound(dice_8, { volume: 0.3 })
    const [play9] = useSound(dice_9, { volume: 0.3 })
    const [play10] = useSound(dice_10, { volume: 0.3 })
    const [play11] = useSound(dice_11, { volume: 0.3 })
    const [play12] = useSound(dice_12, { volume: 0.3 })
    const [winner] = useSound(win, { volume: 0.3 })
    const [rollingDice] = useSound(rolling_dice, { volume: 0.3, playbackRate: 0.5 })

    const rollDice = (): void => {
        if (nowPlayer !== name || isDisabled) return
        rollingDice()
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
            const grids: number[] = [];
            let movement: number = random1 + random2;
            diceSound(movement)
            const user: Player | any = players.find((user) => user.username === name);
            if (user) {
                const userLastGrid: number = user.grids[user.grids.length - 1]
                if (movement + userLastGrid === 100) {
                    socket.emit("win")
                    winner()
                }

                for (let i = userLastGrid; i <= userLastGrid + movement; i++) {
                    if (i === userLastGrid) continue;
                    if (i > 100) grids.push(100 - (i - 100));
                    else grids.push(i);
                }

            } else {
                for (let i = 1; i <= movement; i++) {
                    grids.push(i)
                }
            }
            const lastGrid: number = grids[grids.length - 1]
            const snakeAndLadderGrid = snakeAndLadder(lastGrid)
            if (snakeAndLadderGrid !== lastGrid) grids.push(snakeAndLadderGrid)

            socket.emit("play", { grids }, (error: string): void => { if (error) return alert(error) })

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
        socket.on("play", ({ username, grids, color, nextPlayer }: Player): void => {
            setPlayers((crr: Players): Players => {
                const userIndex: number = crr.findIndex((u) => u.username === username);
                const arr: Players = crr;

                if (userIndex === -1) return [...arr, { grids, username, color }];

                else {
                    arr[userIndex].grids = grids;
                    return arr
                }
            })
            setDisabled(false)
            if (nextPlayer) setNowPlayer(nextPlayer)
            else {
                alert("game over \nthanks for playing\nfind me https://github.com/ezza022/")
                window.location.reload()
            }
        })
        return () => { setNowPlayer(""); setPlayers([]); }
    }, [])


    useEffect(() => {
        socket.on("game over", () => {
            alert("game over \nthanks for playing\nfind me https://github.com/ezza022/")
            window.location.reload()
        })
    }, [])



    const diceSound = (num: number) => {
        switch (num) {
            case 2:
                return play2()
            case 3:
                return play3()
            case 4:
                return play4()
            case 5:
                return play5()
            case 6:
                return play6()
            case 7:
                return play7()
            case 8:
                return play8()
            case 9:
                return play9()
            case 10:
                return play10()
            case 11:
                return play11()
            default:
                return play12()

        }
    }

    return (
        <Layout blur={false}>
            <div className="h-full w-full space-x-4 flex z-20 p-4 justify-center items-center t">
                <div className="h-[550px] w-[23rem] border z-20 bg-gray-50/50 p-5 space-y-4 flex flex-col">
                    <div className="h-3/4 space-y-5">
                        <h1 className="font-extrabold text-4xl text-center text-red-800">Rank</h1>
                        <ul className="space-y-2">
                            {players
                                .sort((a: Player, b: Player) => b.grids[b.grids.length - 1] - a.grids[a.grids.length - 1])
                                .map((player: Player, i: number): JSX.Element =>
                                    <PlayerRank key={i} no={i + 1} player={player} />)}
                        </ul>
                    </div>
                    <div className="h-1/4 flex justify-center items-center">
                        <button
                            onClick={rollDice}
                            disabled={nowPlayer !== name || isDisabled}
                            className={`${nowPlayer !== name || isDisabled && "cursor-not-allowed"} h-24 w-24 relative focus:outline-none`}>
                            <img src={`/img/dice/${dice1}.png`} alt="1" className="object-cover" />
                        </button>
                        <button
                            onClick={rollDice}
                            disabled={nowPlayer !== name}
                            className={`${nowPlayer !== name && "cursor-not-allowed"} h-24 w-24 relative focus:outline-none`}>
                            <img src={`/img/dice/${dice2}.png`} alt="1" className="object-cover" />
                        </button>
                    </div>
                </div>
                <div className="w-[550px] h-[550px] z-20">
                    <Board Players={players} />
                </div>
                <div className="w-[23rem] h-[550px] border z-20 bg-gray-50/50 py-5 px-2 flex flex-col">
                    <h3 className="text-4xl font-bold text-red-800 pb-6 text-center">
                        {limitString(nowPlayer, 10)} is playing
                    </h3>
                    <div className="flex-grow">
                        <Chat />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

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