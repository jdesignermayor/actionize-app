import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserMessageCard({ message }: { message: string }) {
    return <Card className=" bg-[#1b1b1b]">
        <CardContent className="flex items-center p-4 gap-2 ">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>Me: {message}</p>
        </CardContent>
    </Card>
}