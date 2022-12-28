import { useSupabase } from '../contexts/supabase-provider'
import { useTheme } from '../contexts/theme-provider'
import { BsTrash } from 'react-icons/bs'
import { RiEditLine } from 'react-icons/ri'
import { MdZoomOutMap } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { NotifierProps } from './Notifier'
import CreatePostForm from '../pages/blog/new/index'

export const PostModifier = ({ post }: { post: any }) => {
    const { supabase } = useSupabase();
    const { theme } = useTheme();
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);

    const handleDelete = async () => {
        if(loading) return;
        try {
            setLoading(true);
            const { error } = await supabase
                .from('posts')
                .delete()
                .eq('id', post.id)
            if(error) throw error;
            toast.success('Successfully deleted!', NotifierProps);
        } catch (error : any) {
            toast.error(error.message, NotifierProps);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className={`shadow-md w-full max-w-md p-10 flex flex-col items-center gap-6 rounded-md ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'}`}>

            <h3 className={`cursor-pointer w-full text-left text-2xl font-bold ${theme === 'dark' ? 'text-zinc-50' : 'text-zinc-900'}`}>
                {post.title}
            </h3>

            <section className='w-full flex justify-between items-center'>
                <div className='flex items-center gap-4'>
                    <BsTrash
                        onClick={handleDelete}
                        className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}
                    />
                    <RiEditLine
                        onClick={() => router.push(`/blog/new/${post.id}`)}
                        className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}
                    />
                </div>
                <MdZoomOutMap
                    onClick={() => router.push(`/blog/${post.id}`)}
                    className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}
                />
            </section>

        </section>
    )
}