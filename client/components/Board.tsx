export default function Board() {
    return (
        <div className="w-[600px] h-[600px] z-20 bg-white/20 relative bg-cover grid grid-cols-10 p-6" style={{ backgroundImage: "url('/board.png')" }}>
            {
                grids(100).map((e, i) => (
                    <div key={i} className="flex justify-center items-center">
                        <div className="h-10 w-10 rounded-full flex items-center justify-center">
                            {
                                e === 15 && <span className="h-10 w-10 rounded-full bg-purple-700 border-2 border-gray-200 grid place-items-center font-semibold">
                                    S
                                </span>
                            }
                        </div>
                    </div>
                ))
            }
        </div>
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