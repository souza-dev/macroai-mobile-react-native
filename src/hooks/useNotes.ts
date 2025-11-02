import { useNotesContext } from '@contexts/notesContext';
import { useEffect, useState } from 'react';
import { createNoteService, deleteAllNotesService, deleteNoteService, readNotesService } from 'services/notes';

export default function useNotes(user: User, type?: NotesTypes) {
    const { notes, setNotes } = useNotesContext();

    const [loading, setLoading] = useState(false);
    const [loadingSave, setLoadingSave] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadingDeleteAll, setLoadingDeleteAll] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    if (!user) {
        throw new Error('useNotes can only be used when the user is authenticated.');
    }

    useEffect(() => {
        if (!user) {
            return;
        }
        loadNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const loadNotes = async () => {
        try {
            setLoading(true);
            if (type === undefined) return;
            let newNotes: Note[] = [];
            if (type === 'all') {
                const recipesNotes = await readNotesService(user, 'recipes');
                const fitnessNotes = await readNotesService(user, 'fitness');
                const nutritionNotes = await readNotesService(user, 'nutrition');
                const macrosNotes = await readNotesService(user, 'macros');
                newNotes = [...recipesNotes, ...fitnessNotes, ...nutritionNotes, ...macrosNotes];
            } else {
                newNotes = await readNotesService(user, type);
            }

            setNotes(newNotes);
        } catch (e: any) {
            throw new Error(e);
        } finally {
            setLoading(false);
        }
    };

    const saveNote = async (message: FirebaseDatabaseMessage) => {
        if (!user) return;
        if (!type) return;

        try {
            const date = new Date();
            const newNote = {
                id: date.getTime().toString(),
                title: `${date.toDateString()} ${date.toLocaleTimeString()}`,
                content: message.content,
                createdAt: date.toString(),
                fromMessageId: message.id,
                tag: type,
            };
            setLoadingSave(true);
            await createNoteService(user, newNote, type);
            setNotes((prevNotes: Note[]) => [...prevNotes, newNote]);
        } catch (e: any) {
            throw new Error(e);
        } finally {
            setLoadingSave(false);
        }
    };

    const deleteNote = async (id: string) => {
        if (!user) return;

        try {
            setLoadingDelete(true);
            if (type) {
                await deleteNoteService(user, id, type);
            } else {
                await deleteNoteService(user, id, 'recipes');
                await deleteNoteService(user, id, 'fitness');
                await deleteNoteService(user, id, 'nutrition');
                await deleteNoteService(user, id, 'macros');
            }

            const newNotes = notes.filter((item: Note) => item.id !== id);
            setNotes(newNotes);
        } catch (e: any) {
            throw new Error(e);
        } finally {
            setLoadingDelete(false);
        }
    };

    const deleteAllNotes = async () => {
        if (!user) return;
        if (!type) return;

        try {
            setLoadingDeleteAll(true);
            await deleteAllNotesService(user, type);
            setNotes([]);
        } catch (e: any) {
            throw new Error(e);
        } finally {
            setLoadingDeleteAll(false);
        }
    };

    return {
        loading,
        loadingSave,
        loadingDelete,
        loadingDeleteAll,
        notes,
        loadNotes,
        saveNote,
        deleteNote,
        deleteAllNotes,
    };
}
