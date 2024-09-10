import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, createSchema, useField, GeneralSans_SemiBold, GeneralSans_Meduim, signinCall } from "@/lib";
import { FormField, PasswordField } from "@/components/reusables";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const UsernameSchema = createSchema((value) => value.length >= 2, "Please create a username");
const PasswordSchema = createSchema((value) => value.length >= 6, "Password must be at least 6 characters long");

const SigninView = () => {
	useEffect(() => {
		// Clear localStorage when the component unmounts
		const handleBeforeUnload = () => {
			localStorage.clear(); // Clear all localStorage
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	const { value: identifier, error: usernameError, handleChange: handleUsernameChange } = useField("", UsernameSchema);
	const { value: password, error: passwordError, handleChange: handlePasswordChange } = useField("", PasswordSchema);

	const [isLoad, setIsLoad] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);

	const router = useRouter();

	useEffect(() => {
		setIsDisabled(!password || !identifier);
	}, [password, identifier]);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setIsLoad(true);

		const signinDetails = { identifier, password };

		try {
			const userData = await signinCall(signinDetails);

			router.prefetch("/dashboard");

			toast.success("Account validated successfully", {
				style: {
					backgroundColor: "#4CAF50",
					color: "#fff",
				},
			});

			if (userData.data.user.accountStatus === "ACTIVE" && (userData.data.user.role === "ADMIN" || userData.data.user.role === "MODERATOR")) {
				// Determine the appropriate domain
				const isLocalhost = window.location.hostname === "localhost";
				const cookieDomain = isLocalhost ? "localhost" : process.env.NEXT_PUBLIC_COOKIE_DOMAIN;

				// Save user token to a cookie using 'js-cookie'
				Cookies.set("token", userData.data.token, {
					path: "/",
					sameSite: "Strict",
					expires: 7, // 7 days
					secure: cookieDomain !== "localhost", // Ensure secure is only true in production
					domain: cookieDomain, // Use the domain from environment variables
				});

				router.push("/dashboard");
			} else {
				router.replace("/auth/verify");
			}
		} catch (error: any) {
			toast.error(error.message || "Failed to validate account. Please try again.", {
				style: {
					backgroundColor: "#FF5722",
					color: "#fff",
				},
			});
		} finally {
			setIsLoad(false);
		}
	}

	return (
		<div className="h-full pt-5 flex justify-center items-center">
			<Card className="mx-auto bg-transparent border-none w-full">
				<CardHeader className="mb-3">
					<CardTitle className={cn("text-3xl", GeneralSans_SemiBold.className)}>Welcome Back</CardTitle>
					<CardDescription className="text-muted-foreground">Enter your information to access your dashboard</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="grid gap-7">
							<div className="grid gap-4">
								<FormField
									label="Enter your ID"
									reqValue="*"
									htmlFor="username"
									type="text"
									id="username"
									variant="bordered"
									isInvalid={!!usernameError}
									errorMessage={usernameError || ""}
									size="sm"
									placeholder="Input your email or phone or username"
									onChange={handleUsernameChange}
									required
								/>
							</div>

							<div className="grid gap-4">
								<PasswordField
									PasswordText="Password"
									placheolderText="Enter your password"
									passwordError={passwordError}
									handlePasswordChange={handlePasswordChange}
									showForgotPassword={true}
								/>
							</div>

							<Button
								className={cn("w-full p-6 mb-0 bg-primary text-black font-medium text-base", GeneralSans_Meduim.className)}
								size="md"
								radius="lg"
								isDisabled={isDisabled}
								isLoading={isLoad}
								type="submit">
								Access Dashboard
							</Button>
						</div>
					</form>
					<div className="mt-4 text-center text-muted-foreground text-sm">
						New here?{" "}
						<Link
							href="/auth/sign-up"
							className="underline">
							Create an account
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default SigninView;
