import { create } from "zustand";

export const useThemeStore = create((set) => ({
	font: "Poppins",
	background: "plain",
	changeFont: (font) => set(() => ({ font: font })),
	changeBackground: (background) => set(() => ({ background: background })),
}));
