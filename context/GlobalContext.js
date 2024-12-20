const { createContext, useContext ,useState } = require("react");
const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
    
    //수정데이터 선택 저장
    const [selectData, setSelectData] = useState("");
    
    //유저 월 선택 저장
    const [selectMontt,setSelectMonth] = useState("");

    /* 
    YYYYMMDD-HHmmss 형식의 데이터를 YYYY-MM-DD로 변환하는 함수
    작성자: 여원지
    날짜: 2024.12.20
    사용:ParkingTable
    */

    var DateParse = (entityDate) => {
        var date = entityDate.split('-');
        var YYYY = date[0].slice(0,3);
        var MM = date[0].slice(3,5);
        var DD = date[0].slice(5,7);
        return `${YYYY}-${MM}-${DD}`
    }

    var test = DateParse('20241220-122756');
    console.log(test);

    /* 
    YYYYMMDD-HHmmss 형식의 데이터를 HH:mm:ss 으로 변환하는 함수
    작성자: 여원지
    날짜  : 2024.12.16 
    사용: ParkingTable, ParkingTableC2
    */
    var TimeParse = (entityDate) => {
        var date = entityDate.split('-');
        var setTime = [];

        for(let i=0; i < date[1].length; i++){
        if(i%2==0){
            setTime.push(date[1].slice(i,i+2));  
        }
        }
        setTime = setTime.join(":");

        return setTime;
    }



    return (
        <GlobalContext.Provider value={{
            selectData,
            setSelectData,
            DateParse,
            TimeParse
        }}>
            {children}
        </GlobalContext.Provider>
    );
};


export const useGlobalContext = () => {
    return useContext(GlobalContext);
}