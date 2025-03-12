import Task from "@/app/components/task";

export default function TaskList({ tasks, rates }: TaskList) {
    return <>
        <section className="flex flex-col gap-7 items-left w-full pt-[6em]">
            <div className="flex flex-col gap-3 items-left w-full">
                {tasks.map((task, index) => (
                    <Task key={index} {...task} />
                ))}
            </div>
        </section>
    </>
}