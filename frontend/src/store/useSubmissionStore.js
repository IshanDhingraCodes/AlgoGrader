import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useSubmissionStore = create((set, get) => ({
  isLoading: false,
  submissions: [],
  submission: null,
  submissionCounts: new Map(),

  getAllSubmissions: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/submission/get-all-submissions");
      set({ submissions: res.data.data });
    } catch (error) {
      console.log("Error getting all submissions", error);
      toast.error("Error getting all submissions");
    } finally {
      set({ isLoading: false });
    }
  },

  getSubmissionForProblem: async (problemId) => {
    try {
      const res = await axiosInstance.get(
        `/submission/get-submissions/${problemId}`
      );
      set({ submission: res.data.data });
    } catch (error) {
      console.log("Error getting submissions for problem", error);
      toast.error("Error getting submissions for problem");
    }
  },

  getSubmissionCountForProblem: async (problemId) => {
    try {
      const res = await axiosInstance.get(
        `/submission/get-submissions-count/${problemId}`
      );
      set((state) => {
        const newCounts = new Map(state.submissionCounts);
        newCounts.set(problemId, res.data.data.count);
        return { submissionCounts: newCounts };
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        set((state) => {
          const newCounts = new Map(state.submissionCounts);
          newCounts.set(problemId, 0);
          return { submissionCounts: newCounts };
        });
      } else {
        console.log("Error getting submission count for problem", error);
        toast.error("Error getting submission count for problem");
      }
    }
  },

  getCountForProblem: (problemId) => {
    return get().submissionCounts.get(problemId) || 0;
  },
}));
