import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Session } from '@supabase/supabase-js';

export function useAuth(requireAuth = true) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setLoading(false);
      if (requireAuth && !s) {
        navigate('/admin');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      if (requireAuth && !s) {
        navigate('/admin');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, requireAuth]);

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    navigate('/admin');
  };

  return { session, loading, signOut };
}
