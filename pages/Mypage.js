import { useSession, signIn, signOut } from 'next-auth/react';

export default function Mypage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div>
        <p>이 페이지는 로그인이 필요합니다.</p>
        <button onClick={() => window.location.href = '/login'}>로그인</button>
      </div>
    );
  }

  return (
    <div>
      <p>안녕하세요, {session.user.name}님!</p>
      <button onClick={() => signOut({ callbackUrl: '/login' })}>로그아웃</button>
    </div>
  );
}
 