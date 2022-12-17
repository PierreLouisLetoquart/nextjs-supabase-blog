import React from "react";
import { useContext } from 'react';
import { ThemeContext } from '../contexts/themeContext';

export default function WetcomeText({ text }: { text: string }) {
    const { theme } = useContext(ThemeContext);

    return (
        <section className='relative px-5 py-9'>
          <span className='absolute top-0 left-1 text-lg font-semibold text-zinc-400'>&#x3c;h1&#x3e;</span>
            <h2 className={`text-5xl md:text-7xl lg:text-8xl font-bold py-1 pl-5 border-l-2 border-zinc-400 ${theme === 'dark' ? 'text-zinc-50' : 'text-zinc-900'}`}>
              {text}
            </h2>
          <span className='absolute bottom-0 left-0 text-lg font-semibold text-zinc-400'>&#x3c;/h1&#x3e;</span>
        </section>
    )
}