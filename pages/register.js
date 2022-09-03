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


export default function Register() {
  const [email, setEmail] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()
    console.log('%c [qq]: oook ', 'background: #fbff00; color: #000000; font-size: 1rem; padding: 0.2rem 0; margin: 0.5rem;');
    const temp = await supabase.auth.signInWithOtp({
      email: 'example@email.com',
    })
    console.log('%c [qq]: temp ', 'background: #fbff00; color: #000000; font-size: 1rem; padding: 0.2rem 0; margin: 0.5rem;', '\n', temp, '\n\n');
    // console.log('%c [qq]: hello ', 'background: #fbff00; color: #000000; font-size: 1rem; padding: 0.2rem 0; margin: 0.5rem;');
    // if(!error) {
    //   setEmail(null)
    //   setSubmitted(true)
    // } else {
    //   console.log(error)
    // }
  }

  const hanldeEmailChange = (e) => setEmail(e.target.value)

  return (
    <>
      {submitted && (
        <h6>Email link sent</h6>
      )}
      <form onSubmit={handleRegister}>
        <label>
          Email
          <input onChange={hanldeEmailChange} type="text" />
        </label>
        <button>
          Submit
        </button>
      </form>
    </>
  )

}