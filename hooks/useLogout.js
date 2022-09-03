import { useMutation } from 'react-query'
import { supabase } from "../client";

const logout = async () => {
  const { data, error } = await supabase.auth.signOut()

  if(error) {
    throw new Error(error.message)
  }

  return data
}

export default function useLogout() {
  return useMutation(() => logout())
}