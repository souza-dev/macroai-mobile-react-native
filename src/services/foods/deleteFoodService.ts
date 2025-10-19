import { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { deleteFood } from 'api/foods';

export default async function deleteFoodService(user: FirebaseAuthTypes.User, id: string) {
    await deleteFood(user, id);
}
