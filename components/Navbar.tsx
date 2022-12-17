import ButtonTheme from "./ButtonTheme";
import Link from "next/link";
import { useContext } from 'react';
import { ThemeContext } from '../contexts/themeContext';
import { UserContext } from "../contexts/userContext";
import ButtonNavbar from "./ButtonNavbar";

export default function Navbar() {
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(UserContext);
    
    return (
        <nav className={`w-full h-20 backdrop-blur-md px-4 md:px-6 lg:px-12 border-b-[1px] ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'}`}>
            <div className="w-full max-w-6xl mx-auto h-full flex justify-between items-center">
                <Link href="/">
                    <h1 className={`text-2xl font-extrabold tracking-wide ${theme === 'dark' ? 'text-zinc-50' : 'text-zinc-900'}`}>
                        Geekit.
                    </h1>
                </Link>
                <section className="flex items-center gap-6">
                    <div className={`pr-6 py-2 border-r-[1px] ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'}`}>
                        <ButtonTheme />
                    </div>
                    {!user.loggedIn && <Link href="/auth/login"><ButtonNavbar text="Browse now" /></Link>}
                    {user.loggedIn && <Link href="/"><ButtonNavbar text="Profile" /></Link>}
                </section>
            </div>
        </nav>
    )
}