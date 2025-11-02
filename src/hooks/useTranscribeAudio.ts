import { useState } from 'react';

export default function useTranscribeAudio() {
    const [loading, setLoading] = useState(false);
    const API = process.env.EXPO_PUBLIC_TRANSCRIBE_AUDIO as string;

    const transcribe = async (readPath: string): Promise<string> => {
        console.log('path', readPath);

        const headers = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        const formData = new FormData();

        const file = {
            uri: readPath,
            type: 'audio/mp4',
            name: 'sound.mp4',
        };

        formData.append('audio', file as unknown as Blob);

        setLoading(true);
        let text;
        try {
            const res = await fetch(API, {
                method: 'POST',
                headers: headers.headers,
                body: formData,
            });
            const json = await res.json();
            console.log('json', json);
            text = json.text;
            console.log(text);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
        return text;
    };

    return { transcribe, loading };
}
