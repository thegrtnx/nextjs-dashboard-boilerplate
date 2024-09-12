"use client";

import React, { useEffect } from "react";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import Cookies from "js-cookie";

export function AuthLayoutView({ children }: { children: React.ReactNode }) {
	const appName = process.env.NEXT_PUBLIC_APP_NAME;

	useEffect(() => {
		// Function to clear all cookies
		const clearAllCookies = () => {
			document.cookie.split(";").forEach((cookie) => {
				const cookieName = cookie.split("=")[0].trim();

				// Remove the cookie for all paths and domains
				Cookies.remove(cookieName, { path: "/" });
				Cookies.remove(cookieName, {
					path: "/",
					domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || window.location.hostname,
				});
				Cookies.remove(cookieName, {
					path: "/",
					secure: true,
				});
				Cookies.remove(cookieName, {
					path: "/",
					domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || window.location.hostname,
					secure: true,
				});
			});
		};

		// Clear all cookies on component mount
		clearAllCookies();
	}, []);

	return (
		<div className="flex min-h-screen w-full flex-col">
			<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
				<nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
					<div className="flex items-center gap-2 me-12 text-lg font-semibold md:text-base">
						<Image
							isZoomed
							src="/images/assets/logo.svg"
							alt={appName}
							className="h-auto w-32"
						/>
						<span className="sr-only">{appName}</span>
					</div>
				</nav>
			</header>
			<main className="flex items-center justify-center lg:pt-10 pb-32">{children}</main>
			<footer className="fixed bottom-0 w-full z-50 bg-background border-t p-4 text-center">
				<div className="flex justify-between m-auto items-center gap-5">
					<p className="text-xs">
						© {appName} {new Date().getFullYear()}.
					</p>
					<p className="text-xs animate-pulse">
						Powered by:{" "}
						<Link href="#">
							<b>Hynitr</b>
						</Link>
					</p>
				</div>
			</footer>
		</div>
	);
}
