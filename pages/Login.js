import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import styles from '../styles/login.module.css'

export default function LoginPage() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      id,
      password: pw,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      window.location.href = '/Mypage'; // 로그인 성공 시 홈으로 이동
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
      <img src='/logo_nonefill.svg' alt='logo' className={styles.logo}></img>
          
          <form onSubmit={handleSubmit} className={styles.form}>
              <input 
                className={styles.input}
                type="text"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder='ID를 입력하세요.'
                required
              />
            
              <label htmlFor="password"></label>
              <input
                className={styles.input}
                type="password"
                id="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder='비밀번호를 입력하세요.'
                required
              />
              
            
            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.btn_group}>

              <button 
                type="submit" 
                className={styles.btn}>
                로그인
              </button>

              <button 
                className={styles.btn} 
                onClick={() => router.push('/forgot-password')}>
                비밀번호 찾기
              </button>
              

            </div>
          </form>
    </div>
      
  </div>
  );
}
