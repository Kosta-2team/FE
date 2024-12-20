import Head from "next/head";
import Link from 'next/link';
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useSession } from "next-auth/react";
import LoginPage from "./Login";
import DashboardPage from "./dashboard";
import {useEffect, useState} from 'react';


export default function Home() {
  const {data:session} = useSession();

  return (
    <>
      <Head>
        <title>Parking Car!</title>
        <meta name="description" content="Parking Car program by team.OneGPT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" alt="탭 아이콘" /> 
      </Head>
      <LoginPage />
    </>
  );
}
