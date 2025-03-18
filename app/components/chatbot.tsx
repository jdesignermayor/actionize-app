'use client';
import IntroChatMessage from '@/app/components/introChatMessage';
import { useInterfaceStore } from '@/app/store/interface.store';
import { useState } from 'react';
import { MOCK_USER_TEAMPLATES } from '../utils/mock-user-data';


export default function Chatbot() {
    const [userPrompt, setUserPrompt] = useState('');
    const { chatbotMode } = useInterfaceStore();

    // const { messages, input, status, stop, handleInputChange, handleSubmit } = useChat({
    //     sendExtraMessageFields: true,
    // });

    return <div className={`flex flex-col gap-8 relative justify-between items-center p-2 w-full`}>
        <div className=' pb-5'>
            {chatbotMode === 'intro' && <><IntroChatMessage /> </>}
        </div>
        <div className='flex flex-col gap-5 justify-between focus:border-white focus:border-2 w-full rounded-xl'>
            <textarea name="prompt" onChange={(e) => setUserPrompt(e.target.value)} placeholder={'I need to create tasks for organizing my day to include work, exercise, and relaxation. '} className=' 2xl:text-lg border-panel-gray-main focus:bg-[#222222] placeholder:text-text-gray-main px-4 pr-20 pb-9 pt-5 border border-bg-gray-main rounded-3xl focus:ring-2 ring-white h-40 resize-none w-full outline-none' ></textarea>

            <div className='absolute right-0 pr-8 pt-20'>
                {userPrompt.length > 0 && <button className=' flex items-center justify-center bg-white w-12 h-12  rounded-2xl p-2 focus:ring-4 ring-white '><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499" />
                </svg></button>}
            </div>

            {chatbotMode === 'intro' && <>
                <div className='flex flex-wrap gap-2'>
                    {MOCK_USER_TEAMPLATES?.map(({ id, name }) => (<button key={id} className=' text-sm font-bold border hover:bg-panel-gray-main border-[#252525] text-white p-3 rounded-2xl text-left transition-all'>
                        <p>{name}</p>
                    </button>))}
                </div>
            </>}

        </div>
    </div>
}