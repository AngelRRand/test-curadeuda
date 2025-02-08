import {SidebarHeader, SidebarMenu, SidebarMenuItem} from "@/components/ui/sidebar"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";

export function AppSidebarHeader() {
	return (
		<SidebarHeader>
			<SidebarMenu>
				<SidebarMenuItem>
					<Link href={""} className="flex items-center">
						<Avatar className="h-8 w-8">
							<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div
							className="truncate ml-2 transition-all group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0">
							<span className="text-sm">
             			 		User
            				</span>
						</div>
					</Link>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>
	)
}