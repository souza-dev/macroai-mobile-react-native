import LoginImage from '@assets/images/login-logo.svg';
import Body from '@components/custom-ui/Body';
import Button from '@components/custom-ui/Button';
import ButtonGroup from '@components/custom-ui/ButtonGroup';
import TextLink from '@components/custom-ui/TextLink';
import VStack from '@components/custom-ui/VStack';
import { Colors } from '@constants/Colors';
import { useSession } from '@contexts/authContext';
import { useUser } from '@contexts/userContext';
import { getApp } from '@react-native-firebase/app';
import { FirebaseAuthTypes, getAuth, getIdToken } from '@react-native-firebase/auth';
import GoogleIcon from 'assets/icons/login-google-color.svg';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ImageBackground, StyleSheet, View } from 'react-native';
import loginWithGoogle from 'services/login/loginWithGoogle';

export type LoginMethod = () => Promise<FirebaseAuthTypes.UserCredential | undefined>;

export default function SignIn() {
    const { t } = useTranslation('login');
    const { signIn } = useSession();
    const [googleLoading, setGoogleLoading] = useState(false);
    const { setUser } = useUser();
    const BACKGROUND_IMAGE = require('@assets/images/login-background.png');

    const handleLogin = async (loginMethod: LoginMethod) => {
        try {
            await loginMethod();
            const app = getApp();
            const auth = getAuth(app);
            const currentUser = auth.currentUser;
            if (!currentUser) {
                return;
            }
            const idToken = await getIdToken(currentUser);
            if (!idToken) {
                return;
            }
            signIn(JSON.stringify(idToken));
        } catch (error) {
            console.log(error);
        }
    };

    const handleLoginWrapper = async (
        loginMethod: LoginMethod,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        try {
            setLoading(true);
            await handleLogin(loginMethod);
        } catch (error: any) {
            if (error.message === 'auth/wrong-password') {
                // Alert.alert(t('common:info'), t('error.wrongPassword'));
            } else if (error.message === 'auth/user-not-found' || error.message === 'auth/invalid-email') {
                // Alert.alert(t('common:info'), t('error.wrongEmail'));
            } else if (error.message === 'google-sign:canceled') {
                console.log('Login com google cancelado!');
            } else if (error.message === 'apple-sign:canceled') {
                console.log('Login com apple cancelado!');
            } else {
                // Alert.alert(t('common:info'), error.message.toString());
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <ImageBackground
                source={BACKGROUND_IMAGE}
                resizeMode="cover"
                style={styles.background}
                imageStyle={{ opacity: 0.5 }}
            >
                <VStack spacing={20}>
                    <View style={styles.logo}>
                        <LoginImage />
                    </View>
                    <ButtonGroup>
                        <Button
                            onPress={() => handleLoginWrapper(loginWithGoogle, setGoogleLoading)}
                            title={t('signin_google')}
                            iconLeft={() => <GoogleIcon />}
                            loading={googleLoading}
                            color="white"
                            textStyle={{ color: 'black' }}
                        />
                        {/* <Button
                            title={t('signin_apple')}
                            iconLeft={() => <AppleIcon />}
                            color="white"
                            textStyle={{ color: 'black' }}
                        /> */}
                    </ButtonGroup>
                    <Body bold center>
                        {t('donthaveaccount')}
                    </Body>
                    <Body center>
                        <Trans
                            i18nKey="login:terms"
                            components={{
                                1: (
                                    <TextLink
                                        url={process.env.EXPO_PUBLIC_TERMS_OF_USE as string}
                                        style={{ color: Colors.light['primary-500'] }}
                                    />
                                ),
                                2: (
                                    <TextLink
                                        url={process.env.EXPO_PUBLIC_PRIVACY_POLICY as string}
                                        style={{ color: Colors.light['primary-500'] }}
                                    />
                                ),
                            }}
                        />
                    </Body>
                </VStack>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
});
