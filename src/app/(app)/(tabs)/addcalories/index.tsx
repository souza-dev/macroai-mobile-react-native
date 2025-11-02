import SendIcon from '@assets/icons/chat-send.svg';
import DrawerButton from '@components/custom-ui/DrawerButton';
import Header from '@components/custom-ui/Header';
import Input from '@components/custom-ui/Input';
import KeyboardAvoidWrapper from '@components/custom-ui/KeyboardAvoidWrapper';
import LoadingChatMessage from '@components/custom-ui/LoadingChatMessage';
import Screen from '@components/custom-ui/Screen';
import VStack from '@components/custom-ui/VStack';
import AddCaloriesModal from '@components/features/calories/AddCaloriesModal';
import AudioRecorderView from '@components/features/calories/AudioRecorderView';
import CardFood from '@components/features/calories/CardFood';
import GlobalInfoModal from '@components/features/calories/GlobalInfoModal';
import ModalConfirmPhoto from '@components/features/calories/ModalConfirmPhoto';
import ModalPhotoUploadHelp from '@components/features/calories/ModalPhotoUploadHelp';
import ScanFoodCameraView from '@components/features/calories/ScanFoodCameraView';
import SliderCalories from '@components/features/calories/SliderCalories';
import { Colors } from '@constants/Colors';
import { useUser } from '@contexts/userContext';
import useAudioRecorder from '@hooks/useAudioRecorder';
import useChatFoods from '@hooks/useChatFoods';
import usePhotoUpload from '@hooks/usePhotoUpload';
import useTranscribeAudio from '@hooks/useTranscribeAudio';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Image } from 'expo-image';
import { useFocusEffect, useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList, Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native';
import formatMilliseconds from 'utils/formatMiliseconds';

const AddCaloriestScreen = () => {
    const { t } = useTranslation('calories');
    const ref = useRef<FlatList>(null);
    const [inputText, setInputText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<BottomTabNavigationProp<any>>();
    const { user } = useUser();
    const [state, setState] = useState<'text' | 'voice' | 'photo' | null>(null);
    const [infoModalVisible, setInfoModalVisible] = useState<'calories' | 'macros' | 'score' | 'exercise' | null>(null);
    const [activeModal, setActiveModal] = useState<'photohelp' | 'confirm' | null>(null);
    const [recognizedFoods, setRecognizedFoods] = useState('');

    const {
        foods,
        loadingResponse,
        totals,
        score,
        loadingScore,
        sendFoods,
        removeFood,
        diet,
        handleSetDiet,
        addExercise,
    } = useChatFoods();

    const {
        openImagePicker,
        cameraRef,
        takePhoto,
        uploadAndRecognizePhoto,
        loadingUploadPhoto,
        loadingPhotoRecognition,
        imageUrl,
        requestCameraAccess,
    } = usePhotoUpload(user as User);

    const { startAudioRecording, stopAudioRecording, recordingProgress, isAudioRecording, requestMicrophoneAccess } =
        useAudioRecorder();
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
    }, []);

    const sendMessage = useCallback(
        async (content: string, type: 'text' | 'voice' | 'photo', imageUrl?: string) => {
            try {
                await sendFoods(content, type, imageUrl);
                setTimeout(() => {
                    ref.current?.scrollToEnd({ animated: true });
                }, 50);
            } catch (e: any) {
                if (e.message === 'food-not-recognized') {
                    Alert.alert(t('warning'), t('food_not_recognized'));
                } else if (e.message === 'diet-not-selected') {
                    Alert.alert(t('warning'), t('diet_not_selected'));
                } else {
                    Alert.alert(t('warning'), e.message);
                }
            } finally {
                setState(null);
            }
        },
        [user, sendFoods]
    );

    const onSendText = useCallback(async () => {
        if (!inputText.trim() || !user) return; // evita enviar vazio
        setInputText('');
        Keyboard.dismiss();
        await sendMessage(inputText, 'text');
    }, [inputText, sendMessage]);

    const startRecording = useCallback(() => {
        startAudioRecording();
    }, []);

    const stopRecording = useCallback(async () => {
        const uri = await stopAudioRecording();
        const transcribedText = await transcribe(uri as string);
        if (transcribedText) await sendMessage(transcribedText, 'voice');
    }, [stopAudioRecording, transcribe, sendMessage]);

    const onSendPhoto = useCallback(async () => {
        await sendMessage(recognizedFoods, 'photo', imageUrl);
    }, [openImagePicker, uploadAndRecognizePhoto, sendMessage]);

    const onPressDeleteMessage = useCallback(
        async (id: string) => {
            try {
                await removeFood(id);
            } catch (e: any) {
                if (e.message !== 'diet-not-selected') Alert.alert(t('warning'), t('error_delete'));
            }
        },
        [removeFood]
    );

    const onPressAddExercise = async (calories: number) => {
        try {
            await addExercise(calories);
        } catch (e: any) {
            Alert.alert(t('warning'), t('error_delete'));
        }
    };

    const renderItem = useCallback(
        ({ item }: { item: FirebaseDatabaseFoods }) => {
            if (item.role === 'user' || item.macros === undefined) return null;

            return (
                <CardFood
                    id={item.id as string}
                    title={item.macros.foodName}
                    calories={item.macros.calories}
                    carbs={item.macros.carbohydrates}
                    proteins={item.macros.proteins}
                    fats={item.macros.fats}
                    onPressDelete={onPressDeleteMessage}
                    timestamp={item.timestamp as number}
                    loading={false}
                    type={item.type}
                    imageUrl={item.imageUrl as string}
                />
            );
        },
        [onPressDeleteMessage]
    );

    if (state === 'photo') {
        return (
            <ScanFoodCameraView
                cameraRef={cameraRef}
                takePhoto={async () => {
                    const uri = await takePhoto();
                    if (!uri) {
                        return;
                    }
                    setState(null);
                    const foods = await uploadAndRecognizePhoto(uri);
                    if (foods) {
                        setRecognizedFoods(foods);
                        setActiveModal('confirm');
                    }
                }}
                onClose={() => setState(null)}
            />
        );
    }

    return (
        <Screen>
            <ModalPhotoUploadHelp
                visible={activeModal === 'photohelp'}
                onRequestClose={() => {
                    setActiveModal(null);
                    setRecognizedFoods('');
                }}
                onPress={() => {
                    setActiveModal(null);
                    setState('photo');
                }}
            />
            <ModalConfirmPhoto
                visible={activeModal === 'confirm'}
                onRequestClose={() => {
                    setActiveModal(null);
                    setRecognizedFoods('');
                }}
                value={recognizedFoods}
                onChangeText={setRecognizedFoods}
                loading={false}
                onPress={async () => {
                    setActiveModal(null);
                    await onSendPhoto();
                }}
            />

            <GlobalInfoModal
                activeModal={infoModalVisible}
                onClose={() => setInfoModalVisible(null)}
                scoreExplain={score.explain}
            />
            <AddCaloriesModal
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                onSelect={async (state) => {
                    if (state === 'photo') {
                        const granted = await requestCameraAccess();
                        if (!granted) {
                            console.log('permissão pra camera negada');
                            return;
                        }
                        //Se for a primeira vez entra no modal
                        const hasShownHelp = await AsyncStorage.getItem('@camera_help_shown');
                        if (!hasShownHelp) {
                            console.log('não mostrou:', hasShownHelp);
                            await AsyncStorage.setItem('@camera_help_shown', 'true');
                            setActiveModal('photohelp');
                        } else {
                            console.log('ja mostrou:', hasShownHelp);
                            setState('photo');
                        }
                    } else if (state === 'voice') {
                        const granted = await requestMicrophoneAccess();
                        if (!granted) {
                            console.log('permissão pra microphone negada');
                            //TODO: Adicionar alerta falando pra ir no settings dar permissão.
                            return;
                        }
                        setState('voice');
                    } else if (state === 'text') {
                        setState('text');
                    }
                    setModalVisible(false);
                }}
            />

            <Header>
                <DrawerButton />
                <View style={styles.headerImage}>
                    <Image
                        style={styles.image}
                        source={require('@assets/images/calories-logo.png')}
                        contentFit="contain"
                        transition={1000}
                    />
                </View>
            </Header>
            <KeyboardAvoidWrapper disableKeyboardDismissOnTouch={true}>
                <VStack style={styles.keyboardavoid}>
                    <SliderCalories
                        data={[
                            {
                                type: 'calories',
                                value: { value: totals.calories, total: user?.maxCalories ?? 2500 },
                                onPress: () => setInfoModalVisible('calories'),
                            },
                            {
                                type: 'macros',
                                value: {
                                    protein: { value: totals.protein, total: user?.maxProtein ?? 150 },
                                    carbs: { value: totals.carbs, total: user?.maxCarb ?? 300 },
                                    fats: { value: totals.fats, total: user?.maxFats ?? 80 },
                                },
                                onPress: () => setInfoModalVisible('macros'),
                            },
                            {
                                type: 'score',
                                value: score.score,
                                explain: '',
                                diet: diet as string,
                                onPress: () => setInfoModalVisible('score'),
                                onChange: (item) => handleSetDiet(item),
                            },
                            {
                                type: 'exercise',
                                value: 200,
                                onPress: () => setInfoModalVisible('exercise'),
                                onPressAddExercise: (value: number) => onPressAddExercise(value),
                            },
                        ]}
                    />
                    <View style={styles.chat}>
                        <FlatList
                            ref={ref}
                            keyExtractor={(item, index) => item.id ?? index.toString()}
                            data={foods}
                            renderItem={renderItem}
                            keyboardShouldPersistTaps="always"
                            removeClippedSubviews
                            initialNumToRender={10}
                            maxToRenderPerBatch={10}
                            windowSize={5}
                            contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
                            inverted
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    <LoadingChatMessage message={t('thinking')} loading={loadingResponse} />
                    <LoadingChatMessage message={t('calculating_score')} loading={loadingScore} />
                    <LoadingChatMessage message={t('photo_uploading')} loading={loadingUploadPhoto} />
                    <LoadingChatMessage message={t('analyzing_photo')} loading={loadingPhotoRecognition} />

                    {state === 'text' && (
                        <Input
                            value={inputText}
                            onChangeText={setInputText}
                            onSubmitEditing={onSendText}
                            placeholder={t('type')}
                            placeholderTextColor={Colors.light.gray}
                            color={Colors.light.background}
                            rightElement={
                                <TouchableOpacity onPress={onSendText}>
                                    <SendIcon width={17} height={27} color={Colors.light.gray} />
                                </TouchableOpacity>
                            }
                            returnKeyType="send"
                        />
                    )}
                    {state === 'voice' && (
                        <AudioRecorderView
                            recordingTime={formatMilliseconds(recordingProgress)}
                            message={'Recognizing audio...'}
                            loading={loadingAudioTranscribe}
                            onPressIn={startRecording}
                            onPressOut={stopRecording}
                        />
                    )}
                </VStack>
            </KeyboardAvoidWrapper>
        </Screen>
    );
};

export default AddCaloriestScreen;

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    headerImage: {
        flex: 1,
        paddingRight: 44,
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
    keyboardavoid: {
        flex: 1,
        paddingBottom: 10,
    },
});
