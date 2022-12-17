export type Theme = 'light' | 'dark';

export type User = {
    id: string;
    username: string;
    loggedIn: boolean;
};

export type Post = {
    id: string;
    author_id: string;
    created_at: Date;
    title: string;
    content: string;
}