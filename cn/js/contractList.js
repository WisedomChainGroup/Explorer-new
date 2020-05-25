var address = GetQueryString("coinaddress");
let search = address.substring(0, 2);
let fromAddress = address.substring(2,address.length);

getRuleLogList(search,fromAddress,1,10);

function getRuleLogList(search,fromAddress,pageIndex,pageSize) {
    // var pageSize=pageSize||10;
    // var pageIndex=pageIndex||1;
    // var pageSize = GetQueryString("select");
    // if(pageSize == null){
    //     pageSize = 10;
    // }
    //数据请求部分
    $.post(HttpHead + "/deployConditionalPaymentRule/storeRule/", {
            search:search,
            fromAddress:fromAddress,
            pageIndex: pageIndex,
            pageSize: pageSize
        },

        function(result) {
            for(let  i = 0;i<result.data.length;i++){
                result.data[i].createdAt = getTime(result.data[i].createdAt);
                if(result.data[i].type == 2){
                    result.data[i].coinHashAddress = "WR"+ result.data[i].coinHashAddress;
                }else{
                    result.data[i].coinHashAddress = "WX"+ result.data[i].coinHashAddress;
                }
            }
            setHtml(result.data, 'tpl2', 'block-content');
            //分页处理
            // $('#totalCount').html(result.pageQuery.totalCount);
            // $('#curr_page').html(result.pageQuery.pageIndex);
            // $('#totalPage').html(result.pageQuery.totalPage);
            // console.log(result.data)


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
    var dateStr = year+'-'+mon+'-'+day+' '+hour+':'+min;
    return dateStr;
}