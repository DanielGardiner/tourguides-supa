import { QueryClientProvider, QueryClient } from 'react-query'
import '../styles/globals.css'
import { UserProvider } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (

    <UserProvider supabaseClient={supabaseClient}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
      </UserProvider>
  )
}

export default MyApp
