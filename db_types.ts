export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bookmarks: {
        Row: {
          id: string
          user_id: string
          post_id: string
        }
        Insert: {
          id?: string
          user_id: string
          post_id: string
        }
        Update: {
          id?: string
          user_id?: string
          post_id?: string
        }
      }
      comments: {
        Row: {
          id: string
          author_id: string
          post_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          author_id: string
          post_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          author_id?: string
          post_id?: string
          content?: string
          created_at?: string
        }
      }
      likes: {
        Row: {
          id: string
          user_id: string
          post_id: string
        }
        Insert: {
          id?: string
          user_id: string
          post_id: string
        }
        Update: {
          id?: string
          user_id?: string
          post_id?: string
        }
      }
      posts: {
        Row: {
          id: string
          author_id: string
          created_at: string
          title: string
          content: string | null
          is_published: boolean
        }
        Insert: {
          id?: string
          author_id: string
          created_at?: string
          title: string
          content?: string | null
          is_published?: boolean
        }
        Update: {
          id?: string
          author_id?: string
          created_at?: string
          title?: string
          content?: string | null
          is_published?: boolean
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          avatar_url?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}