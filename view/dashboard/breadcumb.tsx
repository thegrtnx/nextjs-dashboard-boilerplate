"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

interface DynamicBreadcrumbProps {
	pageName: string; // Pass the page name dynamically
}

export default function DynamicBreadcrumb({ pageName }: DynamicBreadcrumbProps) {
	const pathname = usePathname();

	// Split the pathname into an array of segments
	const pathSegments = pathname.split("/").filter(Boolean);

	// Create a breadcrumb item for each segment
	const createBreadcrumb = () => {
		return pathSegments.map((segment, index) => {
			const href = "/" + pathSegments.slice(0, index + 1).join("/");

			// If it's the last segment, render it as plain text, not as a link
			const isLast = index === pathSegments.length - 1;

			return (
				<React.Fragment key={href}>
					<BreadcrumbItem>
						{isLast ? (
							<BreadcrumbPage>{capitalize(segment.replace("-", " "))}</BreadcrumbPage>
						) : (
							<BreadcrumbLink asChild>
								<Link href={href}>{capitalize(segment.replace("-", " "))}</Link>
							</BreadcrumbLink>
						)}
					</BreadcrumbItem>
					{!isLast && <BreadcrumbSeparator />}
				</React.Fragment>
			);
		});
	};

	return (
		<div className="flex flex-col md:flex-row items-start justify-between md:items-center mb-4">
			{/* Page Name on the left */}
			<h1 className="text-2xl font-bold mb-2 md:mb-0">{pageName}</h1>

			{/* Breadcrumb on the right (moves under the page name on mobile) */}
			<Breadcrumb className="flex">
				<BreadcrumbList>{createBreadcrumb()}</BreadcrumbList>
			</Breadcrumb>
		</div>
	);
}
