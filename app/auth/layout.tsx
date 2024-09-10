import { AuthLayoutView } from "@/view";

async function AuthLayout({ children }: { children: React.ReactNode }) {
	return <AuthLayoutView>{children}</AuthLayoutView>;
}

export default AuthLayout;
