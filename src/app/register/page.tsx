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
import {useRouter} from "next/navigation";

export default function Login() {
	const [step, setStep] = useState(1)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(true)
	const {toast} = useToast();
	const router = useRouter();
	const {
		register,
		data
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

			await register(email, password, data?.length || 1)
			toast({
				title: "Register",
				description: "Registration completed successfully.",
			});

			setEmail("");
			setPassword("");
			setStep(1);
			setError(true);
			router.replace(`/user/${email}`)
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
		<div className="flex flex-col w-full justify-center items-center mt-10">
			<section className="flex justify-center items-center gap-4 px-2 w-full lg:w-1/3">
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
