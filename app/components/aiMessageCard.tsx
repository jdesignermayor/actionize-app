import { Card, CardContent } from "@/components/ui/card";
import Markdown from 'react-markdown'


export default function AIMessageCard({ text }: { text: string }) {
    return <>
        <Card className="bg-[#1b1b1b]">
            <CardContent className="flex items-center p-4 gap-2 ">
                <div>
                    <Markdown>{text}</Markdown>
                </div>
            </CardContent>
        </Card>
    </>

}