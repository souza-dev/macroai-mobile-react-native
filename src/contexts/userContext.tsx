import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { readUserProfileService } from 'services/profile/readUserProfileService';

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    updateUser: (data: Partial<User>) => void;
    logout: () => Promise<void>;
    loadingUser: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const USER_KEY = '@user';

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const defaultUser: Partial<User> = {
        maxCalories: 2500,
        maxCarb: 300,
        maxFats: 80,
        maxProtein: 150,
        language: 'en',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        firstLogin: Date.now(),
        tag: 'default',
        hasSubmittedReview: false,
        weekly: true,
        numberOfMessage: 0,
        system: 'metric',
        setupMacrosProfile: {
            age: '30',
            diet: 'balanced',
            exercise: 'moderate',
            gender: 'other',
            goal: 'maintain',
            height: '175',
            system: 'metric',
            weight: '70',
        },
    };

    // 🔹 Carrega do AsyncStorage primeiro (para render rápido)
    useEffect(() => {
        const loadUser = async () => {
            const saved = await AsyncStorage.getItem(USER_KEY);
            if (saved) setUser(JSON.parse(saved));
            setLoadingUser(false);
        };
        loadUser();
    }, []);

    // 🔹 Listener do Firebase Auth para sincronizar quando login muda
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const profile = await readUserProfileService(firebaseUser.uid);
                console.log('Salvando o uid', firebaseUser.uid);
                const combined = { uid: firebaseUser.uid, ...defaultUser, ...profile } as User;
                setUser(combined);
                await AsyncStorage.setItem(USER_KEY, JSON.stringify(combined));
            } else {
                setUser(null);
                await AsyncStorage.removeItem(USER_KEY);
            }
        });
        return unsubscribe;
    }, []);

    const updateUser = (data: Partial<User>) => {
        setUser((prev) => {
            if (!prev) return prev;
            const updated = { ...prev, ...data };
            AsyncStorage.setItem(USER_KEY, JSON.stringify(updated));
            return updated;
        });
    };

    const logout = async () => {
        const auth = getAuth();
        await auth.signOut();
        await AsyncStorage.removeItem(USER_KEY);
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, updateUser, logout, loadingUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser deve ser usado dentro de um UserProvider');
    return context;
}
