import { useState } from "react";
import { PostCard } from "../../../components/PostCard";
import ProfileLayout from "../../../components/ProfileLayout";
import supabase from "../../../utils/supabase";

export default function Profile({bookmarks} : {bookmarks: any}) {
    const [bookmarksList, setBookmarksList] = useState(bookmarks);

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