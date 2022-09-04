import { useContext } from "react";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { supabase } from "../client";
import useCreateUser from "../hooks/useCreateUser";

export async function getServerSideProps(context) {
  const { user, error: userError } = await supabase.auth.api.getUserByCookie(
    context.req
  );

  if (user) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
}

export default function Register() {
  const [email, setEmail] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const createUserMutations = useCreateUser({
    email,
  })

  const handleRegister = async (e) => {
    e.preventDefault();
    createUserMutations.mutate()
  };

  const hanldeEmailChange = (e) => setEmail(e.target.value);

  return (
    <>
      {submitted && <h6>Email link sent</h6>}
      <form onSubmit={handleRegister}>
        <label>
          Email
          <input onChange={hanldeEmailChange} type="text" />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}
