import {useEffect} from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Camera from "@/components/Camera";
import ParkingTableC2 from "@/components/ParkingTableC2";


export default function DashboardPage() {
 

    return (
        <>
        <Head>
            <title>dashboard</title>
            <meta name="description" content="Dashboard Parking Car program by team.OneGPT" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" alt="탭 아이콘" /> 
        </Head>
          <div className="contextContainer" style={{width:'100vw',height:'90vh'}}>
            
            <div className="contextWrapper" style={{width:'100vw',height:'70vh',padding:'100px'}}>
              <h1 style={{fontWeight:'600',fontSize:'20px',paddingLeft:'9.8rem'}}>One Start Parking Center</h1>
              <div className="contextBox" style={{display:'flex',padding:'10px 10px' }}>
                
                <div style={{ flex:1, display:'flex', justifyContent: "center"}}>
                  <Camera />
                </div>

          
                <div style={{ flex:1 }}>
                  
                  <ParkingTableC2 />
                  <div className="carNumberInputWrapper" style={{display:'flex' ,paddingTop:'5.3rem'}}>
                  <input type="text" className="inputbox" placeholder="차 번호를 선택하거나 입력하세요" style={{flex:'3', maxWidth:'300px', padding:'8px'}} />
                  <input type="submit" value="입력" style={{flex:'1',maxWidth:'100px'}} />
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        
        </>
    )
}