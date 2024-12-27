import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import styles from '../styles/login.module.css';


export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/dashboard'); // 이미 로그인된 상태면 리다이렉트
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      redirect: false,
      id,
      password: pw,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/dashboard'); // 로그인 성공 시 마이페이지로 이동
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img src="/logo_nonefill.svg" alt="logo" className={styles.logo} />
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="ID를 입력하세요."
            required
          />
          <input
            className={styles.input}
            type="password"
            id="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="비밀번호를 입력하세요."
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.btn_group}>
            <button type="submit" className={styles.btn}>
              로그인
            </button>
            <button
              className={styles.btn}
              onClick={() => router.push('/ForgotPassword')}
            >
              비밀번호 찾기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
