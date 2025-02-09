export interface userState {
	user: User | null;
	login: (email: string, password: string) => void;
	logout: () => void;
	register: (email: string, password: string) => void;
	getStatesUserLocalStorage: () => void;
}

export interface Image {
	url: string;
	description: string;
	date: string;
}

export interface User {
	id: number;
	name: string;
	email: string;
	password: string;
	photo: string;
	images: Image[];
}