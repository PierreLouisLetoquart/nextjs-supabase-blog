import { motion as m } from 'framer-motion';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/themeContext';

export default function ButtonTheme() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div 
            className={`w-7 h-4 flex rounded-full p-[2px] cursor-pointer ${theme == "dark" ? 'justify-end bg-zinc-100' : 'justify-start bg-zinc-900'}`} 
            onClick={toggleTheme}
        >
            <m.div 
                className={`h-3 w-3 rounded-full ${theme == "dark" ? 'bg-zinc-900' : 'bg-zinc-100'}`} 
                layout transition={{ type: "spring", stiffness: 700, damping: 30 }} 
            />
        </div>
    )
}