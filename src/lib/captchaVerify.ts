"use server"

import { env } from "@/lib/config";

interface Response {
  success: boolean;
  message: string;
}

export const captchaVerify = async (token:string): Promise<Response> => {
  try {
    const response = await fetch(env.RECAPTCHA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({         
        secret: env.RECAPTCHA_SECRET,
        response: token,
      }),
    });

    const data = await response.json();

    if(data.success){
      return {success:true, message:'Verificación reCAPTCHA exitosa'};
    } else {
      return {success:false, message:'Verificación reCAPTCHA fallida'};
    }
    
  } catch {
    return {success:true, message:'Error del Servidor'};
  }
}