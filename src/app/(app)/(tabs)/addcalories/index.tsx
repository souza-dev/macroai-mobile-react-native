import SendIcon from '@assets/icons/chat-send.svg';
import DrawerButton from '@components/custom-ui/DrawerButton';
import Header from '@components/custom-ui/Header';
import Input from '@components/custom-ui/Input';
import Screen from '@components/custom-ui/Screen';
import SliderCalories from '@components/custom-ui/SliderCalories';
import AddCaloriesModal from '@components/features/calories/AddCaloriesModal';
import CardFood from '@components/features/calories/CardFood';
import Thinking from '@components/features/chats/Thinking';
import { Colors } from '@constants/Colors';
import useAudioRecorder from '@hooks/useAudioRecorder';
import useChatCalories from '@hooks/useChatCalories';
import useTranscribeAudio from '@hooks/useTranscribeAudio';
import { getApp } from '@react-native-firebase/app';
import { FirebaseAuthTypes, getAuth } from '@react-native-firebase/auth';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Image } from 'expo-image';
import { useFocusEffect, useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList, Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native';

const AddCaloriestScreen = () => {
    const { t } = useTranslation('chat');
    const ref = useRef<FlatList>(null);
    const [inputText, setInputText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<BottomTabNavigationProp<any>>();
    const app = getApp();
    const auth = getAuth(app);
    const user = auth.currentUser;
    const [muted, setMuted] = useState(true);
    const [state, setState] = useState<'text' | 'voice' | 'photo'>('text');

    const {
        macros,
        loading: loadingMessagesResponse,
        sendMacros,
        deleteMacros,
    } = useChatCalories(user as FirebaseAuthTypes.User);

    const { startAudioRecording, stopAudioRecording, recordingProgress, isAudioRecording } = useAudioRecorder();
    const { transcribe, loading: loadingAudioTranscribe } = useTranscribeAudio();

    useFocusEffect(
        useCallback(() => {
            setModalVisible(true);
        }, [])
    );

    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            setModalVisible(true);
        });

        return unsubscribe;
    }, [navigation]);

    const sendMessageContent = useCallback(
        async (content: string) => {
            if (!content.trim() || !user) return;

            try {
                const messageObj = {
                    id: Date.now().toString(),
                    role: 'user',
                    content,
                    createdAt: new Date().toUTCString(),
                };
                const res = await sendMacros(content, 'text');
            } catch (e: any) {
                Alert.alert('Error', e.message);
            }
        },
        [user, sendMacros, muted]
    );

    const onSend = useCallback(async () => {
        const messageToSend = inputText.trim();
        if (!messageToSend) return;
        setInputText('');
        Keyboard.dismiss();
        await sendMessageContent(messageToSend);
    }, [inputText, sendMessageContent]);

    const startRec = useCallback(async () => {
        startAudioRecording();
    }, []);

    const stopRec = useCallback(async () => {
        const uri = await stopAudioRecording();
        const transcribedText = await transcribe(uri as string);
        if (transcribedText) sendMessageContent(transcribedText);
    }, []);

    const onPressDeleteMessage = async (id: string) => {
        try {
            await deleteMacros(id);
        } catch {
            Alert.alert(t('error.title'), t('error.delete_chat'));
        }
    };

    const renderItem = ({ item }: { item: FirebaseDatabaseMacros }) => {
        if (item.role === 'user' || item.macros === undefined) {
            return null;
        }

        return (
            <CardFood
                id={item.id}
                title={item.macros.foodName}
                calories={item.macros.calories}
                carbs={item.macros.carbohydrates}
                proteins={item.macros.proteins}
                fats={item.macros.fats}
                onPressDelete={onPressDeleteMessage}
            />
        );
    };

    return (
        <Screen>
            <AddCaloriesModal
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                onSelect={(state) => {
                    setState(state);
                    setModalVisible(false);
                }}
            />
            <Header>
                <DrawerButton />
                <View style={styles.flex}>
                    <Image
                        style={styles.image}
                        source={require('@assets/images/calories-logo.png')}
                        contentFit="contain"
                        transition={1000}
                    />
                </View>
            </Header>
            <SliderCalories
                data={[
                    { type: 'calories', value: { value: 1800, total: 2500 } },
                    {
                        type: 'macros',
                        value: {
                            protein: { value: 110, total: 150 },
                            carbs: { value: 200, total: 300 },
                            fats: { value: 60, total: 80 },
                        },
                    },
                    { type: 'score', value: 5 },
                    { type: 'exercise', value: 200 },
                ]}
            />{' '}
            <View style={styles.chat}>
                <FlatList
                    ref={ref}
                    keyExtractor={(item) => item.id}
                    data={macros}
                    renderItem={renderItem}
                    inverted
                    keyboardShouldPersistTaps="always"
                    removeClippedSubviews
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={5}
                    contentContainerStyle={{ flexGrow: 1 }}
                />
            </View>
            <Thinking loading={loadingMessagesResponse} />
            <Input
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={onSend}
                placeholder={t('type')}
                placeholderTextColor={Colors.light.gray}
                color={Colors.light.background}
                rightElement={
                    <TouchableOpacity onPress={onSend}>
                        <SendIcon width={17} height={27} color={Colors.light.gray} />
                    </TouchableOpacity>
                }
                returnKeyType="send"
                editable={!isAudioRecording && !loadingAudioTranscribe}
                selectTextOnFocus={!isAudioRecording && !loadingAudioTranscribe}
            />
        </Screen>
    );
};

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    image: {
        width: 120,
        height: 40,
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    chat: {
        flex: 1,
        marginTop: 10,
    },
});

export default AddCaloriestScreen;
