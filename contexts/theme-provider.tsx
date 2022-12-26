'use client';

import { createContext, useContext, useState, useMemo } from 'react';

export type Theme = 'light' | 'dark';

type ThemeContext = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

// @ts-ignore
const Context = createContext<ThemeContext>();

export default function ThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    const [currentTheme, setCurrentTheme] = useState<Theme>('light' as Theme);
    const value = useMemo(() => ({ theme: currentTheme, setTheme: setCurrentTheme }), [currentTheme]);

    return (
        <Context.Provider value={value}>
            <>{children}</>
        </Context.Provider>
    );
}

export const useTheme = () => useContext(Context);
