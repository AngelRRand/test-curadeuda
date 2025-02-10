import fs from "fs";
import {NextResponse} from "next/server";
import path from "path";

const filePath = path.resolve(process.cwd(), "public/data/users.json");

export async function GET(request: Request) {
	try {
		if (!fs.existsSync(filePath)) {
			console.error(`File not found: ${filePath}`)
			return NextResponse.json({error: "Users data file not found"}, {status: 404})
		}

		const fileContent = fs.readFileSync(filePath, "utf-8")

		if (!fileContent.trim()) {
			console.error("File is empty")
			return NextResponse.json({error: "Users data file is empty"}, {status: 500})
		}

		const users = JSON.parse(fileContent)

		return NextResponse.json(users)
	} catch (error) {
		console.error("Error reading users file:", error)
		return NextResponse.json({error: "Failed to read users data"}, {status: 500})
	}
}
