import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useExecutionStore = create((set) => ({
  isExecuting: false,
  isRunning: false,
  submission: null,
  runResult: null,

  executeCode: async (
    source_code,
    language_id,
    stdin,
    expected_outputs,
    problemId
  ) => {
    try {
      set({ isExecuting: true });
      const res = await axiosInstance.post("/execute-code", {
        source_code,
        language_id,
        stdin,
        expected_outputs,
        problemId,
      });

      // console.log(res.data.data);

      set({ submission: res.data.data.submission });

      toast.success(res.data.message);
    } catch (error) {
      console.log("Error executing code", error);
      toast.error("Error executing code");
    } finally {
      set({ isExecuting: false });
    }
  },

  runcode: async (source_code, language_id, stdin, expected_outputs) => {
    try {
      set({ isRunning: true });
      const res = await axiosInstance.post("/execute-code/run-code", {
        source_code,
        language_id,
        stdin,
        expected_outputs,
      });

      // console.log(res.data.data);

      set({ runResult: res.data.data.submission });
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error running ephemeral code", error);
      toast.error("Error running code");
    } finally {
      set({ isRunning: false });
    }
  },

  resetExecution: () => {
    set({ submission: null, runResult: null });
  },
}));
