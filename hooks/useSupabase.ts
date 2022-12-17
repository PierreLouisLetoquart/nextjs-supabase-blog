/* eslint-disable react-hooks/exhaustive-deps */
//useSupabase.js

import { useState, useEffect } from "react";

//supaCall calls the Supabase API
const useSupabase = (supaCall:any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        let { data, error } = await supaCall();
        if (error) {
          setError(error);
          // Show toast with relevant error message to user
          // Log error to Airbrake or Sentry
        } else {
          setData(data);
        }
      } catch (e) {
        // Likely to be a network error
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  return { loading, data, error };
};

export default useSupabase;
