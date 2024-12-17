import { MongoClient } from 'mongodb';

const mongo_url = process.env.MONGO_URI;
const db_name = 'myboard';

export default async function handler(req, res) {
  if (req.method === 'POST') {const { id, birth } = req.body;

    const client = await MongoClient.connect(mongo_url);
    const db = client.db(db_name);
    const user = await db.collection('post').findOne({ id });

    client.close();

    if (!user) {
      return res.status(400).json({ error: '관리자가 아닙니다.' });
    }
    if (user.birth !== birth) {
      return res.status(400).json({ error: '개인코드가 일치하지 않습니다.' });
    }
    res.status(200).json({ success: true });
  }
}
