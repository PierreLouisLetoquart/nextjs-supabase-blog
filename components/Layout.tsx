import Head from "next/head"
import Navbar from "./Navbar"
import { useContext } from 'react';
import { ThemeContext } from '../contexts/themeContext';

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const { theme } = useContext(ThemeContext);

    return (
        <div className="min-h-screen">
            <Head>
                <meta name="description" content="Geekit blog created with Nextjs and Supabase" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="fixed top-0 left-0 z-10 w-full">
                <Navbar />
            </div>
            <main className={`${theme === 'dark' ? 'bg-zinc-900' : 'bg-zinc-50'}`}>
                {children}
            </main>
        </div>
    )
}