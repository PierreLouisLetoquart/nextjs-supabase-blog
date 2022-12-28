import { FaSpinner } from "react-icons/fa"
import { BiImageAdd } from "react-icons/bi"
import { NotifierProps } from "../../../components/Notifier"
import { toast } from "react-toastify"
import { getAvatarUrl } from "../../../utils/gravatar";
import { useSupabase } from "../../../contexts/supabase-provider";
import { useTheme } from "../../../contexts/theme-provider";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function UpdateUserForm () {
    const { session, supabase } = useSupabase();
    const { theme } = useTheme();
    const router = useRouter();
    
    const [loading, setLoading] = useState<boolean>(false);
    const [username, setUsername] = useState<string>(session?.user.user_metadata.username ?? '');
    const [avatar, setAvatar] = useState<string>(session?.user.user_metadata.avatar_url ?? '');

    const handleUsername = (event: { target: { value: any; }; }) => { setUsername(event.target.value); };
    const handleAvatar = () => { setAvatar(getAvatarUrl(session!.user.user_metadata.username)); };

    const handleModification = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(username === '' || username === null || !username) setUsername(session!.user.user_metadata.username);

        try {
            setLoading(true);
            const { error } = await supabase.auth.updateUser({
                data: { username: username, avatar_url: avatar }
            })
            if (error) throw error;
            toast.success('Profile updated successfully', NotifierProps);
            router.push(`/profile/${session!.user.id}}`);
        } catch (err : any) {
            toast.error(err.message, NotifierProps);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full h-screen flex justify-center items-center">
            <form onSubmit={handleModification} className={`relative w-full max-w-lg bg-opacity-50 backdrop-blur-md p-10 rounded-xl flex flex-col items-center gap-6 border-[1px] ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-100 border-zinc-200'}`}>
                <div className="w-full flex items-center gap-5">   
                    <div className="rounded-full w-24 h-24 relative overflow-hidden">
                        <Image src={avatar} fill className="object-cover" alt="ProfilePic" />
                    </div>
                    <button 
                        onClick={handleAvatar}
                        type="button" 
                        className={`${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}`}>
                        <BiImageAdd className="inline-block mr-1 text-xl" />
                        Regenerate
                    </button>
                </div>
                <input 
                    onChange={handleUsername} 
                    maxLength={55}
                    className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:border-zinc-500 ${
                        theme === 'dark' ? 'bg-zinc-700 border-zinc-600 text-gray-200' : 'bg-zinc-50 border-zinc-300 text-zinc-800'}`} 
                    name='username'
                    type="text" 
                    placeholder={session?.user.user_metadata.username ?? 'Username'}
                />
                <button disabled={loading} type="submit" className={`text-center w-full px-4 py-2 rounded-md opacity-90 hover:opacity-100 ${theme === 'dark' ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-800 text-zinc-50'}`}>
                    {loading ? <FaSpinner className='animate-spin'/> :
                    <span>Save</span>}
                </button>
            </form>
        </section>
    )
}
