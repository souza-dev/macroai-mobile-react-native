interface RecognizeFoodResponse {
    success: boolean;
    content?: string;
    error?: string;
}

export default async function recognizeFoodPhoto(imageUrl: string, language: string): Promise<RecognizeFoodResponse> {
    const api = process.env.EXPO_PUBLIC_API_PHOTO as string;
    console.log('usando api:', api);
    try {
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageUrl, language }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            return { success: false, error: data.error || 'Failed to recognize food' };
        }

        return { success: true, content: data.content };
    } catch (err: any) {
        console.error('Erro ao chamar função recognizeFoodPhotoHttp:', err);
        return { success: false, error: err.message || 'Network error' };
    }
}
