import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { supabase } from "../client";

export async function getServerSideProps(context) {
  const {user, error: userError} = await supabase.auth.api.getUserByCookie(context.req);

  console.log('%c [qq]: user ', 'background: #fbff00; color: #000000; font-size: 1rem; padding: 0.2rem 0; margin: 0.5rem;', '\n', user, '\n\n');

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
  const [password, setPassword] = useState('wowEQskWBXyoCiepQbnl')
  const [error, setError] = useState(null)

  
  const [submitted, setSubmitted] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()
    let { user, error } = await supabase.auth.signUp({
      email,
      password,
    })
    console.log('%c [qq]: user ', 'background: #fbff00; color: #000000; font-size: 1rem; padding: 0.2rem 0; margin: 0.5rem;', '\n', user, '\n\n');
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    let { user, error: loginError } = await supabase.auth.signIn({
      email,
      password,
    })
    setError(loginError)
  }

  const hanldeEmailChange = (e) => setEmail(e.target.value)
  const hanldePasswordChange = (e) => setPassword(e.target.value)

  const resetError = (e) => setError(null)

  return (
    <>
      Register
      <form onSubmit={handleRegister}>
        <label>
          Email
          <input onChange={hanldeEmailChange} value={email} type="text" />
        </label>
        <label>
          Password
          <input onChange={hanldePasswordChange} value={password} type="text" />
        </label>
        <button>
          Submit
        </button>
      </form>
      <hr />
      {error && (<p>{error.message}</p>)}
      Login
      <form onSubmit={handleLogin} onChange={resetError}>
        <label>
          Email
          <input onChange={hanldeEmailChange} value={email} type="text" />
        </label>
        <label>
          Password
          <input onChange={hanldePasswordChange} value={password} type="text" />
        </label>
        <button>
          Submit
        </button>
      </form>
    </>
  )

}