import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
console.log('MONGO_URI:', process.env.MONGO_URI);

const mongo_url = process.env.MONGO_URI;
const db_name = 'managerDB'; 

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        id: { label: 'User ID', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { id, password } = credentials;

        try {
          const client = await MongoClient.connect(mongo_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
          const db = client.db(db_name);

          // `members` 컬렉션에서 사용자 검색
          const user = await db.collection('members').findOne({ userId: id });

          client.close();

          if (!user) {
            throw new Error('사용자를 찾을 수 없습니다.');
          }

          if (user.userPw !== password) {
            throw new Error('비밀번호가 일치하지 않습니다.');
          }

          // 인증 성공 시 사용자 객체 반환
          return {
            id: user.userId,
            name: user.userName,
            birth: user.userBirth,
            admin: user.admin,
          };
        } catch (error) {
          console.error('MongoDB 연결 오류:', error);
          throw new Error('로그인 처리 중 오류가 발생했습니다.');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: '/Login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
