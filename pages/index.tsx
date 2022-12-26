import Head from "next/head";
import { useTheme } from "../contexts/theme-provider"

export default function Home() {
  const { theme } = useTheme();

  return (
    <>
      <Head><title>Geekit | Homepage</title></Head>
      <section className='w-full h-screen flex flex-col gap-10 justify-center items-center'>
        <section className='relative px-5 py-9'>
            <span className='absolute top-0 left-1 text-lg font-semibold text-zinc-400'>&#x3c;h1&#x3e;</span>
              <h2 className={`text-5xl md:text-7xl lg:text-8xl font-bold py-1 pl-5 border-l-2 border-zinc-400 ${theme === 'dark' ? 'text-zinc-50' : 'text-zinc-900'}`}>
                Hello World!
              </h2>
            <span className='absolute bottom-0 left-0 text-lg font-semibold text-zinc-400'>&#x3c;/h1&#x3e;</span>
          </section>
      </section>
    </>
  )
}