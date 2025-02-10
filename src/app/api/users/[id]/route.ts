import {NextResponse} from "next/server"
import {readUsersFile} from "@/controller/readFile"
import fs from 'fs'
import path from 'path'
import {isValidPassword} from "@/controller/validation";

type UpdateUserRequest = {
	id: string
	name?: string
	password?: string
}

export async function PUT(
	request: Request,
) {
	try {


		const body: UpdateUserRequest = await request.json()
		const userId = body.id

		if (!userId) {
			return NextResponse.json(
				{error: "User ID is required"},
				{status: 400}
			)
		}

		const {name, password} = body

		const users = readUsersFile()
		const userIndex = users.findIndex((u: any) => u.id === userId)

		if (userIndex === -1) {
			return NextResponse.json(
				{error: "User not found"},
				{status: 404}
			)
		}

		const currentUser = users[userIndex]
		const updatedUser = {...currentUser}

		if (name !== undefined) {
			if (name.trim().length < 2) {
				return NextResponse.json(
					{error: "Name must be at least 2 characters long"},
					{status: 400}
				)
			}
			updatedUser.name = name
		}

		if (password !== undefined) {
			if (!isValidPassword(password)) {
				return NextResponse.json(
					{
						error: "Password must be at least 6 characters long."
					},
					{status: 400}
				)
			}
			updatedUser.password = password
		}

		users[userIndex] = updatedUser

		const usersFilePath = path.join(process.cwd(), 'public/data/users.json')
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2))

		const usersResult = readUsersFile()
		return NextResponse.json(usersResult)

	} catch (error) {
		console.error("Error updating user:", error)
		return NextResponse.json(
			{error: "An error occurred while updating the user"},
			{status: 500}
		)
	}
}