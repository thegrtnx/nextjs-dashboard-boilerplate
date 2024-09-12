import React from "react";
import { Input } from "@nextui-org/react";

interface SearchInputProps {
	search: string;
	setSearch: (value: string) => void;
	placeholder: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ search, setSearch, placeholder }) => {
	return (
		<div className="mb-5 w-full flex">
			<Input
				placeholder={placeholder}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="w-full sm:w-1/2 p-2 rounded-lg"
				aria-label="Search"
			/>
		</div>
	);
};
