import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import WetcomeText from '../components/WelcomeText';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {router.push("/");}, 1200);
  }, [router]);
  
  return (
    <div>
      <Head>
        <title>Geekit | Not found</title>
      </Head>
      <section className='w-full h-screen flex justify-center items-center'>
        <WetcomeText text="Not found..."/>
      </section>
    </div>
  );
};