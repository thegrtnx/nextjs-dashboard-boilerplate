"use client";
import React, { ChangeEvent, ReactElement } from "react";
import { cn } from "@/lib";
import { Label } from "@/components/ui/label";
import { Input } from "@nextui-org/react";

interface FormFieldProps {
	label: string;
	htmlFor: string;
	type: string;
	id: string;
	variant: string;
	isInvalid: boolean;
	errorMessage: string;
	size: string;
	startcnt?: string | ReactElement;
	placeholder: string;
	reqValue?: string;
	onChange: (value: string) => void;
	required?: boolean;
	minLen?: number;
	maxLen?: number;
}

const FormField: React.FC<FormFieldProps> = ({ label, htmlFor, type, id, isInvalid, errorMessage, placeholder, startcnt, onChange, reqValue, required, minLen, maxLen }) => {
	return (
		<div className="flex flex-col space-y-1.5">
			<Label
				htmlFor={htmlFor}
				className={cn("mb-2 text-sm text-black")}>
				{label} <sup className="text-danger">{reqValue}</sup>
			</Label>
			<Input
				type={type}
				id={id}
				variant="bordered"
				classNames={{
					inputWrapper: ["data-[hover=true]:border-primary group-data-[focus=true]:border-primary"],
				}}
				size="lg"
				radius="md"
				required={required}
				placeholder={placeholder}
				startContent={startcnt}
				onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
				minLength={minLen}
				maxLength={maxLen}
			/>
			{isInvalid && <div className="text-red-500">{errorMessage}</div>}
		</div>
	);
};

export default FormField;
