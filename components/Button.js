export default function Button({ children }) {
    return (
        <button className='bg-greenCode px-3 py-1 rounded-md'>
            <span className='text-white text-base md:text-lg font-semibold'>{children}</span>
        </button>
    )
}