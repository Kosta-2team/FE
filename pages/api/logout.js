import { signOut } from 'next-auth/react';

const NavBar = () => {
  return (
    <nav>
      {/* 로그아웃 버튼 */}
      <button
        onClick={() => signOut({ callbackUrl: '/Login' })}
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        로그아웃
      </button>
    </nav>
  );
};

export default NavBar;
