import { handleAuth } from '@supabase/auth-helpers-nextjs'
import { supabase } from '../../../client';


export default function auth(req, res) {
  console.log('%c [qq]: setting cookie ', 'background: #fbff00; color: #000000; font-size: 1rem; padding: 0.2rem 0; margin: 0.5rem;');
  supabase.auth.api.setAuthCookie(req, res);
}