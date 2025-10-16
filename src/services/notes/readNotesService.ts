import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { readNotes } from 'api/notes';

export default async function readNotesService(
    user: FirebaseAuthTypes.User,
    type: 'fitness' | 'macros' | 'nutrition' | 'recipes'
) {
    try {
        const notes = await readNotes(user, type);
        return notes;
    } catch (error) {
        throw error;
    }
}
