import { useMutation } from 'react-query'
import { supabase } from "../client";

const login = async ({email}) => {
  const { data, error } = await supabase.auth.signIn({
    email, 
  })

  if(error) {
    throw new Error(error.message)
  }

  return data
}

export default function useLogin({ email }) {
  return useMutation(() => login({email}))
}