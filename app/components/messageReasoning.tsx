'use client';

import { ChevronDownIcon, LoaderIcon } from 'lucide-react';
import { useState } from 'react';
import Markdown from 'react-markdown';

interface MessageReasoningProps {
    isLoading: boolean;
    reasoning: string;
}

export function MessageReasoning({
    isLoading,
    reasoning,
}: MessageReasoningProps) {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="flex flex-col">
            {isLoading ? (
                <div className="flex flex-row gap-2 items-center">
                    <div className="font-medium">Reasoning</div>
                    <div className="animate-spin">
                        <LoaderIcon />
                    </div>
                </div>
            ) : (
                <div className="flex flex-row gap-2 items-center">
                    <div className="font-medium">Reasoned for a few seconds</div>
                    <button
                        data-testid="message-reasoning-toggle"
                        type="button"
                        className="cursor-pointer"
                        onClick={() => {
                            setIsExpanded(!isExpanded);
                        }}
                    >
                        <ChevronDownIcon />
                    </button>
                </div>
            )}

            <div>
                {isExpanded && (
                    <div
                        data-testid="message-reasoning"
                        key="content"
                        style={{ overflow: 'hidden' }}
                        className="pl-4 text-zinc-600 dark:text-zinc-400 border-l flex flex-col gap-4"
                    >
                        <Markdown>{reasoning}</Markdown>
                    </div>
                )}
            </div>
        </div>
    );
}
