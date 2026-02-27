import { useState, useRef } from 'react';

const MIN_DURATION = 2000;

export function useTimedMessage(duration = MIN_DURATION) {
    const [message, setMessage] = useState('');
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const showMessage = (text: string) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setMessage(text);
        timerRef.current = setTimeout(() => setMessage(''), Math.max(duration, MIN_DURATION));
    };

    const clearMessage = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setMessage('');
    };

    return { message, showMessage, clearMessage };
}