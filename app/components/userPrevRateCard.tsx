import { Card, CardContent } from "@/components/ui/card";

export default function UserPrevRateCard({ props }: { props: any }) {
    return <Card className=" bg-[#1b1b1b]">
    <CardContent className="flex items-center p-4 gap-2 ">
        {JSON.stringify(props)}
    </CardContent>
</Card>
}