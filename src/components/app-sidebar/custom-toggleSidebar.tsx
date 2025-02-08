"use client"
import {useSidebar} from "@/components/ui/sidebar"
import {Button} from "@/components/ui/button";
import * as React from "react";
import {PanelLeft} from "lucide-react";

export function CustomToggleSidebar() {
	const {toggleSidebar} = useSidebar();
	return (
		<Button
			onClick={toggleSidebar}
			className="w-10 h-10"
		>
			<PanelLeft className="text-white"/>
		</Button>
	)
}