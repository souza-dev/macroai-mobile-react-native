import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { deleteAllFoods } from 'api/foods';

export default async function deleteAllFoodsService(user: FirebaseAuthTypes.User) {
    await deleteAllFoods(user);
}
