export default function Chat() {
    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex-grow overflow-auto border bg-white/50">
                {
                    [1, 1, 11, 1, 11, 1, 1, 1, 1, 1, 1, 1].map((el, i) => (
                        <p key={i}>admin : welcome</p>
                    ))
                }
            </div>
            <div className="flex items-center mt-3 space-x-3">
                <input className="flex-grow border bg-white/50" />
                <button className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-400 text-white px-3">SEND</button>
            </div>
        </div>
    )
}
