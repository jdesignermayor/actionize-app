'use client';

import Chatbot from "@/app/components/chatbot";
import TaskManager from "@/app/components/taskManager";
import TaskManagerExpandButton from "@/app/components/taskManagerExpandButton";
import { useInterfaceStore } from "@/app/store/interface.store";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import cx from 'classnames';

export default function IntroLayoutSection() {
    const [parent] = useAutoAnimate({ duration: 300 });
    const { isTaskManagerEnabled, isTaskManagerExpanded, chatbotMode } = useInterfaceStore();


    return <>
        {/* <div className="absolute top-0">
            <button className="bg-red-500 text-white p-2 rounded-lg" onClick={() => updateChatMode('chating')}>chatbotMode</button>
            <button className="bg-red-200 text-white p-2 rounded-lg" onClick={() => updateTaskManagerEnabled(true)}>isTaskManagerEnabled</button>
            <p>chatbotMode: {chatbotMode}</p>
            <p>isTaskManagerEnabled: {JSON.stringify(isTaskManagerEnabled)}</p>
        </div> */}

        <div className={`flex ${!isTaskManagerEnabled && ' items-center justify-center '} w-full overflow-hidden px-5`} ref={parent}>
            <div className={`w-full h-[90svh] flex flex-col ${chatbotMode === 'chating' ? 'w-[calc(8%)] lg:w-[calc(38%)] 2xl:w-[calc(28%)] justify-end' : 'lg:w-[calc(40%)] xl:w-[calc(43%)] 2xl:w-[calc(30%)] justify-center items-center'} ${isTaskManagerExpanded && ' hidden '}`} >
                <Chatbot />
            </div>

            {isTaskManagerEnabled && <>
                <div className="h-[85svh]">
                    <TaskManagerExpandButton />
                </div>
                <div className={cx('w-full h-[90svh]', { 'w-[calc(88%)] lg:w-[calc(58%)] 2xl:w-[calc(68%)]': chatbotMode === 'chating' && !isTaskManagerExpanded }, {
                    'lg:w-[calc(50%)] xl:w-[calc(65%)] 2xl:w-[calc(70%)]': chatbotMode !== 'chating' && !isTaskManagerExpanded
                }, {
                    'w-full': isTaskManagerExpanded && chatbotMode !== 'chating'
                })
                }>
                    <TaskManager />
                </div>
            </>}
        </div>
    </>
}