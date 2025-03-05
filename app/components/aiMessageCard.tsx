import { Card, CardContent } from "@/components/ui/card";
import Markdown from 'react-markdown'


export default function AIMessageCard({ message }: { message: any }) {
    return <>
        <Card className="bg-[#1b1b1b]">
            <CardContent className="flex items-center p-4 gap-2 ">
                {message.parts.map((part: any, index: number) => {
                    // text parts:
                    if (part.type === 'text') {
                        return <div key={index}><Markdown>{part.text}</Markdown></div>;
                    }

                    if (part.type === 'reasoning') {
                        return (
                            <pre key={index}>
                                {part.details.map((detail: any) =>
                                    detail.type === 'text' ? detail.text : '<redacted>',
                                )}
                            </pre>
                        );
                    }
                })}
            </CardContent>
        </Card>

    </>

}