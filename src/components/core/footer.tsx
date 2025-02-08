import React from "react";

export function Footer() {
	return (
		<footer className="w-full border-t bg-foreground p-6 lg:p-4">
			<div
				className="container flex flex-col items-center gap-4 py-10 md:h-24 md:flex-row md:justify-between md:py-0">
				<div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-6 md:px-0">
					<nav className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
						<a href="#"
						   className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
							FAQs
						</a>
						<a href="#"
						   className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
							Terms & conditions
						</a>
						<a href="#"
						   className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
							Privacy Policy
						</a>
					</nav>
				</div>
				<p className="text-sm text-muted-foreground">&copy; 2025 Horidev</p>
			</div>
		</footer>

	);
}