"use client"

import React, {useEffect, useState} from "react"
import {useParams, useRouter} from "next/navigation"
import useStore from "@/store"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Skeleton} from "@/components/ui/skeleton"
import {Button} from "@/components/ui/button"
import {Eye, EyeOff} from "lucide-react"
import {isValidPassword} from "@/controller/validation";
import {useToast} from "@/hooks/use-toast";
import dataJson from "../../../../public/data/users.json"
import {UploadImage} from "@/components/core/upload-image";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {UserImages} from "@/components/core/user-images";

type UserChanges = {
	id: string;
	name?: string;
	email?: string;
	password?: string;
}

export default function Page() {
	const router = useRouter()
	const params = useParams()
	const [profileData, setProfileData] = useState(null)
	const [isEditable, setIsEditable] = useState(false)
	const [name, setName] = useState("")
	const [password, setPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)
	const [id, setId] = useState("")

	const {
		data,
		user,
		fixedUser,
		setData
	} = useStore((state) => state)
	const {toast} = useToast()

	const decodedEmail = decodeURIComponent(params.id)


	if (!data) {
		return
	}

	const foundUser = dataJson.find(u => u.email === decodedEmail)

	if (!foundUser) {
		router.push('/not-found')
		return
	}

	useEffect(() => {
		if (foundUser && !profileData) {
			setProfileData(foundUser)
			setIsEditable(user?.email === decodedEmail)
			setName(foundUser.name)
			setId(foundUser.id)
			setPassword(foundUser.password || "")
		}
	}, [foundUser, profileData, user, decodedEmail, data])

	async function handleSave(e: React.FormEvent) {
		e.preventDefault()
		const changes: UserChanges = {
			id: profileData.id
		}

		if (name !== undefined && name.trim().length < 2) {
			toast({
				title: "Error",
				description: "Name must be at least 2 characters long.",
				variant: "destructive",
			});
			return
		}

		if (name.trim().length > 15) {
			toast({
				title: "Error",
				description: "The name cannot be longer than 15 characters.",
				variant: "destructive",
			});
			return
		}

		if (password !== undefined && !isValidPassword(password)) {
			toast({
				title: "Error",
				description: "Password must meet the requirements.",
				variant: "destructive",
			});
			return
		}

		if (name !== profileData.name) changes.name = name
		if (password !== profileData.password) changes.password = password

		if (Object.keys(changes).length > 1) {
			try {
				let newData = await fixedUser(profileData.id, changes, false)
				await setData(newData)
				setProfileData({...profileData, ...changes})
				toast({
					title: "Success",
					description: "Todo ok.",
				});
			} catch (error) {
				console.error('Error al actualizar:', error)
			}
		}
	}

	if (!data || !profileData) {
		return (
			<div className="flex flex-col gap-10 w-full items-center justify-center my-10">
				<div className="w-full max-w-md space-y-6 p-4">
					<div className="flex items-center gap-4">
						<Skeleton className="h-12 w-12 rounded-full"/>
						<Skeleton className="h-6 w-32"/>
					</div>
					<div className="grid grid-cols-3 gap-4">
						<Skeleton className="aspect-square w-full"/>
						<Skeleton className="aspect-square w-full"/>
						<Skeleton className="aspect-square w-full"/>
					</div>
				</div>
			</div>
		)
	}

	if (!isEditable) {
		return (
			<div className="flex flex-col w-full  my-10">
				<div className="flex flex-col w-full justify-center items-center gap-4">
					<Avatar className="h-12 w-12">
						<AvatarImage src={profileData.photo}/>
						<AvatarFallback>{profileData.name[0]}</AvatarFallback>
					</Avatar>
					<h2 className="text-xl font-semibold">{profileData.name}</h2>
				</div>


				<div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4 mt-10">
					{profileData.images?.map((image, index) => (
						<div className="break-inside-avoid " key={index}>
							<UserImages
								user={null}
								image={image}
								index={index}
							/>
						</div>

					))}
				</div>

			</div>
		)
	}

	return (
		<div className="flex flex-col gap-10 w-full my-10 ">
			<div className="flex flex-col md:flex-row w-full h-full  p-6 gap-8">
				{/* Panel izquierdo con inputs */}
				<div className="flex flex-col gap-6 w-full h-full justify-around md:w-1/3">
					<Card className="w-full">
						<CardHeader>
							<div className="flex items-center gap-4">
								<UploadImage name={name} userId={id} type={"photo"} setProfileData={setProfileData}>
									<Avatar className="h-12 w-12 z-20 cursor-pointer">
										<AvatarImage src={profileData.photo}/>
										<AvatarFallback>{profileData.name[0]}</AvatarFallback>
									</Avatar>
								</UploadImage>
								<CardTitle className="text-xl">{profileData.name}</CardTitle>
							</div>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSave} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="password">Password</Label>
									<div className="relative flex">
										<Input
											type={showPassword ? "text" : "password"}
											id="password"
											placeholder="Password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											className="mr-1"
										/>
										<Button onClick={() => setShowPassword(!showPassword)}>
											{showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
										</Button>
									</div>
									<small className="text-muted-foreground">Password must be at least 5 characters
										long.</small>
								</div>

								<Button className="w-full mt-6" type="submit">
									Update Profile
								</Button>
							</form>
						</CardContent>
					</Card>
				</div>

				{/* Panel derecho con galería */}
				<div className="w-full md:w-2/3">
					<div className="space-y-2">
						<UploadImage name={name} userId={id} type={"gallery"} setProfileData={setProfileData}>
							<Button>Upload image</Button>
						</UploadImage>

					</div>
					<div className="mt-4 flex flex-col">
						<Label className=" block">Your Gallery :</Label>
						<div className={"columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4  "}>
							{profileData.images?.map((image, index) => (
								<UserImages key={index} user={null} image={image} index={index}/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}