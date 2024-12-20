import { useState, useEffect, useRef } from "react";
import { useGlobalContext } from '@/context/GlobalContext';
import Link from 'next/link';

export default function ParkingTable() {
    const[data, setData] = useState([]);
    const{TimeParse} = useGlobalContext();
    
    useEffect(()=>{
        const fetchData = async () => {
            const response = await fetch("parkingData.json");
            const result = await response.json();
            //테스트 데이터의 경우고, 추후 데이터 수정필요 
            var recent5 = result.reverse().slice(0,5);
            
            console.log(recent5);
            setData(recent5);
            
        };
        fetchData();
        const interval = setInterval(fetchData,100000);
        return ()=>clearInterval(interval);
    },[]);


    
    //데이터 최신순 정렬
    

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
                    <tr key={i}>
                        <td style={tdStyle}>  {e.numPlate}</td>
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



