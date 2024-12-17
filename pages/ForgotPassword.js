import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/forgot-password.module.css'

export default function ForgotPassword() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [birth, setBirth] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/verify-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, birth }),
    });
    const data = await res.json();

    if (data.error) {
      setError(data.error);
    } else {
      router.push(`/ResetPassword?id=${id}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
      <img src='/logo_nonefill.svg' alt='logo' className={styles.logo}></img>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="id"></label>
          <input
            className={styles.input}
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder='ID를 입력하세요.'
            required
          />
        </div>
        <div>
          <label htmlFor="birth"></label>
          <input
            className={styles.input}
            type="text"
            id="birth"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            placeholder='개인코드를 입력하세요.'
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className={styles.btn} >확인</button>
      </form>
    </div>
    </div>
  );
}
