import {NextResponse} from "next/server"
import {readUsersFile} from "@/controller/readFile"
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
	try {
		const formData = await request.formData();
		const imageFile = formData.get('photo') || formData.get('gallery');
		const data = JSON.parse(formData.get('data') as string);
		const userId = data.userId;

		if (!imageFile || !(imageFile instanceof File)) {
			return NextResponse.json(
				{error: "No image file provided"},
				{status: 400}
			)
		}

		const users = readUsersFile()
		const userIndex = users.findIndex((u: any) => u.id === userId)

		if (userIndex === -1) {
			return NextResponse.json(
				{error: "User not found"},
				{status: 404}
			)
		}

		const imageBuffer = Buffer.from(await imageFile.arrayBuffer())
		const imagePath = path.join(process.cwd(), 'public/img', imageFile.name)
		fs.writeFileSync(imagePath, imageBuffer)

		if (formData.has('photo')) {
			users[userIndex].photo = `/img/${imageFile.name}`
		} else {
			const newImage = {
				url: `/img/${imageFile.name}`,
				description: data.description || '',
				date: data.date
			}

			if (!users[userIndex].images) {
				users[userIndex].images = []
			}
			users[userIndex].images.push(newImage)
		}

		const usersFilePath = path.join(process.cwd(), 'public/data/users.json')
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2))

		return NextResponse.json(users)

	} catch (error) {
		console.error("Error handling image upload:", error)
		return NextResponse.json(
			{error: "Error processing the upload"},
			{status: 500}
		)
	}
}