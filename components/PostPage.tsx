import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { FaBookmark, FaRegBookmark, FaHeart, FaRegHeart, FaRegComment } from 'react-icons/fa'
import { RiSendPlaneLine } from 'react-icons/ri'
import { MdKeyboardBackspace } from 'react-icons/md'

import { useTheme } from '../contexts/theme-provider'
import { useSupabase } from '../contexts/supabase-provider'

export default function PostPage({ post }: { post: any }) {
    const { session } = useSupabase()
    const { theme } = useTheme()
    const router = useRouter()

    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isSaved, setIsSaved] = useState<boolean>(false);

    useEffect(() => {
        if(post.likes)
            post.likes.map((like: any) => {
                if (like.user_id === session?.user.id) setIsLiked(true)
            });
        if(post.bookmarks)
            post.bookmarks.map((bookmark: any) => {
                if (bookmark.user_id === session?.user.id) setIsSaved(true)
            });
    }, [session])
    
    return (
        <section className={`w-full h-full max-w-2xl p-10 flex flex-col items-center gap-6 rounded-md`}>
            <div className='w-full flex flex-col gap-3'>
                {/* Close Tag */}
                <p
                    onClick={() => router.back()}
                    className={`cursor-pointer text-sm font-medium flex items-center gap-1 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-700'}`}
                > 
                    <MdKeyboardBackspace />
                    Back
                </p>
                {/* Title */}
                <h3 className={`w-full text-left text-2xl font-bold ${theme === 'dark' ? 'text-zinc-50' : 'text-zinc-900'}`}> {post.title} </h3>
            </div>
            {/* Content */}
            <p className={`overflow-hidden ${theme === 'dark' ? 'text-zinc-50' : 'text-zinc-900'}`}> {post.content} </p>
            <footer className="w-full flex flex-col justify-start gap-4">
                {/* Creation Date */}
                <p className={`text-xs font-medium ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-700'}`}> {post.created_at} </p>
                {/* Likes, Save */}
                <section className={`w-full flex justify-between items-center gap-4 pb-3 border-b-[1px] ${theme === 'dark' ? 'border-zinc-700' : 'border-zinc-300'}`}>
                    {/* Like Button*/}
                    {!isLiked && <FaRegHeart className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}/>}
                    {isLiked && <FaHeart className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-rose-600' : 'text-rose-500'}`}/>}
                    {/* Comment Button*/}
                    {/* Save Button*/}
                    {!isSaved && <FaRegBookmark className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}/>}
                    {isSaved && <FaBookmark className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}/>}
                </section>
            </footer>
            {/* Comment Input */}
            <form className={`shadow-inner w-full rounded-md p-1 flex items-center gap-2 ${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-100'}`}>
                <textarea 
                    className={`resize-none w-full h-10 p-2 text-sm outline-none ${theme === 'dark' ? 'bg-zinc-700 text-zinc-100' : 'bg-zinc-100 text-zinc-800'}`} 
                    placeholder="Add a comment..." 
                />
                <RiSendPlaneLine className={`text-3xl cursor-pointer pr-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`} />
            </form>
            {/* Comments */}
                <section className={`w-full flex flex-col gap-4 pt-3`}>
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-700'}`}> Comments </p>
                    <section className={`w-full flex flex-col gap-2 pl-[6px] border-l-[1px] border-zinc-300`}>
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-700'}`}>
                            Pilou
                        </p>
                        <p className={`text-sm ${theme === 'dark' ? 'text-zinc-50' : 'text-zinc-900'}`}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </section>
                </section>
        </section>
    )
}