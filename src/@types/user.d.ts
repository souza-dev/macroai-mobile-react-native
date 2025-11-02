import { FirebaseAuthTypes } from '@react-native-firebase/auth';

declare global {
    interface User extends Partial<FirebaseAuthTypes.User> {
        maxCalories: string | number;
        maxCarb: string | number;
        maxFats: string | number;
        maxProtein: string | number;
        language: string;
        createdAt: number;
        updatedAt: number;
        firstLogin?: number;
        tag?: string;
        hasSubmittedReview?: boolean;
        weekly?: boolean;
        numberOfMessage?: number;
        system: 'metric' | 'imperial';
        setupMacrosProfile: {
            age: string;
            diet: string;
            exercise: string;
            gender: string;
            goal: string;
            height: string;
            system: string;
            weight: string;
        };
    }
}
export {};
