import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Parking Car!</title>
        <meta name="description" content="Parking Car program by team.OneGPT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" alt="탭 아이콘" /> 
      </Head>
      <div className={`${styles.page}`}>
        <main className={styles.main}>
        <h1>Welcome to the Home Page</h1>
        </main>  
      </div>
    </>
  );
}
