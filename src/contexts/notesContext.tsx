// NotesProvider.tsx
import React, { createContext, ReactNode, useState } from 'react';

interface NotesContextType {
    notes: Note[];
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
    addNote: (note: Note) => void;
    removeNote: (id: string) => void;
}

export const NotesContext = createContext<NotesContextType>({
    notes: [],
    setNotes: () => {},
    addNote: () => {},
    removeNote: () => {},
});

interface NotesProviderProps {
    children: ReactNode;
}

export const NotesProvider = ({ children }: NotesProviderProps) => {
    const [notes, setNotes] = useState<Note[]>([]);

    const addNote = (note: Note) => {
        setNotes((prev) => [...prev, note]);
    };

    const removeNote = (id: string) => {
        setNotes((prev) => prev.filter((note) => note.id !== id));
    };

    return <NotesContext.Provider value={{ notes, setNotes, addNote, removeNote }}>{children}</NotesContext.Provider>;
};
