'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

type User = {
  id: string;
  name: string;
  email: string;
  image: string;

};

function useUserInfo() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await axios.get<User>('http://localhost:3000/api/infoUser');
        setUser(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUserInfo();
  }, []);

  return { user, loading, error };
}

export default useUserInfo;
