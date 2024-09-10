import React, { useState, useEffect } from "react";
import { Button, Checkbox } from "@nextui-org/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, createSchema, useField, GeneralSans_SemiBold, GeneralSans_Meduim, signupCall } from "@/lib";
import { FormField, PasswordField, SelectField, TextAreaField, SelectCountry } from "@/components/reusables";
import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const NameSchema = createSchema((value) => value.length >= 2, "Please enter your first name");
const LastNameSchema = createSchema((value) => value.length >= 2, "Please enter your last name");
const EmailSchema = z.string().email({ message: "Please enter a valid email address" });
const UsernameSchema = createSchema((value) => value.length >= 2, "Please create a username");
const AddressSchema = createSchema((value) => value.length >= 2, "Please input a valid address");
const refSchema = createSchema((value) => value.length >= 2, "Please input null if no one reffered you");
const PasswordSchema = createSchema((value) => value.length >= 6, "Password must be at least 6 characters long");
const TelSchema = createSchema((value) => value.length >= 2, "Please Input Telephone Number");
const GenderSchema = z.string().min(1, "Please select your Gender");
const CountrySchema = z.string().min(1, "Please select your Country");

const SignupView = () => {
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

	const { value: firstname, error: nameError, handleChange: handleNameChange } = useField("", NameSchema);
	const { value: lastname, error: lnameError, handleChange: handleLnameChange } = useField("", LastNameSchema);
	const { value: email, error: emailError, handleChange: handleEmailChange } = useField("", EmailSchema);
	const { value: telephone, error: telError, handleChange: handleTelChange } = useField("", TelSchema);

	const { value: username, error: usernameError, handleChange: handleUsernameChange } = useField("", UsernameSchema);
	const { value: password, error: passwordError, handleChange: handlePasswordChange } = useField("", PasswordSchema);
	const { value: address, error: addressError, handleChange: handleAddressChange } = useField("", AddressSchema);
	const { value: referall, error: refError, handleChange: handleRefChange } = useField("", refSchema);
	const { value: confirm_password, error: confirmPasswordError, handleChange: handleConfirmPasswordChange } = useField("", PasswordSchema);
	const { value: gender, error: genderError, handleChange: handleGenderChange } = useField("", GenderSchema);
	const { value: country, error: countryError, handleChange: handleCountryChange } = useField("", CountrySchema);

	const [isLoad, setIsLoad] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);
	const [isSelected, setIsSelected] = useState(false);

	const router = useRouter();

	useEffect(() => {
		setIsDisabled(!email || !firstname || !lastname || !telephone || !username || !password || !confirm_password || !gender || !address || !country || !referall || !isSelected);
	}, [confirm_password, email, gender, isSelected, firstname, lastname, password, username, address, country, referall, telephone]);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		setIsLoad(true);

		const role = "ADMIN";

		const signupDetails = { confirm_password, email, gender, firstname, lastname, password, username, address, country, referall, telephone, role };

		// Call the signup API
		try {
			await signupCall(signupDetails);

			// Handle successful signup
			toast.success("Signup successful!", {
				style: {
					backgroundColor: "#4CAF50",
					color: "#fff",
				},
			});

			// Save username to localStorage
			if (typeof window !== "undefined") {
				localStorage.setItem("username", username);
			}

			router.replace("/auth/verify");
		} catch (error: any) {
			// Handle error and show notification with Toastify
			toast.error(error.message || "Signup failed. Please try again.", {
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
		<>
			<Card className="mx-auto bg-transparent border-none lg:w-[65%] w-full">
				<CardHeader className="mb-3">
					<CardTitle className={cn("text-3xl", GeneralSans_SemiBold.className)}>Create an account</CardTitle>
					<CardDescription className="text-muted-foreground">Enter your information to get started</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="grid gap-7">
							<div className="grid lg:grid-cols-2 gap-7">
								<div className="grid gap-4">
									<FormField
										label="First Name"
										reqValue="*"
										htmlFor="name"
										type="text"
										id="FName"
										variant="bordered"
										isInvalid={!!nameError}
										errorMessage={nameError || ""}
										size="sm"
										placeholder="Input your name"
										onChange={handleNameChange}
										required
									/>
								</div>

								<div className="grid gap-4">
									<FormField
										label="Last Name"
										reqValue="*"
										htmlFor="name"
										type="text"
										id="LName"
										variant="bordered"
										isInvalid={!!lnameError}
										errorMessage={lnameError || ""}
										size="sm"
										placeholder="Input your surname"
										onChange={handleLnameChange}
										required
									/>
								</div>
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

								<div className="grid gap-4">
									<SelectField
										label="Gender"
										htmlFor="gender"
										id="Gender"
										isInvalid={!!genderError}
										errorMessage={genderError || ""}
										placeholder="Select your Gender"
										reqValue="*"
										onChange={handleGenderChange}
										options={[
											{ label: "Male", value: "Male" },
											{ label: "Female", value: "Female" },
										]}
									/>
								</div>

								<div className="grid gap-4">
									<FormField
										label="Username"
										reqValue="*"
										htmlFor="username"
										type="text"
										id="username"
										variant="bordered"
										isInvalid={!!usernameError}
										errorMessage={usernameError || ""}
										size="sm"
										placeholder="Create a unique username"
										onChange={handleUsernameChange}
										required
									/>
								</div>

								<div className="grid gap-4">
									<SelectCountry
										label="Country"
										htmlFor="country"
										id="country-select"
										isInvalid={!!countryError}
										errorMessage={countryError || ""}
										placeholder="Choose a country"
										reqValue="*"
										onChange={handleCountryChange}
										required={true}
									/>
								</div>

								<div className="grid gap-4">
									<PasswordField
										PasswordText="Create a strong password"
										placheolderText="Enter your password"
										passwordError={passwordError}
										handlePasswordChange={handlePasswordChange}
									/>
								</div>

								<div className="grid gap-4">
									<PasswordField
										PasswordText="Confirm your password"
										placheolderText="type your password"
										passwordError={confirmPasswordError}
										handlePasswordChange={handleConfirmPasswordChange}
									/>
								</div>

								<div className="grid gap-4">
									<FormField
										label="Referral"
										reqValue="*"
										htmlFor="ref"
										type="text"
										id="ref"
										variant="bordered"
										isInvalid={!!refError}
										errorMessage={refError || ""}
										size="sm"
										placeholder="Enter your refferal code"
										onChange={handleRefChange}
										required
									/>
								</div>

								<div className="grid gap-4">
									<FormField
										label="Telephone"
										reqValue="*"
										htmlFor="tel"
										type="number"
										id="tel"
										variant="bordered"
										isInvalid={!!telError}
										errorMessage={telError || ""}
										size="sm"
										placeholder="Input Phone Number"
										onChange={handleTelChange}
										required
									/>
								</div>
							</div>
							<div className="grid gap-4">
								<TextAreaField
									label="Address"
									htmlFor="address"
									id="address"
									placeholder="Please input your address here..."
									onChange={handleAddressChange}
									isInvalid={!!addressError}
									errorMessage={addressError || ""}
									required={true}
								/>
							</div>

							<div className="items-top flex space-x-2 mt-3 mb-3">
								<Checkbox
									size="lg"
									onChange={(e) => setIsSelected(e.target.checked)}
								/>
								<div className="grid gap-1.5 leading-none">
									<label
										htmlFor="terms1"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
										Accept terms and conditions
									</label>
									<p className="text-xs text-muted-foreground">
										You accept our{" "}
										<Link
											href="/policy/terms-of-service"
											target="_blank">
											<b>
												<u>Terms of Service</u>
											</b>
										</Link>
									</p>
								</div>
							</div>

							<Button
								className={cn("w-full p-6 mb-0 bg-primary text-black font-medium text-base", GeneralSans_Meduim.className)}
								size="md"
								radius="lg"
								isDisabled={isDisabled}
								isLoading={isLoad}
								type="submit">
								Create Account
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
		</>
	);
};

export default SignupView;
