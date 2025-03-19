'use client';

import { MessageReasoning } from '@/app/components/messageReasoning';
import { TaskType } from '@/app/models/taks.model';
import { useInterfaceStore } from '@/app/store/interface.store';
import { useTaskManagerStore } from '@/app/store/taksManager.store';
import { Button } from '@/components/ui/button';
import { UseChatHelpers } from '@ai-sdk/react';
import { UIMessage } from 'ai';
import cx from 'classnames';
import equal from 'fast-deep-equal';
import { BotMessageSquareIcon, UserIcon } from 'lucide-react';
import { memo } from "react";
import Markdown from 'react-markdown';

/* eslint-disable */
const PurePreviewMessage = ({
    chatId,
    message,
    isLoading,
    setMessages,
    reload,
    isReadonly,
}: {
    chatId?: string;
    message: UIMessage;
    isLoading: boolean;
    setMessages?: UseChatHelpers['setMessages'];
    reload?: UseChatHelpers['reload'];
    isReadonly?: boolean;
}) => {
    const { setTasks } = useTaskManagerStore();
    const { updateTaskManagerEnabled } = useInterfaceStore();

    const handleGetTasksSuggestions = (tasks: any) => () => {

        setTasks(tasks);
        updateTaskManagerEnabled(true);
    }

    return <div className='flex gap-4 w-full'>
        {message.role === 'assistant' ? (
            <div className="size-8 flex items-center rounded-full justify-center">
                <div className="translate-y-px">
                    <BotMessageSquareIcon className='  text-text-gray-main' />
                </div>
            </div>
        ) : (<div className="size-8 flex items-center rounded-full justify-center">
            <div className="translate-y-px">
                <UserIcon />
            </div>
        </div>)}

        <div className="flex flex-col gap-4 w-full">
            {message.parts?.map((part, index) => {
                const { type } = part;
                const key = `message-${message.id}-part-${index}`;

                if (type === 'reasoning') {
                    return (
                        <MessageReasoning
                            key={key}
                            isLoading={isLoading}
                            reasoning={part.reasoning}
                        />
                    );
                }

                if (type === 'text') {
                    return <div key={message.id} className={cx('flex flex-col gap-4  p-3 rounded-xl ', { ' border bg-[#242424] border-panel-gray-main': message.role === 'user' })}>
                        <Markdown>{part.text}</Markdown>
                    </div>
                }

                if (type === 'tool-invocation') {
                    const { toolInvocation } = part;
                    const { toolName, state } = toolInvocation;

                    if (state === 'call') {
                        const { args } = toolInvocation;
                        console.log('args', args);

                        return <>
                            {toolName === 'getWeather' ? (
                                <div>
                                    weather call
                                </div>
                            ) : toolName === 'getTasksSuggestions' ? (
                                <div>
                                    tasks call
                                </div>
                            ) : null}
                        </>
                    }
                    if (state === 'result') {
                        const { result } = toolInvocation;
                        return <>
                            {toolName === 'getWeather' ? (
                                <div>
                                    weather result {JSON.stringify(result)}
                                </div>
                            ) : toolName === 'getTasksSuggestions' ? (
                                <div>
                                    <div className=' bg-[#2e2e2e] p-3 rounded-xl'>
                                        <div className='flex flex-col gap-3'>
                                            <div className='font-medium'>Suggested tasks</div>
                                            <ol className='text-text-gray-main flex flex-col gap-3'>
                                                {result.map((task: TaskType, index: number) => (
                                                    <li key={task.id}>
                                                        <p className='font-medium text-white'>{task.name}</p>
                                                        <p>{task.description}</p>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                        <div className='flex p-3 justify-end'>
                                            <Button onClick={handleGetTasksSuggestions(result)}>Accept this suggestions</Button>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </>
                    }
                }
            })}
        </div>
    </div>
}

export const PreviewMessage = memo(
    PurePreviewMessage,
    (prevProps, nextProps) => {
        if (prevProps.isLoading !== nextProps.isLoading) return false;
        if (prevProps.message.id !== nextProps.message.id) return false;
        if (!equal(prevProps.message.parts, nextProps.message.parts)) return false;

        return true;
    },
);


export const ThinkingMessage = () => {
    const role = 'assistant';

    return (
        <div
            className="w-full mx-auto max-w-3xl px-4"
            data-role={role}
        >
            <div
                className={'flex gap-4 group-data-[role=user]/message:px-3 w-full group-data-[role=user]/message:w-fit group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:py-2 rounded-xl'}
            >
                <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border">
                    loading...
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <div className="flex flex-col gap-4 text-muted-foreground">
                        Hmm...
                    </div>
                </div>
            </div>
        </div>
    );
};
