/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import WetcomeText from '../components/WelcomeText';
import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/userContext';
import { useRouter } from 'next/router';
import supabase from '../lib/supabaseClient';

export default function Home() {
  const router = useRouter();
  const { user, updateUser } = useContext(UserContext);

  const checkUser = async () => {     
    const { data, error } = await supabase.auth.getSession()
    if (error) {
        alert(error.message)
        router.push("/auth/login")
    }
    if (data) {
        updateUser({id: data.session?.user?.id ?? "wtf.",username: data.session?.user?.user_metadata.username, loggedIn: true})
    }
  }

  useEffect(() => {
    if (user.loggedIn) {
      setTimeout(() => {router.push("/blog");}, 1000);
    }
    if (!user.loggedIn) {
      checkUser()
    }
    if (user.id === "default") {
      checkUser()
    }
  }, [router, user.loggedIn]);
  
  return (
    <div>
      <Head>
        <title>Geekit | Homepage</title>
      </Head>
      <section className='w-full h-screen flex justify-center items-center'>
        {user.loggedIn ? (<WetcomeText text="Redirection..."/>) : (<WetcomeText text="Hello World!"/>)}
      </section>
    </div>
  );
};
