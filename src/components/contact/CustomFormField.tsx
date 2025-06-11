'use client'

import React from 'react'
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Control, ControllerRenderProps } from 'react-hook-form'
import { cn } from '@/lib/utils'


interface CustomInputProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>,
    fieldtype: 'input' | 'textarea'
    name: string,
    label?: string,
    placeholder?: string,
    hasError?: boolean,
    disabled?: boolean,
    children?: React.ReactNode,
}


const RenderField = ({ field, props }: { field: ControllerRenderProps, props: CustomInputProps}) => {
    const { fieldtype, placeholder } = props;
  
    switch(fieldtype){
        case 'input':
            return (
                <FormControl className="relative block rounded-md border border-neutral-500 focus-within:ring-2 focus within:border-teal-200 focus-within:border-teal-200 text-neutral-200" {...props}>
                    <input type="text" placeholder={placeholder} {...field}
                        className={cn("w-full px-5 py-2 focus-visible:outline-0 text-neutral-100 placeholder:text-neutral-500")}
                    />
                </FormControl>
            )

        case 'textarea':
            return (
                <FormControl className="relative block rounded-md border border-neutral-500 focus-within:ring-2 focus within:border-teal-200 focus-within:border-teal-200 text-neutral-200" {...props}>
                    <textarea {...field} rows={3} placeholder={placeholder}
                        className={cn("w-full px-5 py-2 focus-visible:outline-0 text-neutral-100 placeholder:text-neutral-500")}
                    ></textarea>
                </FormControl>
            )
    } 
}

export const CustomFormField = (props: CustomInputProps) => {
    const { control, name } = props;
    return (
        <FormField control={ control } name={ name } render={({ field }) => (
            <FormItem className="mb-5">
                <RenderField field={field} props={props} />
                <FormMessage className="text-xs text-red-400 font-secondary" />
            </FormItem>
        )} />
    )
}