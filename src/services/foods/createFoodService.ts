import { createFood } from 'api/foods';

export default async function createFoodService(user: User, data: FirebaseDatabaseFoods) {
    const res = await createFood(user, data);
    return res;
}
