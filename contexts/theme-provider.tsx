'use client';

import cookie from 'js-cookie';

import { createContext, useContext, useState, useMemo, useEffect } from 'react';

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
    
    useEffect(() => {
        if(cookie.get('theme') === 'dark') {
            setCurrentTheme('dark');
        } else {
            setCurrentTheme('light');
            cookie.set('theme', 'light');
        }
    }, []);

    const value = useMemo(() => ({ theme: currentTheme, setTheme: setCurrentTheme }), [currentTheme]);

    return (
        <Context.Provider value={value}>
            <>{children}</>
        </Context.Provider>
    );
}

export const useTheme = () => useContext(Context);
