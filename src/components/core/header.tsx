import React from "react";
import {CustomToggleSidebar} from "@/components/app-sidebar/custom-toggleSidebar";
import {Logo} from "@/components/core/logo";

export function Header() {
	return (
		<header className={"flex justify-between w-full h-auto p-6 lg:p-4"}>
			<CustomToggleSidebar/>
			<Logo/>
		</header>

	);
}