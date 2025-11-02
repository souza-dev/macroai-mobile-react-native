import { useUser } from '@contexts/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

export default function useChatCalories() {
    const { user } = useUser();
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
                const data = await readFoodService(user);
                console.log(data);
                setFoods(data);
            } catch (e: any) {
                throw new Error(e);
            }
        };
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
        console.log(summed);
        setTotals(summed);
    }, [foods]);

    const sendFoods = async (content: string, type: FirebaseDatabaseFoods['type'], imageUrl?: string) => {
        const input: OpenAiMessage = {
            role: 'user',
            content,
        };
        const time = new Date();
        const foodsInput: FirebaseDatabaseFoods = {
            role: 'user',
            content,
            createdAt: time.toISOString(),
            type: 'text',
        };
        //TODO: Aqui começa a pensarm então aqui tem q colocar o card temporario
        const tempId = `temp-${Date.now()}`;
        const tempMessage = {
            id: tempId,
            loading: true,
            role: 'assistant',
            type,
        } as FirebaseDatabaseFoods;

        // setFoods((prev) => [tempMessage, ...prev]);

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

            const resJson = await res.json();
            const extract = extractMacroValues(resJson.content);
            console.log(extract);
            if (!extract || extract.length === 0) {
                setLoadingResponse(false);
                throw new Error('food-not-recognized');
            }
            //Manda o input do usuário pro DB
            const inputRes = await createFoodsService(user as User, foodsInput);
            setFoods((prev) => [...prev, inputRes]);

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
                            proteins: item.proteins,
                            fats: item.fats,
                        },
                        answerToId: inputRes.id,
                        imageUrl: type === 'photo' ? imageUrl : undefined,
                        type,
                    };

                    // retorna o resultado da promise
                    const responseRes = await createFoodsService(user as User, data);
                    return responseRes;
                })
            );

            setLoadingResponse(false);
            //TODO: Aqui termina de pensar então aqui que remover o card temporário.

            //Coloca a resposta da OpenAI como comidas separadas.
            setFoods((prev) => [...prev, ...newFoods]);
            await evaluateScore(diet, [...foods, ...newFoods], locale);
        } catch (error) {
            throw error;
        } finally {
            setLoadingResponse(false);
            setLoadingScore(false);
        }
    };

    const removeFood = async (id: string) => {
        try {
            setRemovingLoading(true);
            const findedFood = foods.find((item) => item.id === id);
            if (!findedFood) return;
            const newFoods = foods.filter((item) => item.id !== id);
            const newFoods2 = newFoods.filter((item) => item.id !== findedFood.answerToId);
            setFoods(newFoods2);
            await deleteMacrosService(user as User, id);
            await deleteMacrosService(user as User, findedFood.answerToId as string);
            await evaluateScore(diet, newFoods2, locale);
            setRemovingLoading(false);
        } catch (error) {
            throw error;
        } finally {
            setLoadingResponse(false);
            setLoadingScore(false);
        }
    };

    const evaluateScore = async (diet: string | null, items: FirebaseDatabaseFoods[], locale: string) => {
        if (!diet) {
            throw new Error('diet-not-selected');
        }
        try {
            setLoadingScore(true);
            const scoreResult = await getScoreService(diet as string, items, locale);
            setScore(scoreResult);
            setLoadingScore(false);
        } catch (error) {
            throw error;
        } finally {
            setLoadingResponse(false);
            setLoadingScore(false);
        }
    };

    const handleSetDiet = async (diet: string) => {
        await AsyncStorage.setItem('@diet', diet);
        setDiet(diet);
        await evaluateScore(diet, foods, locale);
    };

    const addExercise = async (calories: number) => {
        const exerciseInput: FirebaseDatabaseFoods = {
            role: 'assistant',
            content: 'Exercise',
            macros: { foodName: 'Exercise', calories: -calories },
            createdAt: new Date().toISOString(),
            type: 'exercise',
        };
        const res = await createFoodsService(user as User, exerciseInput);
        setFoods((prev) => [...prev, res]);
    };

    return {
        foods,
        loadingResponse,
        setLoadingResponse,
        totals,
        score,
        loadingScore,
        setLoadingScore,
        evaluateScore,
        diet,
        handleSetDiet,
        loading,
        sendFoods,
        removeFood,
        removingLoading,
        addExercise,
        setFoods,
    };
}
