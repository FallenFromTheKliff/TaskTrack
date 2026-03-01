import { createContext, useContext, useState, useRef, ReactNode, RefObject } from 'react';

export type ScreenKey = 'profile' | 'tasks' | 'history' | 'trash' | 'settings';

type ScreenContextType = {
    activeScreen: ScreenKey;
    setActiveScreen: (screen: ScreenKey) => void;
    navigationGuard: RefObject<(() => boolean) | null>;
};

const ScreenContext = createContext<ScreenContextType | undefined>(undefined);

export const ScreenProvider = ({ children }: { children: ReactNode }) => {
    const [activeScreen, setActiveScreenState] = useState<ScreenKey>('tasks');
    const navigationGuard = useRef<(() => boolean) | null>(null);

    const setActiveScreen = (screen: ScreenKey) => {
        if (navigationGuard.current && navigationGuard.current()) return;
        setActiveScreenState(screen);
    };

    return (
        <ScreenContext.Provider value={{ activeScreen, setActiveScreen, navigationGuard }}>
            {children}
        </ScreenContext.Provider>
    );
};

export const useScreen = () => {
    const context = useContext(ScreenContext);
    if (!context) throw new Error('useScreen must be used within a ScreenProvider!');
    return context;
};