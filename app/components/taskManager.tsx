import TaskGeneralButtons from "@/app/components/taskGeneralButtons";
import TaskList from "@/app/components/taskList";
import { MOCK_USER_TASKS } from "@/app/utils/mock-user-data";
import Link from "next/link";
import { useEffect, useState } from "react";

interface TaskManagerType {
    isTaskManagerExpanded: boolean,
}

export default function TaskManager({ isTaskManagerExpanded }: TaskManagerType) {
    const [tasks, setTasks] = useState<Task[] | []>([]);

    useEffect(() => {
        setTimeout(() => {
            setTasks(MOCK_USER_TASKS.tasks);
        }, 1000);
    }, [isTaskManagerExpanded]);

    return <>
        <div className={`flex flex-col gap-[2em] px-10 py-[5em] ${isTaskManagerExpanded ? 'w-[90rem]' : 'w-[70rem]'} bg-[#131313] border border-[#444444] rounded-lg h-[90svh]`}>
            <div className="flex flex-col gap-2">
                <h3 className="font-medium text-xl">Our today's tasks</h3>
                <p className="text-md text-gray-main max-w-[400px]">
                    All the plan is prioritized by user preferences, you can change your preferences anytime!
                </p>
                <Link href="/settings" className="text-primary pt-4">
                    Click here to update your preferences
                </Link>
            </div>
            <div className="flex flex-col overflow-y-auto items-start relative">
                <TaskList tasks={tasks} rates={MOCK_USER_TASKS.rates} />
            </div>
            <div className="flex flex-col gap-3 w-full">
                <TaskGeneralButtons />
            </div>
        </div>
    </>
}