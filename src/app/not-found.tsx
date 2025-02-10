"use client";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";

export default function NotFound() {
	const router = useRouter();

	return (
		<main className={"h-screen w-full flex justify-center items-center"}>
			<div className={"flex flex-col"}>
				<h1 className={"text-4xl text-center font-extrabold"}>Not found</h1>
				<span className={"text-sm my-2"}>Sorry, the page you are looking for does not exist.</span>
				<Button className={"text-sm"} onClick={() => router.replace("/")}>Go to home</Button>
			</div>
		</main>
	);
}
