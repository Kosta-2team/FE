const MonthBtn = () => {
    return(
        <div>
            
        </div>
    )
}


//오늘날짜 구하는 함수
var SetToday = ()=> {
    var today = new Date();
    var getFullyear = today.getFullYear();
    var getMonth = today.getMonth()+1;
    var getDate = today.getDate();
    
    
    return {getFullyear,getMonth,getDate};
}
export default MonthBtn;