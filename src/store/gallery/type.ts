import {Image} from "@/store/user/type";

export interface galleryState {
	data: User[] | null;
	getData: () => void;
}


export interface User {
	id: number;
	name: string;
	email: string;
	password: string;
	photo: string;
	images: Image[];
}