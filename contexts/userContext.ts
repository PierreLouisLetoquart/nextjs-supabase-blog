import { createContext } from 'react';
import { User } from '../@types';

interface Context {
  user: User;
  updateUser: (user: User) => void;
}

export const defaultUser: User = {
    id: 'default',
    username: 'default',
    loggedIn: false
};

export const UserContext = createContext<Context>({
  user: defaultUser,
  updateUser: () => {}
});