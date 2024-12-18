import { useState, useEffect, useRef } from "react";
import Link from 'next/link';

export default function ParkingTable() {
    const[data, setData] = useState([]);
    
    useEffect(()=>{
        const fetchData = async () => {
            const response = await fetch("parkingData.json");
            const result = await response.json();
            //테스트 데이터의 경우고, 추후 데이터 수정필요 
            var recent5 = result.reverse();
            
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
                        <td style={tdStyle}>{dateParse(e.inTime)}</td>
                        <td style={tdStyle}>{dateParse(e.outTime)}</td>
                        <td style={tdStyle}>{e.rate}</td>
                        <td style={tdStyle}>{e.totalCost}</td>
                        <td style={tdStyle}>{e.minsParked}</td>
                        <td style={tdStyle}>{e.etc}</td>
                        <td style={tdStyle}><input type="submit" value="수정" src="/modify"/></td>
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
    color:"#fff"
}

const tdStyle = {
    border:"1px solid #0d1821",
    padding:"8px",
    textAlign:"center"
}


/* 
    YYYYMMDD-HHmmss 형식의 데이터를 HH:mm:ss 으로 변환하는 함수
    작성자: 여원지
    날짜  : 2024.12.16 
 */
var dateParse = (entityDate) => {
    var setDate = new Date();
    var date = entityDate.split('-');
  	var setTime = [];

  	for(let i=0; i < date[1].length; i++){
      if(i%2==0){
      	setTime.push(date[1].slice(i,i+2));  
      }
    }
  	setTime = setTime.join(":");

  	return setTime;
}



