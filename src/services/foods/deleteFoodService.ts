import { deleteFood } from 'api/foods';

export default async function deleteFoodService(user: User, id: string) {
    await deleteFood(user, id);
}
