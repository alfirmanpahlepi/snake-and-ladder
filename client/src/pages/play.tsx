import { useState } from "react"
import Board from "@/components/Board"
import Chat from "@/components/Chat"
import Layout from "@/components/Layout"

export default function Play(): JSX.Element {
    const [dice1, setDice1] = useState<number>(6)
    const [dice2, setDice2] = useState<number>(6)
    const rollDice = (): void => {
        const start: number = new Date().getTime()
        let random1: number
        let random2: number

        setInterval(() => {
            if (new Date().getTime() - start > 2000) {
                clearInterval
                return
            }
            random1 = Math.floor(Math.random() * 6) + 1 // output : 1,2,3,4,5,6
            random2 = Math.floor(Math.random() * 6) + 1 // output : 1,2,3,4,5,6
            setDice1(random1)
            setDice2(random2)
        }, 50);
    }

    return (
        <Layout blur={true}>
            <div className="h-full w-full space-x-10 flex z-20 p-4 justify-center items-center">
                <div className="h-[600px] w-[25rem] border z-20 bg-gray-50/50 p-5 space-y-4 flex flex-col">
                    <div className="h-1/4 flex justify-center items-center flex-col">
                        <span className="text-xl font-semibold text-red-800 h-10 w-10">5s</span>
                        <h3 className="text-4xl font-bold text-green-800">Ejha is playing</h3>
                    </div>
                    <div className="h-2/4">
                        <Chat />
                    </div>
                    <div className="h-1/4 flex justify-center items-center">
                        <button onClick={rollDice} className="h-24 w-24 relative">
                            <img src={`/dice/${dice1}.png`} alt="1" className="object-cover" />
                        </button>
                        <button onClick={rollDice} className="h-24 w-24 relative">
                            <img src={`/dice/${dice2}.png`} alt="1" className="object-cover" />
                        </button>
                    </div>
                </div>
                <Board />
            </div>
        </Layout>
    )
}