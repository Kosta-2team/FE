/* eslint-disable react-hooks/rules-of-hooks */
import { useGlobalContext } from '@/context/GlobalContext';
import { useRouter } from 'next/router';
import { useState } from 'react';

const modifyPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState(null); 


    const {selectData, setSelectData,CarPlateValidation} = useGlobalContext();

    var setData = JSON.parse(JSON.stringify(selectData));
    
    

    return (
        <div>
            <form method='post' action="../page/api/DataModify" >
                <div>
                    <label>자동차 번호</label>
                    <input type="text"  id="placeNumber" value={`${setData.numPlate}` } pattern={CarPlateValidation()} maxLength="10" required />
                </div>
                <div>
                    <label>시간 당 금액</label>
                    <input type="number" id="totalcost" value={`${Number(setData.rate)}`} maxLength="10" required/>
                </div>
                <div>
                    <label>비고</label>
                    <input type="textarea" defaultValue={`${setData.etc}`}  id="etc"maxLength="200" />
                </div>
                <div>
                    <input type="submit" value="수정" />
                    <input type="button" value="취소" onClick={()=>router.push("/list")} />
                </div>
            </form>
        </div>
    )
}

export default modifyPage;