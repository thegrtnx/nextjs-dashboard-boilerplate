import React, { Suspense } from "react";
import { CatalogueView } from "@/view";
import { DynamicBreadcrumb } from "@/lib";
import TableSkeleton from "./loading";

const Catalogue = () => {
	return (
		<>
			<DynamicBreadcrumb pageName="Product Catalogue" />
			<Suspense fallback={<TableSkeleton />}>
				<CatalogueView />
			</Suspense>
		</>
	);
};

export default Catalogue;
