import { deleteAllFoods } from 'api/foods';

export default async function deleteAllFoodsService(user: User) {
    await deleteAllFoods(user);
}
