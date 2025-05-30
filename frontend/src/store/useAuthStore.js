import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigninUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  isSendingReset: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      // console.log("checkauth response", res.data);

      set({ authUser: res.data.data.user });
    } catch (error) {
      console.log("❌ Error checking auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      // console.log("signUp data:", data);
      set({ authUser: res.data.data.user });

      toast.success(res.data.message);
    } catch (error) {
      console.log("Error signing up", error);
      toast.error("Error signing up");
    } finally {
      set({ isSigninUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      // console.log("signin data: ", data);
      set({ authUser: res.data.data.user });

      toast.success(res.data.message);
    } catch (error) {
      console.log("Error logging in", error);
      toast.error("Error logging in");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });

      toast.success("Logout successful");
    } catch (error) {
      console.log("Error logging out", error);
      toast.error("Error logging out");
    }
  },

  forgotPassword: async (data) => {
    set({ isSendingReset: true });
    try {
      const res = await axiosInstance.post("/auth/forgotPassword", data);
      toast.success(res.data.message || "Please verify your email.");

      setTimeout(() => {
        window.location.href = "/sign-in";
      }, 3000);
    } catch (error) {
      console.log("Error finding user:", error);
      toast.error("forgotPassword failed");
    } finally {
      set({ isSendingReset: false });
    }
  },

  changePassword: async (data) => {
    set({ isSendingReset: true });
    try {
      const res = await axiosInstance.post(
        `/auth/change-password/${data.token}`,
        {
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        }
      );

      toast.success(res.data.message || "Password changed successfully");

      setTimeout(() => {
        window.location.href = "/sign-in";
      }, 1500);
    } catch (error) {
      error.response?.data?.message || "ChangePassword frontend failed";
    } finally {
      set({ isSendingReset: false });
    }
  },
}));
