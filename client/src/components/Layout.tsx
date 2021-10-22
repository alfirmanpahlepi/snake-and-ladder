export default function Layout({ blur, children }: { blur: boolean, children: JSX.Element }) {
    return (
        <>
            <div className={`${blur && "blur"} absolute top-0 h-screen w-screen bg-cover z-10`} style={{ backgroundImage: "url(/background.jpg)" }}></div>
            <div className="h-screen w-screen">
                {children}
            </div>
        </>
    )
}
