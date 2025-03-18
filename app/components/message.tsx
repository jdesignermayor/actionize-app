
export const ThinkingMessage = () => {
    const role = 'assistant';

    return (
        <div
            className="w-full mx-auto max-w-3xl px-4"
            data-role={role}
        >
            <div
                className={'flex gap-4 group-data-[role=user]/message:px-3 w-full group-data-[role=user]/message:w-fit group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:py-2 rounded-xl'}
            >
                <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border">
                    loading...
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <div className="flex flex-col gap-4 text-muted-foreground">
                        Hmm...
                    </div>
                </div>
            </div>
        </div>
    );
};
