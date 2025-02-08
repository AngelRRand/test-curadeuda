"use client"
import {SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar} from "@/components/ui/sidebar"
import Link from "next/link";
import {LogIn, Moon} from "lucide-react";
import {useEffect, useState} from "react";

export function AppSidebarFooter() {

	const [isDark, setIsDark] = useState(false);
	const {open} = useSidebar();

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");

		if (savedTheme) {
			setIsDark(savedTheme === "dark");
			document.documentElement.classList.toggle("dark", savedTheme === "dark");
		} else {
			const darkModePreference = window.matchMedia(
				"(prefers-color-scheme: dark)",
			);
			setIsDark(darkModePreference.matches);
			document.documentElement.classList.toggle(
				"dark",
				darkModePreference.matches,
			);
			localStorage.setItem(
				"theme",
				darkModePreference.matches ? "dark" : "light",
			);
		}
	}, []);

	const toggleDark = (checked: boolean) => {
		setIsDark(checked);
		document.documentElement.classList.toggle("dark", checked);
		localStorage.setItem("theme", checked ? "dark" : "light");
	};


	return (
		<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton
						asChild
					>
						<div className={"cursor-pointer"} onClick={() => toggleDark(!isDark)}>
							<Moon/>
							Darkmode
						</div>
					</SidebarMenuButton>
				</SidebarMenuItem>
				<SidebarMenuItem>
					<SidebarMenuButton
						asChild
					>
						<Link href={`/login`}>
							<LogIn/>
							Login
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	)
}
