import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { ThemeContext } from '../contexts/themeContext'
import { FaBookmark, FaRegBookmark, FaComment, FaRegComment, FaHeart, FaRegHeart } from 'react-icons/fa'

export default function PostCard({ post }: { post: any }) {
    
    const { theme } = useContext(ThemeContext)
    const router = useRouter()
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    return (
        <section className={`w-full max-w-md p-10 flex flex-col items-center gap-6 rounded-md ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
            <h3 className={`w-full text-left text-2xl font-bold ${theme === 'dark' ? 'text-zinc-50' : 'text-zinc-900'}`}>
                {post.title}
            </h3>
            <p className={`text-justify ${theme === 'dark' ? 'text-zinc-50' : 'text-zinc-900'}`}>
                {post.content}
            </p>
            <footer className="w-full flex flex-col justify-start gap-3">
                <p className={`text-xs font-medium ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-700'}`}>
                    {post.created_at}
                </p>
                <section className='w-full flex justify-end items-center gap-4'>
                    {!liked ?
                        <FaRegHeart 
                            onClick={() => setLiked(!liked)}
                            className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}
                        />
                        :
                        <FaHeart
                            onClick={() => setLiked(!liked)}
                            className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}
                        />
                    }
                    <FaRegComment 
                        onClick={() => router.push(`/blog/${post.id}`)} 
                        className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}
                    />
                    {!bookmarked ?
                        <FaRegBookmark
                            onClick={() => setBookmarked(!bookmarked)}
                            className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`} 
                        />
                        :
                        <FaBookmark
                            onClick={() => setBookmarked(!bookmarked)}
                            className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}
                        />
                    }
                </section>
            </footer>
        </section>
    )
}