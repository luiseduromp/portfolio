"use server";

import { env } from "@/lib/config";
import { cookies } from "next/headers";
import { ChatMessage } from "@/stores/chatStore";

export const chatInit = async () => {
  try {
    const response = await fetch(env.CHATBOT_URL + "/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: env.CHATBOT_USERNAME,
        password: env.CHATBOT_PASSWORD,
      }),
    });

    if (!response.ok) {
      console.log(response);
      return { success: false, message: "Error in chatbot initialization" };
    }

    const data = await response.json();
    const accessToken = data.access_token;
    const threadId = data.thread_id;

    const cookieStore = await cookies();

    cookieStore.set("chatbotJWT", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60,
      path: "/",
    });

    if (threadId) {
      cookieStore.set("chatbotThreadId", threadId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60,
        path: "/",
      });
    }

    return { success: true, message: "Chatbot initialized successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error in chatbot initialization" };
  }
};

export const chatMessage = async (
  message: string,
  chatHistory: ChatMessage[],
) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("chatbotJWT");
  const threadIdCookie = cookieStore.get("chatbotThreadId");

  if (!cookie) {
    return { success: false, message: "Not authenticated" };
  }

  const token = cookie.value;
  const threadId = threadIdCookie?.value;

  try {
    const response = await fetch(env.CHATBOT_URL + "/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        question: message,
        chatHistory: chatHistory,
        thread_id: threadId,
      }),
    });

    if (!response.ok) {
      console.log(response);
      return { success: false, message: "Error in chatbot message" };
    }

    const data = await response.json();

    return { success: true, message: data.answer };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error in chatbot message" };
  }
};
