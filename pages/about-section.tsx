import Image from 'next/image'
import jobs from '../public/steve.png'
import TextContainer from '../components/TextContainer'
import Button from '../components/Button'

import { motion as m, Variants } from "framer-motion";
import React from 'react';

export default function AboutSection() {
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
        <section
          className='max-w-6xl mx-auto flex flex-col items-center lg:flex-row lg:justify-between'
        >

          <Image src={jobs} alt="Jobs" width={400} height={520} className='w-80 md:w-96 lg:w-[420px] h-auto mt-10' />

          <div className='mb-10'>
            <m.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
              className='overflow-hidden'
            >
              <m.h2
                variants={contentVariantLeft}
                className='text-3xl lg:text-4xl font-bold text-white mt-10'
              >
                &quot;Only geeks code!&quot;
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
                className='max-w-xl mx-auto mt-6'
              >
                <TextContainer tag={"p"}>
                  <p className='text-base'>
                    Indeed the image of a coder is the one of a pimply geek locked in his room every day!
                    This image is false... Especially when websites like ours make the code accessible 
                    to as many people as possible ;&#41; <br />
                    If you are curious and love new technologies, join the community!
                  </p>
                </TextContainer>
              </m.div>
            </m.div>

            <div className='mt-6'>
              <Button>
                Join us now!
              </Button>
            </div>
          </div>

        </section>
    )
}