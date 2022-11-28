import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className='font-Fira px-3 md:px-6 lg:px-16 bg-darkLight'>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp
