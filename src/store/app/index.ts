import {StateCreator} from "zustand";
import {appState} from "@/store/app/type";

const useAppSlice: StateCreator<appState> = (set) => ({
	// States
	darkMode: false,
	theme: "light",

	setDarkMode: async (darkMode: boolean) => {
		set({
			darkMode: darkMode,
			theme: darkMode ? "dark" : "light"
		})
		localStorage.setItem("darkMode", JSON.stringify(darkMode));
		localStorage.setItem("theme", darkMode ? "dark" : "light");

	},
	getStatesAppLocalStorage: () => {
		const darkModeData = localStorage.getItem("darkMode");
		const themeData = localStorage.getItem("theme");
		if (darkModeData) {
			set({
				darkMode: darkModeData,
			});
		}
		if (themeData) {
			set({
				theme: themeData,
			});
		}
	},

});

export default useAppSlice;