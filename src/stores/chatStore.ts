import { create } from "zustand";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatHistory {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  clearHistory: () => void;
}

export const useChatStore = create<ChatHistory>((set) => ({
  messages: [],
  addMessage: (message: ChatMessage) => {
    set((state) => ({ messages: [...state.messages, message] }));
  },
  clearHistory: () => set({ messages: [] }),
}));
