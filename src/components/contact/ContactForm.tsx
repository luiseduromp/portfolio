'use client'

import React, { useState, useCallback } from 'react'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { CustomFormField } from '@/components/contact/CustomFormField'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, CircleX } from 'lucide-react'
import { useReCaptcha } from 'next-recaptcha-v3';
import { cn } from '@/lib/utils'
import { LoadingButton } from '../buttons/LoadingButton'

const formSchema = z.object({
    name: z.string().min(2, { message: 'Your name should be at least 2 characters long' }),
    email: z.string().email({ message: 'Provide a valid email address' }),
    message: z.string()
})

export const ContactForm = ({className}: React.HTMLAttributes<HTMLDivElement>) => {
    const [isLoading, setIsLoading ] = useState(false);
    const [formStatus, setFormStatus ] = useState<'sent'|'error'|null>(null);
    const { executeRecaptcha } = useReCaptcha();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: ""
        },
    })

    async function sendEmail(values: z.infer<typeof formSchema>, token: string) {
        setIsLoading(true)

        try {
            await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...values, token})
            })

            setFormStatus('sent')
            form.reset()

        } catch {
            console.log("Error")
            setFormStatus('error')
        } finally {
            setIsLoading(false)
        }
    }

    const onSubmit = useCallback( async (values: z.infer<typeof formSchema>) => {
        const token = await executeRecaptcha('contact_form');
        if (!token) return;
        sendEmail(values, token)
    }, [executeRecaptcha])

    return (
        <div className={cn("px-8 py-8 bg-neutral-900 rounded-xl border border-neutral-800", className)}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >
                    <h3 className="text-center mb-4 text-xl md:text-2xl lg:text-4xl font-bold">Contact Me</h3>
                    <p className="text-neutral-300 text-lg lg:text-xl mb-6 text-center">Leave your email and I will contact you.</p>

                    <CustomFormField control={form.control} fieldtype="input" name="name" label="Name" placeholder="Name" />

                    <CustomFormField control={form.control} fieldtype="input" name="email" label="Email" placeholder="Email" />

                    <CustomFormField control={form.control} fieldtype="textarea" name="message" label="Message" placeholder="Message" />

                    {formStatus && <div className={cn("px-4 py-2 transition-all duration-300 justify-center items-center rounded-full invisible mb-4 text-black flex", 
                        formStatus === 'sent' ? "bg-teal-200 visible":"bg-red-600 text-white visible")}
                    >
                        {formStatus === 'sent' ? 
                            <><Check className="h-6 me-1"/> Thanks! Your Message was sent.</> :
                            <><CircleX className="h-6 me-1"/> Something wrong. Please try again.</>
                        }
                    </div>}

                    <LoadingButton isLoading={isLoading} type="submit" className="w-full justify-center mt-8" >Send</LoadingButton>

                </form>
            </Form>
        </div>
    )
}