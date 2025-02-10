"use client"

import {useEffect, useState} from "react"
import {useParams, useRouter} from "next/navigation"
import useStore from "@/store"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Skeleton} from "@/components/ui/skeleton"
import Image from "next/image"
import {Button} from "@/components/ui/button"
import {Eye, EyeOff} from "lucide-react"
import {isValidPassword} from "@/controller/validation";


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
	const [email, setEmail] = useState("")
	const [name, setName] = useState("")
	const [password, setPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)


	const {
		data,
		user,
		fixedUser,
		setData
	} = useStore((state) => state)

	useEffect(() => {
		if (!data) {
			return
		}

		const decodedEmail = decodeURIComponent(params.id)
		const foundUser = data.find(u => u.email === decodedEmail)
		if (!foundUser) {
			router.push('/not-found')
			return
		}

		setProfileData(foundUser)
		setIsEditable(user?.email === decodedEmail)
		setEmail(foundUser.email)
		setName(foundUser.name)
		setPassword(foundUser.password || "")
	}, [params.id, user, router])

	async function handleSave(e: React.FormEvent) {
		e.preventDefault()
		const changes: UserChanges = {
			id: profileData.id
		}

		// Validaciones del lado del cliente
		if (name !== undefined && name.trim().length < 2) {
			console.error("Name must be at least 2 characters long")
			return
		}

		if (password !== undefined && !isValidPassword(password)) {
			console.error("Password must meet the requirements")
			return
		}

		if (name !== profileData.name) changes.name = name
		if (password !== profileData.password) changes.password = password
		if (email !== profileData.email) changes.email = email

		if (Object.keys(changes).length > 1) {
			try {

				let newData = await fixedUser(profileData.id, changes)
				await setData(newData)
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
			<div className="flex flex-col gap-10 w-full  items-center my-10">
				<div className="w-full space-y-6 p-4  ">
					<div className="flex flex-col w-full justify-center items-center gap-4">
						<Avatar className="h-12 w-12">
							<AvatarImage src={profileData.photo}/>
							<AvatarFallback>{profileData.name[0]}</AvatarFallback>
						</Avatar>
						<h2 className="text-xl font-semibold">{profileData.name}</h2>
					</div>

					<div className="space-y-4 w-full">
						<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
							{profileData.images?.map((image, index) => (
								<div
									key={index}
									className="relative aspect-square rounded-lg overflow-hidden bg-muted"
								>
									<Image
										src={image.url}
										alt={image.description || "Gallery image"}
										className="object-cover"
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col gap-10 w-full my-10 ">
			<div className="flex flex-col md:flex-row w-full h-full  p-6 gap-8">
				{/* Panel izquierdo con inputs */}
				<div className="flex flex-col gap-6 w-full h-full justify-around  md:w-1/3">
					<div className="flex items-center gap-4">
						<Avatar className="h-12 w-12 z-20 ">
							<AvatarImage src={profileData.photo}/>
							<AvatarFallback>{profileData.name[0]}</AvatarFallback>
						</Avatar>
						<h2 className="text-xl font-semibold">{profileData.name}</h2>
					</div>

					<form onSubmit={handleSave} className="space-y-4 flex-grow">
						<div className="space-y-2">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
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
								/>
								<Button>
									{showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
								</Button>
							</div>
						</div>

						<Button className="w-full mt-6" type={"submit"}>
							Update Profile
						</Button>
					</form>
				</div>

				{/* Panel derecho con galería */}
				<div className="w-full md:w-2/3">
					<div className="space-y-2">
						<Label htmlFor="gallery">Gallery</Label>
						<Input
							id="gallery"
							type="file"
							accept="image/*"
						/>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
						<Label className="mb-4 block">Your Gallery :</Label>
						{profileData.images?.map((image, index) => (
							<div
								key={index}
								className="relative aspect-square rounded-lg overflow-hidden bg-muted"
							>
								<Image
									src={image.url}
									alt={image.description || "Gallery image"}
									className="object-cover"
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}