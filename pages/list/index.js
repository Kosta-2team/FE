import Head from "next/head";
import styles from "@/styles/Home.module.css";
import ParkingTable from "@/components/ParkingTable.js";
import MonthBtn from "@/components/MonthBtn";


export default function TableAllPage() {
    return (
        <>
        <Head>
            <title>car list</title>
            <meta name="description" content="Dashboard Parking Car program by team.OneGPT" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" alt="탭 아이콘" /> 
        </Head>
        <div className={`${styles.page}`}>
        <MonthBtn />
        <main className={styles.main}>
          <ParkingTable />
        </main>
        </div>
        </>
    )
}