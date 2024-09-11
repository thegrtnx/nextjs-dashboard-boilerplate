"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export default function DynamicBreadcrumb() {
	const pathname = usePathname();

	// Split the pathname into an array of segments
	const pathSegments = pathname.split("/").filter(Boolean);

	// Create a breadcrumb item for each segment
	const createBreadcrumb = () => {
		return pathSegments.map((segment, index) => {
			const href = "/" + pathSegments.slice(0, index + 1).join("/");

			// If it's the last segment, render it as a plain text, not as a link
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
		<Breadcrumb className="hidden md:flex">
			<BreadcrumbList>{createBreadcrumb()}</BreadcrumbList>
		</Breadcrumb>
	);
}
