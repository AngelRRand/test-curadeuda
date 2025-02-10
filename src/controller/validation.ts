import data from "../../public/data/users.json";

export const isValidEmail = (email: string) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(email)
}

export const isEmailTaken = (email: string) => {
	return data.some((user) => user.email.toLowerCase() === email.toLowerCase())
}

export const isValidPassword = (password: string) => {
	return password.length >= 6
}

