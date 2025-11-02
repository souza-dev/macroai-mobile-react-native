import { getDatabase, ref } from '@react-native-firebase/database';
import { addDays, endOfDay, startOfDay } from 'date-fns';

const foodsList = ['Banana', 'Maçã', 'Arroz', 'Feijão', 'Frango', 'Peixe', 'Ovo', 'Pão', 'Leite', 'Queijo'];

// Gera um número aleatório entre min e max (inclusive)
function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Gera macros aleatórios
function generateRandomMacros(name: string) {
    const calories = randomInt(50, 550);
    const carbs = randomInt(5, 100);
    const fats = parseFloat((Math.random() * 20).toFixed(1));
    const proteins = parseFloat((Math.random() * 50).toFixed(1));

    return {
        calories: calories.toString(),
        carbohydrates: carbs.toString(),
        fats: fats.toString(),
        proteins: proteins.toString(),
        foodName: name,
    };
}

// Gera um alimento aleatório no formato desejado
function generateRandomFoodData(timestamp: number) {
    const name = foodsList[randomInt(0, foodsList.length - 1)];
    return {
        answerToId: null, // ou você pode gerar algum ID aleatório se quiser relacionar
        content: name,
        createdAt: new Date(timestamp).toISOString(),
        macros: generateRandomMacros(name),
        role: 'assistant',
        type: 'text',
        timestamp,
    };
}

// Função que gera alimentos distribuídos nos últimos 7 dias
export async function seedFoodsLastWeek(user: User, maxFoodsPerDay = 5) {
    if (!user) throw new Error('Missing user');

    const db = getDatabase();
    const userRef = ref(db, `/foods/${user.uid}`);

    const today = new Date();

    for (let i = 0; i < 7; i++) {
        const day = addDays(today, -i);
        const dayStart = startOfDay(day).getTime();
        const dayEnd = endOfDay(day).getTime();

        const foodsCount = randomInt(1, maxFoodsPerDay);

        for (let j = 0; j < foodsCount; j++) {
            const timestamp = randomInt(dayStart, dayEnd);
            const foodData = generateRandomFoodData(timestamp);

            // push() do Firebase vai gerar o "id" automaticamente
            const newRef = await userRef.push(foodData);

            // adiciona o id retornado pelo push() dentro do objeto
            await newRef.update({ id: newRef.key });

            console.log(`Dia ${day.toDateString()} -> Adicionado:`, foodData);
        }
    }

    console.log(`Alimentos gerados para os últimos 7 dias do usuário ${user.uid}`);
}
