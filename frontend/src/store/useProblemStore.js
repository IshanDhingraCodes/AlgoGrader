import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProblemStore = create((set) => ({
  problems: [],
  problem: null,
  solvedProblems: [],
  isProblemsLoading: false,
  isProblemLoading: false,
  isCreatingProblem: false,
  isUpdatingProblem: false,

  createProblem: async (data) => {
    set({ isCreatingProblem: true });
    try {
      const res = await axiosInstance.post("/problems/create-problem", data);
      toast.success(res.data.message || "Problem Created successfully⚡");
    } catch (error) {
      console.log("Error creating problem:", error);
      toast.error("Error creating problem Or Recheck Code. ");
    } finally {
      set({ isCreatingProblem: false });
    }
  },

  getAllProblems: async () => {
    try {
      set({ isProblemsLoading: true });
      const res = await axiosInstance.get("/problems/get-all-problems");
      set({ problems: res.data.data });
    } catch (error) {
      console.log("Error getting all problems", error);
      toast.error("Error in getting problems");
    } finally {
      set({ isProblemsLoading: false });
    }
  },

  getProblemById: async (id) => {
    try {
      set({ isProblemLoading: true });
      const res = await axiosInstance.get(`/problems/get-problem/${id}`);
      set({ problem: res.data.data });
    } catch (error) {
      console.log("Error getting problem", error);
      toast.error("Error in getting problem.");
    } finally {
      set({ isProblemLoading: false });
    }
  },

  updateProblem: async (id, data) => {
    set({ isUpdatingProblem: true });
    try {
      const res = await axiosInstance.put(
        `/problems/update-problem/${id}`,
        data
      );
      toast.success(res.data.message || "Problem Updated successfully⚡");
    } catch (error) {
      console.log("Error updating problem:", error);
      toast.error("Error updating problem.");
    } finally {
      set({ isUpdatingProblem: false });
    }
  },

  getSolvedProblemByUser: async () => {
    try {
      const res = await axiosInstance.get("/problems/get-solved-problems");
      set({ solvedProblems: res.data.data });
    } catch (error) {
      console.log("Error getting solved problems", error);
      toast.error("Error getting solved problems");
    }
  },
}));
