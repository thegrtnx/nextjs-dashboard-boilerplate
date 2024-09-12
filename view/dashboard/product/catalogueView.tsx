import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Image, Chip, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { EllipsisVerticalIcon } from "lucide-react";
import { getAllProductCatalog, formatDate, filterData, sortData } from "@/lib";
import { TableComponent, SearchInput } from "@/components/reusables";
import TableSkeleton01 from "@/view/skeletons/tableSkeletons01";

// Define columns for the table
const columns = [
	{ uid: "sn", name: "SN" },
	{ uid: "catalogImage", name: "Catalogue Image" },
	{ uid: "catalogName", name: "Catalog Name" },
	{ uid: "status", name: "Status" },
	{ uid: "dateCreated", name: "Date Created" },
	{ uid: "actions", name: "" },
];

// Chip color map based on catalog status
const statusColorMap: { [key in "ACTIVE" | "DRAFT" | "DISABLED"]: "success" | "warning" | "danger" } = {
	ACTIVE: "success",
	DRAFT: "warning",
	DISABLED: "danger",
};

export default function CatalogueView() {
	const [productCatalog, setProductCatalog] = useState<any[]>([]);
	const [filteredCatalog, setFilteredCatalog] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [search, setSearch] = useState<string>("");
	const [page, setPage] = useState<number>(1);
	const rowsPerPage = 2;

	// Fetch the product catalog data
	useEffect(() => {
		(async () => {
			try {
				const productCatalogData = await getAllProductCatalog({
					cache: "force-cache",
					revalidate: 60,
				});
				const sortedCatalog = sortData(productCatalogData?.data || [], "catalogName");
				setProductCatalog(sortedCatalog);
				setFilteredCatalog(sortedCatalog);
			} catch (error) {
				console.error("Failed to fetch Product Catalog:", error);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	// Handle search and filter logic
	useEffect(() => {
		const filteredData = filterData(productCatalog, search, ["catalogName", "catalogStatus"]);
		setFilteredCatalog(filteredData);
		setPage(1);
	}, [search, productCatalog]);

	// Pagination logic
	const paginatedData = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		return filteredCatalog.slice(start, start + rowsPerPage);
	}, [page, filteredCatalog]);

	const totalPages = Math.ceil(filteredCatalog.length / rowsPerPage);

	// Function to render cells in the table
	const renderCell = useCallback(
		(catalog: any, columnKey: React.Key) => {
			switch (columnKey) {
				case "sn":
					return productCatalog.indexOf(catalog) + 1; // Calculate SN based on the position in the original dataset
				case "catalogImage":
					return (
						<Image
							isZoomed
							src={catalog.catlogImage} // Ensure the correct image property name
							alt={catalog.catalogName}
							width={50}
							height={50}
							className="object-cover rounded-xl"
						/>
					);
				case "catalogName":
					return catalog.catalogName;
				case "status":
					const status = catalog.catalogStatus as keyof typeof statusColorMap;
					return (
						<Chip
							color={statusColorMap[status]}
							size="sm">
							{catalog.catalogStatus}
						</Chip>
					);
				case "dateCreated":
					return formatDate(catalog.dateCreated);
				case "actions":
					return (
						<Dropdown>
							<DropdownTrigger>
								<Button
									isIconOnly
									variant="flat">
									<EllipsisVerticalIcon className="text-muted-foreground" />
								</Button>
							</DropdownTrigger>
							<DropdownMenu>
								<DropdownItem
									key="edit"
									onClick={() => console.log("Edit", catalog.catalogId)}>
									Edit
								</DropdownItem>
								<DropdownItem
									key="delete"
									color="danger"
									onClick={() => console.log("Delete", catalog.catalogId)}>
									Delete
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					);
				default:
					return catalog[columnKey as keyof typeof catalog];
			}
		},
		[productCatalog] // Include productCatalog in the dependencies
	);

	return (
		<>
			{loading ? (
				<TableSkeleton01 />
			) : (
				<>
					<SearchInput
						search={search}
						setSearch={setSearch}
						placeholder="Search by catalog name or status..."
					/>
					<TableComponent
						columns={columns}
						data={paginatedData}
						renderCell={renderCell}
						page={page}
						setPage={setPage}
						totalPages={totalPages}
					/>
				</>
			)}
		</>
	);
}
