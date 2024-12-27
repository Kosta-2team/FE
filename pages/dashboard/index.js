import {useState ,useEffect} from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Camera from "@/components/Camera";
import ParkingTableC2 from "@/components/ParkingTableC2";
import Cookies from "js-cookie";
import { useGlobalContext } from "@/context/GlobalContext";
import { Cookie } from "next/font/google";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const router = useRouter();

    const { isJSON } = useGlobalContext();


  // 초기값 설정 함수
  const getInitialData = () => {
    const cookieData = Cookies.get("selectedData");
    if (cookieData && isJSON(cookieData)) {
      try {
        const parsedData = JSON.parse(cookieData);
        return parsedData.numPlate || "";
      } catch (error) {
        console.error("JSON 파싱 오류:", error);
        return "";
      }
    }
    return "";
  };

  const [selectedData, setSelectData] = useState(getInitialData);

  // 입력값 변경 처리
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSelectData(value);
    const cookieData = Cookies.get("selectedData");
    if(!cookieData){
      console.log("쿠키를 초기화 중입니다");
      // 객체로 저장
      Cookies.set("selectedData", JSON.stringify({ numPlate: value }), {
        expires: 1,
      });
      return ;
    }

    try {
      const parsedData = JSON.parse(cookieData);
      parsedData.numPlate = value;
      Cookies.set("selectedData", JSON.stringify(parsedData), { expires: 1 });
      console.log("업데이트된 쿠키 데이터:", parsedData);

    }catch (error) {
      console.error("쿠키 업데이트 중 에러:", error);
    }
  }

  // 테이블 데이터 클릭 처리
  const handleRowClick = (rowData) => {
    setSelectData(rowData.numPlate);
    Cookies.set("selectedData", JSON.stringify(rowData), { expires: 1 });
  };


  const JsonFileUpdate = async () =>{

      const cookieData = Cookies.get("selectedData");
      if(!cookieData){
        console.log("쿠키에 데이터가 없습니다.");
        return;
      }

      try {
        const parsedData = JSON.parse(cookieData);

      const response = await fetch('/api/DataModify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( parsedData ),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("업데이트 성공:", result);

        Cookies.remove('selectedData');
        setSelectData("");
        router.push("/dashboard");
      } else {
        console.error("업데이트 실패:", await response.text());

      }
    } catch (error) {
      console.error("JsonFileUpdate 에러:", error);

    }
  }



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
          
          
                  <div style={{ flex:1,padding:'10px' }}>
                    
                    <ParkingTableC2 onRowClick={handleRowClick}/>
                    <div className="carNumberInputWrapper" style={{display:'flex' ,paddingTop:'5.3rem'}}>
                      <input type="text" value={selectedData} onChange={handleInputChange} className="inputbox" placeholder="차 번호를 선택하거나 입력하세요" style={{flex:'3', maxWidth:'300px', padding:'8px', border:0, borderBottom: '1px solid #000'   }} />
                      <input type="submit" value="입력" onClick={JsonFileUpdate} style={{flex:'1',maxWidth:'70px', margin:'0px 0px 0px 25px', borderRadius:'5px',border:0,backgroundColor:'#0D1821',color:'#f5f5f5',minWidth:'45px',cursor:'pointer'}} />
                    </div>
                  </div>
                
              </div>
            </div>
          </div>
        
        </>
    )
}