import Image from "next/image";

export default function Card({ children, tag, image }) {
  return (
    <div className="flex flex-col items-center p-4 rounded-lg bg-grayCard">
        <Image src={image} width={80} height={80} alt="illustration" className="py-3"/>

        <div className='relative pl-6 py-10 text-white'>
            <div className='absolute top-0 left-3 p-2 font-semibold'>
                <span className="text-blueCode">void</span> <span className="text-grayBg">{tag}</span> <span className="text-orangeCode">&#123;</span>
            </div>

            <section className='border-l-2 border-grayBg pl-4 w-full max-w-[250px]'>
                {children}
            </section>
            

            <div className='absolute bottom-0 left-3 p-2 font-semibold'>
                <span className="text-orangeCode">&#125;</span>
            </div>
        </div>
    </div>
  );
}