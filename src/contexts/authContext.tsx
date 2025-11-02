import { createContext, type PropsWithChildren, useContext } from 'react';

import { useStorageState } from '@hooks/useStorageState';
import { getApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';

const AuthContext = createContext<{
    signIn: (credentials: string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

// Use this hook to access the user info.
export function useSession() {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');
    const app = getApp();
    const auth = getAuth(app);
    return (
        <AuthContext.Provider
            value={{
                signIn: (credentials) => {
                    setSession(credentials);
                },
                signOut: async () => {
                    setSession(null);
                    auth.signOut().then(() => console.log('User signed out!'));
                },
                session,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
