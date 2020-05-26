var address = GetQueryString("coinaddress");
address = address.substring(2,address.length);

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
    getRuleLogList(address,1,startIndex2);
} else {
    getRuleLogList(address,pageIndex, startIndex2);
}

function getRuleLogList(fromAddress,pageIndex,pageSize) {
    // var pageSize=pageSize||10;
    // var pageIndex=pageIndex||1;
    // var pageSize = GetQueryString("select");
    // if(pageSize == null){
    //     pageSize = 10;
    // }
    //数据请求部分
    $.get(HttpHead + "/deployConditionalPaymentRule/searchStoreRule/", {
            search:fromAddress,
            pageIndex: 1,
            pageSize: pageSize
        },

        function(result) {
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
                coinHash160 = result.data[i].coinHash160;
            }
            setHtml(result.data, 'tpl2', 'block-content');
            //分页处理
            // $('#totalCount').html(result.pageQuery.totalCount);
            // $('#curr_page').html(result.pageQuery.pageIndex);
            // $('#totalPage').html(result.pageQuery.totalPage);
            $.get(HttpHead + "/conditionalPaymentRuleTransferInOut/getAllTransferInList/", {
                    coinHash160: coinHash160,
                    pageIndex:pageIndex,
                    pageSize:pageSize
                },
                function(result) {
                    let number;
                    if(pageIndex == null || pageIndex ==1){
                        number = 1;
                    }else{
                        number = ((pageIndex-1)*pageSize)+1;
                    }
                    if (result.code == "2000") {
                        let len = result.pageQuery.totalPage;
                        if (pageIndex > len && len != 0) {
                            alert("Please enter the correct number!");
                        }
                        for (let i = 0; i < result.data.list.length; i++) {
                            result.data.list[i].number = number+i;
                            result.data.list[i].createdAt = getTime(result.data.list[i].createdAt);
                        }
                        setHtml(result.data.list, 'tpl3', 'block-transferList');
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
    var address = GetQueryString("coinaddress");
    address = address.substring(2,address.length);
    if(page == undefined ||
        page == null ||
        page == "undefined" ||
        page == "null" ||
        page == ""){
        getRuleLogList1(address,1,startIndex);
    }else {
        getRuleLogList1(address,page, startIndex);
    }
}

function getRuleLogList1(fromAddress,pageIndex,pageSize) {
    //数据请求部分
    $.get(HttpHead + "/deployConditionalPaymentRule/searchStoreRule/", {
            search:fromAddress,
            pageIndex: 1,
            pageSize: pageSize
        },

        function(result) {
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
                coinHash160 = result.data[i].coinHash160;
            }
            setHtml(result.data, 'tpl2', 'block-content');
            //分页处理
            // $('#totalCount').html(result.pageQuery.totalCount);
            // $('#curr_page').html(result.pageQuery.pageIndex);
            // $('#totalPage').html(result.pageQuery.totalPage);
            $.get(HttpHead + "/conditionalPaymentRuleTransferInOut/getAllTransferInList/", {
                    coinHash160: coinHash160,
                    pageIndex:pageIndex,
                    pageSize:pageSize
                },
                function(result) {
                    let number;
                    if(pageIndex == null || pageIndex ==1){
                        number = 1;
                    }else{
                        number = ((pageIndex-1)*pageSize)+1;
                    }
                    if (result.code == "2000") {
                        let len = result.pageQuery.totalPage;
                        if (pageIndex > len && len != 0) {
                            alert("Please enter the correct number!");
                            for (let i = 0; i < result.data.list.length; i++) {
                                result.data.list[i].number = number + i;
                                result.data.list[i].createdAt = getTime(result.data.list[i].createdAt);
                            }
                            setHtml(result.data.list, 'tpl3', 'block-transferList');
                            //分页处理
                            $('#totalCount').html(result.pageQuery.totalCount);
                            $('#curr_page').html(result.pageQuery.pageIndex);
                            $('#totalPage').html(result.pageQuery.totalPage);
                        }
                    }
                });

        });
}

$(function() {
    //首页
    $("#first_page").click(function() {
        //getTransferLogList(10, 1);
        let startIndex = document.getElementById("select").value;
        var address = GetQueryString("coinaddress");
        location.href = "contractList.html?pageIndex=1&select=" + startIndex+"&coinaddress=" + address;
    });

    //最后一页
    $('#last_page').click(function() {
        var totalPage = $('#totalPage').html();
        let startIndex = document.getElementById("select").value;
        var address = GetQueryString("coinaddress");
        location.href = "contractList.html?pageIndex=" + totalPage+"&select=" + startIndex+"&coinaddress=" + address;
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
        var address = GetQueryString("coinaddress");
        location.href = "contractList.html?pageIndex=" + pageIndex+"&select=" + startIndex+"&coinaddress=" + address;
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
        var address = GetQueryString("coinaddress");
        location.href = "contractList.html?pageIndex=" + pageIndex+"&select=" + startIndex+"&coinaddress=" + address;
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