"use client"
import React, {useEffect, useState} from "react";
import useStore from "@/store";
import {useToast} from "@/hooks/use-toast";

export function Provider({children}) {

	const [loading, setLoading] = useState(true)
	const {
		getStatesUserLocalStorage,
		getStatesAppLocalStorage,
		getData,
	} = useStore((state) => state);
	const {toast} = useToast();


	const getStates = async () => {
		await getStatesUserLocalStorage()
		await getStatesAppLocalStorage()
		try {
			await getData()
		} catch (error) {
			toast({
				title: "Error",
				description: error instanceof Error ? error.message : "Error get data users.",
				variant: "destructive",
			});
		}
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