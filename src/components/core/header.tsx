import React from "react";
import {CustomToggleSidebar} from "@/components/app-sidebar/custom-toggleSidebar";
import {Logo} from "@/components/core/logo";

export function Header() {
	return (
		<header className={"flex  w-full h-auto p-6 lg:p-4"}>
			<div className={"fixed"}>
				<CustomToggleSidebar/>
			</div>
			<div className={"fixed right-2"}>
				<Logo/>
			</div>

		</header>

	);
}