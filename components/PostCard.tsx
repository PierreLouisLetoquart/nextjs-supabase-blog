import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from '../contexts/theme-provider'
import { useSupabase } from '../contexts/supabase-provider'
import { FaBookmark, FaRegBookmark, FaHeart, FaRegHeart, FaRegComment } from 'react-icons/fa'

export const PostCard = ({ post }: { post: any }) => {
    const { supabase, session } = useSupabase();
    const { theme } = useTheme();
    const router = useRouter();
    const [isLiked, setIsLiked] = useState<boolean>();
    const [isBookmarked, setIsBookmarked] = useState<boolean>();
    const [loading, setLoading] = useState<boolean>(false);

    const handleLike = async () => {
        try {
            setLoading(true);
            if (isLiked) {
                // unlike
                const { error } = await supabase
                    .from('likes')
                    .delete()
                    .match({ post_id: post.id, user_id: session?.user.id })
                if (error) throw error;
                setIsLiked(false);
            } else {
                // like
                const { error } = await supabase
                    .from('likes')
                    .insert([{user_id: session!.user.id, post_id: post.id}])
                if (error) throw error;
                setIsLiked(true);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleBookmark = async () => {
        try {
            setLoading(true);
            if (isBookmarked) {
                // unbookmark
                const { error } = await supabase
                    .from('bookmarks')
                    .delete()
                    .match({ post_id: post.id, user_id: session?.user.id })
                if (error) throw error;
                setIsBookmarked(false);
            } else {
                // bookmark
                const { error } = await supabase
                    .from('bookmarks')
                    .insert([{user_id: session!.user.id, post_id: post.id}])
                if (error) throw error;
                setIsBookmarked(true);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(post.likes)
            post.likes.map((like: any) => {
                if (like.user_id === session?.user.id) setIsLiked(true)
            });
        if(post.bookmarks)
            post.bookmarks.map((bookmark: any) => {
                if (bookmark.user_id === session?.user.id) setIsBookmarked(true)
            });
    }, [session])

    return (
        <section className={`shadow-md w-full max-w-md p-10 flex flex-col items-center gap-6 rounded-md ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'}`}>

            <h3
                onClick={() => router.push(`/blog/${post.id}`)}
                className={`cursor-pointer w-full text-left text-2xl font-bold ${theme === 'dark' ? 'text-zinc-50' : 'text-zinc-900'}`}
            >
                {post.title}
            </h3>

            <p
                onClick={() => router.push(`/blog/${post.id}`)}
                id='postCardContent' 
                className={`cursor-pointer overflow-hidden ${theme === 'dark' ? 'text-zinc-50' : 'text-zinc-900'}`}
            >
                {post.content}
            </p>

            <footer className="w-full flex flex-col justify-start gap-5">
                <p className={`text-xs font-medium ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-700'}`}>
                    {post.created_at}
                </p>
                <section className='w-full flex justify-between items-center'>
                    <div className='flex items-center gap-4'>
                        <button type='button' disabled={loading} onClick={handleLike}>
                            {!isLiked && <FaRegHeart className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}/> }
                            {isLiked && <FaHeart className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-rose-600' : 'text-rose-500'}`}/> }
                        </button>
                        <FaRegComment
                            onClick={() => router.push(`/blog/${post.id}`)}
                            className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}
                        />
                    </div>
                    <button type='button' disabled={loading} onClick={handleBookmark}>
                        {!isBookmarked && <FaRegBookmark className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}/> }
                        {isBookmarked && <FaBookmark className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}/> }
                    </button>
                </section>
            </footer>

        </section>
    )
}