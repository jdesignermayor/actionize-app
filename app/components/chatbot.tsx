'use client';
import IntroChatMessage from '@/app/components/introChatMessage';
import { Messages } from '@/app/components/messages';
import { useInterfaceStore } from '@/app/store/interface.store';
import { MOCK_USER_TEAMPLATES } from '@/app/utils/mock-user-data';
import { useChat } from '@ai-sdk/react';
import { toast } from 'sonner';
import { MultimodalInput } from './multimodal-input';


export default function Chatbot() {
    const { chatbotMode } = useInterfaceStore();

    const { messages,
        setMessages,
        handleSubmit,
        input,
        setInput,
        append,
        status,
        stop,
        reload } = useChat({
            experimental_throttle: 100,
            sendExtraMessageFields: true,
            onFinish: () => {
            },
            onError: () => {
                toast.error('An error occured, please try again!');
            },
        });

    return <div className={`flex flex-col gap-8 relative justify-between items-center w-full pb-4`}>
        <div className=' pb-5'>
            {chatbotMode === 'intro' && <IntroChatMessage />}
        </div>
        <div className={`h-[75vh] w-full ${chatbotMode === 'intro' && 'hidden'}`}>
            <Messages
                status={status}
                messages={messages}
                setMessages={setMessages}
                reload={reload}
                isReadonly={chatbotMode === 'intro'}
            />
        </div>
        <div className='flex flex-col gap-5 justify-between focus:border-white focus:border-2 w-full rounded-xl'>
            <form>
                <MultimodalInput
                    chatId={null}
                    input={input}
                    setInput={setInput}
                    handleSubmit={handleSubmit}
                    status={status}
                    stop={stop}
                    messages={messages}
                    setMessages={setMessages}
                    append={append}
                />
            </form>

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