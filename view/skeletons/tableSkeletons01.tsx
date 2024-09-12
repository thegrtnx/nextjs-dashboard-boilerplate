export default function TableSkeleton01() {
	return (
		<div className="animate-pulse">
			{/* Skeleton for search input */}
			<div className="mb-5 w-full flex">
				<div className="w-full sm:w-1/2 h-10 bg-gray-200 rounded-lg"></div>
			</div>

			{/* Skeleton for table */}
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					{/* Table Header */}
					<thead>
						<tr>
							<th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">...</th>
							<th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">...</th>
							<th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">...</th>
							<th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">...</th>
							<th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">...</th>
						</tr>
					</thead>

					{/* Table Body */}
					<tbody className="divide-y divide-gray-200">
						{[...Array(3)].map((_, index) => (
							<tr key={index}>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="w-12 h-12 bg-gray-200 rounded-full"></div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="w-32 h-4 bg-gray-200 rounded"></div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="w-16 h-6 bg-gray-200 rounded"></div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="w-24 h-4 bg-gray-200 rounded"></div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="w-12 h-6 bg-gray-200 rounded"></div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Skeleton for pagination */}
			<div className="flex justify-center mt-5">
				<div className="h-10 w-40 bg-gray-200 rounded-lg"></div>
			</div>
		</div>
	);
}
