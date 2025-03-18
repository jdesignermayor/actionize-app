import { ThinkingMessage } from "@/app/components/message";
import { useScrollToBottom } from "@/app/components/use-scroll-bottom";
import { UseChatHelpers } from "@ai-sdk/react";
import { UIMessage } from "ai";
import equal from 'fast-deep-equal';
import { memo } from "react";

interface MessagesProps {
    status: UseChatHelpers['status'];
    messages: Array<UIMessage>;
    setMessages: UseChatHelpers['setMessages'];
    reload: UseChatHelpers['reload'];
    isReadonly: boolean;
}

function PureMessages({
    status,
    messages,
    setMessages,
    reload,
    isReadonly,
}: MessagesProps) {
    const [messagesContainerRef, messagesEndRef] =
        useScrollToBottom<HTMLDivElement>();

    return (
        <div
            ref={messagesContainerRef}
            className={`flex flex-col min-w-0 gap-6 h-full  pt-4 ${isReadonly && ' hidden '} `}
        >
            {/* {messages.length === 0 && <Overview />} */}

            {messages.map((message, index) => (

                <>
                    {message.content}
                </>
                // <PreviewMessage
                //     key={message.id}
                //     chatId={chatId}
                //     message={message}
                //     isLoading={status === 'streaming' && messages.length - 1 === index}
                //     setMessages={setMessages}
                //     reload={reload}
                //     isReadonly={isReadonly}
                // />
            ))}

            {status === 'submitted' &&
                messages.length > 0 &&
                messages[messages.length - 1].role === 'user' && <ThinkingMessage />}

            <div
                ref={messagesEndRef}
                className="shrink-0 min-w-[24px] min-h-[24px]"
            />
        </div>
    );
}

export const Messages = memo(PureMessages, (prevProps, nextProps) => {
    // if (prevProps.isArtifactVisible && nextProps.isArtifactVisible) return true;
    if (prevProps.status !== nextProps.status) return false;
    if (prevProps.status && nextProps.status) return false;
    if (prevProps.messages.length !== nextProps.messages.length) return false;
    if (!equal(prevProps.messages, nextProps.messages)) return false;

    return true;
});