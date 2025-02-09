"use client"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import Link from "next/link"
import {useState} from "react"
import {useToast} from "@/hooks/use-toast";
import {isValidEmail, isValidPassword} from "@/controller/validation";
import useStore from "@/store";
import {useRouter} from "next/navigation";

export default function Login() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const {toast} = useToast();
	const router = useRouter()

	const {
		user,
		login
	} = useStore((state) => state);

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

			const rest: { email: string, password: string } = await login(email, password)

			// Login exitoso
			toast({
				title: "Success",
				description: "Login successful!",
			})

			router.push(`/user/${rest?.email}`)
		} catch (error) {
			toast({
				title: "Error",
				description: error instanceof Error ? error.message : "Invalid email or password.",
				variant: "destructive",
			})
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
						</CardContent>
						<CardFooter className="flex flex-col gap-4">
							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? "Loading..." : "Login"}
							</Button>
							<p className="text-sm text-center text-muted-foreground">
								Dont have an account?{" "}
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
