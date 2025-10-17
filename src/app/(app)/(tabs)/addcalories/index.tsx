import SendIcon from '@assets/icons/chat-send.svg';
import DrawerButton from '@components/custom-ui/DrawerButton';
import Header from '@components/custom-ui/Header';
import InfoModal from '@components/custom-ui/InfoModal';
import Input from '@components/custom-ui/Input';
import LoadingChatMessage from '@components/custom-ui/LoadingChatMessage';
import Screen from '@components/custom-ui/Screen';
import AddCaloriesModal from '@components/features/calories/AddCaloriesModal';
import CardFood from '@components/features/calories/CardFood';
import SliderCalories from '@components/features/calories/SliderCalories';
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
    const { t } = useTranslation('calories');
    const ref = useRef<FlatList>(null);
    const [inputText, setInputText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<BottomTabNavigationProp<any>>();
    const app = getApp();
    const auth = getAuth(app);
    const user = auth.currentUser;
    const [muted, setMuted] = useState(true);
    const [state, setState] = useState<'text' | 'voice' | 'photo'>('text');
    const [caloriesModalVisible, setCaloriesModalVisible] = useState(false);
    const [macrosModalVisible, setMacrosModalVisible] = useState(false);

    const [scoreModalVisible, setScoreModalVisible] = useState(false);

    const { macros, loadingResponse, totals, score, loadingScore, sendMacros, deleteMacros, handleSetDiet } =
        useChatCalories(user as FirebaseAuthTypes.User);

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
            <InfoModal
                visible={caloriesModalVisible}
                title={t('modal_calories_title')}
                body={t('modal_calories_body')}
                buttonTitle={t('modal_button_title')}
                buttonOnPress={() => setCaloriesModalVisible(false)}
                onRequestClose={() => setCaloriesModalVisible(false)}
            />
            <InfoModal
                visible={macrosModalVisible}
                title={t('modal_macros_title')}
                body={t('modal_macros_body')}
                buttonTitle={t('modal_button_title')}
                buttonOnPress={() => setMacrosModalVisible(false)}
                onRequestClose={() => setMacrosModalVisible(false)}
            />
            <InfoModal
                visible={scoreModalVisible}
                title={t('modal_score_title')}
                body={score.explain === '' ? t('modal_score_body') : score.explain}
                buttonTitle="Ok, entendi"
                buttonOnPress={() => setScoreModalVisible(false)}
                onRequestClose={() => setScoreModalVisible(false)}
            />
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
                    {
                        type: 'calories',
                        value: { value: totals.calories, total: 2500 },
                        onPress: () => setCaloriesModalVisible(true),
                    },
                    {
                        type: 'macros',
                        value: {
                            protein: { value: totals.protein, total: 150 },
                            carbs: { value: totals.carbs, total: 300 },
                            fats: { value: totals.fats, total: 80 },
                        },
                        onPress: () => setMacrosModalVisible(true),
                    },
                    {
                        type: 'score',
                        value: score.score,
                        explain: '',
                        onPress: () => setScoreModalVisible(true),
                        onChange: (item) => handleSetDiet(item),
                    },
                    { type: 'exercise', value: 200, onPress: () => console.log('Info exercise pressed') },
                ]}
            />
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
            <LoadingChatMessage message={'Thinking...'} loading={loadingResponse} />
            <LoadingChatMessage message={'Calculating score'} loading={loadingScore} />
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
