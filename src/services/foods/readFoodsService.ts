import { readFoods } from 'api/foods';

export default async function readFoodsService(user: User, date?: Date) {
    const data = await readFoods(user, date);
    return data;
}
