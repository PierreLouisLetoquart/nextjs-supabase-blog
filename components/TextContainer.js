export default function TextContainer({ children, tag }) {
    return (
        <div className='relative pl-6 py-10 text-white'>
            <div className='absolute top-0 left-0 p-2 font-semibold'>
                &#60;{tag}&#62;
            </div>

            <section className='border-l-2 border-white pl-4'>
                {children}
            </section>
            

            <div className='absolute bottom-0 left-0 p-2 font-semibold'>
                &#60;{tag}&#62;
            </div>
        </div>
    )
}