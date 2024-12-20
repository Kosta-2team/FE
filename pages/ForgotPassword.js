import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/forgot-password.module.css';

export default function ForgotPassword() {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [userBirth, setUserBirth] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/verify-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, userBirth }),
    });
    const data = await res.json();

    if (data.error) {
      setError(data.error);
    } else {
      router.push(`/ResetPassword?userId=${userId}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img src='/logo_nonefill.svg' alt='logo' className={styles.logo}></img>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label htmlFor="userId"></label>
            <input
              className={styles.input}
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder='ID를 입력하세요.'
              required
            />
          </div>
          <div>
            <label htmlFor="userBirth"></label>
            <input
              className={styles.input}
              type="text"
              id="userBirth"
              value={userBirth}
              onChange={(e) => setUserBirth(e.target.value)}
              placeholder='생년월일(6자리)를 입력하세요.'
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className={styles.btn}>확인</button>
        </form>
      </div>
    </div>
  );
}
