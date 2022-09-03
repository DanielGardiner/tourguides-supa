import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../client";
import useLogin from "../hooks/useLogin";
import useLogout from "../hooks/useLogout";
import styles from "../styles/Home.module.css";

export async function getServerSideProps(context) {
  const { user, error: userError } = await supabase.auth.api.getUserByCookie(
    context.req
  );

  const { data: tour, error: tourError } = await supabase
    .from("tour")
    .select("*");

  const { data: media, error: mediaError } = await supabase
    .from("media")
    .select("*");

  return {
    props: {
      tour,
      media,
      _user: {
        id: user?.id,
        email: user?.email,
        role: user?.role,
      },
    },
  };
}

export default function Home({ _user, tour, media }) {
  const [user, setUser] = useState(_user);

  const loginMutation = useLogin({ email: "daniel.gardiner@six.agency" });
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
    setUser(null);
  };

  const handleLogin = async () => {
    loginMutation.mutate();
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Link href="/login">Login</Link>
        <Link href="/login-with-password">Login With Password</Link>
        {user && (
          <>
            <Link href="/protected">Protected</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
        {!user && <button onClick={handleLogin}>Send Login</button>}
        {loginMutation.error && (loginMutation.error.message)}
        <h1 className={styles.title}>
          View Exciting <a href="https://nextjs.org">Tours!</a>
        </h1>
        <div style={{ maxWidth: "400px" }}>
          User
          <pre>{JSON.stringify(user, null, 2)}</pre>
          <hr />
          Tour
          <pre>{JSON.stringify(tour, null, 2)}</pre>
          <hr />
          Media
          <pre>{JSON.stringify(media, null, 2)}</pre>
        </div>
      </main>
    </div>
  );
}
