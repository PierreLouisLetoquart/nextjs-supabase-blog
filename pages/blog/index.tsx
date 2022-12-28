import supabase from "../../utils/supabase";
import { useState } from "react";
import { useTheme } from "../../contexts/theme-provider";
import { PostCard } from "../../components/PostCard";

export default function Blog({posts} : {posts: any}) {
    const [postsList, setPostsList] = useState(posts);
    const { theme } = useTheme();

    return (
        <>
            <h1 className={`pt-24 w-full text-center text-3xl font-bold tracking-wide ${theme === 'dark' ? 'text-zinc-50' : 'text-zinc-900'}`}>
                Feed
            </h1>
            <ul className="py-10 px-3 w-full flex flex-col items-center gap-10">
                {postsList.map((post: any) => (
                    <li key={post.id}>
                        <PostCard post={post} />
                    </li>
                ))}
            </ul>
        </>
    )
}

export async function getStaticProps() {
    const { data: posts, error } = await supabase
        .from('posts')
        .select('*, likes(*), bookmarks(*)')
        .order('created_at', { ascending: false })

    if (error) {
        console.log(error)
        return {
            props: {
                posts: []
            }
        }
    }

    return {
        props: {
            posts
        },
        revalidate: 10
    }
}