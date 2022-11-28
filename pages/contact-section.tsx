/* eslint-disable react/jsx-no-comment-textnodes */
import { AiFillInstagram, AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { motion as m, Variants } from "framer-motion";
import TextContainer from '../components/TextContainer'
import Form from '../components/Form'

export default function Contact() {
    const contentVariantLeft: Variants = {
        offscreen: {
            x: 100,
            opacity: 0,
        },
        onscreen: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                bounce: 0.1,
                duration: 0.8,
            }
        }
    };
    
    const contentVariantRight: Variants = {
        offscreen: {
            x: -100,
            opacity: 0
        },
        onscreen: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                bounce: 0.1,
                duration: 0.8,
            }
        }
    };

    return (
        <section className='max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:py-20 md:gap-10'>

            <div className='mb-10'>
                <m.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.8 }}
                    className='overflow-hidden'
                >
                    <m.h2
                        variants={contentVariantLeft}
                        className='text-3xl lg:text-4xl font-bold text-greenCode mt-10 md:mt-16'
                    >
                        //Contact Us
                    </m.h2>
                </m.div>

                <m.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true, amount: 0.8 }}
                    className='overflow-hidden'
                >
                    <m.div
                        variants={contentVariantRight}
                        className='max-w-xl mx-auto mt-6  md:mt-14'
                    >
                        <TextContainer tag={"p"}>
                            <p className='text-base'>
                                We are always looking to improve ourselves, however we are not perfect! <br />
                                If you encounter a bug or have any feedback to give us, do not hesitate to contact us. <br />
                                We are also IT consultants for your business!
                            </p>
                        </TextContainer>
                    </m.div>
                </m.div>

                <div className='mt-6  md:mt-14'>
                    <ul className='flex items-center gap-5'>
                        <li className='text-4xl p-1 rounded-full bg-white'><AiFillInstagram/></li>
                        <li className='text-4xl p-1 rounded-full bg-white'><AiFillGithub/></li>
                        <li className='text-4xl p-1 rounded-full bg-white'><AiFillLinkedin/></li>
                    </ul>
                </div>
            </div>

            <div className='my-10 md:my-0'>
                <Form/> 
            </div>

        </section>
    )
}