import { Player, Players } from "@/types"

interface BoardProps { Players: Players }

export default function Board({ Players }: BoardProps): JSX.Element {
    return (
        <div className="w-[600px] h-[600px] z-20 bg-white/20 relative bg-cover grid grid-cols-10 p-6" style={{ backgroundImage: "url('/board.png')" }}>
            {
                grids(100).map((grid: number, idx: number) => (
                    <div key={idx} className="flex justify-center items-center relative">
                        <div className="h-10 w-10 rounded-full flex items-center justify-center absolute">
                            {Players.map((user: Player, i: number) => (
                                user.grid === grid &&
                                <span
                                    key={i}
                                    style={{ backgroundColor: user.color }}
                                    className="absolute h-10 w-10 rounded-full border-2 border-gray-200 grid place-items-center font-semibold uppercase">
                                    {user.username[0]}
                                </span>
                            ))}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

const grids = (num: number): number[] => {
    const arr: number[] = []
    const temp: number[] = []
    for (let i: number = num; i >= 1; i--) {
        temp.push(i)
        if (temp.length === 10) {
            if (temp[0] % 20 !== 0) temp.reverse()
            arr.push(...temp)
            temp.length = 0
        }
    }

    return arr
}