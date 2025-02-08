import React from "react";
import Link from "next/link";

export function Footer() {
	return (
		<footer className="w-full border-t bg-sidebar p-6">
			<div className="container flex justify-between">
				<nav className="flex flex-col gap-4">
					<Link
						href="#"
						className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
					>
						FAQs
					</Link>
					<Link
						href="#"
						className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
					>
						Terms & conditions
					</Link>
					<Link
						href="#"
						className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
					>
						Privacy Policy
					</Link>
				</nav>
				<p className="text-sm text-muted-foreground">&copy; 2025 Horidev</p>
			</div>
		</footer>

	);
}