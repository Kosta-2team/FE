import { MongoClient } from 'mongodb';

const mongo_url = process.env.MONGO_URI;
const db_name = 'managerDB';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { uesrId, userBirth } = req.body;

    // 입력값 확인
    if (req.method === 'POST') {
      try {
        const { userId, userBirth } = req.body;
        console.log('Request Body:', req.body);

    
        // 입력값 확인
        if (!userId || !userBirth) {
          return res.status(400).json({ error: 'ID와 개인코드를 모두 입력하세요.' });
        }
    
        const client = await MongoClient.connect(mongo_url, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        const db = client.db(db_name);
    
        const user = await db.collection('members').findOne({ userId });
        client.close();
    
        if (!user) {
          return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
        }
    
        if (String(user.userBirth) !== String(userBirth)) {
          return res.status(400).json({ error: '개인코드가 일치하지 않습니다.' });
        }
    
        return res.status(200).json({ success: true });
      } catch (error) {
        console.error('서버 내부 오류:', error);
        return res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
    
  }
}
