

var coinaddress = GetQueryString("coinaddress");
getProveList(coinaddress)

function getProveList(hash) {
    //数据请求部分
    $.get("v2-web/get_prove_by_hash",{
        hash:coinaddress
    },
        function(result) {
            if (result.code == "2000" && result.data != null) {
                result.data.created_at = getTime(result.data.created_at);
                let address = result.data.from_address.substring(0, 2);
                if(address !=  "WX"){
                    result.data.from_address = "WX" + result.data.from_address;
                }
                setHtml(result.data, 'tpl3', 'block-content');
            }

   });

}

function getTime(UTCDateString) {
    if(!UTCDateString){
        return '-';
    }
    function formatFunc(str) {    //格式化显示
		return str > 9 ? str : '0' + str
    }
    var date2 = new Date(UTCDateString);     //这步是关键
		var year = date2.getFullYear();
    var mon = formatFunc(date2.getMonth() + 1);
    var day = formatFunc(date2.getDate());
    var hour = date2.getHours();
    hour = formatFunc(hour);
    var min = formatFunc(date2.getMinutes());
    var sec = formatFunc(date2.getSeconds());
    var dateStr = year+'-'+mon+'-'+day+' '+hour+':'+min+':'+sec;
    return dateStr;
}



