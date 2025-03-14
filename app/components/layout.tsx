'use client';

import Chatbot from "@/app/components/chatbot";
import TaskManager from "@/app/components/taskManager";
import { useInterfaceStore } from "@/app/store/interface.store";
import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function Layout() {
    const [parent, enable] = useAutoAnimate({ duration: 300 });
    const { isTaskManagerEnabled, isTaskManagerExpanded, chatbotMode, updateTaskManagerExpanded, updateTaskManagerEnabled, updateIntroMode } = useInterfaceStore();

    function expandOrCollapseTaskManager() {
        updateTaskManagerExpanded(true);
        enable(true);
    }

    return <>
        <div className="absolute top-0">
            <button className="bg-red-500 text-white p-2 rounded-lg" onClick={() => updateIntroMode('chating')}>chatbotMode</button>
            <button className="bg-red-200 text-white p-2 rounded-lg" onClick={() => updateTaskManagerEnabled(true)}>isTaskManagerEnabled</button>
            <p>chatbotMode: {chatbotMode}</p>
            <p>isTaskManagerEnabled: {JSON.stringify(isTaskManagerEnabled)}</p>
        </div>

        <div className="flex items-center justify-center w-full lg:px-[calc(5%)] overflow-hidden" ref={parent}>
            <div className="w-full lg:w-[calc(50%)] xl:w-[calc(35%)] 2xl:w-[calc(30%)] h-[85svh] flex flex-col p-2">
                <Chatbot />
            </div>
            {isTaskManagerEnabled && <>
                <div className="h-[85svh]">
                    <button className="h-[90svh] px-2 hover:opacity-40" onClick={() => expandOrCollapseTaskManager()}>
                        {isTaskManagerExpanded ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>}
                    </button>
                </div>
                <div className="lg:w-[calc(50%)] xl:w-[calc(65%)] 2xl:w-[calc(70%)] h-[85svh]">
                    <TaskManager />
                </div>
            </>}
        </div>
    </>
}