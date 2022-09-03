import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../client'
import styles from '../styles/Home.module.css'


export async function getServerSideProps(context) {
  const {user, error: userError} = await supabase.auth.api.getUserByCookie(context.req);

  console.log('%c [qq]: user ', 'background: #fbff00; color: #000000; font-size: 1rem; padding: 0.2rem 0; margin: 0.5rem;', '\n', user, '\n\n');

  const { data: tour, error: tourError } = await supabase.from('tour').select('*')
  
  const { data: media, error: mediaError } = await supabase.from('media').select('*')

  return {
    props: {
      tour,
      media,
      _user: user,
    }, 
  }
}

export default function Home({_user, tour, media}) {
  const [user, setUser] = useState(_user)

  useEffect(() => {
    if(user) return;

    async function fetchUser() {
      // If there is no user on page load then attempt to fetch the user
      const userFetched = await supabase.auth.user()
      if(!userFetched) return;
      setUser(userFetched)
    }
    fetchUser()
  }, [user])


  const handleLogout = async() => {
    let { error } = await supabase.auth.signOut()
    setUser(null)
  }

  const handleLogin = async() => {
    const {error} = await supabase.auth.signIn({
      email: 'daniel.gardiner@six.agency'
    })
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Link href='/login'>Login</Link>
        <Link href='/login-with-password'>Login With Password</Link>
        {user && (
          <>
            <Link href='/protected'>Protected</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
        {!user && (
          <button onClick={handleLogin}>Send Login</button>
        )}
        <h1 className={styles.title}>
          View Exciting <a href="https://nextjs.org">Tours!</a>
        </h1>
        <div style={{maxWidth: '400px', }}>
          User
          <pre>
            {JSON.stringify(user, null, 2)}
          </pre>
          < hr />
          Tour
          <pre>
            {JSON.stringify(tour, null, 2)}
          </pre>
          < hr />
          Media
          <pre>
            {JSON.stringify(media, null, 2)}
          </pre>
        </div>
        

      </main>
    </div>
  )
}
