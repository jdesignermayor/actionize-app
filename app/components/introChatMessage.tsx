export default function IntroChatMessage() {
    return <>
        <div className="flex flex-col text-center gap-3 items-center pt-[calc(10%)]">
            <h1 className="text-4xl lg:text-6xl leading-tight bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#fff5d6] via-[#fff8df] via-[#ffe8e8] to-[#ffffff]">What do you plan <br /> to get done today?</h1>
            {/* <article className="leading-relaxed text-center max-w-md text-sm">
                <p>We'll guide you through the process of setting up your goals, tracking your progress, and staying motivated to achieve them.</p>
            </article>
            <p>You can <span className="underline underline-offset-4 text-primary-main cursor-pointer">Set your priorities according </span>  to fine tune your results.</p> */}
        </div>
    </>
}