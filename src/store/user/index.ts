import {StateCreator} from "zustand";
import {UserChanges, userState} from "@/store/user/type";

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
			localStorage.setItem("user", JSON.stringify(data));
			set({user: data});
			return data
		} catch (error) {
			throw new Error("Error login");
		}
	},
	logout: async () => {
		try {
			localStorage.removeItem("user");
			set({user: null});
		} catch (error) {
			throw new Error("Error login");
		}
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
			localStorage.setItem("user", JSON.stringify(data));
			set({user: data});
		} catch (error) {
			throw new Error("Error register");
		}
	},
	fixedUser: async (id: string, changes: UserChanges) => {
		try {
			const response = await fetch(`/api/users/user/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(changes)
			})

			let data = await response.json()

			let user = data.find(u => u.id === id)
			localStorage.setItem("user", JSON.stringify(user))
			set({user});
			return data
		} catch (error) {
			throw new Error("Error login");
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