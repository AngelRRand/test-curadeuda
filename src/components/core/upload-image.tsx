"use client"
import type React from "react"
import {useCallback, useEffect, useState} from "react"
import {Button} from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {handleFileChange} from "@/controller/upload-image"
import {useToast} from "@/hooks/use-toast";
import useStore from "@/store";
import {GalleryImageData, UserPhotoData} from "@/store/user/type";

interface UploadImageProps {
	children: React.ReactNode;
	name: string;
	type: "user" | "gallery";
	userId?: string;
	setProfileData: () => void;
}


export function UploadImage({children, name, type, userId, setProfileData}: UploadImageProps) {
	const [tempImage, setTempImage] = useState<string | null>(null)
	const [file, setFile] = useState<File | null>(null)
	const [description, setDescription] = useState("")
	const [open, setOpen] = useState(false)
	const {toast} = useToast()
	const {
		setData,
		fixedUser
	} = useStore((state) => state)
	const uploadImage = async (file: File) => {
		try {
			const formData = new FormData()
			formData.append(type, file)

			if (type === "gallery") {
				const galleryData: GalleryImageData = {
					userId: userId || "",
					url: `/img/${file.name}`,
					description: description,
					date: new Date().toISOString().split("T")[0],

				}
				formData.append("data", JSON.stringify(galleryData))
			} else {
				const userData: UserPhotoData = {
					userId: userId || "",
					photo: `/img/${file.name}`,
				}
				formData.append("data", JSON.stringify(userData))
			}

			let newData = await fixedUser(userId, formData, true)
			setData(newData)


			const updatedUser = newData.find(u => u.id === userId)
			if (updatedUser) {
				setProfileData(updatedUser)
			}

			return `/img/${file.name}`
		} catch (error) {
			toast({
				title: "Success",
				description: `${error}`,
			})
			throw error
		}
	}

	const onChange = useCallback(async () => {
		if (tempImage && file) {
			try {
				const imagePath = await uploadImage(file!)
				console.log("Imagen guardada en:", imagePath)

				toast({
					title: "Success",
					description: "Image uploaded successfully",
				})

				setTempImage(null)
				setFile(null)
				setDescription("")
				setOpen(false)
			} catch (error) {
				console.error("Error al subir la imagen:", error)
				toast({
					variant: "destructive",
					title: "Error",
					description: "Failed to upload image",
				})
			}
		}
	}, [tempImage, file, uploadImage, toast])

	const handleOpenChange = (open: boolean) => {
		setOpen(open)
		if (!open) {
			setTempImage(null)
			setFile(null)
			setDescription("")
		}
	}

	useEffect(() => {
		return () => {
			setTempImage(null)
			setFile(null)
			setDescription("")
		}
	}, [])

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="flex flex-col sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Upload image</DialogTitle>
					<DialogDescription>Only png, webp or jpeg formats are supported</DialogDescription>
				</DialogHeader>
				{tempImage ? (
					<div className="w-full h-[300px] flex items-center justify-center">
						<div className="w-[300px] h-[300px] relative">
							<img
								src={tempImage || "/placeholder.svg"}
								alt="Image"
								className="rounded-md object-cover w-full h-full"
							/>
						</div>
					</div>
				) : null}
				<div className="space-y-4">
					{!tempImage ? (
						<Input
							id="picture"
							name={name}
							type="file"
							accept="image/png,image/jpeg,image/webp"
							onChange={(e) => {
								const selectedFile = e.target.files?.[0]
								if (selectedFile) {
									const validTypes = ["image/png", "image/jpeg", "image/webp"]
									if (!validTypes.includes(selectedFile.type)) {
										toast({
											variant: "destructive",
											title: "Invalid file type",
											description: "Please upload only PNG, JPEG or WebP images",
										})
										return
									}
									setFile(selectedFile)
									handleFileChange(selectedFile, setTempImage)
								}
							}}
						/>
					) : (
						<>
							{type === "gallery" && (
								<div className="grid gap-2">
									<Label htmlFor="description">Description</Label>
									<Textarea
										id="description"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										placeholder="Enter a description for your image"
									/>
								</div>
							)}
							<Button onClick={onChange} className="w-full">
								Upload
							</Button>
						</>
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}

