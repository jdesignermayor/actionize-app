'use client';

import { useChat } from '@ai-sdk/react';
import dialogs from '../utils/dialogs';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import Ship from './ship';
import { useEffect, useState } from 'react';
import UserMessageCard from './userMessageCard';
import AIMessageCard from './aiMessageCard';

export default function Chatbot() {
    const { messages, input, status,isLoading, handleInputChange, handleSubmit } = useChat({});
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        setIsDataLoaded(messages?.length <= 0);
    }, [messages]);

    return <>
        {isDataLoaded && <div className="flex flex-col gap-3 items-center pt-[25px]">
            <h1 className=" font-medium text-4xl">Whats your plan for today?</h1>
            <p className=" font-medium text-md text-gray-main">Your AI Assistant, for Life-Work <span className="text-white">Balance</span></p>
        </div>}

        <div className={(isDataLoaded && 'hidden ') + 'w-full  h-[74vh] overflow-y-auto flex flex-col gap-2 '}>
            <div className='w-[450px] flex flex-col gap-4'>
                {messages.map(message => (
                    <div key={message.id}>
                        {message.role === 'user' ? <UserMessageCard message={message.content} /> : <AIMessageCard message={JSON.stringify(message.parts)} />}
                    </div>
                ))}
            </div>
        </div>

        <form onSubmit={handleSubmit} className={'bottom-0 flex flex-col gap-2 pb-7 ' + (!isDataLoaded ? 'absolute' : ' relative justify-center items-center')}>
            <div className='flex flex-col gap-2'>
            {isLoading && <div className="left-0 w-full h-full bg-black bg-opacity-50 z-10">loanding...</div>}
                <div className=' select-none bg-[#27272777] backdrop-blur-xl  rounded-lg w-[450px] border-[#3a3a3a]'>
                    <textarea name="prompt" placeholder={dialogs.chatbotTexts.placeholder} className='dark overflow-hidden  sheme resize-none focus:outline-none bg-transparent w-[380px] h-[95px] p-3' onChange={handleInputChange} value={input}></textarea>
                    {input?.length > 0 && <button type="submit" className='absolute w-9 h-9 flex justify-center items-center top-[18px] right-[15px] bg-primary-main rounded-md p-2 text-black'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499" />
                        </svg>
                    </button>}
                    <div className='flex p-2'>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button className='flex justify-center w-9 h-9 items-center top-[18px] right-[15px] hover:bg-[#222]  rounded-md p-2 text-white'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Enhance prompt</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </div>
            <p className=" text-gray-main">Blank templates </p>
            <div className="flex flex-row gap-3 items-center justify-center">
                <Ship text='template for asdasdasd ...' />
                <Ship text='template for sadsa...' />
                <Ship text='template for ...' />
                <Ship text='template for ...' />
                <Ship text='template for ...' />
            </div>
        </form>

    </>
}