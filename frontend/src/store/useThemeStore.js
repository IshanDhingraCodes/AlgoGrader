import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: "black",
  setTheme: (newTheme) => {
    set({ theme: newTheme });
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  },
  initializeTheme: () => {
    const storedTheme = localStorage.getItem("theme") || "black";
    set({ theme: storedTheme });
    document.documentElement.setAttribute("data-theme", storedTheme);
  },
}));
