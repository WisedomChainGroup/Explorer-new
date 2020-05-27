var coinHash = GetQueryString("coinHash");
var coinHashAddress = GetQueryString("coinHashAddress");
var fromAddress = GetQueryString("fromAddress");
if(coinHashAddress.substring(0,2) == "WX"){
    coinHashAddress = coinHashAddress.substring(2,coinHashAddress.length);
}
var coinHash160 = GetQueryString("coinHash160");
var pageIndex = GetQueryString("pageIndex");
var startIndex2 = GetQueryString("select");
if(startIndex2 == null){
    startIndex2 = 10;
}
if (pageIndex == undefined ||
    pageIndex == null ||
    pageIndex == "undefined" ||
    pageIndex == "null" ||
    pageIndex == "") {
    getRuleLogList(coinHashAddress,1,startIndex2,coinHash,coinHash160,fromAddress);
} else {
    getRuleLogList(coinHashAddress,pageIndex, startIndex2,coinHash,coinHash160,fromAddress);
}
function getRuleLogList(address,pageIndex,pageSize,coinHash,coinHash160,fromAddress) {
    //数据请求部分
    $.get(HttpHead + "/deployConditionalPaymentRule/searchStoreRule/", {
            search:address,
            pageIndex: 1,
            pageSize: 10
        },

        function(result) {
            for(let  i = 0;i<result.data.length;i++){
                result.data[i].fromAddress = "WX"+ result.data[i].fromAddress;
                result.data[i].coinHashAddress = "WR"+ result.data[i].coinHashAddress;
                if(result.data[i].type == 2){
                    result.data[i].destAddress = "WR"+ result.data[i].destAddress;
                }else{
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
                    coinHash160: coinHash160,
                    pageIndex: pageIndex,
                    pageSize: pageSize
                },

                function(result) {
                    let number;
                    if(pageIndex == null || pageIndex ==1){
                        number = 1;
                    }else{
                        number = ((pageIndex-1)*pageSize)+1;
                    }
                    if (result.code == "2000") {
                        setHtml(result.data, 'tpl2', 'block-content');
                        var list = new Array();
                        for (let i = 0; i < result.data.outs.length; i++) {
                            if(fromAddress.substring(0,2) == "WX"){
                                fromAddress = fromAddress.substring(2,fromAddress.length);
                            }
                            if (result.data.outs[i].type == 2) {
                                result.data.outs[i].toAddress = "WR" + result.data.outs[i].toAddress;
                                result.data.outs[i].fromAddress = fromAddress;
                            } else {
                                result.data.outs[i].toAddress = "WX" + result.data.outs[i].toAddress;
                                result.data.outs[i].fromAddress = fromAddress;
                            }
                            result.data.outs[i].createdAt = getTime(result.data.outs[i].createdAt);
                            result.data.outs[i].number = number+i;
                            list.push(result.data.outs[i]);
                        }
                        setHtml(list, 'tpl3', 'block-details');
                        //分页处理
                        $('#totalCount').html(result.pageQuery.totalCount);
                        $('#curr_page').html(result.pageQuery.pageIndex);
                        $('#totalPage').html(result.pageQuery.totalPage);
                    }
                });
        });
}

function changePageSize(page){
    let startIndex = document.getElementById("select").value;
    var coinHash = GetQueryString("coinHash");
    var coinHashAddress = GetQueryString("coinHashAddress");
    if(coinHashAddress.substring(0,2) == "WX"){
        coinHashAddress = coinHashAddress.substring(2,coinHashAddress.length);
    }
    var coinHash160 = GetQueryString("coinHash160");
    var fromAddress = GetQueryString("fromAddress");
    if(page == undefined ||
        page == null ||
        page == "undefined" ||
        page == "null" ||
        page == ""){
        getRuleLogList1(coinHashAddress,1,startIndex,coinHash,coinHash160,fromAddress);
    }else {
        getRuleLogList1(coinHashAddress,page, startIndex,coinHash,coinHash160,fromAddress);
    }
}

function getRuleLogList1(address,pageIndex,pageSize,coinHash,coinHash160,fromAddress) {
    //数据请求部分
    $.get(HttpHead + "/deployConditionalPaymentRule/searchStoreRule/", {
            search:address,
            pageIndex: 1,
            pageSize: 10
        },

        function(result) {
            for(let  i = 0;i<result.data.length;i++){
                result.data[i].fromAddress = "WX"+ result.data[i].fromAddress;
                result.data[i].coinHashAddress = "WR"+ result.data[i].coinHashAddress;
                if(result.data[i].type == 2){
                    result.data[i].destAddress = "WR"+ result.data[i].destAddress;
                }else{
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
                    coinHash160: coinHash160,
                    pageIndex: pageIndex,
                    pageSize: pageSize
                },

                function(result) {
                    let number;
                    if(pageIndex == null || pageIndex ==1){
                        number = 1;
                    }else{
                        number = ((pageIndex-1)*pageSize)+1;
                    }
                    if (result.code == "2000") {
                        setHtml(result.data, 'tpl2', 'block-content');
                        var list = new Array();
                        for (let i = 0; i < result.data.outs.length; i++) {
                            if(fromAddress.substring(0,2) == "WX"){
                                fromAddress = fromAddress.substring(2,fromAddress.length);
                            }
                            if (result.data.outs[i].type == 2) {
                                result.data.outs[i].toAddress = "WR" + result.data.outs[i].toAddress;
                                result.data.outs[i].fromAddress = fromAddress;
                            } else {
                                result.data.outs[i].toAddress = "WX" + result.data.outs[i].toAddress;
                                result.data.outs[i].fromAddress = fromAddress;
                            }
                            result.data.outs[i].createdAt = getTime(result.data.outs[i].createdAt);
                            result.data.outs[i].number = number+i;
                            list.push(result.data.outs[i]);
                            ;
                        }
                        setHtml(list, 'tpl3', 'block-details');
                        //分页处理
                        $('#totalCount').html(result.pageQuery.totalCount);
                        $('#curr_page').html(result.pageQuery.pageIndex);
                        $('#totalPage').html(result.pageQuery.totalPage);
                    }
                });
        });
}

$(function() {
    //首页
    $("#first_page").click(function() {
        //getTransferLogList(10, 1);
        let startIndex = document.getElementById("select").value;
        var coinHash = GetQueryString("coinHash");
        var coinHashAddress = GetQueryString("coinHashAddress");
        if(coinHashAddress.substring(0,2) == "WX"){
            coinHashAddress = coinHashAddress.substring(2,coinHashAddress.length);
        }
        var coinHash160 = GetQueryString("coinHash160");
        var fromAddress = GetQueryString("fromAddress");
        location.href = "operateList.html?pageIndex=1&select=" + startIndex+"&coinHashAddress=" + coinHashAddress+"&coinHash=" + coinHash+"&coinHash160=" + coinHash160+"&fromAddress=" + fromAddress;
    });

    //最后一页
    $('#last_page').click(function() {
        var totalPage = $('#totalPage').html();
        let startIndex = document.getElementById("select").value;
        var coinHash = GetQueryString("coinHash");
        var coinHashAddress = GetQueryString("coinHashAddress");
        if(coinHashAddress.substring(0,2) == "WX"){
            coinHashAddress = coinHashAddress.substring(2,coinHashAddress.length);
        }
        var coinHash160 = GetQueryString("coinHash160");
        var fromAddress = GetQueryString("fromAddress");
        location.href = "operateList.html?pageIndex=" + totalPage+"&select=" + startIndex+"&coinHashAddress=" + coinHashAddress+"&coinHash=" + coinHash+"&coinHash160=" + coinHash160+"&fromAddress=" + fromAddress;
        //getTransferLogList(10, totalPage);
    });
    //上一頁
    $("#pre_page").click(function() {
        var curr_page = parseInt($('#curr_page').html());
        var totalPage = parseInt($('#totalPage').html());
        if (curr_page > 1) {
            pageIndex = curr_page - 1;
        }else{
            pageIndex=curr_page;
        }
        let startIndex = document.getElementById("select").value;
        var coinHash = GetQueryString("coinHash");
        var coinHashAddress = GetQueryString("coinHashAddress");
        if(coinHashAddress.substring(0,2) == "WX"){
            coinHashAddress = coinHashAddress.substring(2,coinHashAddress.length);
        }
        var coinHash160 = GetQueryString("coinHash160");
        var fromAddress = GetQueryString("fromAddress");
        location.href = "operateList.html?pageIndex=" + pageIndex+"&select=" + startIndex+"&coinHashAddress=" + coinHashAddress+"&coinHash=" + coinHash+"&coinHash160=" + coinHash160+"&fromAddress=" + fromAddress;
    });
    //下一頁
    $("#next_page").click(function() {
        var curr_page = parseInt($('#curr_page').html());
        var totalPage = parseInt($('#totalPage').html());
        if (curr_page < totalPage) {
            pageIndex = curr_page + 1;
        }else{
            pageIndex=curr_page;
        }
        let startIndex = document.getElementById("select").value;
        var coinHash = GetQueryString("coinHash");
        var coinHashAddress = GetQueryString("coinHashAddress");
        if(coinHashAddress.substring(0,2) == "WX"){
            coinHashAddress = coinHashAddress.substring(2,coinHashAddress.length);
        }
        var coinHash160 = GetQueryString("coinHash160");
        var fromAddress = GetQueryString("fromAddress");
        location.href = "operateList.html?pageIndex=" + pageIndex+"&select=" + startIndex+"&coinHashAddress=" + coinHashAddress+"&coinHash=" + coinHash+"&coinHash160=" + coinHash160+"&fromAddress=" + fromAddress;
    });
})

$(document).ready(function(){
    var test = GetQueryString("select");
    if (test == null){
        $("#select").val("10");
    }else {
        $("#select").val(test);
    }
});

function jumpSize(){
    let page = document.getElementById("page").value;
    if(isNaN(page)){
        alert("Please enter the correct number!");
    }
    changePageSize(page);
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

function returnBack() {
    var coinHashAddress = GetQueryString("coinHashAddress");
    location.href = "contractList.html?coinaddress=" + coinHashAddress;
}