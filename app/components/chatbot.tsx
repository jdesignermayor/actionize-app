'use client';

import { useChat } from '@ai-sdk/react';
import dialogs from '../utils/dialogs';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import Ship from './ship';
import { useEffect, useRef, useState } from 'react';
import UserMessageCard from './userMessageCard';
import AIMessageCard from './aiMessageCard';
import Loader from "react-spinners/PulseLoader";
import UserPrevRateCard from './userPrevRateCard';

export default function Chatbot() {
    const { messages, input, status, stop, handleInputChange, handleSubmit } = useChat({});
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const chatbotAreaRef = useRef<HTMLDivElement>(null);
    const [isScrollUp, setIsScrollUp] = useState(false);
    const prevScrollPos = useRef(0);


    const scrollToBottom = () => {
        chatbotAreaRef.current?.scrollTo({ top: chatbotAreaRef.current?.scrollHeight, behavior: 'smooth' });
    }

    const handleScroll = (event: any) => {
        const currentScrollPos = event.target.scrollTop;

        if (currentScrollPos < prevScrollPos.current) {
            setIsScrollUp(true);
        }

        if (prevScrollPos.current === 0) {
            setIsScrollUp(false);
        }

        prevScrollPos.current = currentScrollPos;
    };


    useEffect(() => { scrollToBottom() }, [messages]);

    useEffect(() => {
        setIsDataLoaded(messages?.length <= 0);
    }, [messages]);

    return <>
        {isDataLoaded && <div className="flex flex-col gap-3 items-center pt-[25vh] py-5">
            <h1 className=" font-medium text-4xl">What Do You Plan to Do Today?</h1>
            <p className=" font-medium text-md text-gray-main">Your AI Assistant, for Life-Work <span className="text-white">Balance</span></p>
        </div>}

        <div ref={chatbotAreaRef} className={(isDataLoaded && 'hidden ') + 'w-full  h-[75vh] overflow-y-auto flex flex-col gap-2 '} onScroll={handleScroll}>
            {isScrollUp && <div className="absolute">
                <button type="button" className='absolute w-9 h-9 flex justify-center items-center top-[18px] right-[15px] bg-primary-main rounded-md p-2 text-black' onClick={() => scrollToBottom()}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v16.19l6.22-6.22a.75.75 0 1 1 1.06 1.06l-7.5 7.5a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 1 1 1.06-1.06l6.22 6.22V3a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                    </svg>

                </button>
            </div>}
            <div className='w-[450px] flex flex-col gap-4'>
                {messages.map(message => (
                    <div key={message.id}>
                        {message?.parts?.map(part => {
                            switch (part.type) {
                                case 'text':
                                    return message.role === 'user' ? <UserMessageCard key={message.id} text={part.text} /> : <AIMessageCard key={message.id} text={part.text} />;

                                case 'tool-invocation': {
                                    const callId = part.toolInvocation.toolCallId;

                                    switch (part.toolInvocation.toolName) {
                                        case 'getUserPreviousRates': {
                                            switch (part.toolInvocation.state) {
                                              case 'call':
                                                return <div key={callId}>Getting location...</div>;
                                              case 'result':
                                                return (
                                                  <div key={callId}>
                                                    <UserPrevRateCard props={part.toolInvocation.result} />
                                                  </div>
                                                );
                                            }
                                            break;
                                          }
                        
                                    }
                                }

                                default:
                                    break;
                            }
                        })}

                    </div>
                ))}
            </div>

        </div>

        <form onSubmit={handleSubmit} className={'bottom-0 flex flex-col gap-2 pb-7 ' + (!isDataLoaded ? 'absolute' : ' relative justify-center items-center')}>
            <div className='flex flex-col gap-2'>

                {status === 'submitted' || status === 'streaming' && <div className="left-0 w-full h-fullz-10"><Loader
                    color={'#C0C0C0'}
                    loading={true}
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                /></div>}
                <div className=' select-none bg-[#27272777] backdrop-blur-xl  rounded-lg w-[450px] border-[#3a3a3a]'>
                    <textarea name="prompt" placeholder={dialogs.chatbotTexts.placeholder} className='dark overflow-hidden  sheme resize-none focus:outline-none bg-transparent w-[380px] h-[95px] p-3' onChange={handleInputChange} value={input}></textarea>
                    {(status === 'streaming') && (
                        <>
                            <button type="button" className='absolute w-9 h-9 flex justify-center items-center top-[18px] right-[15px] bg-primary-main rounded-md p-2 text-black' onClick={() => stop()}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm6-2.438c0-.724.588-1.312 1.313-1.312h4.874c.725 0 1.313.588 1.313 1.313v4.874c0 .725-.588 1.313-1.313 1.313H9.564a1.312 1.312 0 0 1-1.313-1.313V9.564Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </>
                    )}
                    {(status !== 'streaming' && input?.length > 0) && (
                        <>
                            <button type="submit" className='absolute w-9 h-9 flex justify-center items-center top-[18px] right-[15px] bg-primary-main rounded-md p-2 text-black'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499" />
                                </svg>
                            </button>
                        </>
                    )}
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
                                <TooltipContent>-
                                    <p>Enhance prompt</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </div>
            {isDataLoaded && <div className=' py-6 flex flex-col gap-2 justify-center items-center'>
                <p className=" text-gray-main">Blank templates </p>
                <div className="flex flex-wrap gap-3 items-center justify-center max-w-[55em]">
                    {
                        dialogs.chatbotTexts.defaultTeamplates.map((template: any, index: number) => {
                            return <Ship text={template.title} key={index} />
                        })
                    }
                </div>
            </div>}
        </form>
    </>
}