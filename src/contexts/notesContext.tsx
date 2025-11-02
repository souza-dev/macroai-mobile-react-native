// NotesProvider.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface NotesContextType {
    notes: Note[];
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
    addNote: (note: Note) => void;
    removeNote: (id: string) => void;
}

export const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const useNotesContext = () => {
    const context = useContext(NotesContext);
    if (!context) {
        throw new Error('useNotesContext must be used within a NotesProvider');
    }
    return context;
};

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
