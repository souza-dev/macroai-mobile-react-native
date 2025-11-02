import { getDatabase, ref, update } from '@react-native-firebase/database';

export const updateUserProfile = async (user: User, data: Record<string, any>) => {
    const db = getDatabase();
    console.log('atualizando perfil:', user.uid);
    const profileRef = ref(db, `/profiles/${user.uid}`);
    const dataWithTimestamp = {
        ...user,
        ...data,
        updatedAt: Date.now(),
    };
    await update(profileRef, dataWithTimestamp);
};
