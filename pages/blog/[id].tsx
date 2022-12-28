import PostPage from "../../components/PostPage";
import supabase from "../../utils/supabase";

export default function PostDetailed({post}: {post: any}) {
    return (
        <>
            <section className="w-full min-h-screen flex justify-center pt-28">
                <PostPage post={post} />
            </section>
        </>
    )
}

export async function getServerSideProps({ params } : any) {
    const { data: post, error } = await supabase
        .from('posts')
        .select('*, comments(*), likes(*), bookmarks(*)')
        .eq('id', params.id)
        .single()

    if (error) {
        console.log(error)
        return {
            props: {
                post: {}
            }
        }
    }

    return {
        props: {
            post
        }
    }
}