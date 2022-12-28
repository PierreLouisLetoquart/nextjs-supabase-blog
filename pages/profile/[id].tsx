import { useState } from "react";
import { PostModifier } from "../../components/PostModifier";
import ProfileLayout from "../../components/ProfileLayout";
import supabase from "../../utils/supabase";

export default function Profile({posts} : {posts: any}) {
    const [postsList, setPostsList] = useState(posts);

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