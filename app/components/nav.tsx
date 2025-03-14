import { Button } from "@/components/ui/button";

export default function Nav() {
  return (
    <div className="flex items-center justify-between h-[60px] py-6 lg:px-[calc(5%)]">
      <div>
        <p className="font-bold">Compass</p>
      </div>
      <div>
        <Button variant="default" >
          Join to the waitlist
        </Button>
      </div>
    </div>
  );
}