"use client"
import {Button} from "@/components/ui/button"
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card"
import Image from "next/image"
import Link from "next/link"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import useStore from "@/store";
import {Skeleton} from "@/components/ui/skeleton"

export default function Home() {

	const {
		data,
	} = useStore((state) => state);

	return (
		<div className="flex flex-col gap-10 w-full items-center min-h-dvh justify-center my-2">
			<section className="flex flex-col justify-center items-center gap-4 mt-4 w-2/3 lg:w-1/3">
				<h1 className="text-3xl font-extrabold">Welcome</h1>
				<span className="text-sm text-center">Register and become part of our gallery.</span>
				<Button className=" w-1/2">
					<Link href="/register" className="w-full">
						Register
					</Link>
				</Button>
			</section>
			<section className="flex flex-col justify-center items-center gap-4 mt-4 w-2/3 lg:w-1/3">
				<div className="grid grid-cols-3 gap-4 w-full">
					{!data ? (
						Array.from({length: 3}).map((_, index) => (
							<div key={index} className="space-y-4">
								<Skeleton className="aspect-square rounded-lg"/>
								<HoverCard>
									<HoverCardTrigger asChild>
										<div className="relative aspect-square rounded-lg overflow-hidden">
											<Skeleton className="h-full w-full"/>
										</div>
									</HoverCardTrigger>
									<HoverCardContent align="start" className="w-60">
										<div className="flex flex-col">
											<div className="flex space-x-4">
												<Skeleton className="h-10 w-10 rounded-full"/>
												<div className="space-y-2">
													<Skeleton className="h-4 w-20"/>
													<Skeleton className="h-4 w-24"/>
												</div>
											</div>
											<div className="flex flex-col gap-2 mt-2">
												<Skeleton className="h-4 w-full"/>
												<Skeleton className="h-3 w-16"/>
											</div>
										</div>
									</HoverCardContent>
								</HoverCard>
							</div>
						))
					) : (
						data.map((user) =>
							user.images.slice(0, 6).map((image, index) => (
								<HoverCard key={`${user.id}-${image.url}`}>
									<HoverCardTrigger asChild>
										<div
											className="relative aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer transition-transform hover:scale-105">
											<Image
												src={image.url || "/placeholder.svg"}
												alt={image.description}
												className="object-cover w-full h-full"
												width={200}
												height={200}
											/>
										</div>
									</HoverCardTrigger>
									<HoverCardContent align="start" className="w-60">
										<div className="flex flex-col">
											<div className="flex space-x-4">
												<Avatar>
													<AvatarImage src={user.photo} className="object-cover"/>
													<AvatarFallback>{user.name[0]}</AvatarFallback>
												</Avatar>
												<div className="space-y-1">
													<h4 className="text-sm font-semibold">{user.name}</h4>
													<p className="text-sm text-muted-foreground">{user.email}</p>
												</div>
											</div>
											<div className="flex flex-col gap-1 mt-2">
												<p className="text-sm">{image.description}</p>
												<time className="text-xs text-muted-foreground">
													{new Date(image.date).toLocaleDateString()}
												</time>
											</div>
										</div>
									</HoverCardContent>
								</HoverCard>
							))
						)
					)}
				</div>
			</section>
		</div>
	)
}

