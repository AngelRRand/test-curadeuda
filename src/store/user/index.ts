import {StateCreator} from "zustand";
import {GalleryImageData, UserChanges, UserPhotoData, userState} from "@/store/user/type";

const useUserSlice: StateCreator<userState> = (set) => ({
	// States
	user: null,
	login: async (email: string, password: string) => {
		try {
			const response = await fetch("/api/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email.toLowerCase(),
					password: password,
				}),
			})


			const data = await response.json()
			if (!response.ok) {
				throw new Error(data.error);
			}
			localStorage.setItem("user", JSON.stringify(data));
			set({user: data});
			return data
		} catch (error) {
			throw new Error(error);
		}
	},
	logout: async () => {
		localStorage.removeItem("user");
		set({user: null});

	},
	register: async (email: string, password: string, datalength: number) => {
		try {
			let response = await fetch("/api/users/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
					name: `User${datalength + 1}`,
				}),
			});
			const data = await response.json()
			if (!response.ok) {
				throw new Error(data.error);
			}
			localStorage.setItem("user", JSON.stringify(data));
			set({user: data});
		} catch (error) {
			throw new Error(error);
		}
	},
	fixedUser: async (id: string, changes: UserChanges | UserPhotoData | GalleryImageData, image: boolean) => {
		try {

			let response
			if (!image) {
				response = await fetch(`/api/users/${id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(changes)
				})
			} else {
				response = await fetch(`/api/users/upload`, {
					method: "POST",
					body: changes,
				});
			}

			let data = await response.json()
			if (!response.ok) {
				throw new Error(data.error);
			}
			let user = data.find(u => u.id === id)
			localStorage.setItem("user", JSON.stringify(user))
			set({user});
			return data
		} catch (error) {
			throw new Error(error);
		}
	},

	getStatesUserLocalStorage: () => {
		const userData = localStorage.getItem("user");

		if (userData) {
			set({
				user: JSON.parse(userData),
			});
		}
	},

});

export default useUserSlice;