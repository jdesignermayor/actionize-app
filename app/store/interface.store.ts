import { create } from "zustand";

interface InterfaceStore {
    isExpandedTaskManager: boolean,
    isIntroEnabled: boolean,
    isEditionTaskEnabled: boolean,
    updateTaskManagerExpanded: (isExpandedTaskManager: boolean) => void,
    updateIntroEnabled: (isIntroEnabled: boolean) => void,
}

const initialState: InterfaceStore = {
    isExpandedTaskManager: false,
    isIntroEnabled: true,
    isEditionTaskEnabled: false,
    updateTaskManagerExpanded: () => { },
    updateIntroEnabled: () => { },
}

export const useInterfaceStore = create<InterfaceStore>()((set) => ({
    ...initialState,
    updateTaskManagerExpanded: (isExpandedTaskManager: boolean) => set({ isExpandedTaskManager }),
    updateIntroEnabled: (isIntroEnabled: boolean) => set({ isIntroEnabled }),
}));