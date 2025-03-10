import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserMessageCard({ text }: { text: string }) {
    return <Card className=" bg-[#1b1b1b]">
        <CardContent className="flex items-center p-4 gap-2 ">
            <Avatar>
                <AvatarImage src="https://pbs.twimg.com/profile_images/1883736778974130176/h6vWOb-x_400x400.jpg" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>Me: {text}</p>
        </CardContent>
    </Card>
}