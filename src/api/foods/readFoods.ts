import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { get, getDatabase, limitToLast, query, ref } from '@react-native-firebase/database';

export async function readFoods(user: FirebaseAuthTypes.User) {
    if (!user) {
        throw new Error('Missing parameter');
    }

    const db = getDatabase();
    const dbRef = query(ref(db, `/foods/${user.uid}`), limitToLast(30));

    const snapshot = await get(dbRef);

    if (!snapshot.exists()) return [];

    const data: any[] = [];
    snapshot.forEach((item) => {
        data.push({
            id: item.key,
            ...item.val(),
        });
        return undefined;
    });

    return data;
}
