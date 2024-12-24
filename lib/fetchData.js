export const fetchData = async (page, limit, isDev = false) => {
    const baseUrl = isDev
      ? `http://192.168.0.18:7003/api/Data/database1`
      : `http://localhost:7002/api/Data/database1`;
  
    const url = `${baseUrl}?page=${page}&limit=${limit}`;
  
    try {
            const response = await fetch(url, { method: 'GET'});

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const result = await response.json();
            
            if(result && result.data) {
                return response.status(200).json(result.data);
            }else{
                return res.status(500).json({ error: 'Invalid data format', result });
            }
            
            
        } catch (error) {
            console.log('서버 전송 중 에러:',error);
            return res.status(500).json({ error: error.message });
        }
    
}