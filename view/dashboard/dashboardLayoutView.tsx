"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, CircleUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Image, Input } from "@nextui-org/react";
import NextTopLoader from "nextjs-toploader";
//import DynamicBreadcrumb from "./breadcumb"; // Import the dynamic breadcrumb component

export function DashboardLayoutView({ children }: { children: React.ReactNode }) {
	const appName = process.env.NEXT_PUBLIC_APP_NAME;
	const appColor = process.env.NEXT_PUBLIC_APP_COLOR;
	const pathname = usePathname();

	const [isDropdownOpen, setDropdownOpen] = useState(false);

	const closeDropdown = () => setDropdownOpen(false);

	const getLinkClassName = (href: string) => {
		if (href === "/dashboard/products" || href === "/dashboard/product") {
			return pathname.startsWith("/dashboard/product") ? "text-foreground font-bold" : "text-muted-foreground hover:text-foreground";
		}

		return pathname === href ? "text-foreground font-bold" : "text-muted-foreground hover:text-foreground";
	};

	//const isDashboard = pathname === "/dashboard"; // Exclude breadcrumb on the dashboard route

	return (
		<div className="flex min-h-screen w-full flex-col">
			<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
				<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-8">
					<Link
						href="/dashboard"
						className="flex items-center gap-2 me-12 text-lg font-semibold md:text-base">
						<Image
							isZoomed
							src="/images/assets/logo.svg"
							alt={appName}
							className="h-full w-full"
						/>
						<span className="sr-only">{appName}</span>
					</Link>
					<Link
						href="/dashboard"
						className={getLinkClassName("/dashboard")}>
						Dashboard
					</Link>
					<DropdownMenu
						open={isDropdownOpen}
						onOpenChange={setDropdownOpen}>
						<DropdownMenuTrigger asChild>
							<Link
								href="#"
								className={`${getLinkClassName("/dashboard/products")}`}>
								Products
							</Link>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="center"
							className="p-2">
							<DropdownMenuItem
								className="p-3"
								onClick={closeDropdown}>
								<Link
									href="/dashboard/products"
									className={getLinkClassName("/dashboard/products")}>
									View products
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem
								className="p-3"
								onClick={closeDropdown}>
								<Link
									href="/dashboard/add-products"
									className={getLinkClassName("/dashboard/add-products")}>
									Add a product
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem
								className="p-3"
								onClick={closeDropdown}>
								<Link
									href="/dashboard/product/catalogue"
									className={getLinkClassName("/dashboard/product/catalogue")}>
									Products Catalogue
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem
								className="p-3"
								onClick={closeDropdown}>
								<Link
									href="/dashboard/product/category"
									className={getLinkClassName("/dashboard/product/category")}>
									Products Category
								</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<Link
						href="/dashboard/customers"
						className={getLinkClassName("/dashboard/customers")}>
						Customers
					</Link>
					<Link
						href="/dashboard/analytics"
						className={getLinkClassName("/dashboard/analytics")}>
						Analytics
					</Link>
				</nav>
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							className="shrink-0 md:hidden">
							<Menu className="h-5 w-5" />
							<span className="sr-only">Toggle navigation menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left">
						<nav className="grid gap-6 text-lg font-medium">
							<Link
								href="/dashboard"
								className="flex items-center gap-2 text-lg font-semibold">
								<Image
									src="/images/assets/logo.svg"
									isZoomed
									alt={appName}
									className="h-auto w-32"
								/>
								<span className="sr-only">{appName}</span>
							</Link>
							<Link
								href="/dashboard"
								className={getLinkClassName("/dashboard")}>
								Dashboard
							</Link>
							<Link
								href="/orders"
								className={getLinkClassName("/orders")}>
								Orders
							</Link>
							<Link
								href="/dashboard/product/catalogue"
								className={getLinkClassName("/products")}>
								Products
							</Link>
							<Link
								href="/customers"
								className={getLinkClassName("/customers")}>
								Customers
							</Link>
							<Link
								href="/analytics"
								className={getLinkClassName("/analytics")}>
								Analytics
							</Link>
						</nav>
					</SheetContent>
				</Sheet>
				<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
					<form className="ml-auto flex-1 sm:flex-initial">
						<div className="relative">
							<Input
								type="search"
								placeholder="Search products..."
								className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
							/>
						</div>
					</form>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="rounded-full">
								<CircleUser className="h-5 w-5" />
								<span className="sr-only">Toggle user menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Link href="/auth/sign-up">Logout</Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>

			<main className="flex flex-grow flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 mb-20">
				<NextTopLoader
					crawl={true}
					color={appColor}
					showSpinner={true}
					easing="ease"
					zIndex={1600}
				/>

				
				{children}
			</main>
			<footer className="fixed bottom-0 bg-background border-t p-4 text-center w-full z-50">
				<div className="flex justify-between m-auto items-center gap-5">
					<p className="text-xs">
						&copy; {appName} {new Date().getFullYear()}.
					</p>
					<p className="text-xs animate-pulse">
						<Link
							target="_blank"
							href="https://www.google.com/search?client=opera&q=Abolade+Greatness&sourceid=opera&ie=UTF-8&oe=UTF-8">
							<>dev by thegrtnx</>
						</Link>
					</p>
				</div>
			</footer>
		</div>
	);
}
