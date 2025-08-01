import axios from 'axios';

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export async function translateText(text: string, targetLang: string) {
    try {
        const res = await axios.post(
            `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`,
            {
            q: text,
            target: targetLang,
            format: 'text',
            }
        );

        return res.data.data.translations[0].translatedText;
    } catch (err) {
        console.error('Translation error:', err);
        return text;
    }
}
