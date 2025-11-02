import { getDatabase, push, ref, set } from '@react-native-firebase/database';

export async function createFood(user: User, data: FirebaseDatabaseFoods) {
    if (user === null || data === null) {
        throw new Error('missing-parameter');
    }
    const db = getDatabase();
    const foodsRef = ref(db, `/foods/${user.uid}`);
    const newFoodsRef = push(foodsRef);

    const newData = {
        ...data,
        id: newFoodsRef.key,
        timestamp: Date.now(),
    };
    await set(newFoodsRef, newData);
    return newData;
}
