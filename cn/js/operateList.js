var coinHash = GetQueryString("coinHash");
var fromAddress = GetQueryString("fromAddress");
address = fromAddress.substring(2,fromAddress.length);
var coinHash160 = GetQueryString("coinHash160");
getRuleLogList(address,1,10);


function getRuleLogList(address,pageIndex,pageSize) {
    //数据请求部分
    $.post(HttpHead + "/deployConditionalPaymentRule/searchStoreRule/", {
            search:address,
            pageIndex: pageIndex,
            pageSize: pageSize
        },

        function(result) {
            for(let  i = 0;i<result.data.length;i++){
                result.data[i].fromAddress = "WX"+ result.data[i].fromAddress;
                if(result.data[i].type == 2){
                    result.data[i].coinHashAddress = "WR"+ result.data[i].coinHashAddress;
                    result.data[i].destAddress = "WR"+ result.data[i].destAddress;
                }else{
                    result.data[i].coinHashAddress = "WX"+ result.data[i].coinHashAddress;
                    result.data[i].destAddress = "WX"+ result.data[i].destAddress;
                }
                $('#ruleName').html(result.data[i].ruleName);
                $('#coinHashAddress').html(result.data[i].coinHashAddress);
                $('#fromAddress').html(result.data[i].fromAddress);
            }
            //数据请求部分
            $.get(HttpHead + "/conditionalPaymentRuleTransferInOut/getTransferOutList/", {
                    coinHash:coinHash,
                    fromAddress: fromAddress,
                    coinHash160: coinHash160
                },

                function(result) {
                    setHtml(result.data, 'tpl2', 'block-content');
                    var list = new Array();
                    for(let  i = 0;i<result.data.outs.length;i++){
                        if(result.data.outs[i].type == 2){
                            result.data.outs[i].toAddress = "WR"+ result.data.outs[i].toAddress;
                        }else{
                            result.data.outs[i].toAddress = "WX"+ result.data.outs[i].toAddress;
                        }
                        result.data.outs[i].createdAt = getTime(result.data.outs[i].createdAt);
                        list.push(result.data.outs[i])
                    }
                    setHtml(list, 'tpl3', 'block-details');
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

// function test() {
//     var fromAddress = GetQueryString("fromAddress");
//     let coinaddress = "";
//     $.post(HttpHead + "/deployConditionalPaymentRule/searchStoreRule/", {
//             search:fromAddress,
//             pageIndex: 1,
//             pageSize: 10
//         },
//         function(result) {
//             for(let  i = 0;i<result.data.length;i++){
//                 result.data[i].fromAddress = "WX"+ result.data[i].fromAddress;
//                 if(result.data[i].type == 2){
//                     result.data[i].coinHashAddress = "WR"+ result.data[i].coinHashAddress;
//                     result.data[i].destAddress = "WR"+ result.data[i].destAddress;
//                 }else{
//                     result.data[i].coinHashAddress = "WX"+ result.data[i].coinHashAddress;
//                     result.data[i].destAddress = "WX"+ result.data[i].destAddress;
//                 }
//                 coinaddress = result.data[i].coinHashAddress;
//             }
//         });
//     location.href = "contractList.html?coinaddress=" + coinaddress;
// }