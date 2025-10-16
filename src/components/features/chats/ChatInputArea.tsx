import ReloadIcon from '@assets/icons/chat-balloon2.svg';
import VolumeOffIcon from '@assets/icons/chat-volume-off.svg';
import VolumeIcon from '@assets/icons/chat-volume.svg';
import Button from '@components/custom-ui/Button';
import ButtonGroup from '@components/custom-ui/ButtonGroup';
import Input, { InputProps } from '@components/custom-ui/Input';
import VStack from '@components/custom-ui/VStack';
import { Colors } from '@constants/Colors';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import formatMilliseconds from 'utils/formatMiliseconds';
import InputRightElement from './InputRightElement';

interface ChatInputAreaProps extends InputProps {
    recordingProgress: number;
    isAudioRecording: boolean;
    loadingAudioTranscribe: boolean;
    inputText: string;
    setInputText: React.Dispatch<React.SetStateAction<string>>;
    onSend: () => Promise<void>;
    startRec: () => Promise<void>;
    stopRec: () => Promise<void>;
    onPressClearMessages: () => void;
    onPressMute: () => void;
    muted: boolean;
}

const ChatInputArea = memo(
    ({
        isAudioRecording,
        loadingAudioTranscribe,
        recordingProgress,
        onPressClearMessages,
        onPressMute,
        muted,
        inputText,
        setInputText,
        onSend,
        startRec,
        stopRec,
    }: ChatInputAreaProps) => {
        const { t } = useTranslation('chat');

        return (
            <VStack spacing={10} style={styles.inputArea}>
                <Input
                    placeholder={
                        isAudioRecording
                            ? t('recording', { time: formatMilliseconds(recordingProgress) })
                            : loadingAudioTranscribe
                              ? t('recognizing')
                              : t('type')
                    }
                    placeholderTextColor={
                        isAudioRecording || loadingAudioTranscribe ? Colors.light.white : Colors.light.gray
                    }
                    color={isAudioRecording || loadingAudioTranscribe ? 'red' : Colors.light.background}
                    rightElement={
                        <InputRightElement
                            inputText={inputText}
                            onSend={onSend}
                            startRec={startRec}
                            stopRec={stopRec}
                            disabled={isAudioRecording || loadingAudioTranscribe}
                        />
                    }
                    value={inputText}
                    onChangeText={setInputText}
                    onSubmitEditing={onSend}
                    returnKeyType="send"
                    editable={!isAudioRecording && !loadingAudioTranscribe}
                    selectTextOnFocus={!isAudioRecording && !loadingAudioTranscribe}
                />
                <ButtonGroup direction="row">
                    <Button
                        color={Colors.light.background}
                        textStyle={{ color: Colors.light.gray }}
                        iconLeft={({ color }) => <ReloadIcon width={24} height={24} color={color} />}
                        onPress={onPressClearMessages}
                    />
                    <Button
                        color={muted ? Colors.light.background : Colors.light['primary-500']}
                        textStyle={{ color: muted ? Colors.light.gray : Colors.light.white }}
                        iconLeft={({ color }) =>
                            muted ? (
                                <VolumeOffIcon width={24} height={24} color={color} />
                            ) : (
                                <VolumeIcon width={24} height={24} color={color} />
                            )
                        }
                        onPress={onPressMute}
                    />
                </ButtonGroup>
            </VStack>
        );
    }
);

ChatInputArea.displayName = 'ChatInputArea';

const styles = StyleSheet.create({
    inputArea: {
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
});

export default ChatInputArea;
