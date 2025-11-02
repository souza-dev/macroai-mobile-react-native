import { useUser } from '@contexts/userContext';
import { addWeeks, eachDayOfInterval, endOfWeek, getDay, startOfWeek, subWeeks } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ButtonGroup from '@components/custom-ui/ButtonGroup';
import DrawerButton from '@components/custom-ui/DrawerButton';
import Header from '@components/custom-ui/Header';
import Heading from '@components/custom-ui/Heading';
import Screen from '@components/custom-ui/Screen';
import VStack from '@components/custom-ui/VStack';
import StatisticCard from '@components/features/fast/StatisticsCard';
import WeeklyChart from '@components/features/fast/WeeklyChart';
import ChartWeekControl from '@components/features/statistics/ChartWeekControl';

import { seedFoodsLastWeek } from 'script/seedFoods';
import readFoodsService from 'services/foods/readFoodsService';

const StatsScreen = () => {
    const BRAZIL_TZ = 'America/Sao_Paulo';
    const { t } = useTranslation('statistics');
    const { user } = useUser();

    const [currentWeekDate, setCurrentWeekDate] = useState(new Date());
    const [start, setStart] = useState<Date>();
    const [end, setEnd] = useState<Date>();

    const [data, setData] = useState<any[]>([]);
    const [average, setAverage] = useState(0);
    const [max, setMax] = useState(0);
    const [min, setMin] = useState(0);
    const [sum, setSum] = useState(0);
    const [maxLabel, setMaxLabel] = useState('');
    const [minLabel, setMinlabel] = useState('');
    const [goal, setGoal] = useState(1000);
    const [goalLabel, setGoalLabel] = useState('');

    // Funções para navegar entre semanas
    const handleNextWeek = () => setCurrentWeekDate((prev) => addWeeks(prev, 1));
    const handlePreviousWeek = () => setCurrentWeekDate((prev) => subWeeks(prev, 1));

    // Carrega os alimentos da semana
    const loadWeeklyFoods = async (weekDate: Date) => {
        if (!user) return;
        // Converte para fuso horário do Brasil
        console.log(weekDate.toLocaleString());
        console.log(weekDate.toUTCString());
        const startW = startOfWeek(weekDate, { weekStartsOn: 0 }); // domingo
        const endW = endOfWeek(weekDate, { weekStartsOn: 0 }); // sábado
        setStart(startW);
        setEnd(endW);

        const weekDays = eachDayOfInterval({ start: startW, end: endW });
        const weeklyData: {
            day: string;
            calories: number;
            carbs: number;
            fats: number;
            proteins: number;
        }[] = [];

        for (const day of weekDays) {
            const foods = await readFoodsService(user, day);

            // Somando macros
            const totalCalories = foods.reduce((acc, f) => acc + Number(f.macros?.calories || 0), 0);
            const totalCarbs = foods.reduce((acc, f) => acc + Number(f.macros?.carbohydrates || 0), 0);
            const totalFats = foods.reduce((acc, f) => acc + Number(f.macros?.fats || 0), 0);
            const totalProteins = foods.reduce((acc, f) => acc + Number(f.macros?.proteins || 0), 0);

            weeklyData.push({
                day: day.toLocaleDateString('pt-BR', { weekday: 'short' }),
                calories: totalCalories,
                carbs: totalCarbs,
                fats: totalFats,
                proteins: totalProteins,
            });
        }

        setData(weeklyData);
        console.log(weeklyData);
        // Cálculos gerais
        const caloriesArray = weeklyData.map((d) => d.calories);
        const sumVal = caloriesArray.reduce((acc, val) => acc + val, 0);
        const maxVal = Math.max(...caloriesArray);
        const todayIndex = getDay(new Date()); // domingo = 0
        const minValUntilToday = Math.min(...caloriesArray.slice(0, todayIndex + 1));

        setSum(sumVal);
        setAverage(sumVal / weeklyData.length);
        setMax(maxVal);
        setMaxLabel(weeklyData.find((d) => d.calories === maxVal)?.day ?? '');
        setMin(minValUntilToday);
        setMinlabel(weeklyData.find((d) => d.calories === minValUntilToday)?.day ?? '');
    };

    useEffect(() => {
        loadWeeklyFoods(currentWeekDate);
    }, [currentWeekDate, user]);

    // Transformando dados para o WeeklyChart
    const chartData = {
        sun: data[0]?.calories ?? 0,
        mon: data[1]?.calories ?? 0,
        tue: data[2]?.calories ?? 0,
        wed: data[3]?.calories ?? 0,
        thu: data[4]?.calories ?? 0,
        fri: data[5]?.calories ?? 0,
        sat: data[5]?.calories ?? 0,
    };

    const handleSeedFoods = async () => {
        if (!user) return;
        await seedFoodsLastWeek(user, 5);
        await loadWeeklyFoods(currentWeekDate);
    };

    return (
        <Screen>
            <Header>
                <DrawerButton />
            </Header>
            <VStack style={{ marginBottom: 100 }}>
                <Heading>{t('title')}</Heading>

                <WeeklyChart data={chartData} maxValue={user?.maxCalories as number} />

                <ChartWeekControl
                    date={`${start?.toLocaleDateString()} - ${end?.toLocaleDateString()}`}
                    increase={handleNextWeek}
                    decrease={handlePreviousWeek}
                />
                {/* <Button title="Gerar alimentos de teste" onPress={handleSeedFoods} /> */}

                <ButtonGroup>
                    <StatisticCard title={t('avg_intake')} value={average.toFixed(1)} />
                    <StatisticCard title={t('consumption_week')} value={sum} />
                    <StatisticCard title={t('high_consumption')} value={max} />
                    <StatisticCard title={t('low_consumption')} value={min} />
                </ButtonGroup>
            </VStack>
        </Screen>
    );
};

export default StatsScreen;
