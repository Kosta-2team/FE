import Head from "next/head";
import styles from "@/styles/Home.module.css";
import ParkingTable from "@/components/ParkingTable.js";

function camInit(stream){
    var cameraView = document.getElementById("cameraview");
    cameraView.srcObject = stream;
    cameraView.play();
}

function camInitFailed(error) {
    console.log("get camera permisson failed :", error)
}

function mainInit(){
        //카메라 권한 허락 여부
        if(!navigator.mediaDevices || !bavigator.mediaDevices.getUserMedia){
            alert("Media Device not supported");
            return;

        }

        navigator.mediaDevices.getUserMedia({video:true})
        .then(camInit)
        .catch(camInitFailed);

}

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
        <main className={styles.main}>
          <ParkingTable />
        </main>
        </div>
        </>
    )
}