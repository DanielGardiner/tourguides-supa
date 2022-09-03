import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { supabase } from "../client";
import useLogin from "../hooks/useLogin";

export async function getServerSideProps(context) {
  const {user, error: userError} = await supabase.auth.api.getUserByCookie(context.req);

  if(user) {
    return {
      redirect: {
        destination: '/'
      }
    }
  }

  return {
    props: {}, 
  }
}


export default function Login() {
  const [email, setEmail] = useState('daniel.gardiner@six.agency')
  const [submitted, setSubmitted] = useState(false)

  const loginMutation = useLogin({email})

  const hanldeEmailChange = (e) => setEmail(e.target.value)

  return (
    <>
    <form onSubmit={(e) => {e.preventDefault(); loginMutation.mutate()}}>
      <label>
        Email
        <input onChange={hanldeEmailChange} value={email} type="text" />
      </label>
      
      <button disabled={loginMutation.isLoading}>
        {loginMutation.isLoading ? 'Sending...' : 'Submit'}
      </button>
    </form>
    </>
  )

}