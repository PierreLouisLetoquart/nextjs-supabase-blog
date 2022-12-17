import supabase from '../../lib/supabaseClient'
import { useEffect, useState } from 'react'
import PostCardSmall from '../../components/PostCardSmall'
import { UserContext } from '../../contexts/userContext'
import { useContext } from 'react'

export default function Post({ post }: { post: any }) {
    const { user } = useContext(UserContext);

    // Listen for changes on the post
    useEffect(() => {
        const subscription = supabase
            .channel('public:posts')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, payload => {
                console.log('Change received!', payload)
        }).subscribe()

        supabase.removeChannel(subscription);
    }, [])

    return (
        <section className="w-full min-h-screen flex justify-center items-center">
            <PostCardSmall post={post} />
        </section>
    )
}

export async function getServerSideProps({ params } : any) {
    const { data: post, error } = await supabase
        .from('posts')
        .select('*, comments(*), likes(*)')
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
