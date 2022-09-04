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
      _user: user
        ? {
            id: user.id,
            email: user.email,
            role: user.role,
          }
        : null,
    },
  };
}

export default function Home({ _user, tour, media }) {
  const [user, setUser] = useState(_user);
  const [showFeedback, setShowFeedback] = useState(false);

  const loginMutation = useLogin({
    email: "daniel.gardiner@six.agency",
    onMutate: () => setShowFeedback(false),
    onSettled: () => setShowFeedback(true),
  });

  const logoutMutation = useLogout({
    onSuccess: () => {
      setUser(null);
    },
  });

  const handleLogout = () => logoutMutation.mutate();
  const handleLogin = () => loginMutation.mutate();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Link href="/login">Login</Link>
        <Link href="/login-with-password">Login With Password</Link>
        {user && (
          <>
            <Link href="/protected">Protected</Link>
            <button onClick={handleLogout} disabled={logoutMutation.isLoading}>
              {logoutMutation.isLoading ? (
                <span>Logging out...</span>
              ) : (
                <span>Logout</span>
              )}
            </button>
          </>
        )}
        {!user && (
          <button onClick={handleLogin} disabled={loginMutation.isLoading}>
            {loginMutation.isLoading ? (
              <span>Sending Login...</span>
            ) : (
              <span>Send Login</span>
            )}
          </button>
        )}
        {showFeedback && loginMutation.isError && loginMutation.error.message}
        {showFeedback && loginMutation.isSuccess && "Email sent"}
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
