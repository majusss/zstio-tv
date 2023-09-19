import {useEffect, useRef} from "react";

export default function Clock() {
    const timeRef = useRef<HTMLHeadingElement>(null)
    useEffect(() => {
        const time = timeRef.current
        if (!time) return
        time.textContent = `${("0" + new Date().getHours()).slice(-2)}:${("0" + new Date().getMinutes()).slice(-2)}`
        setInterval(() => {
            const newTime = `${("0" + new Date().getHours()).slice(-2)}:${("0" + new Date().getMinutes()).slice(-2)}`
            if (time.textContent != newTime) time.textContent = newTime
        }, 100)
    }, [])
    return (
        <div className={"fixed w-screen top-0 flex flex-col justify-center items-center"}>
            <h1 className={"text-white text-9xl font-bold"} ref={timeRef}>21:37</h1>
            <h2 className={"text-white text-2xl"}>za 69 sec przerwa</h2>
        </div>)
}
