import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';
// Contexts
import { Theme, ThemeContext } from '../contexts/themeContext';
import { User, UserContext, defaultUser } from '../contexts/userContext';
// Layout
import Layout from '../components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  // Contexts: set default theme and user
  const [theme, setTheme] = useState<Theme>('light');
  const toggleTheme = () => {setTheme(theme === 'light' ? 'dark' : 'light');};
  const [user, setUser] = useState<User>(defaultUser);
  const updateUser = (user: User) => {setUser(user);};

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeContext.Provider>
    </UserContext.Provider>
  )
}