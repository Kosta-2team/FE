const { createContext, useContext ,useState } = require("react");
const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
    
    //수정데이터 선택 저장
    const [selectData, setSelectData] = useState({
        column: 0,
        numPlate: "",
        inTime: "",
        outTime: "",
        rate: 0,
        totalCost: 0,
        minsParked: 0,
        etc: "",
    });
    
    //유저 월 선택 저장
    const [selectMonth,setSelectMonth] = useState("");

 
    /*
    차량번호 정규식검사
    작성자:여원지
    날짜: 2024. 12. 20
    사용: modify
    */
    const CarPlateValidation = (inputData) => {
        var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
        var result = regExp.test(inputData); 
        return result;
    }

    /* 
    YYYYMMDD-HHmmss 형식의 데이터를 YYYY-MM-DD로 변환하는 함수
    작성자: 여원지
    날짜: 2024.12.20
    사용:ParkingTable
    */

    var DateParse = (entityDate) => {

        if (entityDate.length < 10) {
            console.error("TimeParse에 전달된 데이터가 올바르지 않습니다:", entityDate);
            return ' ';
        }

        var date = entityDate.split('-');
        var YYYY = date[0].slice(0,4);
        var MM = date[0].slice(4,6);
        var DD = date[0].slice(6,8);
        return `${YYYY}-${MM}-${DD}`
    }

    /* 
    YYYYMMDD-HHmmss 형식의 데이터를 HH:mm:ss 으로 변환하는 함수
    작성자: 여원지
    날짜  : 2024.12.16 
    사용: ParkingTable, ParkingTableC2
    */
    var TimeParse = (entityDate) => {

        if ( entityDate.length < 10) {
            console.error("TimeParse에 전달된 데이터가 올바르지 않습니다:", entityDate);
            return ' ';
        }

        var date = entityDate.split('-');
        var setTime = [];
        console.log("데이터 확인",date);


        console.log(typeof date);
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
            TimeParse,
            selectMonth,
            setSelectMonth,
            CarPlateValidation
        }}>
            {children}
        </GlobalContext.Provider>
    );
};


export const useGlobalContext = () => {
    return useContext(GlobalContext);
}