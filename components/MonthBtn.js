import React, {useState} from "react";
import styles from"../styles/MonthBtn.module.css";
import Link from "next/link";



//오늘날짜 구하는 함수
var SetToday = ()=> {
    var today = new Date();
    return {
        'getFullyear':Number(today.getFullYear()),
        'getMonth': Number(today.getMonth()+1),
        'getDate' : Number(today.getDate())
};
}
const today = SetToday();


var DateBtn = () => { 
    //오늘까지의 버튼 만들기 
    var lastDay = new Date(today.getFullyear,today.getMonth, 0).getDate();

    //추후 유저 선택날짜 변수 로직필요
    var dates =Array(lastDay).fill().map((v,i)=> i+1);
    
    //페이지 초기화 
    const [currentIndex,setCurrentIndex] = useState(0);

    
    const ITEMS_PER_PAGE = 7;

    const totalPages = Math.ceil(dates.length/ITEMS_PER_PAGE);

    //다음버튼
    const handleNext = () => {
        setCurrentIndex( (prev) => (prev + 1) % totalPages );
    };

    //이전 버튼
    const handlePrev = () => {
        setCurrentIndex( (prev) => (prev - 1) % totalPages );
    }

    const trackTranslateX = -(currentIndex * 100);

   
    return( 
        <div className={styles.carousel}>
            <button className={`${styles["carousel-btn"]} ${styles.prev}`} onClick={handlePrev}
            disabled={currentIndex === 0} >
                {"<"}
            </button>
            <div className={styles["carousel-track-wrapper"]}>
            <div className={styles["carousel-track"]} style={{ transform: `translateX(${trackTranslateX}%)`}}>

                {
                    
                 dates.map((v,i)=>  
                <div key={v} className={`${styles["carousel-item"]} ${i === currentIndex ? styles.active : ""}`} >{v}</div> )
                }
            </div>
            </div>
            <button className={`${styles["carousel-btn"]} ${styles.next}`} onClick={handleNext}
            disabled={currentIndex === totalPages - 1}>
                {">"}
            </button>
        </div>
        
        );
            
}


const MonthBtn = () => {
   
    
    return(
        <div>
            {/* 추후 input으로 교체해서 사용자의 선택에 따라 날짜 바뀌게 재구성해야함 */}
            <input type="month" defaultValue={`${today.getFullYear}-${today.getMonth}`} class={styles.InputMonth} />
            <DateBtn />
        </div>
    )
}


export default MonthBtn;