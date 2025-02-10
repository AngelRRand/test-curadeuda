import {create} from "zustand";
import useUserSlice from "@/store/user";
import {userState} from "@/store/user/type";
import useAppSlice from "@/store/app";
import {appState} from "@/store/app/type";
import useGallerySlice from "@/store/gallery";
import {galleryState} from "@/store/gallery/type";
import {devtools, persist} from "zustand/middleware";

const useStore = create<userState & appState & galleryState>()(
	devtools(
		persist(
			(set, get, api) => ({
				...useUserSlice(set, get, api),
				...useAppSlice(set, get, api),
				...useGallerySlice(set, get, api),
			}),
			{name: "storage"}
		)
	)
);

export default useStore;