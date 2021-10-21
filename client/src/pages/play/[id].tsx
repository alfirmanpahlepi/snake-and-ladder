import { useState } from "react"

export default function Play() {
    const [diceNumber, setDiceNumber] = useState(1)
    const rollDice = (): void => {
        const start = new Date().getTime()
        let random: number

        setInterval(() => {
            if (new Date().getTime() - start > 2000) {
                clearInterval
                return
            }
            random = Math.floor(Math.random() * 6) + 1 // output : 1,2,3,4,5,6
            setDiceNumber(random)
        }, 50);
    }
    return (
        <>
            <div className="absolute top-0 h-screen w-screen bg-cover blur z-10" style={{ backgroundImage: "url(/background.jpg)" }}></div>
            <div className="h-screen w-screen space-x-10 flex z-20 p-4 justify-center items-center">
                <div className="h-[600px] w-[25rem] border z-20 bg-gray-50/50 p-5 space-y-4 flex flex-col">
                    <div className="h-1/4 flex justify-center items-center flex-col">
                        <span className="text-xl font-semibold text-red-800 h-10 w-10">5s</span>
                        <h3 className="text-4xl font-bold text-green-800">Ejha's turn</h3>
                    </div>
                    <div className="h-2/4 flex flex-col">
                        <div className="flex-grow overflow-auto border bg-white/50">
                            {
                                [1, 1, 11, 1, 11, 1, 1, 1, 1, 1, 1, 1].map((el, i) => (
                                    <p key={i}>admin : welcome</p>
                                ))
                            }
                        </div>
                        <div className="flex items-center mt-3 space-x-3">
                            <input className="flex-grow border bg-white/50" />
                            <button className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-400 shadow text-white px-3">SEND</button>
                        </div>
                    </div>
                    <div className="h-1/4 flex justify-center items-center">
                        <button onClick={rollDice} className="h-24 w-24 relative">
                            <img src={`/dice/${diceNumber}.png`} alt="1" className="object-cover" />
                        </button>
                    </div>
                </div>
                <div className="w-[600px] h-[600px] z-20 border-4 border-gray-800/80 bg-white/20 p-3 grid grid-cols-10">
                    {
                        grids(100).map((e, i) => (
                            <span key={i} className={`${e % 2 === 0 ? "bg-red-700" : "bg-white"} border text-xs inline-block p-1`}>{e}</span>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

const grids = (num: number) => {
    const arr = []
    const temp = []
    for (let i = num; i >= 1; i--) {
        temp.push(i)
        if (temp.length === 10) {
            if (temp[0] % 20 !== 0) temp.reverse()
            arr.push(...temp)
            temp.length = 0
        }
    }

    return arr
}