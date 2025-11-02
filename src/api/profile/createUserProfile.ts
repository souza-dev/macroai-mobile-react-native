import { getDatabase, ref, set } from '@react-native-firebase/database';

export const createUserProfile = async (uid: string, data: Record<string, any>) => {
    try {
        const db = getDatabase();
        const profileRef = ref(db, `profile/${uid}`);
        await set(profileRef, data);
        console.log(`Perfil do usuário ${uid} criado com sucesso.`);
    } catch (error) {
        console.error('Erro ao criar perfil:', error);
        throw error;
    }
};
