import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAIDiscussionStore = create((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,
  currentProblemId: null,

  sendMessage: async (problemId, message, selectedLanguage) => {
    try {
      set({ isLoading: true, error: null });
      const { messages } = get();
      const response = await axiosInstance.post('/ai/discuss', {
        problemId,
        message,
        language: selectedLanguage,
        history: messages,
      });
      const data = response.data;
      set((state) => ({
        messages: [
          ...state.messages,
          { role: "user", content: message, timestamp: new Date() },
          { role: "assistant", content: data.response, timestamp: new Date() }
        ],
        isLoading: false,
        error: null,
        currentProblemId: problemId
      }));
    } catch (error) {
      console.error('Error:', error);
      let errorMsg = 'Sorry, I encountered an error. Please try again.';
      
      if (error.response) {
        switch (error.response.status) {
          case 503:
            errorMsg = 'The AI is currently busy or overloaded. Please try again in a moment.';
            break;
          case 429:
            errorMsg = 'Too many requests. Please wait a moment before trying again.';
            break;
          case 404:
            errorMsg = 'Problem not found. Please refresh the page and try again.';
            break;
          default:
            errorMsg = error.response.data?.error || errorMsg;
        }
      }
      
      set({ error: errorMsg, isLoading: false });
      toast.error(errorMsg);
    }
  },

  addUserMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, { role: 'user', content: message }]
    }));
  },

  clearMessages: () => {
    set({ messages: [], error: null, currentProblemId: null });
  },

  setError: (error) => {
    set({ error });
  }
})); 