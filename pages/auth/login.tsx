/* eslint-disable react-hooks/exhaustive-deps */
// NEXT && REACT
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
// COMPONENTs
import ButtonForm from "../../components/ButtonForm";
import ButtonPopup from "../../components/ButtonPopup";
import Separator from "../../components/FormSeparator";
import ButtonSigninWith from "../../components/ButtonSigninWith";
// SUPABASE
import supabase from "../../lib/supabaseClient";
// THEME
import { ThemeContext } from "../../contexts/themeContext";
// USER
import { UserContext } from "../../contexts/userContext";


export default function Login() {

    // ROUTER
    const router = useRouter();
    // THEME
    const { theme } = useContext(ThemeContext);
    // USER
    const { user, updateUser } = useContext(UserContext);
    // STATEs
    const [ signin, setSignin ] = useState(false);
    const [formData, setFormData] = useState({username: '',email: '',password: ''});

    // FORM FUNCTIONs
    function checkLength(str: string): boolean { return str.length >= 6; }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormData((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!checkLength(formData.password)) {alert('Password must contain at least 6 characters'); return;}
        if(!signin){if (!checkLength(formData.username)) {alert('Username must contain at least 6 characters'); return;}}
        if(signin) {handleSignIn();} else {handleSignUp();}
    }

    // SUPABASE FUNCTIONs
    const handleSignIn = async () => {
        let { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
        })
        if(error) {
            alert(error.message)
            return;
        }
        console.log(data.user?.id + ' ' + data.user?.user_metadata.username)
    }

    const handleSignUp = async () => {
        let { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password
        })
        if(error) {
            alert(error.message)
            return;
        }
        console.log(data.user?.id + ' ' + data.user?.user_metadata.username)
    }

    // LISTENNING TO AUTH STATE CHANGEs
    useEffect(() => {
        // redirect if user is logged in
        if(user.loggedIn) {router.push('/blog');}

        supabase.auth.onAuthStateChange((event, session) => {
            if (event == 'PASSWORD_RECOVERY') {
                console.log('PASSWORD_RECOVERY', session)
                alert('show screen to update user\'s password');
            }
            if (event == 'SIGNED_IN') {
                updateUser({id: session?.user?.id ?? "wtf.",username: session?.user?.user_metadata.username, loggedIn: true})
                router.push('/blog');
            }
        })
    }, [])

    return (
        <>
            <Head><title>Geekit | Login</title></Head>
            <section className='w-full h-screen flex flex-col gap-10 justify-center items-center'>
                {/* Form Container */}
                <form onSubmit={handleSubmit} className={`p-10 rounded-xl shadow-md flex flex-col items-center gap-6 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
                    {/* Title */}
                    <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-zinc-50' : 'text-zinc-900'}`}>{signin ? 'Hey you 🤓' : 'Welcome 👋'}</h2>
                    {/* Form inputs and buttons */}
                    {!signin &&
                        <input className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:border-zinc-500 ${theme === 'dark' ? 'bg-zinc-700 border-zinc-600 text-gray-200' : 'bg-zinc-50 border-zinc-300 text-zinc-800'}`} name='username' type="text" placeholder="Username" value={formData.username} onChange={handleChange}/>
                    }
                    <input className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:border-zinc-500 ${theme === 'dark' ? 'bg-zinc-700 border-zinc-600 text-gray-200' : 'bg-zinc-50 border-zinc-300 text-zinc-800'}`} name='email' type="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
                    <input className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:border-zinc-500 ${theme === 'dark' ? 'bg-zinc-700 border-zinc-600 text-gray-200' : 'bg-zinc-50 border-zinc-300 text-zinc-800'}`} name='password' type="password" placeholder="Password" value={formData.password} onChange={handleChange}/>
                    {signin && <ButtonForm text='Signin'/>}
                    {!signin && <ButtonPopup buttonText='Signup' popupTitle='Signup successful' popupText='Your account has been successfully created. We’ve sent you an email to confirm it. Go check your inbox!' popupButton='Got it, thanks!' popupButtonLink='' />}
                    <Separator/>
                    {/* OAuth login buttons */}
                    <div className='w-full'>
                        <ButtonSigninWith provider="google"/>
                    </div>
                    <div className='w-full'>
                        <ButtonSigninWith provider="github"/>
                    </div>
                    {/* Redirect to login page */}
                    <p className='text-zinc-400'>{signin ? 'Don\'t have an account? ' : 'Already have an account? '}<span onClick={() => setSignin(!signin)} className={`font-bold cursor-pointer ${theme === 'dark' ? 'text-zinc-300' : 'text-zinc-500'}`}>{signin ? 'Signup' : 'Signin'}</span></p>
                </form>
            </section>
        </>

    )
}