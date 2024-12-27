export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, newPw } = req.body;

    if (!userId || !newPw) {
      return res.status(400).json({ error: '모든 필드를 입력해주세요.' });
    }

    try {
      const client = await MongoClient.connect(mongo_url);
      const db = client.db(db_name);

      // 비밀번호 업데이트
      const result = await db.collection('members').updateOne(
        { userId },
        { $set: { userPw: newPw } }
      );

      client.close();

      if (result.modifiedCount === 0) {
        return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('MongoDB 연결 오류:', error);
      return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}

