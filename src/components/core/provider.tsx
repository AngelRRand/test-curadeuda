"use client"
import React, {useEffect, useState} from "react";
import useStore from "@/store";

export function Provider({children}) {

	const [loading, setLoading] = useState(true)
	const {
		getStatesUserLocalStorage,
		getStatesAppLocalStorage,
		getData

	} = useStore((state) => state);


	const getStates = async () => {
		await getStatesUserLocalStorage()
		await getStatesAppLocalStorage()
		await getData()
		setLoading(false)
	}


	useEffect(() => {
		getStates()
	}, []);


	if (loading) return null

	return (
		<>
			{children}
		</>
	);
}