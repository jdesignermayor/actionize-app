'use client';

import type { Message } from 'ai';
import type React from 'react';
import {
    memo,
    useCallback,
    useEffect,
    useRef,
    type Dispatch,
    type SetStateAction
} from 'react';
import { toast } from 'sonner';
import { useLocalStorage, useWindowSize } from 'usehooks-ts';

import { useInterfaceStore } from '@/app/store/interface.store';
import { Button } from '@/components/ui/button';
import { UseChatHelpers } from '@ai-sdk/react';
import { ArrowUpIcon, StopCircleIcon } from 'lucide-react';

/* eslint-disable */
function PureMultimodalInput({
    chatId,
    input,
    setInput,
    status,
    stop,
    messages,
    setMessages,
    append,
    handleSubmit,
    className,
}: {
    chatId: string | null;
    input: UseChatHelpers['input'];
    setInput: UseChatHelpers['setInput'];
    status: UseChatHelpers['status'];
    stop: () => void;
    append?: UseChatHelpers['append'];
    messages?: Array<Message>;
    setMessages: Dispatch<SetStateAction<Array<Message>>>;
    handleSubmit: UseChatHelpers['handleSubmit'];
    className?: string;
}) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { width } = useWindowSize();


    useEffect(() => {
        console.log('messages', messages);
        console.log('append', append);
        console.log('className', className);

        if (textareaRef.current) {
            adjustHeight();
        }
    }, []);

    const adjustHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
        }
    };

    const resetHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = '98px';
        }
    };

    const [localStorageInput, setLocalStorageInput] = useLocalStorage(
        'input',
        '',
    );

    useEffect(() => {
        if (textareaRef.current) {
            const domValue = textareaRef.current.value;
            const finalValue = domValue || localStorageInput || '';
            setInput(finalValue);
            adjustHeight();
        }
    }, []);

    useEffect(() => {
        setLocalStorageInput(input);
    }, [input, setLocalStorageInput]);

    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(event.target.value);
        adjustHeight();
    };

    const submitForm = useCallback(() => {
        handleSubmit(undefined);
        setLocalStorageInput('');
        resetHeight();

        if (width && width > 768) {
            textareaRef.current?.focus();
        }
    }, [
        handleSubmit,
        setLocalStorageInput,
        width,
        chatId,
    ]);


    return (
        <div className="relative w-full flex flex-col gap-4">
            {/* {messages.length === 0 &&
                attachments.length === 0 &&
                uploadQueue.length === 0 && (
                    <SuggestedActions append={append} chatId={chatId} />
                )} */}

            <textarea
                data-testid="multimodal-input"
                ref={textareaRef}
                className=' 2xl:text-lg border-panel-gray-main focus:bg-[#222222] placeholder:text-text-gray-main px-4 pr-20 pb-9 pt-5 border border-bg-gray-main rounded-2xl focus:ring-2 ring-white h-36 resize-none w-full outline-none'
                placeholder="Today i will need to do..."
                value={input}
                onChange={handleInput}
                rows={2}
                autoFocus
                onKeyDown={(event) => {
                    if (
                        event.key === 'Enter' &&
                        !event.shiftKey &&
                        !event.nativeEvent.isComposing
                    ) {
                        event.preventDefault();

                        if (status !== 'ready') {
                            toast.error('Please wait for the model to finish its response!');
                        } else {
                            submitForm();
                        }
                    }
                }}
            />

            <div className="absolute bottom-0 right-0 p-2 w-fit flex flex-row justify-end">
                {status === 'submitted' ? (
                    <StopButton stop={stop} setMessages={setMessages} />
                ) : (
                    <SendButton
                        input={input}
                        submitForm={submitForm}
                    />
                )}
            </div>
        </div>
    );
}

export const MultimodalInput = memo(
    PureMultimodalInput,
    (prevProps, nextProps) => {
        if (prevProps.input !== nextProps.input) return false;
        if (prevProps.status !== nextProps.status) return false;

        return true;
    },
);


function PureStopButton({
    stop,
    setMessages,
}: {
    stop: () => void;
    setMessages: Dispatch<SetStateAction<Array<Message>>>;
}) {
    return (
        <Button
            data-testid="stop-button"
            className={`p-1.5 w-10 h-10 flex items-center justify-center bg-white rounded-2xl focus:ring-4 ring-white`}
            onClick={(event) => {
                event.preventDefault();
                stop();
                setMessages((messages) => messages);
            }}
        >
            <StopCircleIcon size={14} />
        </Button>
    );
}

const StopButton = memo(PureStopButton);

function PureSendButton({
    submitForm,
    input,
}: {
    submitForm: () => void;
    input: string;
}) {
    const { updateChatMode } = useInterfaceStore();

    return (
        <Button
            className={`p-1.5 w-10 h-10 flex items-center justify-center bg-white rounded-2xl focus:ring-4 ring-white ${input.length === 0 && 'hidden'} `}
            onClick={(event) => {
                event.preventDefault();
                updateChatMode('chating');
                submitForm();
            }}
        >
            <ArrowUpIcon size={14} />
        </Button>
    );
}

const SendButton = memo(PureSendButton, (prevProps, nextProps) => {
    if (prevProps.input !== nextProps.input) return false;
    return true;
});
