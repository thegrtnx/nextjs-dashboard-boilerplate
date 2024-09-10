"use client";
import React, { ReactElement } from "react";
import { cn } from "@/lib";
import { Label } from "@/components/ui/label";
import { Textarea } from "@nextui-org/react";

interface TextFieldProps {
	label: string;
	htmlFor: string;
	id: string;
	isInvalid: boolean;
	errorMessage: string;
	placeholder: string;
	value?: string;
	onChange: (value: string) => void;
	required?: boolean;
	startContent?: string | ReactElement;
	minLen?: number;
	maxLen?: number;
	rows?: number;
}

const TextAreaField: React.FC<TextFieldProps> = ({ label, htmlFor, id, isInvalid, errorMessage, placeholder, value, onChange, required, minLen, maxLen, rows = 4 }) => {
	const handleChange = (value: string) => {
		onChange(value);
	};

	return (
		<div className="flex flex-col space-y-1.5">
			<Label
				htmlFor={htmlFor}
				className={cn("mb-2 text-sm text-black")}>
				{label} {required && <sup className="text-danger">*</sup>}
			</Label>
			<Textarea
				id={id}
				placeholder={placeholder}
				value={value}
				onValueChange={handleChange}
				required={required}
				minLength={minLen}
				maxLength={maxLen}
				rows={rows}
				radius="md"
				variant="bordered"
				classNames={{
					inputWrapper: ["data-[hover=true]:border-primary group-data-[focus=true]:border-primary"],
				}}
			/>
			{isInvalid && <div className="text-red-500">{errorMessage}</div>}
		</div>
	);
};

export default TextAreaField;
