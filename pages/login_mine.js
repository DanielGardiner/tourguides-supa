import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { supabase } from "../client";

export default function Login() {
  const [email, setEmail] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    const {error, data} = await supabase.auth.signIn({
      email
    })
    console.log('%c [qq]: data ', 'background: #fbff00; color: #000000; font-size: 1rem; padding: 0.2rem 0; margin: 0.5rem;', '\n', data, '\n\n');
    if(!error) {
      setEmail(null)
      setSubmitted(true)
    } else {
      console.log(error)
    }
  }

  const hanldeEmailChange = (e) => setEmail(e.target.value)

  return (
    <form onSubmit={handleLogin}>
      <label>
        Email
        <input onChange={hanldeEmailChange} type="text" />
      </label>
      <button>
        Submit
      </button>
    </form>
  )

}