import { create } from "zustand";
import { TaskType } from "../models/taks.model";

interface tasksManagerStore {
    tasks: Array<TaskType>;
    setTasks: (taks: Array<TaskType>) => void,
}

const initialState: tasksManagerStore = {
    tasks: [],
    setTasks: () => { },
}

export const useTaskManagerStore = create<tasksManagerStore>()((set) => ({
    ...initialState,
    setTasks: (tasks: Array<TaskType>) => set({ tasks }),
}));