import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTheme } from "../contexts/theme-provider";
import { useSupabase } from "../contexts/supabase-provider";
import { motion as m } from 'framer-motion';
import { IoIosAddCircle } from 'react-icons/io';
import cookie from 'js-cookie';

export default function NavbarLayout({ children } : { children: React.ReactNode }) {
    const { theme } = useTheme();

    return (
        <main className={`w-full min-h-screen ${theme === 'dark' ? 'bg-zinc-900 selection:text-zinc-900 selection:bg-white' : 'bg-zinc-50 selection:text-zinc-50 selection:bg-zinc-900'}`}>
            <div className={`fixed top-0 left-0 z-10 w-full`}>
                <Navbar />
            </div>
            {children}
        </main>
    )
}

function Navbar() {
    const { theme } = useTheme();
    const { session } = useSupabase();
    
    return (
        <nav className={`w-full h-20 backdrop-blur-md px-4 md:px-6 lg:px-12 border-b-[1px] ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'}`}>
            <div className="w-full max-w-6xl mx-auto h-full flex justify-between items-center">
                <Link href={`/`}>
                    <h1 className={`text-2xl font-extrabold tracking-wide ${theme === 'dark' ? 'text-zinc-50' : 'text-zinc-900'}`}>
                        Geekit.
                    </h1>
                </Link>
                <section className="flex items-center gap-6">
                    <div className={`pr-6 py-2 border-r-[1px] ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'}`}>
                        <Toggler />
                    </div>
                    {session && (
                        <Link href={`/blog/new`}>
                            <IoIosAddCircle className={`text-3xl ${theme === 'dark' ? 'text-zinc-50' : 'text-zinc-900'}`} />
                        </Link>
                    )}
                    <NavButton />
                </section>
            </div>
        </nav>
    )
}

export function NavButton() {
    const { theme } = useTheme();
    const router = useRouter();

    const { session } = useSupabase();
    const [path, setPath] = useState<string>('/');
    const [text, setText] = useState<string>('');

    useEffect(() => {
        if(router.pathname === '/') {
           setPath('/blog');
           setText('Browse');
        } else if(router.pathname.startsWith('/blog')) {
            setPath(`/profile/${session?.user.id}`);
            setText('Profile');
        } else if(router.pathname.startsWith('/profile')) {
            setPath('/blog');
            setText('Feed');
        } else if(router.pathname.startsWith('/login')) {
            setPath('/');
            setText('Home');
        } else {
            setPath('/');
            setText('Home');
        }
    }, [router.pathname])

    return (
        <Link href={path}>
            <button className={`px-4 py-[6px] rounded-full tracking-wide flex justify-center items-center ${theme === 'dark' ? 'bg-zinc-50' : 'bg-zinc-900'}`}>
                <span className={`text-xs md:text-sm font-semibold ${theme === 'dark' ? 'text-zinc-900' : 'text-zinc-50'}`}>
                    {text}
                </span>
            </button>
        </Link>
    )
}

export function Toggler() {
    const { theme, setTheme } = useTheme();

    return (
        <div 
            className={`w-7 h-4 flex rounded-full p-[2px] cursor-pointer ${theme == "dark" ? 'justify-end bg-zinc-100' : 'justify-start bg-zinc-900'}`} 
            onClick={() => {
                setTheme(theme == "dark" ? "light" : "dark");
                cookie.set('theme', theme == "dark" ? "light" : "dark");
            }}
        >
            <m.div 
                className={`h-3 w-3 rounded-full ${theme == "dark" ? 'bg-zinc-900' : 'bg-zinc-100'}`} 
                layout transition={{ type: "spring", stiffness: 700, damping: 30 }} 
            />
        </div>
    )
}