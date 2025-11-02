export {};

declare global {
    interface OpenAiMessage {
        role: string;
        content: string;
        details?: any;
    }
}
