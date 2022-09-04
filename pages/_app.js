import { QueryClientProvider, QueryClient } from 'react-query'
import '../styles/globals.css'
import { UserProvider } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useEffect } from 'react'
import { supabase } from '../client'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {

  // useEffect(() => {
  //   console.log('%c [qq]: using effect ', 'background: #fbff00; color: #000000; font-size: 1rem; padding: 0.2rem 0; margin: 0.5rem;');
  //   const {data: authListener} = supabase.auth.onAuthStateChange((event, session) => {
  //     fetch('/api/auth', { 
  //       method: 'POST',
  //       headers: new Headers({'Content-Type': 'application/json'}),
  //       credentials: 'same-origin',
  //       body: JSON.stringify({event, session})
  //     })
  //   })

  //   return () => authListener.unsubscribe()
  // }, [])

  return (
    <UserProvider supabaseClient={supabaseClient}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
      </UserProvider>
  )
}

export default MyApp
