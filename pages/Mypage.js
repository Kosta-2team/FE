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
      <img src='/warning.svg' alt='warning' ></img>
        <p>이 페이지는 로그인이 필요합니다.</p>
        <button className={styles.btn} onClick={() => window.location.href = '/Login'}
                style={{marginTop:"40px"}}
                >로그인</button>
      </div>
      </div>
    );
  }

  return (
    
    <div className={styles.container}>
      <div className={styles.wrapper}>
      <img src="/profile.svg" alt="profile" className={styles.profile}  />

      <div className={styles.container1}>
      <img src="/user-icon.svg" alt="user-icon" />
      <p style={{ padding:'20px', border:0, borderLeft: '1px solid #000'   }}>
      <p>{session.user.name}</p>
      </p>
      </div>

      <div className={styles.container1}>
      <img src="/keyicon.svg" alt="keyicon" />
      <p style={{ padding:'20px', border:0, borderLeft: '1px solid #000'   }}>
      <p>{session.user.admin}</p>
      </p>
      </div>

      <div className={styles.container1}>
      <img src="/lock-icon.svg" alt="lock-icon"/>
      <p style={{border:0, borderLeft: '1px solid #000'   }}>    
      <button
              className={styles.btn}
              onClick={() => router.push('/ResetPassword')}
              style={{marginRight: '60px'}}
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
      </p>
        </div>
      </div>
    </div>
  );
}
 