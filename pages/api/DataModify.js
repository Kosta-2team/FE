
const ModifyBack = async (req, res) => {
    const getData = req.body; 
    var data = {...getData}; //받아온 데이터를 객체로 파싱
 
    
    //데이터 
    if(req.method === 'POST'){

        try {
            //api 전송 설정
            const page = 1;
            const limit = 5;
            if(isDev){
                const  API_URL = `http://192.168.0.18:7003/api/Data/database1?page=${page}&limit=${limit}`;
            }else{
                const  API_URL = `http://localhost:7002/api/Data/database1?page=${page}&limit=${limit}`;
            }
            
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify(data),
                });
                
                if(response.ok){
                    const result = await response.json();
                    console.log('C# API 응답:',result);

                    console.log('전송성공:',data);
                    res.status(200).json({message:'데이터 전송 성공'});
                }else{
                    const errorResult = await response.text();
                    console.error("C# api 응답 실패:",errorResult);

                    res.status(response.status).json({message:'서버 오류',error: errorResult});
                }

            
        } catch (error) {
            console.log('서버 전송 중 에러:',error);
            res.status(500).json({ message: '데이터 전송 실패',error: error.message });
        }

    }else{

        res.status(405).json({ message: '허용되지 않은 요청방식' });

    }

}

export default ModifyBack;