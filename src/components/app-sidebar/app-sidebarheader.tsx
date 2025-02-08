import {SidebarHeader, SidebarMenu, SidebarMenuItem} from "@/components/ui/sidebar"
import {Logo} from "@/components/core/logo";

export function AppSidebarHeader() {
	return (
		<SidebarHeader>
			<SidebarMenu className={"flex"}>
				<SidebarMenuItem
					className={"flex"}
				>
					<Logo/>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>
	)
}