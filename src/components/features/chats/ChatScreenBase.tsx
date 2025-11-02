import SaveIcon from '@assets/icons/chat-save.svg';
import Body from '@components/custom-ui/Body';
import ChatMessage from '@components/custom-ui/ChatMessage';
import KeyboardAvoidWrapper from '@components/custom-ui/KeyboardAvoidWrapper';
import QueryExample from '@components/custom-ui/QueryExample';
import Screen from '@components/custom-ui/Screen';
import ChatHeader from '@components/features/chats/ChatHeader';
import ChatInputArea from '@components/features/chats/ChatInputArea';
import InitialMessage from '@components/features/chats/InitialMessage';
import Thinking from '@components/features/chats/Thinking';
import { Colors } from '@constants/Colors';
import { useUser } from '@contexts/userContext';
import useAudioRecorder from '@hooks/useAudioRecorder';
import useChat from '@hooks/useChat';
import useNotes from '@hooks/useNotes';
import useTranscribeAudio from '@hooks/useTranscribeAudio';
import { textStyles } from '@styles/textStyles';
import * as Speech from 'expo-speech';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList, Keyboard, StyleSheet, View } from 'react-native';
import { speakText } from 'utils/speakText';

interface ChatScreenBaseProps {
    type: 'recipes' | 'fitness' | 'nutrition' | 'macros';
    title: string;
    body: string;
    icon: React.ReactNode;
    examples?: string[];
}

const ChatScreenBase = ({ type, title, body, icon, examples = [] }: ChatScreenBaseProps) => {
    const { t } = useTranslation('chat');
    const ref = useRef<FlatList>(null);
    const [inputText, setInputText] = useState('');

    const { user } = useUser();
    const [muted, setMuted] = useState(true);

    const { loading: loadingMessagesResponse, messages, sendMessage, deleteAllMsgs } = useChat(user as User, type);

    const { startAudioRecording, stopAudioRecording, recordingProgress, isAudioRecording } = useAudioRecorder();
    const { transcribe, loading: loadingAudioTranscribe } = useTranscribeAudio();
    const { saveNote, loadingSave } = useNotes(user as User, type);

    useEffect(() => {
        if (messages.length > 0 && ref.current) {
            ref.current.scrollToOffset({ offset: 0, animated: true });
        }
    }, [messages.length]);

    useEffect(() => {
        return () => {
            Speech.stop();
        };
    }, []);

    const onSaveNote = useCallback(
        async (id: string | number | undefined) => {
            if (!user) {
                Alert.alert(t('error.title'), t('error.not_logged'));
                return;
            }

            const messageFinded = messages.find((item: FirebaseDatabaseMessage) => item.id === id);
            if (!messageFinded) {
                Alert.alert(t('error.title'), t('error.not_found_to_save'));
                return;
            }

            await saveNote(messageFinded);
        },
        [messages, saveNote, user]
    );

    const handleSaveNote = (id: string | number | undefined) => {
        Alert.alert(t('notes.save_title'), t('notes.save_text'), [
            { text: t('cancel'), style: 'cancel' },
            { text: t('ok'), onPress: () => onSaveNote(id) },
        ]);
    };

    const sendMessageContent = useCallback(
        async (content: string) => {
            if (!content.trim() || !user) return;

            try {
                const res = await sendMessage(content);
                if (!muted) speakText(res);
            } catch (e: any) {
                Alert.alert('Error', e.message);
            }
        },
        [user, sendMessage, muted]
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

    const onPressClearMessages = async () => {
        try {
            await deleteAllMsgs();
        } catch {
            Alert.alert(t('error.title'), t('error.delete_chat'));
        }
    };

    const onPressMute = async () => {
        setMuted(!muted);
        const isSpeaking = await Speech.isSpeakingAsync();
        if (isSpeaking) await Speech.stop();
    };

    const renderItem = useCallback(
        ({ item }: { item: FirebaseDatabaseMessage }) => {
            if (!item.id) return null;
            return (
                <ChatMessage
                    id={item.id}
                    role={item.role}
                    content={item.content}
                    timestamp={item.createdAt}
                    disabled={loadingMessagesResponse}
                    onPress={item.role === 'assistant' ? handleSaveNote : undefined}
                    icon={<SaveIcon height={24} width={24} color={Colors.light.gray} />}
                />
            );
        },
        [loadingMessagesResponse, handleSaveNote]
    );

    return (
        <KeyboardAvoidWrapper keyboardOffset={-130} disableKeyboardDismissOnTouch={true}>
            <Screen>
                <ChatHeader icon={icon} title={title} />
                <Body center style={textStyles.text}>
                    {body}
                </Body>

                <View style={styles.chat}>
                    <FlatList
                        ref={ref}
                        keyExtractor={(item, index) => item.id ?? index.toString()}
                        data={messages}
                        renderItem={renderItem}
                        inverted
                        ListFooterComponent={
                            <InitialMessage title={t('query_example')}>
                                {examples.map((ex, i) => (
                                    <QueryExample key={i}>{ex}</QueryExample>
                                ))}
                            </InitialMessage>
                        }
                        keyboardShouldPersistTaps="always"
                        removeClippedSubviews
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        windowSize={5}
                        contentContainerStyle={{ flexGrow: 1 }}
                    />
                </View>

                <Thinking loading={loadingMessagesResponse} message={t('thinking')} />
                <Thinking loading={loadingSave} message={t('notes.saving')} />

                <ChatInputArea
                    muted={muted}
                    recordingProgress={recordingProgress}
                    isAudioRecording={isAudioRecording}
                    loadingAudioTranscribe={loadingAudioTranscribe}
                    inputText={inputText}
                    setInputText={setInputText}
                    onSend={onSend}
                    startRec={startRec}
                    stopRec={stopRec}
                    onPressClearMessages={onPressClearMessages}
                    onPressMute={onPressMute}
                />

                <Body color={Colors.light.gray} style={textStyles.mini}>
                    {t('disclaimer')}
                </Body>
            </Screen>
        </KeyboardAvoidWrapper>
    );
};

export default ChatScreenBase;

const styles = StyleSheet.create({
    chat: {
        flex: 1,
        marginTop: 10,
    },
});
