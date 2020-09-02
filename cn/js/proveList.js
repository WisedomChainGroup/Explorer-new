

var coinaddress = GetQueryString("coinaddress");
getProveList(coinaddress)

function getProveList(hash) {
    //数据请求部分
    $.get("/v2-web/get_prove_by_hash",{
            hash:coinaddress
        },
        function(result) {
            if (result.code == "2000") {
                result.data.created_at = getTime(result.data.created_at);
                let address = result.data.from_address.substring(0, 2);
                if(address !=  "WX"){
                    result.data.from_address = "WX" + result.data.from_address;
                }
                setHtml(result.data, 'tpl3', 'block-content');
            }

        });

}


function replaceAll(str)
{
    if(str!=null)
        str = str.replace(/-/g,"/")
    return str;
}


function getTime(UTCDateString) {
    //获取当前时区
    var offset = new Date().getTimezoneOffset()/60;
    if(!UTCDateString){
        return '-';
    }
    //UTCDateString = renderTime(UTCDateString);
    UTCDateString = UTCDateString.replace("-","/");
    UTCDateString = UTCDateString.replace("T"," ");
    UTCDateString = replaceAll(UTCDateString);
    UTCDateString = UTCDateString.substring(0,19);

    function formatFunc(str) {    //格式化显示
        return str > 9 ? str : '0' + str
    }
    var date2 = new Date(UTCDateString);//这步是关键
    var year = date2.getFullYear();
    var mon = formatFunc(date2.getMonth() + 1);
    var day = formatFunc(date2.getDate());
    var hour = date2.getHours();
    hour = formatFunc(hour);
    var min = formatFunc(date2.getMinutes());
    var sec = formatFunc(date2.getSeconds());
    var dateStr = year+'/'+mon+'/'+day+' '+hour+':'+min+':'+sec;
    //var dateStr = "2020/9/2 23:01:01";
    var dateStr1 = eosFormatTime2(dateStr,offset);
    var year1 = dateStr1.getFullYear();
    var mon1 = formatFunc(dateStr1.getMonth() + 1);
    var day1 = formatFunc(dateStr1.getDate());
    var hour1 = dateStr1.getHours();
    hour1 = formatFunc(hour1);
    var min1 = formatFunc(dateStr1.getMinutes());
    var sec1 = formatFunc(dateStr1.getSeconds());
    var dateStr2 = year1+'-'+mon1+'-'+day1+' '+hour1+':'+min1+':'+sec1;
    return dateStr2;
}

function eosFormatTime2(oldTimes1,offset) {
    var x = oldTimes1; // 取得时间"2017-07-08 13:00:00"
    var time = new Date(x);
    var timeNum = offset;//小时数
    time.setHours(time.getHours() - timeNum);
    return time;
}



