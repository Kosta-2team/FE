import { useState, useEffect, useRef } from "react";

export default function ParkingTable() {
    const[data, setData] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            const response = await fetch("/data/parkingData.json");
            const result = await response.json();
            setData(result);
        };
        fetchData();
    },[]);

    return (
        <table>
            <thead>
                <tr>
                    <th style={thStyle}>차 번호</th>
                    <th style={thStyle}>입차 시간</th>

                </tr>
            </thead>
            <tbody>
                {data.map((e, i)=> {
                    <tr key={i}>
                        <td style={tdStyle}>{e.numPlate}</td>
                        <td style={tdStyle}>{dateParse(e.inTime)}</td>

                    </tr>
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



