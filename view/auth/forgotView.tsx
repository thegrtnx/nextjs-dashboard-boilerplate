import React, { useState, useEffect } from "react";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, useField, GeneralSans_SemiBold, GeneralSans_Meduim, resendOtp } from "@/lib";
import { FormField } from "@/components/reusables";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const EmailSchema = z.string().email({ message: "Please enter a valid email address" });

const ForgotView = () => {
	useEffect(() => {
		// This function will run when the component mounts
		const handleBeforeUnload = () => {
			localStorage.clear(); // Clear all localStorage
		};

		// Attach event listener for the 'beforeunload' event
		window.addEventListener("beforeunload", handleBeforeUnload);

		// Cleanup the event listener when the component unmounts
		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	const { value: email, error: emailError, handleChange: handleEmailChange } = useField("", EmailSchema);

	const [isLoad, setIsLoad] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);

	const router = useRouter();

	useEffect(() => {
		setIsDisabled(!email);
	}, [email]);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		setIsLoad(true);

		const identifier = email;

		// Call the signup API
		try {
			await resendOtp(identifier);

			// Handle successful signup
			toast.success("Otp Sent successful!", {
				style: {
					backgroundColor: "#4CAF50",
					color: "#fff",
				},
			});

			// Set the email in localStorage after successfully sending the OTP
			if (typeof window !== "undefined") {
				localStorage.setItem("email", identifier);
			}

			router.replace("/auth/reset-password");
		} catch (error: any) {
			// Handle error and show notification with Toastify
			toast.error(error.message || "Failed to send OTP. Please try again.", {
				style: {
					backgroundColor: "#FF5722",
					color: "#fff",
				},
			});
		} finally {
			// Set loading state to false regardless of success or failure
			setIsLoad(false);
		}
	}

	return (
		<div className="h-full pt-5 flex justify-center items-center">
			<Card className="mx-auto bg-transparent border-none w-full">
				<CardHeader className="mb-3">
					<CardTitle className={cn("text-3xl", GeneralSans_SemiBold.className)}>Forgot Password</CardTitle>
					<CardDescription className="text-muted-foreground">Let&apos;s help you retrieve your account</CardDescription>
				</CardHeader>
				<CardContent className="w-full">
					<form onSubmit={handleSubmit}>
						<div className="grid gap-7">
							<div className="grid gap-4">
								<FormField
									label="Email Address"
									reqValue="*"
									htmlFor="email"
									type="email"
									id="email"
									variant="bordered"
									isInvalid={!!emailError}
									errorMessage={emailError || ""}
									size="sm"
									placeholder="Enter your email address"
									onChange={handleEmailChange}
									required
								/>
							</div>

							<Button
								className={cn("w-full p-6 mb-0 bg-primary text-black font-medium text-base", GeneralSans_Meduim.className)}
								size="md"
								radius="lg"
								isDisabled={isDisabled}
								isLoading={isLoad}
								type="submit">
								Recover Password
							</Button>
						</div>
					</form>
					<div className="mt-4 text-center text-muted-foreground text-sm">
						Already have an account?{" "}
						<Link
							href="/auth/sign-in"
							className="underline">
							Sign in
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default ForgotView;
