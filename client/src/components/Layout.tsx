import { ReactNode } from "react";

export default function Layout({ blur, children }: { blur: boolean, children: ReactNode }): JSX.Element {
    return (
        <>
            <div className={`${blur && "blur"} absolute top-0 h-screen w-screen bg-cover z-10 before:content-['your_device_screen_not_supported.'] before:text-2xl before:font-semibold before:text-red-600 lg:before:content-none`}
                style={{ backgroundImage: "url(/img/background2.jpg)" }}></div>
            <main className="h-screen w-screen hidden lg:block">{children}</main>
        </>
    )
}
