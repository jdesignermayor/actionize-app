'use client';

import Chatbot from "@/app/components/chatbot";
import TaskManager from "@/app/components/taskManager";
import { useInterfaceStore } from "@/app/store/interface.store";
import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function Layout() {
    const [parent, enable] = useAutoAnimate({ duration: 300 });
    const { isExpandedTaskManager, isIntroEnabled, updateTaskManagerExpanded, updateIntroEnabled } = useInterfaceStore();

    function expandOrCollapseTaskManager() {
        updateTaskManagerExpanded(!isExpandedTaskManager);
        enable(true);
    }

    return <>
        <button onClick={() => updateIntroEnabled(!isIntroEnabled)}>Intro</button>
        <div className="flex items-center justify-center w-full px-[15%] overflow-hidden" ref={parent}>
            {!isExpandedTaskManager && <div className={`w-[60rem]`} >
                {isIntroEnabled && <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col gap-3 items-center pt-[25vh] py-5">
                        <h1 className=" font-medium text-4xl">What's your plan for today?</h1>
                        <p className=" font-medium text-md text-gray-main">Your AI Assistant, for Life-Work <span className="text-white">Balance</span></p>
                    </div>
                </div>}
                <Chatbot isIntroEnabled={isIntroEnabled} />
            </div>}
            {!isIntroEnabled && <div>
                <button className="h-[90svh] px-2 hover:opacity-40" onClick={() => expandOrCollapseTaskManager()}>
                    {isExpandedTaskManager ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>}
                </button>
            </div>}
            {!isIntroEnabled && <div>
                <TaskManager isExpandedTaskManager={isExpandedTaskManager} />
            </div>}
        </div>
    </>
}