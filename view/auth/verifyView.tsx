"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { CountdownTimer } from "nextjs-countdown-timer";
import { GeneralSans_SemiBold, GeneralSans_Meduim, cn, resendOtp, validateOtp } from "@/lib";
import { Button } from "@nextui-org/react";
import { PenIcon } from "lucide-react";
import { toast } from "sonner";

const VerifyView = () => {
	const [isLoad, setIsLoad] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);

	const [otp, setOtp] = useState("");
	const [showResend, setShowResend] = useState(false);

	const [username, setUsername] = useState<string | null>(null);

	const generatePlaceholder = () => {
		const numInputs = 4;
		return "-".repeat(numInputs);
	};

	const identifier = username;
	const router = useRouter();

	// Check if the username is in localStorage, if not redirect to sign-in
	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedUsername = localStorage.getItem("username");
			if (!storedUsername) {
				// Redirect to the sign-in page if username is not found in localStorage
				router.push("/auth/sign-in");
			} else {
				setUsername(storedUsername);
			}
		}
	}, [router]);

	const handleResendClick = async () => {
		try {
			await resendOtp(identifier);

			// Handle successful signup
			toast.success("Otp Sent successful!", {
				style: {
					backgroundColor: "#4CAF50",
					color: "#fff",
				},
			});
		} catch (error: any) {
			// Handle error and show notification with Toastify
			toast.error(error.message || "Failed to send OTP. Please try again.", {
				style: {
					backgroundColor: "#FF5722",
					color: "#fff",
				},
			});
		} finally {
			setShowResend(false);
		}
	};

	const handleTimerEnd = () => {
		setTimeout(() => {
			setShowResend(true);
		}, 0);
	};

	useEffect(() => {
		setIsDisabled(otp.length != 4);
	}, [otp]);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		setIsLoad(true);

		const otpDetails = { identifier, otp };

		try {
			await validateOtp(otpDetails);

			// Handle successful signup
			toast.success("Account Validated successfully", {
				style: {
					backgroundColor: "#4CAF50",
					color: "#fff",
				},
			});

			// Clear the specific 'username' from localStorage
			if (typeof window !== "undefined") {
				localStorage.removeItem("username");
			}

			router.push("/dashboard");
		} catch (error: any) {
			// Handle error and show notification with Toastify
			toast.error(error.message || "Failed to validate OTP. Please try again.", {
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
			<Card className="mx-auto bg-transparent border-none">
				<CardHeader className="mb-3 w-full items-center justify-center">
					<CardTitle className={cn("text-3xl", GeneralSans_SemiBold.className)}>Verify your account</CardTitle>
					<CardDescription className="text-muted-foreground">
						OTP code has been sent to your{" "}
						<Link href="/auth/signup">
							<u>
								email <PenIcon className="inline-flex w-4" />
							</u>
						</Link>
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="grid gap-7">
							<div className="otp w-full items-center justify-center">
								<OtpInput
									value={otp}
									onChange={setOtp}
									numInputs={4}
									containerStyle="otpbox"
									placeholder={generatePlaceholder()}
									inputType="text"
									renderSeparator={<span>&nbsp;</span>}
									renderInput={(props) => (
										<input
											disabled={isLoad}
											{...props}
											autoComplete="off"
										/>
									)}
								/>
							</div>

							<p className={cn("pt-5 text-base text-center text-muted-foreground", GeneralSans_Meduim.className)}>
								No code yet?{" "}
								{showResend ? (
									<button
										className="text-debizOrange"
										type="button"
										onClick={handleResendClick}>
										Resend OTP
									</button>
								) : (
									<>
										Resend in{" "}
										<CountdownTimer
											initialSeconds={60}
											onTimerEnd={handleTimerEnd}
										/>
									</>
								)}
							</p>

							<Button
								className="w-[90%] lg:w-[80%] m-auto justify-center items-center text-center flex p-6 bg-primary text-black font-medium text-base"
								size="lg"
								radius="md"
								isDisabled={isDisabled}
								isLoading={isLoad}
								type="submit">
								Verify Account
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default VerifyView;
