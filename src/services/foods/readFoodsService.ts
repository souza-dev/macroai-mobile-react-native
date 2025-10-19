import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { readFoods } from 'api/foods';

export default async function readFoodsService(user: FirebaseAuthTypes.User) {
    const data = await readFoods(user);
    return data;
}
