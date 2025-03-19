import { useInterfaceStore } from "@/app/store/interface.store";

export default function TaskManagerExpandButton() {
    const { isTaskManagerExpanded, updateTaskManagerExpanded } = useInterfaceStore();

    const handleSwitch = () => {
        updateTaskManagerExpanded(!isTaskManagerExpanded);
    }

    return <button className="h-[90svh] px-2 hover:opacity-40" onClick={handleSwitch}>
        {isTaskManagerExpanded ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>}
    </button>
}