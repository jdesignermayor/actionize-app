'use client';
import { useChat } from '@ai-sdk/react';

interface Chatbot {
    isIntroEnabled: boolean,
}

export default function Chatbot({ isIntroEnabled }: Chatbot) {
    const { messages, input, status, stop, handleInputChange, handleSubmit } = useChat({
        sendExtraMessageFields: true,
    });

    return <>
        <div className={`flex flex-col relative gap-3 items-left w-full bg-[#131313] border border-[#444444] rounded-lg ${isIntroEnabled ? ' w-[25rem] h-[20vh]' : 'h-[90svh]'}`}>
            <div className=' select-none bg-[#27272777] backdrop-blur-xl  rounded-lg w-[450px] border-[#3a3a3a] bottom-0  '>
                <textarea name="prompt" placeholder={'Place holder...'} className='dark overflow-hidden  sheme resize-none focus:outline-none bg-transparent w-[380px] h-[95px] p-3' onChange={handleInputChange} value={input}></textarea>
            </div>
        </div>
    </>
}