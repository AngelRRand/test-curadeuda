import {NextResponse} from "next/server"
import {readUsersFile} from "@/controller/readFile"
import fs from 'fs'
import path from 'path'
import {isValidEmail, isValidPassword} from "@/controller/validation";

// Tipos
type UpdateUserRequest = {
	id: string
	name?: string
	email?: string
	password?: string
}

export async function PUT(
	request: Request,
	{params}: { params: { id: string } }
) {
	try {
		const userId = params.id
		if (!userId) {
			return NextResponse.json(
				{error: "User ID is required"},
				{status: 400}
			)
		}

		const body: UpdateUserRequest = await request.json()
		const {name, email, password} = body

		// Leer usuarios existentes
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

		// Validaciones
		if (name !== undefined) {
			if (name.trim().length < 2) {
				return NextResponse.json(
					{error: "Name must be at least 2 characters long"},
					{status: 400}
				)
			}
			updatedUser.name = name
		}

		if (email !== undefined) {
			if (!isValidEmail(email)) {
				return NextResponse.json(
					{error: "Invalid email format"},
					{status: 400}
				)
			}

			// Verificar si el email ya existe (excluyendo el usuario actual)
			const emailExists = users.some(
				(u: any) => u.id !== userId && u.email.toLowerCase() === email.toLowerCase()
			)
			if (emailExists) {
				return NextResponse.json(
					{error: "Email already in use"},
					{status: 400}
				)
			}
			updatedUser.email = email
		}

		if (password !== undefined) {
			if (!isValidPassword(password)) {
				return NextResponse.json(
					{
						error: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
					},
					{status: 400}
				)
			}
			updatedUser.password = password
		}

		// Actualizar el usuario en el array
		users[userIndex] = updatedUser

		// Guardar los cambios en el archivo
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