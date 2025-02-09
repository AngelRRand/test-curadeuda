"use client"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import Link from "next/link"
import {useState} from "react"
import {useToast} from "@/hooks/use-toast";
import {isValidEmail, isValidPassword} from "@/controller/validation";

export default function Login() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const {toast} = useToast();


	async function onSubmit(e: React.FormEvent) {
		e.preventDefault()

		if (!isValidEmail(email)) {
			toast({
				title: "Error",
				description:
					"Please enter a valid email address.",
				variant: "destructive",
			});
			return
		}

		if (!isValidPassword(password)) {
			toast({
				title: "Error",
				description:
					"Password must be at least 5 characters long.",
				variant: "destructive",
			});
			return
		}

		setIsLoading(true)

		try {
			const loginData = {
				email: email.toLowerCase(),
				password: password,
			}

			console.log("Sending login data:", loginData)

			await new Promise((resolve) => setTimeout(resolve, 1000))


		} catch (err) {
			toast({
				title: "Error",
				description:
					"Invalid email or password.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false)
		}
	}


	return (
		<div className="flex flex-col w-full justify-center items-center">
			<section className="flex justify-center items-center gap-4 px-2 w-full h-dvh lg:w-1/3">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle className="text-3xl font-extrabold text-center">Login</CardTitle>
					</CardHeader>
					<form onSubmit={onSubmit}>
						<CardContent className="space-y-4">

							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="Enter your email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									disabled={isLoading}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									type="password"
									placeholder="Enter your password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									disabled={isLoading}
								/>
							</div>
							<div className="text-right">
								<Link href="/forgot-password"
									  className="text-sm text-muted-foreground hover:text-primary">
									Forgot your password?
								</Link>
							</div>
						</CardContent>
						<CardFooter className="flex flex-col gap-4">
							<Button type="submit" className="w-full bg-red-500 hover:bg-red-600" disabled={isLoading}>
								{isLoading ? "Loading..." : "Login"}
							</Button>
							<p className="text-sm text-center text-muted-foreground">
								Don&apos;t have an account?{" "}
								<Link href="/register" className="text-primary hover:underline">
									Register
								</Link>
							</p>
						</CardFooter>
					</form>
				</Card>
			</section>
		</div>
	)
}
