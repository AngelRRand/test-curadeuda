"use client"
import {SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar"
import Link from "next/link";
import {LogIn, LogOut, Moon} from "lucide-react";
import {useEffect} from "react";
import useStore from "@/store";
import {useRouter} from "next/navigation";

export function AppSidebarFooter() {

	const {
		user,
		logout,
		darkMode,
		theme,
		setDarkMode
	} = useStore((state) => state);
	const router = useRouter()

	useEffect(() => {
		const savedTheme = theme;

		if (savedTheme) {
			setDarkMode(savedTheme === "dark");
			document.documentElement.classList.toggle("dark", savedTheme === "dark");
		} else {
			const darkModePreference = window.matchMedia(
				"(prefers-color-scheme: dark)",
			);
			setDarkMode(darkModePreference.matches);
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
		setDarkMode(checked);
		document.documentElement.classList.toggle("dark", checked);
	};


	return (
		<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton
						asChild
					>
						<div className={"cursor-pointer"} onClick={() => toggleDark(!darkMode)}>
							<Moon/>
							Darkmode
						</div>
					</SidebarMenuButton>
				</SidebarMenuItem>
				<SidebarMenuItem>
					{
						!user ? (
							<SidebarMenuButton
								asChild
							>
								<Link href={`/login`}>
									<LogIn/>
									Login
								</Link>
							</SidebarMenuButton>
						) : (
							<SidebarMenuButton
								asChild
							>
								<div className={"cursor-pointer"} onClick={() => {
									logout()
									router.replace("/")
								}}>
									<LogOut/>
									Log out
								</div>
							</SidebarMenuButton>
						)
					}

				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	)
}
