import { useSupabase } from "../contexts/supabase-provider"
import { useTheme } from "../contexts/theme-provider"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

import Image from 'next/image'
import { AiTwotoneEdit } from 'react-icons/ai'
import defaultPic from '../public/defaultPic.jpg'
import Link from "next/link"

export default function ProfileLayout({children} : {children: React.ReactNode}) {
    return (
        <>
            <ProfileNavbar />
            {children}
        </>
    )
}

function ProfileNavbar() {
    const { session } = useSupabase()
    const router = useRouter()
    const { theme } = useTheme()
    const [modify, setModify] = useState(false)
    const [activeLik, setActiveLik] = useState(false)

    useEffect(() => {
        if(router.pathname === '/profile/[id]') setActiveLik(false)
        else if(router.pathname === '/profile/saved/[id]') setActiveLik(true)
    }, [router.pathname, session])

    return (
        <header>
            {/* To avoid Navbar layout */}
            <div className={`w-full h-20 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-zinc-50'}`}></div>
            {/* Profile data and edition CTA */}
            <section className={`w-full max-w-5xl mx-auto h-60 flex flex-col md:flex-row justify-center items-center gap-5`}>
                <div className="rounded-full w-24 h-24 relative overflow-hidden md:h-32 md:w-32">
                    <Image src={session?.user.user_metadata.avatar_url ?? defaultPic} fill className="object-cover" alt="ProfilePic" />
                </div>
                <section className={`h-24 md:h-40 md:pl-5 flex flex-col items-center md:items-start justify-center gap-2 md:border-l-[1px] ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'}`}>
                    <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-zinc-50' : 'text-zinc-900'}`}>{session?.user.user_metadata.username ?? 'John Doe'}</h2>
                    <h2 className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'}`}>{session?.user.email ?? ':/'}</h2>
                    <button onClick={() => router.push('/profile/update')} className={`text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        <AiTwotoneEdit className="inline-block mr-1" />
                        Edit Profile
                    </button>
                </section>
            </section>
            {/* Profile children sections nav */}
            <nav className={`w-full px-3 border-b-[1px] ${theme === 'dark' ? 'border-zinc-700 text-zinc-300' : 'border-zinc-200 text-zinc-900'}`}>
                <ul className="w-full h-full flex justify-center items-center gap-10">
                    <Link href={`/profile/${session?.user.id}`}>
                        <div className={`border-[1px] border-b-0 rounded-t-md ${activeLik === true && 'border-0'} ${theme === 'dark' ? 'border-zinc-700' : 'border-zinc-200'}`}>
                            <li className={`text-sm font-medium px-2 pt-1`}>My posts</li>
                        </div>
                    </Link>
                    <Link href={`/profile/saved/${session?.user.id}`}>
                        <div className={`border-[1px] border-b-0 rounded-t-md ${activeLik === false && 'border-0'} ${theme === 'dark' ? 'border-zinc-700' : 'border-zinc-200'}`}>
                            <li className={`text-sm font-medium px-2 pt-1`}>Saved posts</li>
                        </div>
                    </Link>
                </ul>
            </nav>
        </header>
    )
}