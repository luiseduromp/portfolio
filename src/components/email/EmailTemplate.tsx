import { Html, Tailwind, Body, Container, Img, Section, Heading, Text } from "@react-email/components";
import * as React from "react";

export interface ContactFormInterface {
    name: string;
    email: string;
    message?: string;
}

const keyNames = {
    name: 'Nombre',
    email: 'Correo',
    message: 'Mensaje'
}

const MEDIA_URL = "https://d2ajrhz4pdxgd1.cloudfront.net"

export function EmailTemplate( contactFormData:ContactFormInterface ) {
    return (
        <Html>
            <Tailwind>
                <Body>
                    <Container className="border border-neutral-900 rounded-xl px-8 pt-8 pb-4 bg-neutral-50">
                        <Section className="mt-2 mb-8">
                            <Img src={`${MEDIA_URL}/logo.png`} height="40" width="120" alt="luiseduromp.com" />
                        </Section>
                        <Heading as="h1" className="text-2xl">
                            Message from Website
                        </Heading>
                        <Text className="text-neutral-600">
                            New message from the Portfolio Website
                        </Text>
                        <Heading as="h3" className="text-lg">
                            Contact Data
                        </Heading>
                        <Section className="mb-4">
                            {
                                (Object.keys(keyNames) as Array<keyof ContactFormInterface>).map((key) => (
                                    <Text className="mt-0 mb-1 text-neutral-600" key={key}>
                                        <b>{keyNames[key]}: </b>{contactFormData[key]}
                                    </Text>
                                ))
                            }
                        </Section>

                    </Container>

                </Body>

            </Tailwind>
        </Html>
    );
}