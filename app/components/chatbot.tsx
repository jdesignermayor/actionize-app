'use client';
import IntroChatMessage from '@/app/components/introChatMessage';
import { useInterfaceStore } from '@/app/store/interface.store';
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { MOCK_USER_TEAMPLATES } from '../utils/mock-user-data';


export default function Chatbot() {
    const [userPrompt, setUserPrompt] = useState('');
    const { chatbotMode, isTaskManagerEnabled } = useInterfaceStore();

    const { messages, input, status, stop, handleInputChange, handleSubmit } = useChat({
        sendExtraMessageFields: true,
    });

    return <div className={`flex flex-col relative justify-between items-center h-full p-2`}>
        <div className={`h-full w-full`}>
            {chatbotMode === 'intro' && <><IntroChatMessage /> </>}
        </div>
        <div className='flex flex-col justify-between focus:border-white focus:border-2 w-full h-48 lg:h-32 rounded-xl'>
            {chatbotMode === 'intro' && <>
                <div className='flex flex-col gap-4 absolute bottom-[11rem] text-sm'>
                    <p className='flex gap-3 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" />
                        </svg>
                        You can shoose your teamplate from the list below
                    </p>
                    <div className='flex flex-wrap gap-2 '>
                        {MOCK_USER_TEAMPLATES?.map(({ id, name, description }) => (<button key={id} className='w-full border hover:bg-panel-gray-main border-panel-gray-main text-white p-3 rounded-lg text-left h-[4rem] transition-all'>
                            <p>{name}</p>
                            <p className=' text-text-gray-main'>{description}</p>
                        </button>))}
                    </div>
                </div>

            </>}

            <textarea name="prompt" onChange={(e) => setUserPrompt(e.target.value)} placeholder={'I need to create tasks for organizing my day to include work, exercise, and relaxation. '} className='bg-[#222222] placeholder:text-text-gray-main px-4 pr-20 pb-9 pt-5 border border-bg-gray-main rounded-xl focus:ring-2 ring-white resize-none w-full outline-none' ></textarea>

            <div className='absolute bottom-0 right-0 pr-5 pb-12'>
                {userPrompt.length > 0 && <button className=' flex items-center justify-center bg-white rounded-full p-2 focus:ring-4 ring-white '><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499" />
                </svg></button>}
            </div>
        </div>
    </div>
}