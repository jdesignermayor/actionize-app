import TaskList from "@/app/components/taskList";
import { MOCK_USER_TASKS } from "@/app/utils/mock-user-data";
import Link from "next/link";

export default function TaskManager() {
    return <>
        <div className="flex flex-col gap-[6em] px-10 py-28 bg-[#212121] rounded-lg w-full h-[90svh]">
            <div className="flex flex-col gap-2">
                <h3 className=" font-medium text-xl">Our today's tasks</h3>
                <p className="text-md text-gray-main max-w-[400px]">
                    All the plan is prioritized by user preferences, you can change your preferences anytime!
                </p>
                <Link href="/settings" className="text-primary pt-4">
                    Click here to update your preferences
                </Link>
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto items-start">
                <TaskList tasks={MOCK_USER_TASKS.tasks} rates={MOCK_USER_TASKS.rates} />
            </div>
        </div>
    </>
}