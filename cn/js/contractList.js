var address = GetQueryString("coinaddress");
address = address.substring(2,address.length);

getRuleLogList(address,1,10);
function getRuleLogList(fromAddress,pageIndex,pageSize) {
    // var pageSize=pageSize||10;
    // var pageIndex=pageIndex||1;
    // var pageSize = GetQueryString("select");
    // if(pageSize == null){
    //     pageSize = 10;
    // }
    //数据请求部分
    $.post(HttpHead + "/deployConditionalPaymentRule/searchStoreRule/", {
            search:fromAddress,
            pageIndex: pageIndex,
            pageSize: pageSize
        },

        function(result) {
            let fromAddress = "";
            let coinHash160 = "";
            for(let  i = 0;i<result.data.length;i++){
                result.data[i].createdAt = getTime(result.data[i].createdAt);
                result.data[i].fromAddress = "WX"+ result.data[i].fromAddress;
                result.data[i].drawRate = result.data[i].drawRate * 100 +"%";
                if(result.data[i].type == 2){
                    result.data[i].coinHashAddress = "WR"+ result.data[i].coinHashAddress;
                }else{
                    result.data[i].coinHashAddress = "WX"+ result.data[i].coinHashAddress;
                }
                if(result.data[i].destAddress == "0000000000000000000000000000000000000000"){
                    result.data[i].destAddress = "任意地址";
                }else{
                    if(result.data[i].type == 2){
                        result.data[i].destAddress = "WR"+ result.data[i].destAddress;
                    }else{
                        result.data[i].destAddress = "WX"+ result.data[i].destAddress;
                    }
                }
                if(result.data[i].ruleName == null){
                    result.data[i].ruleName = "";
                }
                fromAddress = result.data[i].fromAddress;
                coinHash160 = result.data[i].coinHash160;
            }
            setHtml(result.data, 'tpl2', 'block-content');
            //分页处理
            // $('#totalCount').html(result.pageQuery.totalCount);
            // $('#curr_page').html(result.pageQuery.pageIndex);
            // $('#totalPage').html(result.pageQuery.totalPage);
            $.get(HttpHead + "/conditionalPaymentRuleTransferInOut/getTransferInList/", {
                    fromAddress:fromAddress,
                    coinHash160: coinHash160
                },
                function(result) {
                    for(let i = 0;i<result.data.list.length;i++){
                        result.data.list[i].createdAt = getTime(result.data.list[i].createdAt);
                    }
                    setHtml(result.data.list, 'tpl3', 'block-transferList');
                    //分页处理
                    // $('#totalCount').html(result.pageQuery.totalCount);
                    // $('#curr_page').html(result.pageQuery.pageIndex);
                    // $('#totalPage').html(result.pageQuery.totalPage);
                });

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