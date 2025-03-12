'use client';
import { useChat } from '@ai-sdk/react';

export default function Chatbot() {
    const { messages, input, status, stop, handleInputChange, handleSubmit } = useChat({
        sendExtraMessageFields: true,
    });

    return <>

        chat...
    </>
}