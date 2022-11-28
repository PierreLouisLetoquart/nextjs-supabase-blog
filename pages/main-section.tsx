import { SlMouse } from 'react-icons/sl';
import Button from "../components/Button";
import TextContainer from "../components/TextContainer";
import { motion as m } from "framer-motion";
import React from 'react';

export default function MainSection() {
    return (
        <section className='max-w-6xl mx-auto h-screen flex flex-col justify-between items-center'>
            <header className='w-full flex justify-between items-center px-3 py-2 mt-10'>
                <div className='overflow-hidden'>
                    <m.h1
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className='text-3xl md:text-4xl text-white font-bold'
                    >
                        Geek<span className='text-greenCode'>it.</span>
                    </m.h1>
                </div>
                <Button>Browse now</Button>
            </header>
            <TextContainer tag="h1">
                <div className='overflow-hidden'>
                    <m.span 
                        initial={{ opacity: 0,}}
                        animate={{ opacity: 1,}}
                        transition={{ duration: 1 }}
                        className='font-medium text-4xl md:text-6xl lg:text-8xl'
                    >
                        Hello, World!
                    </m.span>
                </div>
            </TextContainer> 
            <footer className='flex flex-col items-center p-5 mb-10'>
                <SlMouse className='text-white text-4xl animate-bounce' />
                <p className='text-sm text-greenCode'>Scroll down</p>
            </footer>
        </section>
    )
}