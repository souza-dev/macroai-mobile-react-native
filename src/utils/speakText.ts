import * as Localization from 'expo-localization';
import * as Speech from 'expo-speech';

export async function speakText(text: string) {
    if (!text) return;
    const locale = Localization.getLocales()[0]?.languageCode || 'en';

    const voices = await Speech.getAvailableVoicesAsync();

    const matchedVoice = voices.find(
        (v) =>
            v.language?.toLowerCase().startsWith(locale.toLowerCase().split('-')[0]) ||
            v.identifier?.toLowerCase().includes(locale.toLowerCase().split('-')[0])
    );
    console.log('matched voice:', matchedVoice);
    const voiceId = matchedVoice?.identifier;
    console.log('voiceId', voiceId);
    const isSpeaking = await Speech.isSpeakingAsync();
    if (isSpeaking) await Speech.stop();
    try {
        Speech.speak(text, {
            language: locale,
            voice: voiceId,
            rate: 1.0,
            pitch: 1.0,
            volume: 1.0,
            onDone: () => console.log('✅ Speech finished'),
            onError: (err) => console.warn('❌ Speech error:', err),
        });
    } catch (error) {
        console.error('Error using Speech.speak:', error);
    }
}
