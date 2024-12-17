import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoClient } from 'mongodb';

const mongo_url = process.env.MONGO_URI;
const db_name = 'myboard';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        id: { label: 'ID', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { id, password } = credentials;
        const client = await MongoClient.connect(mongo_url);
        const db = client.db(db_name);

        const user = await db.collection('post').findOne({ id });

        client.close();

        if (!user) {
          throw new Error('관리자가 아닙니다.');
        }

        if (user.pw !== password) {
          throw new Error('비밀번호가 일치하지 않습니다.');
        }

        return { id: user.id, name: user.name }; // 성공 시 반환
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
