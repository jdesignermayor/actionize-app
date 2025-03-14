export default function IntroChatMessage() {
    return <>
        <div className="flex flex-col text-center gap-3 items-center pt-[calc(10%)]">
            <h1 className=" font-medium text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#F5F0FF] via-[#FFF4CE] via-[#FFFFFF] to-[#C5D4FF]">What's your plan for today?</h1>
            <article className="leading-relaxed text-center max-w-md text-sm">
                <p>We'll guide you through the process of setting up your goals, tracking your progress, and staying motivated to achieve them.</p>
            </article>
            <p>You can <span className="underline underline-offset-4 text-primary-main cursor-pointer">Set your priorities according </span>  to fine tune your results.</p>
        </div>
    </>
}