import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/components/ui/sidebar"
import Link from "next/link";
import {Camera, Home} from "lucide-react";
import {AppSidebarFooter} from "@/components/app-sidebar/app-sidebarfooter";
import {AppSidebarHeader} from "@/components/app-sidebar/app-sidebarheader";

export function AppSidebar() {
	return (
		<Sidebar collapsible="icon" className="group">
			<AppSidebarHeader/>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
								>
									<Link href={`/`}>
										<Home/>
										Home
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
								>
									<Link href={`/gallery`}>
										<Camera/>
										Gallery
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

			</SidebarContent>
			<AppSidebarFooter/>
		</Sidebar>
	)
}
