export async function askGemini(message: string, isFloating: boolean = false): Promise<string | null> {
    try {
        const apiUrl = import.meta.env.DEV 
            ? 'http://localhost:3001/api/chat' 
            : 'https://akram-coaching.onrender.com/api/chat';

        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, isFloating })
        });

        if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();
        return data.text || null;
    } catch (error) {
        console.error("Gemini API Error:", error);
        return null;
    }
}
