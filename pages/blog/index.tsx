/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { UserContext } from "../../contexts/userContext"
import supabase from "../../lib/supabaseClient"
import PostCardSmall from "../../components/PostCardSmall"
// import { Post } from "../../@types" // need to overryde map function

export default function Blog({ posts } : { posts: any }) {
    const router = useRouter()
    const { user, updateUser } = useContext(UserContext)

    const checkUser = async () => {     
        const { data, error } = await supabase.auth.getSession()
        if (error) {
            alert(error.message)
            router.push("/auth/login")
        }
        if (data) {
            updateUser({id: data.session?.user?.id ?? "wtf.",username: data.session?.user?.user_metadata.username, loggedIn: true})
        } else {
            router.push("/auth/login")
        }
    }

    useEffect(() => {
        if (!user.loggedIn) {
            checkUser()
        }
        if (user.id === "default") {
            checkUser()
        }
    }, [])

    return (
        <>
            <Head>
                <title>Blog</title>
            </Head>
            <section className="w-full min-h-screen flex flex-col items-center gap-10 pt-20">
                {/* Title */}
                <h2 className="text-3xl font-bold">Blog</h2>

                {/* Display posts */}
                {posts.map((post: any) => (
                    <div key={post.id}>
                        <PostCardSmall post={post} />
                    </div>
                ))}

                <h3 className="text-2xl font-bold pb-10">End</h3>
            </section>
        </>
    )
}

// FETCH ALL POSTS FROM SUPABASE
export async function getStaticProps() {
    const { data: posts, error } = await supabase
        .from('posts')
        .select('*, likes(*)')
        .order('created_at', { ascending: false })

    // IF ERROR, RETURN EMPTY ARRAY
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
        }
    }
}