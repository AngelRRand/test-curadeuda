import type {Metadata} from "next";
import {Geist_Mono, M_PLUS_2} from "next/font/google";
import "./globals.css";
import {SidebarProvider} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/app-sidebar/app-sidebar"
import {Header} from "@/components/core/header";
import {Footer} from "@/components/core/footer";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Toaster} from "@/components/ui/toaster"

const plus2Sans = M_PLUS_2({
	variable: "--font-m-plus2",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
									   children,
								   }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
		<body>
		<SidebarProvider>
			<AppSidebar/>
			<ScrollArea className={"flex flex-col w-full h-dvh "}>
				<Header/>
				<main
					className={`${plus2Sans.variable} ${geistMono.variable} antialiased`}
				>
					{children}
					<Toaster/>
				</main>
				<Footer/>
			</ScrollArea>

		</SidebarProvider>
		</body>
		</html>
	);
}
