import React from "react";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";

export function UserImages({user, image, index}) {
	const getHeight = (index) => {
		const heights = [
			'h-64',
			'h-96',
			'h-72',
			'h-80',
			'h-48',
			'h-56'
		];
		return heights[index % heights.length];
	};
	if (user) {
		return (
			<Dialog>
				<HoverCard>
					<DialogTrigger asChild>
						<HoverCardTrigger asChild>
							<div
								className={`${getHeight(index)} mb-4 break-inside-avoid relative rounded-lg overflow-hidden group cursor-pointer`}>
								<img
									src={image.url}
									alt={image.description}
									className="w-full h-full object-cover"
								/>
								<div
									className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									<div className="absolute bottom-0 left-0 right-0 p-4">
										<p className="text-white text-sm font-medium truncate">
											{image.description}
										</p>
										<p className="text-gray-300 text-xs">
											{new Date(image.date).toLocaleDateString()}
										</p>
									</div>
								</div>
							</div>
						</HoverCardTrigger>
					</DialogTrigger>

					{user && (
						<HoverCardContent align="start" className="w-60">
							<div className="flex flex-col">
								<div className="flex space-x-4">
									<Link href={`user/${user.email}`} className="flex gap-2">
										<Avatar>
											<AvatarImage src={user.photo} className="object-cover"/>
											<AvatarFallback>{user.name[0]}</AvatarFallback>
										</Avatar>
										<div className="space-y-1">
											<h4 className="text-sm font-semibold truncate">{user.name}</h4>
										</div>
									</Link>
								</div>
							</div>
						</HoverCardContent>
					)}
				</HoverCard>

				<DialogTitle className={"hidden"}>hidden</DialogTitle>
				<DialogContent className="max-w-4xl">
					<div className="grid gap-4">
						<div className="aspect-video relative rounded-lg overflow-hidden">
							<img
								src={image.url}
								alt={image.description}
								className="w-full h-full object-contain"
							/>
						</div>
						<Link href={`user/${user.email}`} className="flex gap-2">
							<div className="flex items-start gap-4">
								<Avatar>
									<AvatarImage src={user.photo} className="object-cover"/>
									<AvatarFallback>{user.name[0]}</AvatarFallback>
								</Avatar>
								<div className="grid gap-1">
									<h4 className="font-semibold">{user.name}</h4>
									<p className="text-sm text-muted-foreground">{image.description}</p>
									<time className="text-xs text-muted-foreground">
										{new Date(image.date).toLocaleDateString()}
									</time>
								</div>
							</div>
						</Link>
					</div>
				</DialogContent>
			</Dialog>
		)
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div
					className={`${getHeight(index)} mb-4 break-inside-avoid relative rounded-lg overflow-hidden group cursor-pointer`}>
					<img
						src={image.url}
						alt={image.description}
						className="w-full h-full object-cover"
					/>
					<div
						className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						<div className="absolute bottom-0 left-0 right-0 p-4">
							<p className="text-white text-sm font-medium truncate">
								{image.description}
							</p>
							<p className="text-gray-300 text-xs">
								{new Date(image.date).toLocaleDateString()}
							</p>
						</div>
					</div>
				</div>
			</DialogTrigger>
			<DialogTitle className={"hidden"}>hidden</DialogTitle>
			<DialogContent className="max-w-4xl">
				<div className="grid gap-4">
					<div className="aspect-video relative rounded-lg overflow-hidden">
						<img
							src={image.url}
							alt={image.description}
							className="w-full h-full object-contain"
						/>
					</div>
				</div>
			</DialogContent>
		</Dialog>

	);
}