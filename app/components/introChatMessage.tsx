export default function IntroChatMessage() {
    return <>
        <div className="flex flex-col text-center gap-3 items-center pt-[calc(25%)]">
            <h1 className=" font-medium text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#F5F0FF] via-[#FFF4CE] via-[#FFFFFF] to-[#C5D4FF]">What's your plan for today?</h1>
            <article className="leading-relaxed text-center max-w-md text-sm">
                <p>Welcome to the Compass app, your AI Assistant, for Life-Work Balance, We'll guide you through the process of setting up your goals, tracking your progress, and staying motivated to achieve them.</p>
                <p>Let's get started!</p>
            </article>
        </div>
    </>
}