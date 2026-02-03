import { ChatMessage } from "@/stores/chatStore";

type StreamCallback = {
    onChunk?: (chunk: string) => void;
    onEnd?: () => void;
    onError?: (error: unknown) => void;
}

export async function streamChatMessage(message: string, chatHistory: ChatMessage[], callback: StreamCallback) {
    const { onChunk, onEnd, onError } = callback;
    let fullAnswer = "";
    let buffer = "";

    try {
        const response = await fetch("/api/chat/stream", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                question: message,
                chatHistory,
            }),
        });

        if (!response.ok || !response.body) {
            throw new Error("Error in chatbot message");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        let done = false;

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;

            if (!value) continue;

            const chunkText = decoder.decode(value, { stream: !done });

            if (!chunkText) continue;

            buffer += chunkText;

            const events = buffer.split("\n\n");
            buffer = events.pop() ?? "";

            for (const event of events) {
                const lines = event.split("\n");
                for (const line of lines) {
                    if (!line.startsWith("data:")) continue;

                    const data = line.slice(5);

                    if (!data) continue;

                    if (data === "[DONE]") {
                        done = true;
                        break;
                    }

                    fullAnswer += data;
                    onChunk?.(data);
                }
            }
        }

        onEnd?.();
        return fullAnswer;
    } catch (err) {
        console.error(err);
        onError?.(err);
        throw err;
    }
}
