export {};

declare global {
    interface FirebaseDatabaseMessage extends OpenAiMessage {
        id?: string | null;
        createdAt?: string;
        answerToId?: string;
        timestamp?: string | number;
        metadata?: Record<string, any>;
    }

    interface FirebaseDatabaseFoods extends Partial<OpenAiMessage> {
        id?: string | null;
        createdAt?: string;
        timestamp?: string | number;
        macros?: Record<string, any>;
        answerToId?: string | null;
        type?: 'text' | 'voice' | 'photo' | 'exercise';
        imageUrl?: string;
    }

    type ChatType = 'fitness' | 'macros' | 'nutrition' | 'recipes' | 'calories';

    interface FirebaseDatabaseExercises extends Partial<OpenAiMessage> {
        id?: string | null;
        createdAt: string;
        timestamp?: string | number;
        calories?: number | string;
        answerToId?: string | null;
        description?: string;
    }
}
