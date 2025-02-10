import {StateCreator} from "zustand";
import {galleryState} from "@/store/gallery/type";

const useGallerySlice: StateCreator<galleryState> = (set) => ({
	// States
	data: null,

	setData: (newdata) => {
		set({data: newdata});
	},
	getData: async () => {
		try {
			const response = await fetch("/api/users", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			})

			const data = await response.json()
			if (!response.ok) {
				throw new Error(data.error);
			}
			set({data: data});
			localStorage.setItem("data", JSON.stringify(data));
		} catch (error) {
			throw new Error(error);
		}
	},
	getStatesDataLocalStorage: () => {
		const data = localStorage.getItem("data");
		if (data) {
			set({
				data: JSON.parse(data),
			});
		}
	},

});

export default useGallerySlice;