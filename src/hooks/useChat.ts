import { useEffect, useState } from 'react';

import * as Crypto from 'expo-crypto';
import omit from 'lodash/omit';

import { createMessageService, deleteAllMessagesService, readMessageService } from 'services/chat';
import deleteMessageService from 'services/chat/deleteMessageService';

interface ChatInputOptions {
    apiUrlOverride?: string;
    promptOverride?: string;
    metadata?: Record<string, any>;
}

export default function useChat(user: User, type: ChatType, options?: ChatInputOptions) {
    const defaultApiUrl = process.env.EXPO_PUBLIC_API_CHAT as string;
    const apiUrl = options?.apiUrlOverride ?? defaultApiUrl;

    const [loading, setLoading] = useState(false);
    const [removingLoading, setRemovingLoading] = useState(false);
    const [messages, setMessages] = useState<FirebaseDatabaseMessage[]>([
        {
            id: Crypto.randomUUID(),
            role: 'system',
            content:
                options?.promptOverride ??
                "You are AiDiet, a large language model trained, powered, developed and maintained by AI Assistant Corporation. Follow the user's instructions carefully. You are an assistant nutritionist who will inform details about foods. Respond and show me the sources of the information.",
        },
    ]);

    if (!user) {
        throw new Error('useNotes can only be used when the user is authenticated.');
    }

    useEffect(() => {
        if (!user) {
            return;
        }
        const loadMessages = async () => {
            try {
                const msgs = await readMessageService(user, type);
                setMessages(msgs.reverse());
            } catch (e: any) {
                throw new Error(e);
            }
        };
        loadMessages();
    }, [user, type]);

    const sendMessage = async (
        content: string,
        overrides?: {
            apiUrl?: string;
            prompt?: string;
            metadata?: Record<string, any>;
        }
    ): Promise<string> => {
        const effectiveApiUrl = overrides?.apiUrl ?? apiUrl;
        const inputId = Date.now().toString();
        const input: FirebaseDatabaseMessage = {
            id: inputId,
            role: 'user',
            content,
            createdAt: new Date().toISOString(),
        };

        setMessages((prev) => [input, ...prev]);
        const systemPrompt = overrides?.prompt ? [{ role: 'system', content: overrides.prompt }] : [];
        const messagesForAI = [
            ...systemPrompt,
            ...messages.map((m) => omit(omit(m, 'id'), 'createdAt')),
            omit(omit(input, 'id'), 'createdAt'),
        ];
        try {
            await createMessageService(user, input, type);
            setLoading(true);
            const res = await fetch(effectiveApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify(messagesForAI),
            });

            if (!res.ok) {
                throw new Error(`Erro na requisição: ${res.status} ${res.statusText}`);
            }

            const data = await res.json();

            const response: FirebaseDatabaseMessage = {
                ...data,
                id: Date.now().toString(),
                createdAt: new Date().toISOString(),
                answerToId: inputId,
                metadata: overrides?.metadata ?? options?.metadata,
            };
            await createMessageService(user, response, type);
            // eslint-disable-next-line @typescript-eslint/no-shadow
            setMessages((prev) => [response, ...prev]);
            return response.content;
        } catch (e: any) {
            throw new Error(e);
        } finally {
            setLoading(false);
        }
    };

    const deleteAllMsgs = async () => {
        try {
            setRemovingLoading(true);
            await deleteAllMessagesService(user, type);
            setMessages([]);
        } catch (e: any) {
            throw new Error(e);
        } finally {
            setRemovingLoading(false);
        }
    };

    const deleteMessage = async (id: string) => {
        try {
            setRemovingLoading(true);
            setMessages((prev) => prev.filter((msg) => msg.id !== id));
            await deleteMessageService(user, id, type);
        } catch (e: any) {
            throw new Error(e);
        } finally {
            setRemovingLoading(false);
        }
    };

    return {
        loading,
        setLoading,
        messages,
        sendMessage,
        setMessages,
        deleteAllMsgs,
        removingLoading,
        deleteMessage,
    };
}
