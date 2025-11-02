import IconCheck from '@assets/icons/account-check.svg';
import Body from '@components/custom-ui/Body';
import Button from '@components/custom-ui/Button';
import ButtonGroup from '@components/custom-ui/ButtonGroup';
import DrawerButton from '@components/custom-ui/DrawerButton';
import Header from '@components/custom-ui/Header';
import Heading from '@components/custom-ui/Heading';
import HStack from '@components/custom-ui/HStack';
import Screen from '@components/custom-ui/Screen';
import Select from '@components/custom-ui/Select';
import VStack from '@components/custom-ui/VStack';
import { Colors } from '@constants/Colors';
import {
    ageData,
    dailyWorkoutData,
    dietData,
    genderData,
    goalData,
    heightImperialData,
    heightMetricData,
    weightImperialData,
    weightMetricData,
} from '@constants/dropdowndata';
import { useUser } from '@contexts/userContext';
import { textStyles } from '@styles/textStyles';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { updateUserProfileService } from 'services/profile/updateUserProfileService';

export default function AccountScreen() {
    const router = useRouter();
    const { t } = useTranslation(['account', 'dropdown']);
    const { user, setUser } = useUser();

    const handleChangeProfile = async (field: string, value: any) => {
        if (!user) return;
        const updatedProfile = {
            ...user,
            setupMacrosProfile: {
                ...user.setupMacrosProfile,
                [field]: value,
            },
        };
        setUser(updatedProfile);
    };

    const handleSaveProfile = async () => {
        if (!user) return;
        try {
            await updateUserProfileService(user, {
                ...user,
                setupMacrosProfile: {
                    ...user.setupMacrosProfile,
                },
            });
        } catch (error) {
            console.error('Erro ao atualizar perfil no Firebase', error);
            // opcional: você pode desfazer o setUser aqui se quiser rollback
        }
    };

    useEffect(() => {
        console.log('User no perfil');
        console.log(user);
    }, [user]);

    if (!user) {
        return null;
    }

    return (
        <Screen>
            <Header>
                <DrawerButton />
            </Header>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <VStack spacing={10}>
                    <Heading>{t('title')}</Heading>
                    <Body>{t('body')}</Body>
                    <ButtonGroup direction="row" isAttached style={{ marginBottom: 20 }}>
                        <Button
                            title={t('metric')}
                            color={
                                user.setupMacrosProfile.system === 'metric'
                                    ? Colors.light['primary-500']
                                    : Colors.light.background
                            }
                            textStyle={{
                                color:
                                    user.setupMacrosProfile.system === 'metric'
                                        ? Colors.light.white
                                        : Colors.light.gray,
                            }}
                            onPress={() => handleChangeProfile('system', 'metric')}
                            height={44}
                            iconRight={({ color }) => (
                                <IconCheck
                                    color={
                                        user.setupMacrosProfile.system === 'metric' ? color : Colors.light.background
                                    }
                                    width={16}
                                    height={16}
                                />
                            )}
                            style={{ paddingLeft: 16 }}
                        />
                        <Button
                            title={t('imperial')}
                            color={
                                user.setupMacrosProfile.system === 'imperial'
                                    ? Colors.light['primary-500']
                                    : Colors.light.background
                            }
                            textStyle={{
                                color:
                                    user.setupMacrosProfile.system === 'imperial'
                                        ? Colors.light.white
                                        : Colors.light.gray,
                            }}
                            onPress={() => handleChangeProfile('system', 'imperial')}
                            height={44}
                            iconRight={({ color }) => (
                                <IconCheck
                                    color={
                                        user.setupMacrosProfile.system === 'imperial' ? color : Colors.light.background
                                    }
                                    width={16}
                                    height={16}
                                />
                            )}
                            style={{ paddingLeft: 16 }}
                        />
                    </ButtonGroup>
                    <HStack>
                        <View style={styles.flex}>
                            <Heading style={textStyles.subtitle}>{t('choose_diet')}</Heading>
                        </View>
                        <Select
                            value={user.setupMacrosProfile.diet}
                            style={{ width: '45%' }}
                            data={dietData}
                            onChange={(item) => handleChangeProfile('diet', item)}
                        />
                    </HStack>
                    <HStack>
                        <View style={styles.flex}>
                            <Heading style={textStyles.subtitle}>{t('choose_goal')}</Heading>
                        </View>
                        <Select
                            value={user.setupMacrosProfile.goal}
                            onChange={(item) => handleChangeProfile('goal', item)}
                            data={goalData}
                            style={{ width: '45%' }}
                        />
                    </HStack>
                    <HStack>
                        <View style={styles.flex}>
                            <Heading style={textStyles.subtitle}>{t('choose_age')}</Heading>
                        </View>
                        <Select
                            value={user.setupMacrosProfile.age}
                            onChange={(item) => handleChangeProfile('age', item)}
                            data={ageData}
                            style={{ width: '45%' }}
                        />
                    </HStack>
                    <HStack>
                        <View style={styles.flex}>
                            <Heading style={textStyles.subtitle}>{t('choose_height')}</Heading>
                        </View>
                        <Select
                            value={user.setupMacrosProfile.height}
                            onChange={(item) => handleChangeProfile('height', item)}
                            data={user.setupMacrosProfile.system === 'metric' ? heightMetricData : heightImperialData}
                            style={{ width: '45%' }}
                        />
                    </HStack>
                    <HStack>
                        <View style={styles.flex}>
                            <Heading style={textStyles.subtitle}>{t('choose_weight')}</Heading>
                        </View>
                        <Select
                            value={user.setupMacrosProfile.weight}
                            onChange={(item) => handleChangeProfile('weight', item)}
                            data={user.setupMacrosProfile.system === 'metric' ? weightMetricData : weightImperialData}
                            style={{ width: '45%' }}
                        />
                    </HStack>
                    <HStack>
                        <View style={styles.flex}>
                            <Heading style={textStyles.subtitle}>{t('choose_gender')}</Heading>
                        </View>
                        <Select
                            value={user.setupMacrosProfile.gender}
                            onChange={(item) => handleChangeProfile('gender', item)}
                            data={genderData}
                            style={{ width: '45%' }}
                        />
                    </HStack>
                    <HStack>
                        <View style={styles.flex}>
                            <Heading style={textStyles.subtitle}>{t('choose_workout')}</Heading>
                        </View>
                        <Select
                            value={user.setupMacrosProfile.exercise}
                            onChange={(item) => handleChangeProfile('exercise', item)}
                            data={dailyWorkoutData}
                            style={{ width: '45%' }}
                        />
                    </HStack>
                    <Button
                        onPress={async () => {
                            await handleSaveProfile();
                            router.navigate('/account/macro');
                        }}
                        title={t('button')}
                        color={Colors.light['secondary-500']}
                        textStyle={{ color: Colors.light.black }}
                    />
                </VStack>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 30,
    },
    flex: {
        flex: 1,
    },
});
