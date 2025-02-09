"use client"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import Link from "next/link"
import {useEffect, useState} from "react"
import {useToast} from "@/hooks/use-toast";
import {isEmailTaken, isValidEmail, isValidPassword} from "@/controller/validation";
import useStore from "@/store";

export default function Login() {
	const [step, setStep] = useState(1)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(true)
	const {toast} = useToast();
	const {
		register
	} = useStore((state) => state);

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		setIsLoading(true)

		if (step === 1) {
			if (!isValidEmail(email)) {
				toast({
					title: "Error",
					description:
						"Please enter a valid email address.",
					variant: "destructive",
				});
				setIsLoading(false)
				return
			}

			if (isEmailTaken(email)) {
				toast({
					title: "Error",
					description:
						"This email is already registered.",
					variant: "destructive",
				});
				setIsLoading(false)
				return
			}

			setStep(2)
			setIsLoading(false)
			return
		}

		if (!isValidPassword(password)) {
			toast({
				title: "Error",
				description:
					"Password must be at least 5 characters long.",
				variant: "destructive",
			});
			setIsLoading(false)
			return
		}
		try {

			await register(email, password)
			toast({
				title: "Success",
				description: "Registration completed successfully.",
			});

			setEmail("");
			setPassword("");
			setStep(1);
			setError(true);
		} catch (error) {
			toast({
				title: "Error",
				description: error instanceof Error ? error.message : "Failed to register",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}

	}

	useEffect(() => {
		if (password.length >= 6) {
			setError(false)
		} else {
			setError(true)
		}
	}, [password]);


	return (
		<div className="flex flex-col w-full justify-center items-center">
			<section className="flex justify-center items-center gap-4 px-2 w-full h-dvh lg:w-1/3">
				<Card className="w-full max-w-md">
					<CardHeader>
						<CardTitle className="text-3xl font-extrabold text-center">Register</CardTitle>
						<p className="text-center text-sm text-muted-foreground">
							{step === 1 ? "What is your email address?" : "Create a password"}
						</p>
					</CardHeader>
					<form onSubmit={onSubmit}>
						<CardContent className="space-y-4">

							{step === 1 ? (
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
							) : (
								<div className="space-y-2">
									<Label htmlFor="password">Password</Label>
									<Input
										id="password"
										type="password"
										placeholder="Create a password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										disabled={isLoading}
									/>
									{
										error && (
											<small className={"text-muted-foreground mt-2"}>Password must be at least 5
												characters long.</small>
										)
									}
								</div>
							)}
						</CardContent>
						<CardFooter className="flex flex-col gap-4">
							<Button type="submit" className="w-full " disabled={isLoading}>
								{isLoading ? "Loading..." : step === 1 ? "Next" : "Register"}
							</Button>
							<Button
								type="button"
								variant="outline"
								className="w-full"
								onClick={() => {
									// Handle Google sign in
								}}
							>
								<svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
									<path
										d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
										fill="#4285F4"
									/>
									<path
										d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
										fill="#34A853"
									/>
									<path
										d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
										fill="#FBBC05"
									/>
									<path
										d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
										fill="#EA4335"
									/>
									<path d="M1 1h22v22H1z" fill="none"/>
								</svg>
								Continue with Google
							</Button>
							<p className="text-sm text-center text-muted-foreground">
								Already a member?{" "}
								<Link href="/login" className="text-primary hover:underline">
									Login
								</Link>
							</p>
						</CardFooter>
					</form>
				</Card>
			</section>
		</div>
	)
}
