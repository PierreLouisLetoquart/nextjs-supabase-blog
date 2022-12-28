import { useState } from "react";
import { PostModifier } from "../../components/PostModifier";
import ProfileLayout from "../../components/ProfileLayout";
import { useTheme } from "../../contexts/theme-provider";
import supabase from "../../utils/supabase";
import { IoDocumentTextOutline } from 'react-icons/io5';
import { useRouter } from "next/navigation";

export default function Profile({posts} : {posts: any}) {
    const [postsList, setPostsList] = useState(posts);

    if(!postsList) return <ProfileLayout><NoPostBanner /></ProfileLayout>
    return (
        <>
            <ProfileLayout>
                <ul className="py-10 px-3 w-full flex flex-col items-center gap-10">
                    {postsList.map((post: any) => (
                        <li key={post.id}>
                            <PostModifier post={post} />
                        </li>
                    ))}
                </ul>
            </ProfileLayout>
        </>
    )
}

export async function getServerSideProps({ params } : any) {
    const { data: posts } = await supabase
        .from('posts')
        .select('*')
        .eq('author_id', params.id)
        .order('created_at', { ascending: false })

    return {
        props: {
            posts
        }
    }
}

function NoPostBanner() {
    const { theme } = useTheme();
    const router = useRouter();

    return (
        <section className="w-full pt-20">
            <section className="w-full max-w-xl mx-auto flex flex-col items-center gap-4">
                <div className="flex gap-2 items-center">
                    <IoDocumentTextOutline className="text-2xl text-zinc-600" />
                    <h1 className="text-2xl font-semibold text-zinc-600">No posts yet</h1>
                </div>
                <p className="text-zinc-600">When you post something, it will appear here.</p>
                <button onClick={() => router.push('/blog/new')} className={`mt-3 px-4 py-[6px] rounded-full tracking-wide flex justify-center items-center ${theme === 'dark' ? 'bg-zinc-400' : 'bg-zinc-500'}`}>
                    <span className={`text-xs md:text-sm font-semibold ${theme === 'dark' ? 'text-zinc-900' : 'text-zinc-50'}`}>
                        Create a post
                    </span>
                </button>
            </section>
        </section>
    )
}