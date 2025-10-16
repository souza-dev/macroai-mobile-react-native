import { GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export default async function loginWithGoogle() {
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

        const isSignedIn = GoogleSignin.hasPreviousSignIn();
        if (isSignedIn) {
            await GoogleSignin.signOut();
        }

        const signInResult = await GoogleSignin.signIn();
        console.log('Google sign-in result:', signInResult);
        const idToken = signInResult.idToken;
        if (!idToken) {
            throw new Error('No ID token found');
        }
        const googleCredential = GoogleAuthProvider.credential(signInResult.idToken);
        return signInWithCredential(getAuth(), googleCredential);
    } catch (error: any) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            throw new Error('google-sign:canceled');
        }
        console.error('Google login failed', error);
        throw error;
    }
}
