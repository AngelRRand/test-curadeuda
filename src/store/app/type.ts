export interface appState {
	darkMode: boolean;
	theme: string;
	setDarkMode: (darkMode: boolean) => void
	getStatesAppLocalStorage: () => void
}
