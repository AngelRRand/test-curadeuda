"use client"
import {useSidebar} from "@/components/ui/sidebar"
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";

export function CustomToggleSidebar() {
	const {toggleSidebar} = useSidebar();
	return (
		<Button
			onClick={toggleSidebar}
			className="lg:hidden w-12 h-12"
		>
			<Menu className="h-12 w-12 text-white"/>
		</Button>
	)
}