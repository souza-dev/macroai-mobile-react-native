import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import * as Localization from 'expo-localization';
import { useEffect, useState } from 'react';
import { createFoodsService, readFoodService } from 'services/foods';
import deleteMacrosService from 'services/foods/deleteFoodService';
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
    const [loading, setLoading] = useState(false);
    const [removingLoading, setRemovingLoading] = useState(false);
    const [totals, setTotals] = useState<MacroTotals>({
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
    });

    const [foods, setFoods] = useState<FirebaseDatabaseFoods[]>([]);
    const [diet, setDiet] = useState<string | null>(null);
    const [score, setScore] = useState<Score>({ score: '0', explain: '' });

    const [loadingResponse, setLoadingResponse] = useState(false);
    const [loadingScore, setLoadingScore] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('@diet');
                if (value !== null) {
                    console.log('Setando o diet para:', value);
                    setDiet(value);
                }
            } catch (e) {
                // error reading value
            }
        };
        getData();
    }, []);

    useEffect(() => {
        if (!user) {
            return;
        }
        const loadMacros = async () => {
            try {
                const msgs = await readFoodService(user);
                setFoods(msgs.reverse());
            } catch (e: any) {
                throw new Error(e);
            }
        };
        console.log('Carregando os foods');
        loadMacros();
    }, [user]);

    useEffect(() => {
        const summed = foods
            .filter((msg) => msg.role === 'assistant' || (msg.role === 'system' && msg.macros))
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
    }, [foods]);

    const sendFoods = async (content: string, type: FirebaseDatabaseFoods['type']) => {
        const input: OpenAiMessage = {
            role: 'user',
            content,
        };
        const time = new Date();
        const foodsInput: FirebaseDatabaseFoods = {
            role: 'user',
            content,
            createdAt: time.toISOString(),
        };

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

        const resJson = await res.json();
        const extract = extractMacroValues(resJson.content);
        console.log(extract);
        if (!extract || extract.length === 0) {
            setLoadingResponse(false);
            throw new Error('food-not-recognized');
        }
        const inputRes = await createFoodsService(user, foodsInput);
        console.log(inputRes);
        setFoods((prev) => [inputRes, ...prev]);

        const newFoods: FirebaseDatabaseFoods[] = await Promise.all(
            extract.map(async (item) => {
                const data = {
                    content: item.foodName,
                    role: resJson.role,
                    createdAt: time.toISOString(),
                    macros: {
                        foodName: item.foodName,
                        calories: item.calories,
                        carbohydrates: item.carbohydrates,
                        protein: item.proteins,
                        fats: item.fats,
                    },
                    answerToId: inputRes.id,
                    type,
                };

                // retorna o resultado da promise
                const responseRes = await createFoodsService(user, data);
                return responseRes;
            })
        );

        setLoadingResponse(false);
        console.log('newFoods:', newFoods);
        setFoods((prev) => [...newFoods, ...prev]);
        await evaluateScore(diet, [...newFoods, ...foods], locale);
    };

    const removeFood = async (id: string) => {
        setRemovingLoading(true);
        const findedFood = foods.find((item) => item.id === id);
        if (!findedFood) return;
        const newFoods = foods.filter((item) => item.id !== id);
        const newFoods2 = newFoods.filter((item) => item.id !== findedFood.answerToId);
        setFoods(newFoods2);
        await deleteMacrosService(user, id);
        await deleteMacrosService(user, findedFood.answerToId as string);
        await evaluateScore(diet, newFoods2, locale);
        setRemovingLoading(false);
    };

    const evaluateScore = async (diet: string | null, items: FirebaseDatabaseFoods[], locale: string) => {
        if (!diet) {
            throw new Error('diet-not-selected');
        }
        setLoadingScore(true);
        const scoreResult = await getScoreService(diet as string, items, locale);
        console.log(scoreResult);
        setScore(scoreResult);
        setLoadingScore(false);
    };

    const handleSetDiet = async (diet: string) => {
        //Salvar no async storage
        await AsyncStorage.setItem('@diet', diet);
        setDiet(diet);
        console.log('recalculando score para diet:', diet);
        await evaluateScore(diet, foods, locale);
    };

    const addExercise = async (calories: number) => {
        const exerciseInput: FirebaseDatabaseFoods = {
            role: 'system',
            macros: { calories: -calories },
            createdAt: new Date().toISOString(),
            type: 'exercise',
        };
        const res = await createFoodsService(user, exerciseInput);
        setFoods((prev) => [res, ...prev]);
    };

    return {
        foods,
        loadingResponse,
        totals,
        score,
        loadingScore,
        evaluateScore,
        diet,
        handleSetDiet,
        loading,
        sendFoods,
        removeFood,
        removingLoading,
        addExercise,
    };
}
