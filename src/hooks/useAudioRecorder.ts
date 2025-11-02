import { useCallback, useEffect, useState } from 'react';

import {
    AndroidAudioEncoder,
    AndroidOutputFormat,
    AudioModule,
    AudioQuality,
    IOSOutputFormat,
    setAudioModeAsync,
    useAudioRecorder as useAudioRecorderExpo,
    useAudioRecorderState,
} from 'expo-audio';

interface AudioRecorderOptions {
    extension: string;
    sampleRate: number;
    numberOfChannels: number;
    bitRate: number;
    android?: {
        outputFormat: AndroidOutputFormat;
        audioEncoder: AndroidAudioEncoder;
    };
    ios?: {
        outputFormat: IOSOutputFormat;
        audioQuality: AudioQuality;
        sampleRate: number;
        numberOfChannels: number;
        bitRate: number;
        linearPCMBitDepth: number;
        linearPCMIsBigEndian: boolean;
        linearPCMIsFloat: boolean;
    };
    web?: {
        mimeType: string;
        bitsPerSecond: number;
    };
}
interface UseAudioRecorderProps {
    options?: Partial<AudioRecorderOptions>;
    onPermissionDenied?: () => void;
}

export default function useAudioRecorder({ options, onPermissionDenied }: UseAudioRecorderProps = {}) {
    const [isAudioRecording, setIsAudioRecording] = useState(false);
    const [microphonePermissionGranted, setMicrophonePermissionGranted] = useState<boolean | null>(null);

    const defaultOptions = {
        extension: '.mp4',
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
        android: {
            outputFormat: 'mpeg4' as AndroidOutputFormat,
            audioEncoder: 'aac' as AndroidAudioEncoder,
        },
        ios: {
            outputFormat: IOSOutputFormat.MPEG4AAC,
            audioQuality: AudioQuality.MAX,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,
        },
        web: {
            mimeType: 'audio/webm',
            bitsPerSecond: 128000,
        },
    };
    const mergedOptions = {
        ...defaultOptions,
        ...options,
        android: {
            ...defaultOptions.android,
            ...options?.android,
        },
        ios: {
            ...defaultOptions.ios,
            ...options?.ios,
        },
        web: {
            ...defaultOptions.web,
            ...options?.web,
        },
    };

    const recorder = useAudioRecorderExpo(mergedOptions);
    const recorderState = useAudioRecorderState(recorder);

    useEffect(() => {
        (async () => {
            const { granted } = await AudioModule.getRecordingPermissionsAsync();
            setMicrophonePermissionGranted(granted);
        })();
    }, []);

    const requestMicrophoneAccess = useCallback(async () => {
        const { granted } = await AudioModule.requestRecordingPermissionsAsync();
        setMicrophonePermissionGranted(granted);
        return granted;
    }, []);

    const setAudioModeForRecording = () => {
        setAudioModeAsync({
            allowsRecording: true,
            interruptionMode: 'doNotMix',
            playsInSilentMode: true,
            shouldRouteThroughEarpiece: false,
        }).then(() => {
            console.log('Audio mode set successfully for recording');
        });
    };

    const startAudioRecording = async (onStart?: () => void, onFinish?: () => void) => {
        setAudioModeForRecording();
        await recorder.prepareToRecordAsync();
        recorder.record();
        onStart?.();
        setIsAudioRecording(true);
        recorder.addListener('recordingStatusUpdate', (status) => {
            if (status.isFinished) {
                setIsAudioRecording(false);
                onFinish?.();
            }
        });
    };

    const stopAudioRecording = async (): Promise<string | null | undefined> => {
        await recorder.stop();
        setIsAudioRecording(false);
        await setAudioModeAsync({
            allowsRecording: false,
            playsInSilentMode: true,
        });
        return recorder.uri;
    };

    return {
        startAudioRecording,
        stopAudioRecording,
        isAudioRecording,
        recordingProgress: recorderState.durationMillis,
        uri: recorder.uri,
        requestMicrophoneAccess,
    };
}
