
const OPENAI_API_KEY_KEY = 'flytbase_openai_key';

export const setOpenAIKey = (key: string) => {
    sessionStorage.setItem(OPENAI_API_KEY_KEY, key);
};

export const getOpenAIKey = () => {
    return sessionStorage.getItem(OPENAI_API_KEY_KEY);
};

export const hasKey = () => !!getOpenAIKey();

export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export const generateAIResponse = async (messages: ChatMessage[]) => {
    const key = getOpenAIKey();
    if (!key) {
        throw new Error("No API Key Provided");
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: messages,
                temperature: 0.7,
                max_tokens: 150
            })
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        return data.choices[0].message.content;
    } catch (error) {
        console.error("AI Generation Error", error);
        throw error; // Let caller handle fallback
    }
};
