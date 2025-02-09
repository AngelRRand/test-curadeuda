"use client"
import {SidebarHeader, SidebarMenu, SidebarMenuItem} from "@/components/ui/sidebar"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import useStore from "@/store";

export function AppSidebarHeader() {
	const {
		user,
	} = useStore((state) => state);

	if (!user) {
		return (
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<div className="flex items-center">
							<div className="h-8 w-8 rounded-full bg-accent"/>
							<div
								className="text-end text-sm ml-2 transition-all group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0">
								<span>Invitado</span>
							</div>
						</div>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
		)
	}

	return (
		<SidebarHeader>
			<SidebarMenu>
				<SidebarMenuItem>
					<Link href={`user/${user.email}`} className="flex items-center">
						<Avatar className="h-8 w-8">
							<AvatarImage src={user.photo} alt={user.name}/>
							<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
						</Avatar>
						<div
							className="flex flex-col truncate ml-2 transition-all group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0">
                            <span className="text-sm">
                                {user.name}
                            </span>
							<small className="text-xs">
								{user.email}
							</small>
						</div>
					</Link>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>
	)
}