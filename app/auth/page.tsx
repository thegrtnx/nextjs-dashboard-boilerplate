"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Auth = () => {
	const router = useRouter();

	useEffect(() => {
		router.push("/auth/sign-in");
	}, [router]);

	return <></>;
};

export default Auth;
