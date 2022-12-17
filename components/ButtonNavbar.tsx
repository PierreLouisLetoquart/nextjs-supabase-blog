import { useContext } from 'react';
import { ThemeContext } from '../contexts/themeContext';

export default function Button({ text }: { text: string }) {
    const { theme } = useContext(ThemeContext);
    return (
        <button className={`px-4 py-[6px] rounded-full tracking-wide flex justify-center items-center ${theme === 'dark' ? 'bg-zinc-50' : 'bg-zinc-900'}`}>
            <span className={`text-xs md:text-sm font-semibold ${theme === 'dark' ? 'text-zinc-900' : 'text-zinc-50'}`}>
                {text}
            </span>
        </button>
    )
}