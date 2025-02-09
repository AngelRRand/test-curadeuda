export interface UserImage {
	url: string;
	description: string;
	date: string;
}

export interface NewUser {
	name: string;
	email: string;
	password: string;
	photo: string;
	images: UserImage[];
}

export interface User extends NewUser {
	id: number;
}

export interface UsersData {
	users: User[];
}
