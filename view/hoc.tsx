"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getUserProfile } from "@/lib";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const router = useRouter();
	const pathName = usePathname();

	useEffect(() => {
		const token = Cookies.get("token");

		if (!token) {
			router.replace("/auth/sign-in"); // Redirect to sign-in if no token
			return; // Exit early if there's no token
		}

		// Async code should be wrapped in an IIFE or use .then() and .catch()
		(async () => {
			try {
				const userProfile = await getUserProfile(token, { cache: "no-store", revalidate: 0 });

				router.prefetch("/dashboard/*");

				if (userProfile.data.accountStatus === "ACTIVE" && (userProfile.data.role === "ADMIN" || userProfile.data.role === "MODERATOR")) {
					if (pathName === "/dashboard") {
						router.replace("/dashboard"); // Redirect to dashboard if user is authenticated and has the required role
					} else {
						router.replace(`${pathName}`); // Redirect to active path if user is authenticated and has the required role
					}
				} else {
					router.replace("/auth/sign-in"); // Redirect to sign-in if user is not authenticated or doesn't have the required role
				}
			} catch (error) {
				console.error("Failed to fetch user profile:", error);
				router.replace("/auth/sign-in"); // Redirect if fetching the profile fails
			}
		})();
	}, [pathName, router]);

	return <>{children}</>;
};

export default ProtectedRoute;
