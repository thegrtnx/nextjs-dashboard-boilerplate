import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";

interface Column {
	uid: string;
	name: string;
}

interface TableComponentProps {
	columns: Column[];
	data: any[];
	renderCell: (item: any, columnKey: React.Key, index: number) => React.ReactNode;
	page: number;
	setPage: (page: number) => void;
	totalPages: number;
}

export const TableComponent: React.FC<TableComponentProps> = ({ columns, data, renderCell, page, setPage, totalPages }) => {
	return (
		<>
			<div className="overflow-x-auto">
				<Table aria-label="Product Catalog Table">
					<TableHeader columns={columns}>{(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}</TableHeader>
					<TableBody items={data}>
						{(item) => (
							<TableRow key={item.catalogId}>
								{columns.map((column, index) => (
									<TableCell key={column.uid}>{renderCell(item, column.uid, index)}</TableCell>
								))}
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			{totalPages > 1 && (
				<Pagination
					total={totalPages}
					initialPage={1}
					onChange={setPage}
					page={page}
					className="my-5 space-x-7"
				/>
			)}
		</>
	);
};
