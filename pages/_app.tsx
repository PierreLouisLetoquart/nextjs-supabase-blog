import '../styles/globals.css'
import type { AppProps } from 'next/app'
// import SupabaseListener from '../contexts/supabase-listener'
import SupabaseProvider from '../contexts/supabase-provider'
import ThemeProvider from '../contexts/theme-provider';
import { useAuth } from '../hooks/useAuth';
import NavbarLayout from '../components/NavbarLayout';
import { Notifier } from '../components/Notifier';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  const { session } = useAuth();

  return (
    <SupabaseProvider session={session}>
      {/* <SupabaseListener serverAccessToken={session?.access_token} />         */}
      <ThemeProvider>
        <Notifier />
        <NavbarLayout>
            <Component {...pageProps} />
        </NavbarLayout>
      </ThemeProvider>
    </SupabaseProvider>
  )
}
