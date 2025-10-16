export {};

declare global {
    interface FirebaseDatabaseMessage extends OpenAiMessage {
        id: string;
        createdAt?: string;
        answerToId?: string;
        timestamp?: string | number;
        metadata?: Record<string, any>;
    }
    interface FirebaseDatabaseMacros extends Partial<OpenAiMessage> {
        id: string;
        createdAt: string;
        timestamp?: string | number;
        macros?: Record<string, any>;
        answerToId?: string;
        type?: 'text' | 'voice' | 'photo';
    }
    type ChatType = 'fitness' | 'macros' | 'nutrition' | 'recipes' | 'calories';
}
