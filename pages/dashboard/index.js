import {useEffect} from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Camera from "@/components/Camera";
import ParkingTableC2 from "@/components/ParkingTableC2";

// function camInit(stream){
//     var cameraView = document.getElementById("cameraview");
//     cameraView.srcObject = stream;
//     cameraView.onplay();
// }

// function camInitFailed(error) {
//     console.log("get camera permisson failed :", error)
// }

// function mainInit(){
//         //카메라 권한 허락 여부
//         if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
//             alert("Media Device not supported");
//             return;

//         }

//         navigator.mediaDevices.getUserMedia({video:true})
//         .then(camInit)
//         .catch(camInitFailed);

// }

export default function DashboardPage() {
    // useEffect(()=> {
    //     mainInit();
    // },[]);

    return (
        <>
        <Head>
            <title>dashboard</title>
            <meta name="description" content="Dashboard Parking Car program by team.OneGPT" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" alt="탭 아이콘" /> 
        </Head>
        <main className={styles.main}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        
          <div className="contextBox" style={{width:'100vw',display:'flex' }}>
            {/* 카메라 뷰 */}
            <div style={{ flex:1,float:'center'}}>
            <h1>One Start Parking Center</h1>
              <Camera />
            </div>

            {/* 테이블 */}
            <div style={{ flex:1 }}>
              <ParkingTableC2 />
            </div>
          </div>
        </div>
        </main>
        {/* <div className={`${styles.page}`}>
        <main className={styles.main}>
            <h1>One Start Building Parking Center</h1>
            <video id="cameraview" width="720" height="480" autoPlay></video>
            <script>
                mainInit();
            </script>
        </main>
        </div> */}
        </>
    )
}