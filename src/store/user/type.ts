export interface userState {
	user: User | null;
	login: (email: string, password: string) => Promise<User>;
	logout: () => void;
	register: (email: string, password: string, datalength: number) => void;
	fixedUser: (id: string, changes: UserChanges | UserPhotoData | GalleryImageData, image: boolean) => Promise<User[]>;
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

export interface UserChanges {
	id: string;
	name?: string;
	email?: string;
	password?: string;
}

export interface UserPhotoData {
	userId: string
	photo: string
}

export interface GalleryImageData {
	userId: string
	url: string
	description: string
	date: string
}
