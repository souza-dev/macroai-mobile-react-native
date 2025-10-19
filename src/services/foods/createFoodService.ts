import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createFood } from 'api/foods';

export default async function createFoodService(user: FirebaseAuthTypes.User, data: FirebaseDatabaseFoods) {
    const res = await createFood(user, data);
    return res;
}
