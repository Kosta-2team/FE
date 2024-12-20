import { useSession, signIn, signOut } from 'next-auth/react';
import styles from '../styles/Mypage.module.css'
import { useRouter } from 'next/router';



export default function Mypage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return (
      <div className={styles.container}>
      <div className={styles.wrapper}>
      <img src='/warning.svg' alt='logo' ></img>
        <p>이 페이지는 로그인이 필요합니다.</p>
        <button className={styles.btn} onClick={() => window.location.href = '/Login'}>로그인</button>
      </div>
      </div>
    );
  }

  return (
    
    <div>
      <div className={styles.wrapper}>
      <img src="/profile.svg" alt="profile" className={styles.profile}  />

      <div className={styles.container-1}>
      <img src="/user-icon.svg" alt="user-icon" />
      <p>{session.user.name}</p>
      </div>

      <div>
      <img src="/keyicon.svg" alt="keyicon" />
      <p>{session.user.admin}</p>
      </div>

      <div>
      <img src="/lock-icon.svg" alt="lock-icon"/>
      <button
              className={styles.btn}
              onClick={() => router.push('/ResetPassword')}
            >
              비밀번호 변경
            </button>
      <button 
              className={styles.btn} 
              onClick={() => signOut({ callbackUrl: '/Login' })
              .then(()=>{
              window.location.reload();
              })}
            >
              로그아웃
            </button>
        </div>
      </div>
    </div>
  );
}
 