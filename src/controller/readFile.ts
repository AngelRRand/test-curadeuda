import fs from "fs";
import path from "path";
const filePath = path.resolve(process.cwd(), "public/data/users.json")

export function readUsersFile() {
	const fileContent = fs.readFileSync(filePath, "utf-8")
	return JSON.parse(fileContent)
}
