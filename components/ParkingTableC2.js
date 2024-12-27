import { useState, useEffect, useRef } from "react";
import { useGlobalContext } from '@/context/GlobalContext';
import Link from 'next/link';
import Cookies from 'js-cookie';


export default function ParkingTable({onRowClick}) {
    
    const[data, setData] = useState([]);
    const{TimeParse,isDev} = useGlobalContext();
    

 useEffect(()=>{
        const fetchData = async () => {

            if(isDev){
                const response = await fetch("carParking.json");
                const result = await response.json();
                var recent5 = result.reverse().slice(0,5);
                
                console.log(recent5);
                setData(recent5);
            }else{
                //api 기본설정, 추후 전체 변수로 교체필요
                const page = 1;
                const limit = 5;

                var url;
                if(isDev){
                    url = `http://192.168.0.18:7003/api/Data/database1?page=${page}&limit=${limit}`;                    
                }else{
                    url = `https://localhost:7002/api/Data/database1?page=${page}&limit=${limit}`;                    
                }
                
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
                    console.log("결과",result);
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
                    <th style={thStyle}>차 번호</th>
                    <th style={thStyle}>입차시간</th>                   
                </tr>
            </thead>
            <tbody>
                {data.map((e, i)=> {
                    return(
                    <tr key={i} onClick={() => onRowClick(e)}>
                        <td style={tdStyle} >  {e.numPlate}</td>
                        <td style={tdStyle}>{TimeParse(e.inTime)}</td>
                    </tr>
                    )
                    
                })

                }
            </tbody>
        </table>
    )
}

const thStyle= {
    border:"1px solid #0d1821",
    padding:"8px",
    backgroundColor:"#0d1821",
    textAlign:"center",
    color:"#fff",
    width:"12.5rem"
}

const tdStyle = {
    border:"1px solid #0d1821",
    padding:"8px",
    textAlign:"center",
    width:"12.5rem"
}



