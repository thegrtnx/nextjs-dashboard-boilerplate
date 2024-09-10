"use client";

import { ReactNode } from "react";
import { cn } from "@/lib";
import { NextUIProvider } from "@nextui-org/react";

export function MaxWidthWrapper({ className, children }: { className?: string; children: ReactNode }) {
	return (
		<main className={cn("", className)}>
			<NextUIProvider>{children}</NextUIProvider>
		</main>
	);
}
