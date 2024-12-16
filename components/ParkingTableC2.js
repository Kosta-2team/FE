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
                    <th>차 번호</th>
                    <th>입차 시간</th>
                </tr>
            </thead>
            <tbody>
                {data.map((e, i)=> {
                    <tr key={index}>
                        <td></td>
                        <td></td>
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