import Chatbot from "@/app/components/chatbot";
import TaskManager from "@/app/components/taskManager";

export default function Layout() {
    return <>
        <div className="flex flex-wrap items-center justify-center px-[3em]">
            <div className="w-2/4">

                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col gap-3 items-center pt-[25vh] py-5">
                        <h1 className=" font-medium text-4xl">What's your plan for Today?</h1>
                        <p className=" font-medium text-md text-gray-main">Your AI Assistant, for Life-Work <span className="text-white">Balance</span></p>
                    </div>
                </div>


                <Chatbot />
            </div>
            <div className="w-2/4">
                <TaskManager />
            </div>
        </div>
    </>
}