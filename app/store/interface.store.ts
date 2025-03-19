import { create } from "zustand";

export type UIChatbotMode = 'intro' | 'chating' | 'error';

interface InterfaceStore {
    chatbotMode: UIChatbotMode,
    isTaskManagerExpanded: boolean,
    isTaskManagerEnabled: boolean,
    isEditionTaskEnabled: boolean,
    updateTaskManagerExpanded: (isTaskManagerExpanded: boolean) => void,
    updateChatMode: (chatbotMode: UIChatbotMode) => void,
    updateTaskManagerEnabled: (isTaskManagerEnabled: boolean) => void,
}

const initialState: InterfaceStore = {
    chatbotMode: 'intro',
    isEditionTaskEnabled: false,
    isTaskManagerExpanded: false,
    isTaskManagerEnabled: false,
    updateTaskManagerExpanded: () => { },
    updateChatMode: () => { },
    updateTaskManagerEnabled: () => { },
}

export const useInterfaceStore = create<InterfaceStore>()((set) => ({
    ...initialState,
    updateTaskManagerExpanded: (isTaskManagerExpanded: boolean) => set({ isTaskManagerExpanded }),
    updateChatMode: (chatbotMode: UIChatbotMode) => set({ chatbotMode }),
    updateTaskManagerEnabled: (isTaskManagerEnabled: boolean) => set({ isTaskManagerEnabled }),
}));