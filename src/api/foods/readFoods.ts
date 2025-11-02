import { endAt, get, getDatabase, orderByChild, query, ref, startAt } from '@react-native-firebase/database';
import { endOfDay, startOfDay } from 'date-fns';

export async function readFoods(user: User, date = new Date()) {
    if (!user) {
        throw new Error('Missing user parameter');
    }

    if (!date) {
        throw new Error('Missing date parameter');
    }
    console.log('lendo com o user', user.uid);
    const db = getDatabase();

    const start = startOfDay(date);
    const end = endOfDay(date);
    const startMs = start.getTime();
    const endMs = end.getTime();
    console.log(`Getting messages from ${start} to ${end}`);
    const dbRef = query(ref(db, `/foods/${user.uid}`), orderByChild('timestamp'), startAt(startMs), endAt(endMs));

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
