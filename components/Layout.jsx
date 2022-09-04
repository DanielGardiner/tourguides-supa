import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../client";
import useLogin from "../hooks/useLogin";
import useLogout from "../hooks/useLogout";
import styles from "../styles/Home.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}
