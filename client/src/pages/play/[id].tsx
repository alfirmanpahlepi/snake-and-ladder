export default function Play() {
    return (
        <>
            <div className="absolute top-0 h-screen w-screen bg-cover blur z-10" style={{ backgroundImage: "url(/background.jpg)" }}></div>
            <div className="h-screen w-screen space-x-10 flex z-20 p-4 justify-center items-center">
                <div className="h-[600px] w-[25rem] ring z-20 bg-gray-50 p-5 space-y-4 flex flex-col">
                    <div className="ring h-1/4"></div>
                    <div className="ring h-2/4"></div>
                    <div className="ring h-1/4"></div>
                </div>
                <div className="w-[600px] h-[600px] z-20 border-4 border-gray-800 bg-white p-3 grid grid-cols-10">
                    {
                        grids(100).map((e, i) => (
                            <span key={i} className={`${e%2===0?"bg-red-700":"bg-white"} border text-xs inline-block p-1`}>{e}</span>
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