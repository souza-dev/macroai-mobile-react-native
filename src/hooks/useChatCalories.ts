import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import * as Crypto from 'expo-crypto';
import { useEffect, useState } from 'react';
import { createMacrosService, readMacrosService } from 'services/macros';
import deleteMacrosService from 'services/macros/deleteMacrosService';
import getScoreService from 'services/score/getScoreService';
import extractMacroValues from 'utils/extractMacrosValue';

export default function useChatCalories(user: FirebaseAuthTypes.User) {
    const apiUrl = process.env.EXPO_PUBLIC_CHECK_CALORIES as string;
    const [macros, setMacros] = useState<FirebaseDatabaseMacros[]>([]);
    const [loading, setLoading] = useState(false);
    const [removingLoading, setRemovingLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            return;
        }
        const loadMacros = async () => {
            try {
                const msgs = await readMacrosService(user);
                setMacros(msgs.reverse());
            } catch (e: any) {
                throw new Error(e);
            }
        };
        console.log('carregando os macros');
        loadMacros();
    }, [user]);

    const sendMacros = async (content: string, type: FirebaseDatabaseMacros['type']) => {
        const input: OpenAiMessage = {
            role: 'user',
            content,
        };
        const time = new Date();
        const macrosInputId = Crypto.randomUUID();
        const macrosInput: FirebaseDatabaseMacros = {
            id: macrosInputId,
            role: 'user',
            content,
            createdAt: time.toISOString(),
            timestamp: time.getTime(),
        };

        try {
            setLoading(true);
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify([input]),
            });

            if (!res.ok) {
                throw new Error(`Erro na requisição: ${res.status} ${res.statusText}`);
            }

            const data = await res.json();

            const extract = extractMacroValues(data.content);
            if (!extract || extract.length === 0) {
                throw new Error('food-not-identified');
            }
            setMacros((prev) => [macrosInput, ...prev]);

            await createMacrosService(user, macrosInput);

            const response: FirebaseDatabaseMacros = {
                id: Crypto.randomUUID(),
                content: data.content,
                role: data.role,
                createdAt: time.toISOString(),
                timestamp: time.getTime(),
                macros: extract[0],
                answerToId: macrosInputId,
                type,
            };
            await createMacrosService(user, response);
            const score = await getScoreService('ketogenic', [response, macrosInput, ...macros], 'pt');
            console.log(score);
            // eslint-disable-next-line @typescript-eslint/no-shadow
            setMacros((prev) => [response, ...prev]);
        } catch (e: any) {
            throw new Error(e);
        } finally {
            setLoading(false);
        }
    };

    const deleteMacros = async (id: string) => {
        try {
            setRemovingLoading(true);
            const findedMacro = macros.find((item) => item.id === id);
            if (!findedMacro) return;
            console.log('Macro encontrado', findedMacro);
            const newMacros = macros.filter((item) => item.id !== id);
            const newMacros2 = newMacros.filter((item) => item.id !== findedMacro.answerToId);

            setMacros(newMacros2);
            await deleteMacrosService(user, id);
            await deleteMacrosService(user, findedMacro.answerToId as string);

            const score = await getScoreService('ketogenic', newMacros2, 'pt');
            console.log(score);
        } catch (e: any) {
            throw new Error(e);
        } finally {
            setRemovingLoading(false);
        }
    };

    return {
        macros,
        loading,
        sendMacros,
        deleteMacros,
        removingLoading,
    };
}
