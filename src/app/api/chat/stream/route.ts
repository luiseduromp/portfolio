import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { env } from "@/lib/config";

export async function POST(req: NextRequest) {
    const cookieStore = await cookies();
    const jwtCookie = cookieStore.get("chatbotJWT");
    const threadCookie = cookieStore.get("chatbotThreadId");

    if (!jwtCookie) {
        return new Response("Not authenticated", { status: 401 });
    }

    const token = jwtCookie.value;
    const threadId = threadCookie?.value;

    const body = await req.json();

    const backendRes = await fetch(env.CHATBOT_URL + "/generate-stream", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            question: body.question,
            chatHistory: body.chatHistory,
            thread_id: threadId,
        }),
    });

    if (!backendRes.ok || !backendRes.body) {
        return new Response("Error in chatbot message", {
            status: backendRes.status,
        });
    }

    // Proxy the streaming body directly
    return new Response(backendRes.body, {
        status: backendRes.status,
        headers: {
            "Content-Type":
                backendRes.headers.get("Content-Type") ?? "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
        },
    });
}