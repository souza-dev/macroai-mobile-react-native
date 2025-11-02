declare global {
    interface Note {
        id: string;
        title: string;
        content: string;
        createdAt?: string;
        tag?: string;
    }
    type NotesTypes = 'fitness' | 'macros' | 'nutrition' | 'recipes' | 'all';
}

export {};
