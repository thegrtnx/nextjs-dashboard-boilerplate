"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
	const router = useRouter();

	useEffect(() => {
		router.prefetch("/dashboard");
		router.replace("/dashboard");
	}, [router]);

	return <></>;
};

export default Home;
