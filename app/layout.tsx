import type { Metadata, Viewport } from "next";
import { MaxWidthWrapper, cn, ThemeProvider, CheckInternet } from "@/lib";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "sonner";
import "./globals.css";

const appName = process.env.NEXT_PUBLIC_APP_NAME || "App";
const appColor = process.env.NEXT_PUBLIC_APP_COLOR || "#000000";

export const metadata: Metadata = {
	title: `${appName} | Dashboard`,
	description: "",
};

export const viewport: Viewport = {
	themeColor: appColor,
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			suppressHydrationWarning>
			<body className={cn("m-auto min-h-screen scroll-smooth bg-head antialiased")}>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange>
					<MaxWidthWrapper>{children}</MaxWidthWrapper>
					<Toaster
						position="top-right"
						expand={false}
					/>
					<CheckInternet />
					<GoogleTagManager gtmId="GTM-W59NSFR9" />
					<GoogleAnalytics gaId="G-LH0GVB63LM" />
				</ThemeProvider>
			</body>
		</html>
	);
}
