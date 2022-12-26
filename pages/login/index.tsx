'use client';

import { FormEvent, useState } from "react";
import { FaGithub, FaGoogle, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { NotifierProps } from "../../components/Notifier";
import { useSupabase } from '../../contexts/supabase-provider';

export default function Login() {
    const { supabase } = useSupabase();

    const [toggle, setToggle] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    
    const handleChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setFormData({ ...formData, [name]: value });
    };
    
    // Form submit handler for signin and signup
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if(loading) return; // Prevent multiple requests
        e.preventDefault();
        try {
            setLoading(true);
            if (toggle) {
                // Sign up
                let { data, error } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {data: {username: formData.name}}
                })
                if (error) throw new Error(error.message)
                if (data) {
                    toast.info('Go check your emails!', NotifierProps);
                }
            } else {
                // Sign in
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                })
                if (error) throw new Error(error.message)
                if (data) {
                    toast.success('Successfully logged!', NotifierProps);
                }
            }
        } catch (error : any) {
            toast.error(error.message , NotifierProps);
        } finally {
            setLoading(false);
        }
    }

    // OAuth signin
    const handleOAuth = async () => {
        if(loading) return; // Prevent multiple requests
        let { data, error } = await supabase.auth.signInWithOAuth({provider: 'github'})
        if (error) {
            toast.error(error.message , NotifierProps);
        }
        if (data) {
            toast.success('Successfully logged!', NotifierProps);
        }
    }

    // Form component
    return (
        <section className="w-full h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit} className={`w-full max-w-sm p-10 rounded-xl shadow-md flex flex-col items-center gap-6 bg-zinc-100`}>
                {/* Title */}
                <h2 className={`text-3xl font-bold text-zinc-900}`}>{toggle ? 'Welcome 👋' : 'Hey you 🤓'}</h2>
                {/* Form inputs and buttons */}
                {toggle &&
                    <input
                        className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:border-zinc-500 bg-zinc-50 border-zinc-300 text-zinc-800`} 
                        name='name'
                        type="text"
                        placeholder="Username"
                        value={formData.name}
                        onChange={handleChange}
                    />
                }
                <input
                    className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:border-zinc-500 bg-zinc-50 border-zinc-300 text-zinc-800`} 
                    name='email'
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input 
                    className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:border-zinc-500 bg-zinc-50 border-zinc-300 text-zinc-800`} 
                    name='password'
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <div className="w-full flex flex-col gap-1 items-center">
                    <button disabled={loading} type="submit" className={`text-center w-full px-4 py-2 rounded-md opacity-90 hover:opacity-100 bg-zinc-800 text-zinc-50`}>
                        {loading ? <span><FaSpinner className='animate-spin inline-block mr-2'/> Loading</span> :
                        <span>{toggle ? 'Sign up' : 'Sign in'}</span>}
                    </button>
                </div>
                {/* Separator */}
                <FormSeparator />
                {/* OAuth button */}
                <div onClick={handleOAuth} className="w-full"><SignWithButton provider="github" loading={loading} /></div>
                {/* Toggle */}
                <FormToggle toggle={toggle} setToggle={setToggle} />
            </form>
        </section>
    )
}

// Sign with button

type SignWithProps = {
    provider: 'google' | 'github';
    loading: boolean;
};

const SignWithButton = ({provider, loading} : SignWithProps) => {
    return (
        <button
            type="button"
            disabled={loading}
            className={`w-full px-4 py-2 rounded-md flex items-center justify-center opacity-90 hover:opacity-100 bg-zinc-800 text-zinc-50`}
        >
            <span className='inline-block mr-2'>{provider == "google" ? <FaGoogle/> : <FaGithub/>}</span>
            Signin with {provider == "google" ? "Google" : "Github"}
        </button>
    )
}

// Form separator

const FormSeparator = () => {
    return (
        <div className='w-full flex items-center justify-center'>
            <div className={`w-1/5 h-0.5 bg-zinc-300`}></div>
            <p className={`px-2 font-bold text-zinc-400`}>or</p>
            <div className={`w-1/5 h-0.5 bg-zinc-300`}></div>
        </div>
    )
}

// Signup Signin toggler

type SignToggleProps = {
    toggle: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormToggle = ({ toggle, setToggle } : SignToggleProps) => {
    return (
        <p className={'text-zinc-400'}>
            {toggle ? 'Already have an account? ' : 'Don\t have an account? '}
            <button
                type="button"
                onClick={() => setToggle(!toggle)}
                className={`font-bold cursor-pointer text-zinc-600`}
            >
                {toggle ? 'Signin' : 'Signup'}
            </button>
        </p>
    )
}