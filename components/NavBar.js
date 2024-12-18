/* eslint-disable @next/next/no-html-link-for-pages */
import Image from "next/image";
import Link from "next/link";
import styles from '../styles/NavBar.module.css'

const NavBar =  () => {
    return (
        <nav className={styles.Nav_bar} height={100} >
            <div className={styles.logo_box} style={{padding:'10px 125px 10px 125px'}} >
                <a href="/dashboard" >
                    <Image src="/logo-No-Box.png" alt="logo" width={150} height={70} ></Image>
                </a>
            </div>

            <div className={styles.select_menu_container} >
                <div className={styles.select_menu_box} >
                    <a href="/dashboard" className={styles.nav_page_btn} >단속카메라</a>
                    <a href="/list" className={styles.nav_page_btn} >전체목록</a>
                    <div className="mypage_box_btn" display={{display:'inline-block'}}>
                        <div className="mypage_box_sort" style={{display:'flex',alignItems:'center'}}>
                            <a href="/Mypage" className={styles.nav_page_btn} style={{marginRight:"0px"}} >[관리자]OOO&nbsp;
                            </a>
                            <a href="/logout" className={styles.nav_page_btn} style={{marginLeft:"0px"}}>
                                <Image src="/logout_white.png" alt="logout_btn" className={styles.logout_btn}  width={16} height={21}></Image>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;