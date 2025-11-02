import CaloriesIcon from '@assets/icons/macro-calories.svg';
import CarbsIcon from '@assets/icons/macro-carbs.svg';
import FatsIcon from '@assets/icons/macro-fats.svg';
import PenIcon from '@assets/icons/macro-pen.svg';
import ProteinIcon from '@assets/icons/macro-protein.svg';
import BackButton from '@components/custom-ui/BackButton';
import Body from '@components/custom-ui/Body';
import Button from '@components/custom-ui/Button';
import Header from '@components/custom-ui/Header';
import Heading from '@components/custom-ui/Heading';
import HStack from '@components/custom-ui/HStack';
import Input from '@components/custom-ui/Input';
import KeyboardAvoidWrapper from '@components/custom-ui/KeyboardAvoidWrapper';
import Screen from '@components/custom-ui/Screen';
import VStack from '@components/custom-ui/VStack';
import { Colors } from '@constants/Colors';
import { useSession } from '@contexts/authContext';
import { useUser } from '@contexts/userContext';
import { getAuth } from '@react-native-firebase/auth';
import { textStyles } from '@styles/textStyles';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import setupDailyMacrosService from 'services/profile/setupDailyMacrosService';
import { updateUserProfileService } from 'services/profile/updateUserProfileService';

export default function MacroEditScreen() {
    const { user, setUser } = useUser();
    const { t } = useTranslation('macro');
    const { signOut } = useSession();
    const currentUser = getAuth().currentUser;
    const [macrosSuggestion, setMacrosSuggestion] = useState<any>();
    const [loading, setLoading] = useState(false);
    //Colocar um loading se setuping macros
    //chamar na api setupDailyMacros
    //Preencher os inputs com
    //Salvar esses dados no context do user pra usar nas outras telas.

    useEffect(() => {
        const loadMacros = async () => {
            if (user) {
                const macros = await setupDailyMacrosService(user.setupMacrosProfile);
                setMacrosSuggestion(macros);
            }
        };
        loadMacros();
    }, []);

    const handleSave = async () => {
        if (!user) return;
        try {
            setLoading(true);
            await updateUserProfileService(user, {
                maxCalories: user.maxCalories,
                maxProtein: user.maxProtein,
                maxCarb: user.maxCarb,
                maxFats: user.maxFats,
            });
            alert('Macros atualizados com sucesso!');
        } catch (error) {
            console.error(error);
            alert('Erro ao salvar macros.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return null;
    }

    return (
        <Screen>
            <Header>
                <BackButton />
            </Header>

            <KeyboardAvoidWrapper>
                <VStack spacing={10} style={styles.container}>
                    <VStack spacing={10} style={{ alignItems: 'center' }}>
                        <Image
                            style={styles.avatar}
                            source={currentUser?.photoURL}
                            contentFit="cover"
                            transition={1000}
                        />
                        <Heading style={textStyles.subtitle}>{currentUser?.displayName}</Heading>
                    </VStack>

                    <Body center style={textStyles.button} color={Colors.light['primary-500']}>
                        {t('body')}
                    </Body>
                    <HStack style={styles.panel}>
                        <VStack style={{ width: '75%', padding: 10 }}>
                            <Body style={[textStyles.text, { color: Colors.light.white }]}>
                                {t('panel', { macros: macrosSuggestion })}
                            </Body>
                        </VStack>
                        <Image
                            style={styles.image}
                            source={require('@assets/images/macro-robot.png')}
                            contentFit="cover"
                            transition={1000}
                        />
                    </HStack>
                    <VStack spacing={16} style={styles.editpanel}>
                        <HStack spacing={10} style={styles.editRow}>
                            <HStack spacing={10} style={styles.editLabel}>
                                <CaloriesIcon width={26} height={26} color={Colors.light.black} />
                                <Heading style={textStyles.subtitle} color={Colors.light.black}>
                                    {t('calories')}
                                </Heading>
                            </HStack>
                            <Input
                                placeholder="000"
                                value={user.maxCalories as string}
                                onChangeText={(item) => setUser({ ...user, maxCalories: item })}
                                iconLeft={() => <PenIcon width={20} color={Colors.light.gray} height={20} />}
                                containerStyle={[styles.input]}
                                style={{ justifyContent: 'center' }}
                                center
                                keyboardType="numeric"
                                returnKeyType="done"
                            />
                        </HStack>
                        <HStack spacing={10} style={styles.editRow}>
                            <HStack spacing={10} style={styles.editLabel}>
                                <ProteinIcon width={26} height={26} color={Colors.light.black} />
                                <Heading style={textStyles.subtitle} color={Colors.light.black}>
                                    {t('protein')}
                                </Heading>
                            </HStack>
                            <Input
                                placeholder="000"
                                value={user.maxProtein as string}
                                onChangeText={(item) => setUser({ ...user, maxProtein: item })}
                                iconLeft={() => <PenIcon width={20} color={Colors.light.gray} height={20} />}
                                containerStyle={styles.input}
                                center
                                keyboardType="numeric"
                                returnKeyType="done"
                            />
                        </HStack>
                        <HStack spacing={10} style={styles.editRow}>
                            <HStack spacing={10} style={styles.editLabel}>
                                <CarbsIcon width={26} height={26} color={Colors.light.black} />
                                <Heading style={textStyles.subtitle} color={Colors.light.black}>
                                    {t('carbs')}
                                </Heading>
                            </HStack>
                            <Input
                                placeholder="000"
                                value={user.maxCarb as string}
                                onChangeText={(item) => setUser({ ...user, maxCarb: item })}
                                iconLeft={() => <PenIcon width={20} color={Colors.light.gray} height={20} />}
                                containerStyle={styles.input}
                                center
                                keyboardType="numeric"
                                returnKeyType="done"
                            />
                        </HStack>
                        <HStack spacing={10} style={styles.editRow}>
                            <HStack spacing={10} style={styles.editLabel}>
                                <FatsIcon width={26} height={26} color={Colors.light.black} />
                                <Heading style={textStyles.subtitle} color={Colors.light.black}>
                                    {t('fats')}
                                </Heading>
                            </HStack>
                            <Input
                                placeholder="000"
                                value={user.maxFats as string}
                                onChangeText={(item) => setUser({ ...user, maxFats: item })}
                                iconLeft={() => <PenIcon width={20} color={Colors.light.gray} height={20} />}
                                containerStyle={styles.input}
                                center
                                keyboardType="numeric"
                                returnKeyType="done"
                            />
                        </HStack>
                    </VStack>
                    <Button
                        onPress={handleSave}
                        title={t('button')}
                        color={Colors.light['secondary-500']}
                        textStyle={{ color: Colors.light.black }}
                        loading={loading}
                    />
                </VStack>
            </KeyboardAvoidWrapper>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 30,
    },
    avatar: {
        width: 108,
        height: 108,
        borderRadius: 100,
        backgroundColor: '#0553',
    },
    image: {
        width: 70,
        height: 70,
        backgroundColor: 'transparent',
        transform: [{ scaleX: -1 }],
    },
    panel: {
        backgroundColor: Colors.light['primary-500'],
        borderRadius: 10,
        paddingHorizontal: 25,
        paddingVertical: 5,
    },
    editpanel: {
        backgroundColor: Colors.light.background,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    editRow: {
        justifyContent: 'flex-end',
    },
    editLabel: {
        flex: 2,
        justifyContent: 'flex-start',
    },
    input: {
        flex: 1,
        justifyContent: 'center',
    },
});
