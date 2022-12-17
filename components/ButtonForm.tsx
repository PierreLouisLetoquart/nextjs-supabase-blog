import { useContext } from "react"
import { ThemeContext } from "../contexts/themeContext"

export default function ButtonForm({ text } : { text: string }) {
    const { theme } = useContext(ThemeContext);
    
    return (
        <button className={`w-full px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-zinc-200 text-zinc-900' : 'bg-zinc-800 text-zinc-50'}`}>
            {text}
        </button>
    )
}