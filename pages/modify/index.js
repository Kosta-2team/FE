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
        numPlate: setData.numPlate,
        rate: setData.rate,
        etc: setData.etc
   }); 

   const handleInputChange = (e) => {
       const {name, defaultValue} = e.target;
       setFormData((prev)=> ({
           ...prev,
           [name]:defaultValue}));
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
    } catch (error) {
        console.error('Error:',error);
    }
   }
    

    return (
    <div className={styles.modify_container}>    
        <div className={styles.modify_wrapper}>
            <div className={styles.form_box}>
                <form method='post'  action="/api/DataModify" >
                    <div >
                        <label className={styles.label}>차 번호</label>
                        <input className={styles.inputbox} name='numPlate' type="text"  id="placeNumber" defaultValue={ setData.numPlate } onChange={handleInputChange} pattern={CarPlateValidation()} maxLength="10" required />
                    </div>
                    <div>
                        <label className={styles.label}>시간 당 요금</label>
                        <input className={styles.inputbox} name='rate' type="number" id="totalcost" defaultValue={ setData.rate } onChange={handleInputChange} maxLength="10" required/>
                    </div>
                    <div>
                        <label className={styles.label}>비고</label>
                        <input className={styles.inputbox} name='etc' type="textarea" defaultValue={ setData.etc } onChange={handleInputChange} placeholder='비고사항을 입력하세요.' id="etc"maxLength="200" />
                    </div>
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