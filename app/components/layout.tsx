'use client';

import Chatbot from "@/app/components/chatbot";
import TaskManager from "@/app/components/taskManager";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useState } from "react";

export default function Layout() {
    const [isIntro, setIsIntro] = useState(true);
    const [isTaskManagerExpanded, setIsTaskManagerExpanded] = useState(false);
    const [parent, enable] = useAutoAnimate({ duration: 300 });

    function expandOrCollapseTaskManager() {
        setIsTaskManagerExpanded(() => !isTaskManagerExpanded);
        enable(true);
    }

    return <>
        <button onClick={() => setIsIntro(!isIntro)}>Intro</button>
        <div className="flex items-center justify-center w-full px-[15%] overflow-hidden" ref={parent}>
            {!isTaskManagerExpanded && <div className={`w-[60rem]`} >
                {isIntro && <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col gap-3 items-center pt-[25vh] py-5">
                        <h1 className=" font-medium text-4xl">What's your plan for today?</h1>
                        <p className=" font-medium text-md text-gray-main">Your AI Assistant, for Life-Work <span className="text-white">Balance</span></p>
                    </div>
                </div>}
                <Chatbot isIntroEnabled={isIntro} />
            </div>}
            {!isIntro && <div>
                <button className="h-[90svh] px-2 hover:opacity-40" onClick={() => expandOrCollapseTaskManager()}>
                    {isTaskManagerExpanded ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>}
                </button>
            </div>}
            {!isIntro && <div>
                <TaskManager isTaskManagerExpanded={isTaskManagerExpanded} />
            </div>}
        </div>
    </>
}