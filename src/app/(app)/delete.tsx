/* eslint-disable react-native/no-inline-styles */
import AccountIcon from '@assets/icons/delete-account.svg';
import BackButton from '@components/custom-ui/BackButton';
import Body from '@components/custom-ui/Body';
import Button from '@components/custom-ui/Button';
import ButtonGroup from '@components/custom-ui/ButtonGroup';
import Header from '@components/custom-ui/Header';
import Heading from '@components/custom-ui/Heading';
import Screen from '@components/custom-ui/Screen';
import VStack from '@components/custom-ui/VStack';
import { Colors } from '@constants/Colors';
import { useSession } from '@contexts/authContext';
import { useUser } from '@contexts/userContext';
import { textStyles } from '@styles/textStyles';
import { deleteAllNotes } from 'api/notes';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, View } from 'react-native';
import { deleteAllMessagesService } from 'services/chat';
import { deleteAllFoodsService } from 'services/foods';
import { deleteUserProfileService } from 'services/profile';

export default function DeleteAccountScreen({ navigation }: any) {
    const { t } = useTranslation('delete');
    const { user } = useUser();
    const { signOut } = useSession();
    const router = useRouter();
    const [removingLoading, setRemovingLoading] = useState(false);
    const [removing, setRemoving] = useState('');

    const deleteAccount = async () => {
        if (!user) return;
        try {
            setRemovingLoading(true);
            //Delete foods
            setRemoving(t('deleting_your_calories_chat'));
            await deleteAllFoodsService(user);
            //Delete chats
            setRemoving(t('deleting_your_chat_Ai_fitness_plans'));
            await deleteAllMessagesService(user, 'fitness');
            setRemoving(t('deleting_your_chat_Ai_macros_setup_help'));
            await deleteAllMessagesService(user, 'macros');
            setRemoving(t('deleting_your_chat_Ai_information_about_nutrition'));
            await deleteAllMessagesService(user, 'nutrition');
            setRemoving(t('deleting_your_chat_Ai_recipes'));
            await deleteAllMessagesService(user, 'recipes');
            //Delete notes
            setRemoving(t('deleting_your_notes_fitness_plans'));
            await deleteAllNotes(user, 'fitness');
            setRemoving(t('deleting_your_notes_macros_setup_help'));
            await deleteAllNotes(user, 'macros');
            setRemoving(t('deleting_your_notes_information_about_nutrition:'));
            await deleteAllNotes(user, 'nutrition');
            setRemoving(t('deleting_your_notes_recipes'));
            await deleteAllNotes(user, 'recipes');
            setRemoving(t('deleting_your_profile'));
            await deleteUserProfileService(user);

            signOut();
        } catch (e: any) {
            Alert.alert('Error', e.toString());
        } finally {
            setRemovingLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        Alert.alert(t('warning'), t('Are you sure you want to permanently delete your account?'), [
            {
                text: 'Cancel',
                onPress: () => console.log('Press canceled'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => deleteAccount() },
        ]);
    };

    return (
        <Screen>
            <Header>
                <BackButton />
            </Header>
            <VStack spacing={30} style={styles.container}>
                <View style={styles.icon}>
                    <AccountIcon color={Colors.light['primary-400']} height={101} width={101} />
                </View>

                <Heading style={[textStyles.subtitle]} color={Colors.light['primary-500']} center>
                    {t('title')}
                </Heading>
                <Body style={[textStyles.text, { textAlign: 'center' }]} center color={Colors.light.black}>
                    {t('body')}
                </Body>
                <Body center style={textStyles.text}>
                    {removing}
                </Body>
                <ButtonGroup>
                    <Button
                        title={t('yes')}
                        onPress={handleDeleteAccount}
                        style={styles.delete}
                        textStyle={styles.buttonDeleteText}
                    />
                    <Button
                        title={t('cancel')}
                        onPress={() => router.back()}
                        style={styles.cancel}
                        textStyle={styles.cancelButtonText}
                    />
                </ButtonGroup>
            </VStack>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    icon: {
        alignItems: 'center',
    },
    delete: {
        backgroundColor: Colors.light.gray,
    },
    buttonDeleteText: {
        color: Colors.light.white,
    },
    cancel: {
        backgroundColor: Colors.light['primary-500'],
    },
    cancelButtonText: {
        color: 'white',
    },
});
