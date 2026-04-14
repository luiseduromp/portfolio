"use client";

import React from "react";
import type {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

type CustomInputProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  fieldtype: "input" | "textarea";
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  hasError?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
};

function RenderField<TFieldValues extends FieldValues>({
  field,
  props,
}: {
  field: ControllerRenderProps<TFieldValues, FieldPath<TFieldValues>>;
  props: CustomInputProps<TFieldValues>;
}) {
  const { fieldtype, placeholder } = props;

  switch (fieldtype) {
    case "input":
      return (
        <FormControl
          className="relative block rounded-md border border-neutral-500 focus-within:ring-2 focus within:border-teal-200 focus-within:border-teal-200 text-neutral-200"
          {...props}
        >
          <input
            type="text"
            placeholder={placeholder}
            {...field}
            className={cn(
              "w-full px-5 py-2 focus-visible:outline-0 text-neutral-100 placeholder:text-neutral-500",
            )}
          />
        </FormControl>
      );

    case "textarea":
      return (
        <FormControl
          className="relative block rounded-md border border-neutral-500 focus-within:ring-2 focus within:border-teal-200 focus-within:border-teal-200 text-neutral-200"
          {...props}
        >
          <textarea
            {...field}
            rows={3}
            placeholder={placeholder}
            className={cn(
              "w-full px-5 py-2 focus-visible:outline-0 text-neutral-100 placeholder:text-neutral-500",
            )}
          ></textarea>
        </FormControl>
      );
  }
}

export const CustomFormField = <TFieldValues extends FieldValues>(
  props: CustomInputProps<TFieldValues>,
) => {
  const { control, name } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="mb-5">
          <RenderField<TFieldValues> field={field} props={props} />
          <FormMessage className="text-xs text-red-400 font-secondary" />
        </FormItem>
      )}
    />
  );
};
