import {StateCreator} from "zustand";
import {galleryState} from "@/store/gallery/type";

const useGallerySlice: StateCreator<galleryState> = (set) => ({
	// States
	data: null,

	getData: async () => {
		try {
			const response = await fetch("/api/users", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			})

			const data = await response.json()
			set({data: data});
		} catch (error) {
			throw new Error("Error login");
		}
	},

});

export default useGallerySlice;