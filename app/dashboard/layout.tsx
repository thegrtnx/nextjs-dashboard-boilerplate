import { DashboardLayoutView, ProtectedRoute } from "@/view";
async function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<ProtectedRoute>
			<DashboardLayoutView>{children}</DashboardLayoutView>
		</ProtectedRoute>
	);
}

export default DashboardLayout;
