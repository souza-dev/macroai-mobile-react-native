import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import * as Crypto from 'expo-crypto';
import * as Localization from 'expo-localization';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { createMacrosService, readMacrosService } from 'services/macros';
import deleteMacrosService from 'services/macros/deleteMacrosService';
import getScoreService from 'services/score/getScoreService';
import extractMacroValues from 'utils/extractMacrosValue';

type MacroTotals = {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
};

type Score = {
    explain: string;
    score: string;
};

export default function useChatCalories(user: FirebaseAuthTypes.User) {
    const locale = Localization.getLocales()[0]?.languageCode || 'en';
    const apiUrl = process.env.EXPO_PUBLIC_CHECK_CALORIES as string;
    const [macros, setMacros] = useState<FirebaseDatabaseMacros[]>([]);
    const [loading, setLoading] = useState(false);
    const [removingLoading, setRemovingLoading] = useState(false);
    const [totals, setTotals] = useState<MacroTotals>({
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
    });
    const [diet, setDiet] = useState<string | null>(null);
    const [score, setScore] = useState<Score>({ score: '0', explain: '' });

    const [loadingResponse, setLoadingResponse] = useState(false);
    const [loadingScore, setLoadingScore] = useState(false);

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

    useEffect(() => {
        const summed = macros
            .filter((msg) => msg.role === 'assistant' && msg.macros)
            .reduce(
                (acc, msg) => ({
                    calories: acc.calories + Number(msg.macros?.calories || 0),
                    protein: acc.protein + Number(msg.macros?.proteins || 0),
                    carbs: acc.carbs + Number(msg.macros?.carbohydrates || 0),
                    fats: acc.fats + Number(msg.macros?.fats || 0),
                }),
                { calories: 0, protein: 0, carbs: 0, fats: 0 }
            );
        setTotals(summed);
    }, [macros]);

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
            setLoadingResponse(true);
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
            setLoadingResponse(false);
            // eslint-disable-next-line @typescript-eslint/no-shadow
            setMacros((prev) => [response, ...prev]);
            await evaluateScore(diet, [response, macrosInput, ...macros], locale);
        } catch (e: any) {
            throw new Error(e);
        } finally {
        }
    };

    const deleteMacros = async (id: string) => {
        try {
            setRemovingLoading(true);
            const findedMacro = macros.find((item) => item.id === id);
            if (!findedMacro) return;
            const newMacros = macros.filter((item) => item.id !== id);
            const newMacros2 = newMacros.filter((item) => item.id !== findedMacro.answerToId);
            setMacros(newMacros2);
            await deleteMacrosService(user, id);
            await deleteMacrosService(user, findedMacro.answerToId as string);
            await evaluateScore(diet, newMacros2, locale);
        } catch (e: any) {
            throw new Error(e);
        } finally {
            setRemovingLoading(false);
        }
    };

    const evaluateScore = async (diet: string | null, items: FirebaseDatabaseMacros[], locale: string) => {
        if (!diet) {
            Alert.alert('aviso', 'escolhar uma dieta');
        }
        setLoadingScore(true);
        const scoreResult = await getScoreService(diet as string, items, locale);
        console.log(scoreResult);
        setScore(scoreResult);
        setLoadingScore(false);
    };

    const handleSetDiet = async (diet: string) => {
        setDiet(diet);
        console.log('recalculando score para diet:', diet);
        await evaluateScore(diet, macros, locale);
    };

    return {
        macros,
        loadingResponse,
        totals,
        score,
        loadingScore,
        evaluateScore,
        handleSetDiet,
        loading,
        sendMacros,
        deleteMacros,
        removingLoading,
    };
}
