import fs from "fs";
import {NextResponse} from "next/server";
import path from "path";

const filePath = path.resolve(process.cwd(), "public/data/users.json");

export async function GET(request: Request) {
	try {
		if (!fs.existsSync(filePath)) {
			return NextResponse.json({error: "Users data file not found"}, {status: 404})
		}

		const fileContent = fs.readFileSync(filePath, "utf-8")

		if (!fileContent.trim()) {
			return NextResponse.json({error: "Users data file is empty"}, {status: 500})
		}

		const users = JSON.parse(fileContent)

		return NextResponse.json(users)
	} catch (error) {
		return NextResponse.json({error: "Failed to read users data"}, {status: 500})
	}
}
