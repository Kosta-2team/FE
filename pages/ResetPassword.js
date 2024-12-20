import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/reset-password.module.css';

export default function ResetPassword() {
  const router = useRouter();
  const { userId } = router.query; // userId 전달받음
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPw !== confirmPw) {
      setError('두 값이 일치하지 않습니다.');
      return;
    }

    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, newPw }),
    });
    const data = await res.json();

    if (data.error) {
      setError(data.error);
    } else {
      alert('비밀번호가 변경되었습니다.');
      router.push('/Login');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img src='/logo_nonefill.svg' alt='logo' className={styles.logo}></img>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label htmlFor="newPw"></label>
            <input
              className={styles.input}
              type="password"
              id="newPw"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              placeholder='새 비밀번호를 입력하세요.'
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPw"></label>
            <input
              className={styles.input}
              type="password"
              id="confirmPw"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              placeholder='새 비밀번호를 다시 입력하세요.'
              required
            />
            <p className={styles.subtext}>영문, 숫자, 특수문자 (~ ! @ # $ % ^ & *)로 구성해주세요.</p>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className={styles.btn}>비밀번호 변경</button>
        </form>
      </div>
    </div>
  );
}
