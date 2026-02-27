import { createContext, useContext, useState, ReactNode } from 'react';

export type ScreenKey = 'profile' | 'tasks' | 'history' | 'trash' | 'settings';
type ScreenContextType = {
    activeScreen: ScreenKey;
    setActiveScreen: (screen: ScreenKey) => void;
};

const ScreenContext = createContext<ScreenContextType | undefined>(undefined);

export const ScreenProvider = ({ children }: { children: ReactNode }) => {
    const [activeScreen, setActiveScreen] = useState<ScreenKey>('tasks');
    return (
        <ScreenContext.Provider value={{ activeScreen, setActiveScreen }}>
            {children}
        </ScreenContext.Provider>
    );
};

export const useScreen = () => {
    const context = useContext(ScreenContext);
    if (!context) throw new Error('useScreen must be used within a ScreenProvider!');
    return context;
};