import TaskGeneralButtons from "@/app/components/taskGeneralButtons";
import TaskList from "@/app/components/taskList";
import { TaskType } from "@/app/models/taks.model";
import { MOCK_USER_TASKS } from "@/app/utils/mock-user-data";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function TaskManager() {
    const [tasks, setTasks] = useState<TaskType[] | []>([]);

    useEffect(() => {
        setTimeout(() => {
            setTasks(MOCK_USER_TASKS.tasks);
        }, 400);
    }, []);

    return <>
        <div className={`flex flex-col gap-[2em] px-10 py-[5em] bg-[#131313] border border-gray-main rounded-xl h-[90svh]`}>
            <div className="flex flex-col gap-2">
                <h3 className="font-medium text-xl">Our today's tasks</h3>
                <p className="text-md text-gray-main max-w-[400px] text-text-gray-main">
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