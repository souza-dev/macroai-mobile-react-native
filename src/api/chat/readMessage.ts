import { get, getDatabase, limitToLast, query, ref } from '@react-native-firebase/database';

export async function readMessage(user: User, type: ChatType) {
    if (!user || !type) {
        throw new Error('Missing parameter');
    }

    try {
        const db = getDatabase();
        const dbRef = query(ref(db, `/chat/${user.uid}/${type}`), limitToLast(30));

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
    } catch (e: any) {
        throw new Error(e.message || String(e));
    }
}
