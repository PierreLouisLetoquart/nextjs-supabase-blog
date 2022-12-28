import { useTheme } from '../contexts/theme-provider'
import { BsTrash } from 'react-icons/bs'
import { RiEditLine } from 'react-icons/ri'
import { MdZoomOutMap } from 'react-icons/md'

export const PostModifier = ({ post }: { post: any }) => {
    const { theme } = useTheme();

    return (
        <section className={`shadow-md w-full max-w-md p-10 flex flex-col items-center gap-6 rounded-md ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'}`}>

            <h3 className={`cursor-pointer w-full text-left text-2xl font-bold ${theme === 'dark' ? 'text-zinc-50' : 'text-zinc-900'}`}>
                {post.title}
            </h3>

            <section className='w-full flex justify-between items-center'>
                <div className='flex items-center gap-4'>
                    <BsTrash className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}/>     
                    <RiEditLine className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}/>
                </div>
                <MdZoomOutMap className={`text-xl cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}/>
            </section>

        </section>
    )
}