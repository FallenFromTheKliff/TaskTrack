import { useState } from 'react';

export function useBulkAction(onConfirm: () => Promise<void> | void) {
    const [isVisible, setIsVisible] = useState(false);
    const open = () => setIsVisible(true);
    const close = () => setIsVisible(false);
    const confirm = async () => {
        setIsVisible(false);
        await onConfirm();
    };
    return { isVisible, open, close, confirm };
}