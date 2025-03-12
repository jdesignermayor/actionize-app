'use client';

import Chatbot from "@/app/components/chatbot";
import TaskManager from "@/app/components/taskManager";
import { useState } from "react";

export default function Layout() {
    const [isTaskManagerExpanded, setIsTaskManagerExpanded] = useState(false);

    return <>
        <div className="flex items-center justify-center w-full px-[3em]">
            <div className={`w-2/4 ${isTaskManagerExpanded && 'hidden'} `}>
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col gap-3 items-center pt-[25vh] py-5">
                        <h1 className=" font-medium text-4xl">What's your plan for Today?</h1>
                        <p className=" font-medium text-md text-gray-main">Your AI Assistant, for Life-Work <span className="text-white">Balance</span></p>
                    </div>
                </div>
                <Chatbot />
            </div>
            <div>
                <button className="h-[90svh] px-2 hover:opacity-40 transition-all" onClick={() => setIsTaskManagerExpanded(!isTaskManagerExpanded)}>
                    {isTaskManagerExpanded ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>}
                </button>
            </div>
            <div className="w-full">
                <TaskManager />
            </div>
        </div>
    </>
}