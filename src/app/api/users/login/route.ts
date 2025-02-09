import {NextResponse} from "next/server"
import {readUsersFile} from "@/controller/readFile";


export async function POST(request: Request) {
	try {
		const body = await request.json()
		const {email, password} = body

		// Validaciones básicas
		if (!email || !password) {
			return NextResponse.json({error: "Email and password are required"}, {status: 400})
		}

		// Leer usuarios
		const users = readUsersFile()

		// Buscar usuario por email y contraseña
		const user = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

		if (!user) {
			return NextResponse.json({error: "Invalid email or password"}, {status: 401})
		}

		// Si las credenciales son correctas, devolver los datos del usuario (sin la contraseña)
		const {password: _, ...userWithoutPassword} = user
		return NextResponse.json(userWithoutPassword)
	} catch (error) {
		console.error("Error during login:", error)
		return NextResponse.json({error: "An error occurred during login"}, {status: 500})
	}
}