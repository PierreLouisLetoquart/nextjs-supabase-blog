import { useRouter } from "next/router";
import { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PostCard } from "../../../components/PostCard";
import ProfileLayout from "../../../components/ProfileLayout";
import { useTheme } from "../../../contexts/theme-provider";
import supabase from "../../../utils/supabase";

export default function Profile({bookmarks} : {bookmarks: any}) {
    const [bookmarksList, setBookmarksList] = useState(bookmarks);

    if(!bookmarksList) return <ProfileLayout><NoPostBanner /></ProfileLayout>
    return (
        <>
            <ProfileLayout>
                <ul className="py-10 px-3 w-full flex flex-col items-center gap-10">
                    {bookmarksList.map((posts: any) => (
                        <li key={posts.id}>
                            <PostCard post={posts.posts} />
                        </li>
                    ))}
                </ul>
            </ProfileLayout>
        </>
    )
}

export async function getServerSideProps({ params } : any) {
    const { data: bookmarks } = await supabase
        .from('bookmarks')
        .select('posts(*), posts:likes(*), posts:bookmarks(*)')
        .eq('user_id', params.id)

    return {
        props: {
            bookmarks
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
                    <h1 className="text-2xl font-semibold text-zinc-600">No posts</h1>
                </div>
                <p className="text-zinc-600">When you save something, it will appear here.</p>
                <button onClick={() => router.push('/blog')} className={`mt-3 px-4 py-[6px] rounded-full tracking-wide flex justify-center items-center ${theme === 'dark' ? 'bg-zinc-400' : 'bg-zinc-500'}`}>
                    <span className={`text-xs md:text-sm font-semibold ${theme === 'dark' ? 'text-zinc-900' : 'text-zinc-50'}`}>
                        Explore
                    </span>
                </button>
            </section>
        </section>
    )
}