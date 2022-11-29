/* eslint-disable react/jsx-no-comment-textnodes */
import Card from '../../components/Card'
import code from '../../public/coding-language.png'
import computer from '../../public/computer.png'
import coding from '../../public/coding.png'
import { motion as m, Variants } from "framer-motion";
import React from 'react';

export default function HowItWork() {
    const contentVariant: Variants = {
        offscreen: {
          y: 100,
          opacity: 0,
        },
        onscreen: {
          y: 0,
          opacity: 1,
          transition: {
            type: "spring",
            bounce: 0.1,
            duration: 0.8,
          }
        }
      };

    return (
        <section className='max-w-6xl mx-auto flex flex-col items-center'>

            <h2 className='mt-20 text-3xl text-white font-bold'>
                How Geek<span className='text-greenCode'>it</span> works?
            </h2>

            <p className='max-w-xl mx-auto text-center text-base text-greenCode mt-6'>
                /* Geek it is a forum, it aims to help the wonderful community of coders.
                Indeed while coding we always encounter problems that seem impossible to solve... 
                Geek it is for that!
                You can also share your favorite tricks or your prowess! */
            </p>

            <section className='py-10 flex flex-col md:flex-wrap md:flex-row justify-center items-center gap-8 lg:gap-10'>

                <m.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.8 }}
                    className='overflow-hidden'
                >
                    <m.div variants={contentVariant}>
                        <Card tag={"code()"} image={code}>
                            <p>
                                You have a question about code, <br />
                                You have implemented a revolutionary function, <br />
                                Share it with the community. <br />
                                Just copy paste it!
                            </p>
                        </Card>
                    </m.div>
                </m.div>

                <m.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.8 }}
                    className='overflow-hidden'
                >
                    <m.div variants={contentVariant}>
                        <Card tag={"answer()"} image={computer}>
                            <p>
                                You are an amateur or expert coder, <br />
                                Come share your experience! <br />
                                Discuss the latest technologies and their implementation!
                            </p>
                        </Card>
                    </m.div>
                </m.div>

                <m.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.8 }}
                    className='overflow-hidden'
                >
                    <m.div variants={contentVariant}>
                        <Card tag={"search()"} image={coding}>
                            <p>
                                Many topics and languages are covered on Geekit, <br />
                                if you have a problem with your code, it has probably already been solved!
                            </p>
                        </Card>
                    </m.div>
                </m.div>

            </section>

        </section>
    )
}