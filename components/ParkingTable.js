import { useState, useEffect, useRef } from "react";
import { useGlobalContext } from '@/context/GlobalContext';
import { useRouter } from "next/router";
import Link from 'next/link';


var data2 = [];

const ParkingTable = ({ datas }) => {
    const[data, setData] = useState([]);
    const {DateParse, TimeParse, setSelectData} = useGlobalContext();
    const router = useRouter();
    var isDev = false;
    

    const handleSubmit = (selectedData) => {
        setSelectData(selectedData);
        router.push("/modify");
    };

    useEffect(()=>{
        const fetchData = async () => {

            if(isDev){
                const response = await fetch("parkingData.json");
                const result = await response.json();
                var recent5 = result.reverse();
                console.log(recent5);
                setData(recent5);
            }else{
                //api 기본설정, 추후 전체 변수로 교체필요
                const page = 1;
                const limit = 10;

                const url = `https://localhost:7002/api/Data/database1?page=${page}&limit=${limit}`;
                console.log(url); 

                try{
                    const response = await fetch(url, {
                        method: 'GET',
                    });
                    // 응답 상태 코드 확인
                    if (!response.ok) {
                        console.error(`HTTP Error: ${response.status}`);
                        return;
                    }
                    const result = await response.json();
                    if(result && result.data) {
                        setData(result.data);
                      
                    } else {
                        console.error('데이터가 올바르지 않습니다:', result);
                    }
                    
                }catch (error){
                    console.error('데이터를 가져오는 중 오류 발생:', error);
                }
            }
            
            
        };
        fetchData();
        const interval = setInterval(fetchData,10000);
        return ()=>clearInterval(interval);
    },[]);

    

    return (
        <table>
            <thead>
                <tr>
                    <th style={thStyle}>정렬</th>
                    <th style={thStyle}>차 번호</th>
                    <th style={thStyle}>입차시간</th>
                    <th style={thStyle}>출차시간</th>
                    <th style={thStyle}>시간당 요금</th>
                    <th style={thStyle}>금액</th>
                    <th style={thStyle}>주차된 시간</th>
                    <th style={thStyle}>비고</th>
                    <th style={thStyle}>수정</th>                    
                </tr>
            </thead>
            <tbody>
                {data.map((e, i)=> {
                    return(
                    <tr key={i}>
                        <td style={tdStyle}>{e.column}</td>
                        <td style={tdStyle}>{e.numPlate}</td>
                        <td style={tdStyle}>{`${ DateParse(e.inTime) } ${ TimeParse(e.inTime) }`}</td>
                        <td style={tdStyle}>{`${ DateParse(e.outTime) } ${ TimeParse(e.outTime) }`}</td>
                        <td style={tdStyle}>{e.rate}</td>
                        <td style={tdStyle}>{e.totalCost}</td>
                        <td style={tdStyle}>{e.minsParked}</td>
                        <td style={tdStyle}>{e.etc}</td>
                        <td style={tdStyle}><input type="submit" value="수정" onClick={()=>handleSubmit(e)} style={{padding:'6px 11.5px',maxWidth:'70px', borderRadius:'5px',border:0,backgroundColor:'#0D1821',color:'#f5f5f5',cursor:'pointer'}}/></td>
                    </tr>
                    )
                    
                })

                }
            </tbody>
        </table>
    )
}

export default ParkingTable;

const thStyle= {
    border:"1px solid #0d1821",
    padding:"8px",
    backgroundColor:"#0d1821",
    textAlign:"center",
    color:"#fff"
}

const tdStyle = {
    border:"1px solid #0d1821",
    padding:"8px",
    textAlign:"center"
}



    