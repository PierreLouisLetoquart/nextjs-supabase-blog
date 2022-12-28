import { useSupabase } from '../../../contexts/supabase-provider';
import { useTheme } from '../../../contexts/theme-provider';
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { MdKeyboardBackspace } from 'react-icons/md';
import { useRouter } from 'next/router';
import { NotifierProps } from '../../../components/Notifier';
import { toast } from 'react-toastify';
import supabase from '../../../utils/supabase';

export default function CreatePostForm({post} : {post : any}) {
    const { session, supabase } = useSupabase();
    const { theme } = useTheme();
    const router = useRouter();
    
    const [loading, setLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(post.title);
    const [content, setContent] = useState<string>(post.content);

    const handleTitle = (event: { target: { value: any; }; }) => { setTitle(event.target.value); };
    const handleContent = (event: { target: { value: any; }; }) => { setContent(event.target.value); };

    const handleScroll = (event: { target: any; }) => {
        const textarea = event.target;
        if (textarea.scrollHeight > textarea.clientHeight) {
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(loading) return; // Prevent multiple requests
        if (!title || !content || title.length < 3 || content.length < 3) {
            toast.error("Invalid post data" , NotifierProps);
            return;
        }

        const postTitle = title;
        const postContent = content;

        try {
            setLoading(true);
            if(!session) throw new Error('Error occured... Please try again later.');
            const { error } = await supabase
                .from('posts')
                .update({ title: postTitle, content: postContent })
                .eq('id', post.id)
            if (error) throw error;
            toast.success('Successfully updated!', NotifierProps);
            router.push(`/blog/${post.id}`);
        } catch (err : any) {
            toast.error(err.message , NotifierProps);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className='w-full min-h-screen flex justify-center pt-28'>
                <form
                    onSubmit={handleUpdate}
                    className={`relative w-full max-w-xl h-full bg-opacity-50 backdrop-blur-md p-10 rounded-xl flex flex-col items-center gap-6 border-[1px] ${
                        theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-100 border-zinc-200'}
                    `}
                >
                    {/* Close Tag */}
                    <p
                        onClick={() => router.back()}
                        className={`w-full cursor-pointer text-sm text-left font-medium flex items-center gap-1 ${
                            theme === 'dark' ? 'text-zinc-400' : 'text-zinc-700'}
                        `}
                    > 
                        <MdKeyboardBackspace />
                        Back
                    </p>
                    <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-zinc-50' : 'text-zinc-900'}`}>
                        Create your post ✏️
                    </h2>
                    <input 
                        value={title}
                        onChange={handleTitle} 
                        maxLength={55}
                        className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:border-zinc-500 ${
                            theme === 'dark' ? 'bg-zinc-700 border-zinc-600 text-gray-200' : 'bg-zinc-50 border-zinc-300 text-zinc-800'}
                        `} 
                        name='title' 
                        type="text" 
                        placeholder="An Impactant Title..."
                    />
                    <section className="w-full relative">
                    <textarea
                        value={content}
                        onScroll={handleScroll}
                        onChange={handleContent}
                        maxLength={800}
                        className={`w-full overflow-hidden resize-none transition-transform ease-out px-4 pt-2 pb-5 rounded-md border focus:outline-none focus:border-zinc-500 ${
                            theme === 'dark' ? 'bg-zinc-700 border-zinc-600 text-gray-200' : 'bg-zinc-50 border-zinc-300 text-zinc-800'}
                        `}
                        name="content"
                        placeholder="Your Content Here..."
                    />
                        <div className={`absolute right-1 bottom-[2px]`}>
                            <span className={`text-[10px] ${theme === 'dark' ?'text-zinc-200' : 'text-zinc-500'}`}>
                                {content.length + "/800"}
                            </span>
                        </div>
                    </section>
                    <section className='w-full flex gap-2 items-center'>
                        <button
                            onClick={() => router.push('/profile')}
                            disabled={loading}
                            type="button" 
                            className={`text-center w-full px-4 py-2 rounded-md opacity-90 hover:opacity-100 ${
                                theme === 'dark' ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-800 text-zinc-50'}
                            `}
                        >
                            <span>Cancel</span>
                        </button>
                        <button
                            disabled={loading}
                            type="submit" 
                            className={`text-center w-full px-4 py-2 rounded-md opacity-90 hover:opacity-100 ${
                                theme === 'dark' ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-800 text-zinc-50'}
                            `}
                        >
                            {loading ? <FaSpinner className='animate-spin'/> :
                            <span>Update</span>}
                        </button>
                    </section>
                </form>
            </section>
        </>
    )
}

export async function getServerSideProps({ params } : any) {
    const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', params.id)
        .single()

    return {
        props: {
            post
        }
    }
}