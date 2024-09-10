"use client";
import React, { ChangeEvent } from "react";
import { cn } from "@/lib";
import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@nextui-org/react";

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
	options: { label: string; value: string }[];
}

const SelectField: React.FC<SelectFieldProps> = ({ label, htmlFor, id, isInvalid, errorMessage, placeholder, reqValue, onChange, required, options }) => {
	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		onChange(event.target.value);
	};

	return (
		<div className="flex flex-col space-y-1.5">
			<Label
				htmlFor={htmlFor}
				className={cn("mb-2 text-sm text-black")}>
				{label} <sup className="text-danger">{reqValue}</sup>
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
						key={option.value}
						value={option.value}
						className="bg-transparent">
						{option.label}
					</SelectItem>
				))}
			</Select>
			{isInvalid && <div className="text-red-500">{errorMessage}</div>}
		</div>
	);
};

export default SelectField;
