import { FaGoogle, FaGithub } from 'react-icons/fa'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/themeContext'

export default function ButtonSigninWith({ provider }: { provider: string }) {
    const { theme } = useContext(ThemeContext);

    return (
        <button className={`w-full px-4 py-2 rounded-md flex items-center justify-center ${theme === 'dark' ? 'bg-zinc-200 text-zinc-900' : 'bg-zinc-800 text-zinc-50'}`}>
            <span className='inline-block mr-2'>{provider == "google" ? <FaGoogle/> : <FaGithub/>}</span>
            Login with {provider == "google" ? "Google" : "Github"}
        </button>
    )
}