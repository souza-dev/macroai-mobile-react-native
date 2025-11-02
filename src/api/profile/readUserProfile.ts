import { get, getDatabase, ref } from '@react-native-firebase/database';

export const readUserProfile = async (uid: string) => {
    const db = getDatabase();
    const profileRef = ref(db, `/profiles/${uid}`);
    const snapshot = await get(profileRef);
    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        return null;
    }
};
