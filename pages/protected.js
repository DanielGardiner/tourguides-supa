import { useRouter } from "next/router";
import { supabase } from "../client";

export async function getServerSideProps(context) {

  const {user, error: userError} = await supabase.auth.api.getUserByCookie(context.req);

  if(!user) {
    return {
      redirect: {
        destination: '/'
      }
    }
  }


  return {
    props: {
      user,
    }, 
  }
}


export default function Protected() {
  return (
    <div>
      Secret
      <pre>
        {/* {JSON.stringify(user, null, 2)} */}
      </pre>
    </div>
  )

}