/* eslint-disable react-hooks/rules-of-hooks */
import { useGlobalContext } from '@/context/GlobalContext';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from "@/styles/Modify.module.css";

const modifyPage = () => {
    const router = useRouter();

    const {selectData, setSelectData,CarPlateValidation} = useGlobalContext();

    var setData = JSON.parse(JSON.stringify(selectData));
    const [formData, setFormData] = useState({
        id:setData._id,
        column:setData.column,
        numPlate: setData.numPlate,
        inTime:setData.inTime,
        rate: setData.rate,
        etc: setData.etc
   }); 

   const handleInputChange = (e) => {
       const {name, value} = e.target;
       setFormData((prev)=> ({
           ...prev,
           [name]:value,}));
   };

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('/api/DataModify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        const result = await response.json();
        console.log('Response:', result);
        if (response.ok) {
            
            router.push('/list'); // 수정 후 리스트 페이지로 이동
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
    

    return (
    <div className={styles.modify_container}>    
        <div className={styles.modify_wrapper}>
            <div className={styles.form_box}>
                <form onSubmit={handleSubmit}   >
                    <div >
                        <label className={styles.label}>차 번호</label>
                        <input className={styles.inputbox} name='numPlate' type="text"  id="placeNumber" value={formData.numPlate} onChange={handleInputChange} pattern={CarPlateValidation()} maxLength="10" required />
                    </div>
                    <div>
                        <label className={styles.label}>시간 당 요금</label>
                        <input className={styles.inputbox} name='rate' type="number" id="totalcost" value={formData.rate} onChange={handleInputChange} maxLength="10" required/>
                    </div>
                    <div>
                        <label className={styles.label}>비고</label>
                        <input className={styles.inputbox} name='etc' type="text" value={formData.etc} onChange={handleInputChange} placeholder='비고사항을 입력하세요.' id="etc"maxLength="200" />
                    </div>
                    <input className={styles.inputbox} name='id' type="hidden" value={formData.id} onChange={handleInputChange} id="id" />
                    <input className={styles.inputbox} name='inTime' type="hidden" value={formData.onTime} onChange={handleInputChange} id="inTime" />
                    
                    <div className={styles.btnBox}>
                        <input type="submit" className={styles.modifyBtn} defaultValue="수정" />
                        <input type="button" className={styles.modifyBtn} defaultValue="취소" onClick={()=>router.push("/list")} />
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export default modifyPage;