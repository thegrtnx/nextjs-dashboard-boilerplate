"use client";
import React, { ChangeEvent, useMemo } from "react";
import { cn } from "@/lib";
import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@nextui-org/react";
import countryList from "react-select-country-list";

interface SelectFieldProps {
	label: string;
	htmlFor: string;
	id: string;
	isInvalid: boolean;
	errorMessage: string;
	placeholder: string;
	reqValue?: string;
	onChange: (value: string) => void;
	required?: boolean;
}

const SelectCountry: React.FC<SelectFieldProps> = ({ label, htmlFor, id, isInvalid, errorMessage, placeholder, reqValue, onChange, required }) => {
	// Generate country list using useMemo
	const options = useMemo(() => countryList().getData(), []);

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		onChange(event.target.value);
	};

	return (
		<div className="flex flex-col space-y-1.5">
			<Label
				htmlFor={htmlFor}
				className={cn("mb-2 text-sm text-black")}>
				{label} {required && <sup className="text-danger">{reqValue}</sup>}
			</Label>
			<Select
				id={id}
				aria-label={label}
				required={required}
				placeholder={placeholder}
				onChange={(value) => handleChange(value)}
				radius="md"
				size="lg"
				variant="bordered"
				classNames={{
					base: "border-primary",
				}}>
				{options.map((option) => (
					<SelectItem
						key={option.label}
						value={option.label}
						className="bg-transparent">
						{option.label}
					</SelectItem>
				))}
			</Select>
			{isInvalid && <div className="text-red-500">{errorMessage}</div>}
		</div>
	);
};

export default SelectCountry;
