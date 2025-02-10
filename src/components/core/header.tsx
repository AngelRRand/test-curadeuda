import React from "react";
import {CustomToggleSidebar} from "@/components/app-sidebar/custom-toggleSidebar";
import {Logo} from "@/components/core/logo";

export function Header() {


	return (
		<header className={"flex w-full h-auto p-6 lg:p-4"}>
			<div className={"fixed z-30"}>
				<CustomToggleSidebar/>
			</div>
			<div className={"fixed z-30 right-2"}>
				<Logo/>
			</div>

		</header>

	);
}