'use client';

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect } from "react";
import Task from "./task";


export default function TaskList({ tasks, rates }: TaskList) {
    const [parent, enable] = useAutoAnimate({ duration: 400 });

    useEffect(() => {
        enable(true);
    }, [parent]);

    return <>
        <section className="flex flex-col gap-7 items-left w-full h-[55rem]" >
            <div className="flex flex-col gap-3 items-left w-full" ref={parent}>
                {tasks.map((task, index) => (
                    <Task key={index} {...task} />
                ))}
            </div>
        </section>
    </>
}