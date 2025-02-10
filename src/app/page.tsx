"use client"
import {Button} from "@/components/ui/button"
import Link from "next/link"
import React, {useEffect, useState} from "react";
import useStore from "@/store";

export default function Home() {
	const [eyePosition, setEyePosition] = useState({x: 0, y: 0})
	const {
		user
	} = useStore((state) => state);
	useEffect(() => {
		const handleMouseMove = (e) => {
			const bounds = document.body.getBoundingClientRect()
			const x = (e.clientX / bounds.width) * 4 - 2
			const y = (e.clientY / bounds.height) * 4 - 2

			setEyePosition({
				x: Math.min(Math.max(x, -2), 2),
				y: Math.min(Math.max(y, -2), 2)
			})
		}

		window.addEventListener('mousemove', handleMouseMove)
		return () => window.removeEventListener('mousemove', handleMouseMove)
	}, [])


	return (
		<div
			className="flex flex-col gap-10 w-full h-screen items-center justify-center  relative  overflow-hidden">
			<section className="flex flex-col justify-center items-center gap-4 ">
				<h1 className="text-5xl font-extrabold">Welcome</h1>
				{
					!user ? (
						<>
							<span className="text-sm text-center">
								Register and become part of our gallery.
							</span>
							<Button className=" w-1/2">
								<Link href="/register" className="w-full">
									Register
								</Link>
							</Button>
						</>

					) : (
						<>
							<Link href="/gallery" className="w-full text-primary font-bold text-center">
								Visit our gallery
							</Link>
						</>
					)
				}
			</section>
			<div className="absolute -bottom-20 right-0 ">
				<svg className="w-80 h-80" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="20" cy="20" r="20" fill="#e11d48"/>
					<g style={{
						transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
						transition: 'transform 0.3s ease-out'
					}}>
						<path d="M32 20a13.2 12.8 0 11-26.4 0 13.2 12.8 0 0126.4 0z" fill="#120C0C"/>
						<circle cx="25.2" cy="13.2" r="5.2" fill="#F8EDEB"/>
					</g>
				</svg>
			</div>
		</div>
	)
}

