import { create } from "zustand";

export interface Message {
    role: 'user' | 'assistant'
    content: string
}

interface ChatHistory {
    messages: Message[]
    addMessage: (message: Message) => void
    clearHistory: () => void
}

export const useChatStore = create<ChatHistory>((set) => ({
    messages: [],
    addMessage: (message: Message) => {
        set((state) => ({ messages: [...state.messages, message] }))
    },
    clearHistory: () => set({ messages: [] })
}))