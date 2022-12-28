import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { FaBookmark, FaRegBookmark, FaHeart, FaRegHeart, FaRegComment } from 'react-icons/fa'
import { RiSendPlaneLine } from 'react-icons/ri'
import { MdKeyboardBackspace } from 'react-icons/md'

import { useTheme } from '../contexts/theme-provider'
import { useSupabase } from '../contexts/supabase-provider'
import { toast } from 'react-toastify'
import { NotifierProps } from './Notifier'

export default function PostPage({ post }: { post: any }) {
    const { session, supabase } = useSupabase()
    const { theme } = useTheme()
    const router = useRouter()

    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isSaved, setIsSaved] = useState<boolean>(false);

    const [comments, setComments] = useState<any>(post.comments.reverse());
    const [loading, setLoading] = useState<boolean>(false);
    const [content, setContent] = useState<string>('');

    const handleContent = (event: { target: { value: any; }; }) => { setContent(event.target.value); };

    const handleComment = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(loading) return; // Prevent multiple requests
        if (!content || content.length < 3) {
            toast.error("Invalid comment data" , NotifierProps);
            return;
        }

        const postContent = content;

        try {
            setLoading(true);
            if(!session) throw new Error('Error occured... Please try again later.');
            const { error } = await supabase
                .from('comments')
                .insert([
                    { author_id: session!.user.id, post_id: post.id, content: postContent },
                ])
            if (error) throw error;
            toast.success('Successfully posted!', NotifierProps);
            setContent('');
        } catch (err : any) {
            toast.error(err.message , NotifierProps);
        } finally {
            setLoading(false);
        }
    };

    const addComment = async (payload: any) => {
        let newComment: any;
        try {
            let { data: comm, error } = await supabase
                .from('comments')
                .select('*, profiles(*)')
                .eq('id', payload.id)
                .single()
            if (error) throw error;
            newComment = comm;
        } catch (err : any) {
            toast.error(err.message , NotifierProps);
        } finally {
            setComments([
                newComment,
                ...comments
            ]);
        }
    }

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
            if (isSaved) {
                // unbookmark
                const { error } = await supabase
                    .from('bookmarks')
                    .delete()
                    .match({ post_id: post.id, user_id: session?.user.id })
                if (error) throw error;
                setIsSaved(false);
            } else {
                // bookmark
                const { error } = await supabase
                    .from('bookmarks')
                    .insert([{user_id: session!.user.id, post_id: post.id}])
                if (error) throw error;
                setIsSaved(true);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (commId: string) => {
        try {
            setLoading(true);
            const { error } = await supabase
                .from('comments')
                .delete()
                .match({ id: commId })
            if (error) throw error;
            toast.success('Successfully deleted!', NotifierProps);
            setTimeout(() => {
                router.reload();
            }, 1800);
        } catch (error : any) {
            toast.error(error.message , NotifierProps);
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
                if (bookmark.user_id === session?.user.id) setIsSaved(true)
            });

        supabase.channel('comments-adding')
            .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'comments', filter: `post_id=eq.${post.id}` },
            (payload) => {
                addComment(payload.new);
            }
            )
            .subscribe()

        return () => {
            supabase.channel('comments-adding').unsubscribe()
        }
    }, [session, post.bookmarks, post.id, post.likes, supabase])
    
    return (
        <section className={`w-full h-full max-w-2xl p-10 flex flex-col items-center gap-6 rounded-md`}>
            <div className='w-full flex flex-col gap-3'>
                {/* Close Tag */}
                <p
                    onClick={() => router.push('/blog')}
                    className={`cursor-pointer text-sm font-medium flex items-center gap-1 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-700'}`}
                > 
                    <MdKeyboardBackspace />
                    Back to Blog
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
                    <button type='button' disabled={loading} onClick={handleLike}>
                        {!isLiked && <FaRegHeart className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}/>}
                        {isLiked && <FaHeart className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-rose-600' : 'text-rose-500'}`}/>}
                    </button>
                    {/* Comment Button*/}
                    {/* Save Button*/}
                    <button type='button' disabled={loading} onClick={handleBookmark}>
                        {!isSaved && <FaRegBookmark className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}/>}
                        {isSaved && <FaBookmark className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}/>}
                    </button>
                </section>
            </footer>
            {/* Comment Input */}
            <form onSubmit={handleComment} className={`shadow-inner w-full rounded-md p-1 flex items-center gap-2 ${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-100'}`}>
                <textarea
                    value={content}
                    onChange={handleContent}
                    className={`resize-none w-full h-10 p-2 text-sm outline-none ${theme === 'dark' ? 'bg-zinc-700 text-zinc-100' : 'bg-zinc-100 text-zinc-800'}`} 
                    placeholder="Add a comment..." 
                />
                <button type='submit'>
                    <RiSendPlaneLine className={`text-3xl cursor-pointer pr-2 ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`} />
                </button>
            </form>
            {/* Comments */}
                <section className={`w-full flex flex-col gap-4 pt-3`}>
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-700'}`}> Comments </p>
                    {comments.map((comment: any) => (
                        <div key={comment.id} className='w-full flex flex-col justify-start'>
                            <section className={`w-full flex flex-col gap-2 pl-1 border-l-[1px] border-zinc-300`}>
                                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-700'}`}> {comment.profiles.username ? comment.profiles.username : 'John Doe'} </p>
                                <p className={`text-sm ${theme === 'dark' ? 'text-zinc-50' : 'text-zinc-900'}`}> {comment.content} </p>
                            </section>
                            {comment.author_id === session?.user.id &&
                            <button
                                onClick={() => handleDelete(comment.id)}
                                disabled={loading}
                                className='pt-2 pl-2 w-full text-start text-xs underline text-zinc-500'
                            >
                                Delete
                            </button>
                            }
                        </div>
                        
                    ))}
                </section>
        </section>
    )
}