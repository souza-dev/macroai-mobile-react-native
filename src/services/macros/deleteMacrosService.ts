import { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { deleteMacros } from 'api/macros';

export default async function deleteMeacrosService(user: FirebaseAuthTypes.User, id: string) {
    try {
        await deleteMacros(user, id);
    } catch (error) {
        throw error;
    }
}
