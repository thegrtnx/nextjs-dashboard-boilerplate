"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile } from "@/lib";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const router = useRouter();

	useEffect(() => {
		const token = Cookies.get("token");

		if (!token) {
			router.replace("/auth/sign-in"); // Redirect to sign-in if no token
			return; // Exit early if there's no token
		}

		// Async code should be wrapped in an IIFE or use .then() and .catch()
		(async () => {
			try {
				const userProfile = await getUserProfile(token, { cache: "force-cache", revalidate: 60 });

				router.prefetch("/dashboard/*");

				if (userProfile.data.accountStatus === "ACTIVE" && (userProfile.data.role === "ADMIN" || userProfile.data.role === "MODERATOR")) {
					router.replace("/dashboard"); // Redirect to dashboard if user is authenticated and has the required role
				} else {
					router.replace("/auth/sign-in"); // Redirect to sign-in if user is not authenticated or doesn't have the required role
				}

				console.log(userProfile);
			} catch (error) {
				console.error("Failed to fetch user profile:", error);
				router.replace("/auth/sign-in"); // Redirect if fetching the profile fails
			}
		})();
	}, [router]);

	return <>{children}</>; // Render children if authenticated
};

export default ProtectedRoute;
