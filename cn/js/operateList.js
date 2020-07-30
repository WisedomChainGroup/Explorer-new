var coinHash = GetQueryString("coinHash");
var coinHashAddress = GetQueryString("coinHashAddress");
var fromAddress = GetQueryString("fromAddress");
if(coinHashAddress.substring(0,2) == "WX" || coinHashAddress.substring(0,2) == "WR"){
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
    getRuleLogList(coinHashAddress,0,startIndex2,coinHash,coinHash160,fromAddress);
} else {
    getRuleLogList(coinHashAddress,pageIndex, startIndex2,coinHash,coinHash160,fromAddress);
}
function getRuleLogList(address,pageIndex,pageSize,coinHash,coinHash160,fromAddress) {
    if(pageIndex > 0){
        pageIndex = pageIndex - 1;
    }
    //数据请求部分
    $.get("/v2-web/search_store_rule", {
            search:address,
            page: 0,
            per_page: 10
        },

        function(result) {
            for(let  i = 0;i<result.data.content.length;i++){
                result.data.content[i].hash_address = "WR"+ result.data.content[i].hash_address;
                if(result.data.content[i].type == 2){
                    result.data.content[i].dest_address = "WR"+ result.data.content[i].dest_address;
                }else{
                    result.data.content[i].dest_address = "WX"+ result.data.content[i].dest_address;
                }
                if(result.data.content[i].asset_hash160 == "0000000000000000000000000000000000000000"){
                    $('.codes').html("WDC");
                }
                $('#ruleName').html(result.data.content[i].rule_name);
                $('#coinHashAddress').html(result.data.content[i].hash_address);
                $('#from_address').html(fromAddress);
                $('#txn_hash').html(coinHash);
            }
            //数据请求部分
            $.get("/v2-web/get_transfer_out_list", {
                    from_address: fromAddress,
                    coin_hash_160: coinHash160,
                    coin_hash:coinHash,
                    per_page: pageSize,
                    page: pageIndex
                },

                function(result) {
                    if (result.code == "2000") {
                        setHtml(result.data, 'tpl2', 'block-content');
                            var list = new Array();
                            for (let i = 0; i < result.data.outs.content.length; i++) {
                                if (result.data.outs.content[i].type == 2) {
                                    result.data.outs.content[i].to_address = "WR" + result.data.outs.content[i].to_address;
                                    result.data.outs.content[i].from_address = "WR" + result.data.outs.content[i].from_address;
                                } else {
                                    result.data.outs.content[i].to_address = "WX" + result.data.outs.content[i].to_address;
                                    result.data.outs.content[i].from_address = "WX" + result.data.outs.content[i].from_address;
                                }
                                result.data.outs.content[i].created_at = getTime(result.data.outs.content[i].created_at);
                                result.data.outs.content[i].number = ((pageIndex) * pageSize) + i + 1;
                                list.push(result.data.outs.content[i]);
                            }
                            setHtml(list, 'tpl3', 'block-details');
                            //分页处理
                            $('#totalCount').html(result.data.outs.totalElements);
                            $('#curr_page').html(pageIndex + 1);
                            $('#totalPage').html(result.data.outs.totalPages);
                        }
                });
        });
}

function changePageSize(page){
    let startIndex = document.getElementById("select").value;
    var coinHash = GetQueryString("coinHash");
    var coinHashAddress = GetQueryString("coinHashAddress");
    if(coinHashAddress.substring(0,2) == "WX" || coinHashAddress.substring(0,2) == "WR"){
        coinHashAddress = coinHashAddress.substring(2,coinHashAddress.length);
    }
    let total = $('#totalPage').html();
    var coinHash160 = GetQueryString("coinHash160");
    var fromAddress = GetQueryString("fromAddress");
    let searchType = document.getElementById("searchType").value;
    if(searchType != ""){
        if (page == undefined ||
            page == null ||
            page == "undefined" ||
            page == "null" ||
            page == "") {
            searchOperateByAddress(startIndex, 1);
        }else {
            if (parseInt(total) < parseInt(page)) {
                alert("超过最大页数");
                return;
            } else {
                searchOperateByAddress(startIndex, page);
            }
        }
    }else {
        if (page == undefined ||
            page == null ||
            page == "undefined" ||
            page == "null" ||
            page == "") {
            location.href = "operateList.html?pageIndex=1&select=" + startIndex + "&coinHashAddress=" + coinHashAddress + "&coinHash=" + coinHash + "&coinHash160=" + coinHash160 + "&fromAddress=" + fromAddress;
        } else {
            if (parseInt(total) < parseInt(page)) {
                alert("超过最大页数");
                return;
            } else {
                location.href = "operateList.html?pageIndex=" + page + "&select=" + startIndex + "&coinHashAddress=" + coinHashAddress + "&coinHash=" + coinHash + "&coinHash160=" + coinHash160 + "&fromAddress=" + fromAddress;
            }
        }
    }
}

$(function() {
    //首页
    $("#first_page").click(function() {
        //getTransferLogList(10, 1);
        var curr_page = parseInt($('#curr_page').html());
        let startIndex = document.getElementById("select").value;
        var coinHash = GetQueryString("coinHash");
        var coinHashAddress = GetQueryString("coinHashAddress");
        if(coinHashAddress.substring(0,2) == "WX" ||coinHashAddress.substring(0,2) == "WR"){
            coinHashAddress = coinHashAddress.substring(2,coinHashAddress.length);
        }
        var coinHash160 = GetQueryString("coinHash160");
        var fromAddress = GetQueryString("fromAddress");
        let searchType = document.getElementById("searchType").value;
        if(curr_page > 1 && searchType != "") {
            searchOperateByAddress(startIndex,1);
        }else{
            location.href = "operateList.html?pageIndex=1&select=" + startIndex + "&coinHashAddress=" + coinHashAddress + "&coinHash=" + coinHash + "&coinHash160=" + coinHash160 + "&fromAddress=" + fromAddress;
        }
    });

    //最后一页
    $('#last_page').click(function() {
        var curr_page = parseInt($('#curr_page').html());
        var totalPage = $('#totalPage').html();
        let startIndex = document.getElementById("select").value;
        var coinHash = GetQueryString("coinHash");
        var coinHashAddress = GetQueryString("coinHashAddress");
        if(coinHashAddress.substring(0,2) == "WX" ||coinHashAddress.substring(0,2) == "WR"){
            coinHashAddress = coinHashAddress.substring(2,coinHashAddress.length);
        }
        var coinHash160 = GetQueryString("coinHash160");
        var fromAddress = GetQueryString("fromAddress");
        let searchType = document.getElementById("searchType").value;
        if(curr_page < totalPage && searchType != "") {
            searchOperateByAddress(startIndex,totalPage);
        }else{
            location.href = "operateList.html?pageIndex=" + totalPage + "&select=" + startIndex + "&coinHashAddress=" + coinHashAddress + "&coinHash=" + coinHash + "&coinHash160=" + coinHash160 + "&fromAddress=" + fromAddress;
        }//getTransferLogList(10, totalPage);
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
        if(coinHashAddress.substring(0,2) == "WX" ||coinHashAddress.substring(0,2) == "WR"){
            coinHashAddress = coinHashAddress.substring(2,coinHashAddress.length);
        }
        var coinHash160 = GetQueryString("coinHash160");
        var fromAddress = GetQueryString("fromAddress");
        let searchType = document.getElementById("searchType").value;
        if(curr_page > 1 && searchType != "") {
            searchOperateByAddress(startIndex,pageIndex);
        }else{
            location.href = "operateList.html?pageIndex=" + pageIndex + "&select=" + startIndex + "&coinHashAddress=" + coinHashAddress + "&coinHash=" + coinHash + "&coinHash160=" + coinHash160 + "&fromAddress=" + fromAddress;
        }
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
        if(coinHashAddress.substring(0,2) == "WX" ||coinHashAddress.substring(0,2) == "WR"){
            coinHashAddress = coinHashAddress.substring(2,coinHashAddress.length);
        }
        var coinHash160 = GetQueryString("coinHash160");
        var fromAddress = GetQueryString("fromAddress");
        let searchType = document.getElementById("searchType").value;
        if(curr_page < totalPage  && searchType != "") {
            searchOperateByAddress(startIndex,pageIndex);
        }else{
            location.href = "operateList.html?pageIndex=" + pageIndex + "&select=" + startIndex + "&coinHashAddress=" + coinHashAddress + "&coinHash=" + coinHash + "&coinHash160=" + coinHash160 + "&fromAddress=" + fromAddress;
        }
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
    if(isNaN(page)|| !(/(^[1-9]\d*$)/.test(page))){
        alert("请输入正确的数字！");
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

function searchOperateByAddress(page1,pageIndex) {
    var coinHash = GetQueryString("coinHash");
    var coinHashAddress = GetQueryString("coinHashAddress");
    var fromAddress = GetQueryString("fromAddress");
    if(coinHashAddress.substring(0,2) == "WX" || coinHashAddress.substring(0,2) == "WR"){
        coinHashAddress = coinHashAddress.substring(2,coinHashAddress.length);
    }
    var coinHash160 = GetQueryString("coinHash160");
    var startIndex2 = GetQueryString("select");
    if(startIndex2 == null){
        startIndex2 = 10;
    }
    if(page1 == undefined ||
        page1 == null ||
        page1 == "undefined" ||
        page1 == "null" ||
        page1 == ""){
        pageIndex = 1 ;
        page1=startIndex2;
    }
    let searchType = document.getElementById("searchType").value;
    let searchAddress = searchType.trim();
    if(pageIndex > 0){
        pageIndex = pageIndex - 1;
    }
    //数据请求部分
    $.get("/v2-web/search_store_rule", {
            search:coinHashAddress,
            page: 0,
            per_page: 10
        },

        function(result) {
            for(let  i = 0;i<result.data.content.length;i++){
                result.data.content[i].hash_address = "WR"+ result.data.content[i].hash_address;
                if(result.data.content[i].type == 2){
                    result.data.content[i].dest_address = "WR"+ result.data.content[i].dest_address;
                }else{
                    result.data.content[i].dest_address = "WX"+ result.data.content[i].dest_address;
                }
                if(result.data.content[i].asset_hash160 == "0000000000000000000000000000000000000000"){
                    $('.codes').html("WDC");
                }
                $('#ruleName').html(result.data.content[i].rule_name);
                $('#coinHashAddress').html(result.data.content[i].hash_address);
                $('#from_address').html(fromAddress);
                $('#txn_hash').html(coinHash);
            }
            //数据请求部分
            $.get("/v2-web/get_transfer_out_list", {
                    from_address: fromAddress,
                    coin_hash_160: coinHash160,
                    coin_hash:coinHash,
                    per_page: 100000000,
                    page: 0
                },
                function(result) {
                    if (result.code == "2000") {
                        setHtml(result.data, 'tpl2', 'block-content');
                        let list_map = new Array();
                        let list_map_1 = new Array();
                        let j =0;
                        for (let i = 0; i < result.data.outs.content.length; i++) {
                            if (result.data.outs.content[i].type == 2) {
                                result.data.outs.content[i].to_address = "WR" + result.data.outs.content[i].to_address;
                                result.data.outs.content[i].from_address = "WR" + result.data.outs.content[i].from_address;
                            } else {
                                result.data.outs.content[i].to_address = "WX" + result.data.outs.content[i].to_address;
                                result.data.outs.content[i].from_address = "WX" + result.data.outs.content[i].from_address;
                            }
                            result.data.outs.content[i].created_at = getTime(result.data.outs.content[i].created_at);
                            result.data.outs.content[i].number = j + 1;
                            if(result.data.outs.content[i].to_address == searchAddress){
                                list_map.push(result.data.outs.content[i]);
                                j++;
                            }else if(searchAddress == ""){
                                list_map.push(result.data.outs.content[i]);
                                j++;
                            }
                        }
                        let total;
                        if((pageIndex+1)*page1 > list_map.length){
                            for (let k = pageIndex * page1; k < list_map.length; k++) {
                                list_map_1.push(list_map[k]);
                            }
                            total = Math.ceil(list_map.length/page1);
                        }else {
                            for(let k = pageIndex*page1; k < (pageIndex+1)*page1;k++){
                                list_map_1.push(list_map[k]);
                            }
                            total = Math.ceil(list_map.length/page1);
                        }
                        setHtml(list_map_1, 'tpl3', 'block-details');
                        //分页处理
                        //$('#totalCount').html(list_map.length);
                        $('#curr_page').html(pageIndex + 1);
                        $('#totalPage').html(total);
                    }
                });
        });
}