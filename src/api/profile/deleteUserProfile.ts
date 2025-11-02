import { getDatabase, ref, remove } from '@react-native-firebase/database';

export const deleteUserProfile = async (user: User) => {
    try {
        const db = getDatabase();
        const profileRef = ref(db, `profiles/${user.uid}`);
        await remove(profileRef);
        console.log(`Perfil do usuário ${user.uid} deletado com sucesso.`);
    } catch (error) {
        console.error('Erro ao deletar perfil:', error);
        throw error;
    }
};
