import { useGlobalContext } from "@/context/GlobalContext";
import { useRouter } from "next/router";
import {useState} from 'react';
import fs from 'fs';
import path from 'path';


const ModifyBack = async (req, res) => {
    var isDev = true;

    console.log("요청 메서드 뭘로?",req.method);
    const getData = req.body; 
    console.log("getData", getData);

    // API가 요구하는 형식으로 데이터 래핑
    const updatedData =  
    (isDev)?
    {
       ...getData
     } :
     {
        numPlate: getData.numPlate,
        inTime: getData.inTime,
        rate: Number(getData.rate),
        etc: getData.etc
     }; // 'data' 필드로 감싸기
    console.log("래핑데이터",updatedData);

     

    if (req.method === 'PUT') {
        try {
            const API_URL = isDev
                ? `http://192.168.0.18:7003/api/Data/database1/${getData.id}`
                : `https://localhost:7002/api/Data/database1/${getData.id}`;

            console.log("API URL:", API_URL);

            const response = await fetch(API_URL.trim(), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData), // 수정된 데이터 전송
            });

            if (response.ok) {
                const result = await response.json();
                console.log('C# API 응답:', result);

                res.status(200).json({ message: '데이터 전송 성공' });
             
            } else {
                const errorResult = await response.text();
                console.error("C# API 응답 실패:", errorResult);

                res.status(response.status).json({ message: '서버 오류', error: errorResult });
            }
        } catch (error) {
            console.error('서버 전송 중 에러:', error);
            res.status(500).json({ message: '데이터 전송 실패', error: error.message });
        }
    } else if(req.method === 'POST'){
       
       
        console.log("POST 요청 데이터:", updatedData);

        // JSON 파일 경로
        const filePath = path.join(process.cwd(), 'public', 'carParking.json');

        try {
            
            const jsonData = fs.readFileSync(filePath, 'utf8');
            const parkingData = JSON.parse(jsonData);
            
            const index = parkingData.findIndex(item => item._id.$oid === updatedData._id.$oid );
            if (index === -1) {
                return res.status(404).json({ message: '해당 데이터를 찾을 수 없습니다.' });
            }

            parkingData[index] = { ...parkingData[index], ...updatedData };

            fs.writeFileSync(filePath, JSON.stringify(parkingData, null, 2), 'utf8');
            console.log("데이터가 수정되었습니다:", parkingData[index]);


            res.status(200).json({ message: '데이터 수정 성공', data: parkingData[index] });
        } catch (error) {
            console.error("JSON 파일 수정 중 에러:", error);
            res.status(500).json({ message: '데이터 추가 실패', error: error.message });
        }
    } 
    else {
        res.status(405).json({ message: '허용되지 않은 요청 방식' });
    }
};

export default ModifyBack;
