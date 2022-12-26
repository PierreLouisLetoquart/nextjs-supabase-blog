import { useState, useEffect } from 'react'
import { createBrowserClient } from '../utils/supabase-browser'
import type { Session } from '@supabase/supabase-js'

export const useAuth = () => {
  const supabase = createBrowserClient()
  const [session, setSession] = useState<Session | null>(null)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data : { session } } = await supabase.auth.getSession()
        setSession(session)
      } catch (error) {
        setError(error)
      }
    }
    fetchData()
  }, [])
  return { session, error };
}
