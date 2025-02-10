import {NextResponse} from "next/server";
import {isValidEmail} from "@/controller/validation";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import {readUsersFile} from "@/controller/readFile";

const filePath = path.resolve(process.cwd(), "public/data/users.json")

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const {email, password, name} = body
		// Validaciones básicas
		if (!email || !password) {
			return NextResponse.json({error: "Email and password are required"}, {status: 400})
		}
		if (!isValidEmail(email)) {
			return NextResponse.json({error: "Invalid email format"}, {status: 400})
		}
		if (password.length < 6) {
			return NextResponse.json({error: "Password must be at least 6 characters long"}, {status: 400})
		}
		// Crear nuevo usuario con valores por defecto
		const newUser = {
			id: crypto.randomUUID(),
			name: name,
			email,
			password,
			photo: "",
			images: [],
		}
		// Añadir el nuevo usuario
		const users = readUsersFile()
		users.push(newUser)
		// Guardar los datos actualizados
		fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
		// Retornar el usuario creado (sin la contraseña)
		const {password: _, ...userWithoutPassword} = newUser
		return NextResponse.json(userWithoutPassword, {status: 201})
	} catch (error) {
		console.error("Error creating user:", error)
		return NextResponse.json({error: "Failed to create user"}, {status: 500})
	}
}