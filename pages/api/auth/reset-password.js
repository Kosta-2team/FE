import { MongoClient } from 'mongodb';

const mongo_url = process.env.MONGO_URI;
const db_name = 'myboard';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, newPw } = req.body;

    const client = await MongoClient.connect(mongo_url);
    const db = client.db(db_name);

    await db.collection('post').updateOne({ id }, { $set: { pw: newPw } });

    client.close();

    res.status(200).json({ success: true });
  }
}
