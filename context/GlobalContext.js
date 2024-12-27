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

    //개발 여부
    const [isDev, setIsDev] = useState(true);
 
    /*
    데이터 Null 검사
    작성자: 여원지
    */
    function isNull(v) {
        return (v==undefined || v == null) ? true : false;
    }    
    

    /*
    JSON 타입인지 검사
    */
    function isJSON(input) {
        if (typeof input !== "string") {
            return false;
        }

        try {
            const parsed = JSON.parse(input);
            return typeof parsed == "object" && parsed != null;
        }catch (e) {
            return false;
        }
    }



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
        if(isNull(entityDate)){
            return ' ';
        }
     
            if (entityDate.length < 10) {
                console.error("DateParse에 전달된 데이터가 올바르지 않습니다:", entityDate);
                return ' ';
            }
    
            var date = entityDate.split('-');
            var YYYY = date[0].slice(0,4);
            var MM = date[0].slice(4,6);
            var DD = date[0].slice(6,8);
            return `${YYYY}-${MM}-${DD}`;
  
        
        
    }

    /* 
    YYYYMMDD-HHmmss 형식의 데이터를 HH:mm:ss 으로 변환하는 함수
    작성자: 여원지
    날짜  : 2024.12.16 
    사용: ParkingTable, ParkingTableC2
    */
    var TimeParse = (entityDate) => {

        if(isNull(entityDate)){
            return ' ';
        }

        if ( entityDate.length < 10) {
            console.error("TimeParse에 전달된 데이터가 올바르지 않습니다:", entityDate);
            return ' ';
        }

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
            TimeParse,
            selectMonth,
            setSelectMonth,
            CarPlateValidation,
            isDev,
            setIsDev,
            isNull,
            isJSON
        }}>
            {children}
        </GlobalContext.Provider>
    );
};


export const useGlobalContext = () => {
    return useContext(GlobalContext);
}