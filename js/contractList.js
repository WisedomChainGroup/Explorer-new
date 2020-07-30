var address = GetQueryString("coinaddress");
if(address.substring(0,2) =="WR"){
    address = address.substring(2,address.length);
}

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
    getRuleLogList(address,0,startIndex2);
} else {
    getRuleLogList(address,pageIndex, startIndex2);
}

function getRuleLogList(fromAddress,pageIndex,pageSize) {
    if(pageIndex>0){
        pageIndex = pageIndex -1;
    }
    //数据请求部分
    $.get("/v2-web/search_store_rule", {
            per_page: pageSize,
            page: 0,
            search:fromAddress
        },

        function(result) {
            let coinHash160 = "";
            for(let  i = 0;i<result.data.content.length;i++){
                result.data.content[i].created_at = getTime(result.data.content[i].created_at);
                result.data.content[i].from_address = "WX"+ result.data.content[i].from_address;
                result.data.content[i].draw_rate = result.data.content[i].draw_rate * 100;
                result.data.content[i].hash_address = "WR"+ result.data.content[i].hash_address;
                if(result.data.content[i].dest_hash == "0000000000000000000000000000000000000000"){
                    result.data.content[i].dest_address = "Any Address";
                }else{
                    if(result.data.content[i].type == 2){
                        result.data.content[i].dest_address = "WR"+ result.data.content[i].dest_address;
                    }else{
                        result.data.content[i].dest_address = "WX"+ result.data.content[i].dest_address;
                    }
                }
                if(result.data.content[i].rule_name == null){
                    result.data.content[i].rule_name = "";
                }
                if(result.data.content[i].asset_hash160 == "0000000000000000000000000000000000000000"){
                    $('.codes').html("WDC");
                }
            coinHash160 = result.data.content[i].hash160;
            }
            setHtml(result.data.content, 'tpl2', 'block-content');
            $.get("/v2-web/get_transfer_in_list", {
                    coin_hash_160: coinHash160,
                    per_page:pageSize,
                    page:pageIndex
                },
                function(result) {
                    if (result.code == "2000") {
                        if(pageIndex+1 > result.data.totalPages){
                            alert("Please enter the correct number!");
				            return;
                        }else {
                            for (let i = 0; i < result.data.list.content.length; i++) {
                                result.data.list.content[i].from_address = "WX"+ result.data.list.content[i].from_address;
                                result.data.list.content[i].number = ((pageIndex)*pageSize)+i+1;
                                result.data.list.content[i].created_at = getTime(result.data.list.content[i].created_at);
                            }
                            setHtml(result.data.list.content, 'tpl3', 'block-transferList');
                            //分页处理
                            $('#totalCount').html(result.data.list.totalElements);
                            $('#curr_page').html(pageIndex+1);
                            $('#totalPage').html(result.data.list.totalPages);
                        }
                    }
                });

        });
}

function changePageSize(page){
    let startIndex = document.getElementById("select").value;
    var address = GetQueryString("coinaddress");
    let total = $('#totalPage').html();
    if(address.substring(0,2) =="WR"){
        address = address.substring(2,address.length);
    }
    let searchType = document.getElementById("searchType").value;
    if(searchType != ""){
        if (page == undefined ||
            page == null ||
            page == "undefined" ||
            page == "null" ||
            page == "") {
            searchContractByAddress(startIndex, 1);
        }else {
            if (parseInt(total) < parseInt(page)) {
                alert("超过最大页数");
                return;
            } else {
                searchContractByAddress(startIndex, page);
            }
        }
    }else {
        if(page == undefined ||
            page == null ||
            page == "undefined" ||
            page == "null" ||
            page == ""){
            location.href = "contractList.html?pageIndex=1&select=" + startIndex + "&coinaddress=" + address;
        }else {
            if(parseInt(total)<parseInt(page)){
                alert("number is big than the max page!");
                return;
            }else {
                location.href = "contractList.html?pageIndex=" + page + "&select=" + startIndex + "&coinaddress=" + address;
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
        var address = GetQueryString("coinaddress");
        let searchType = document.getElementById("searchType").value;
        if(curr_page > 1 && searchType != "") {
            searchContractByAddress(startIndex,1);
        }else{
            location.href = "contractList.html?pageIndex=1&select=" + startIndex + "&coinaddress=" + address;
        }
    });

    //最后一页
    $('#last_page').click(function() {
        var curr_page = parseInt($('#curr_page').html());
        var totalPage = $('#totalPage').html();
        let startIndex = document.getElementById("select").value;
        var address = GetQueryString("coinaddress");
        let searchType = document.getElementById("searchType").value;
        if(curr_page < totalPage && searchType != "") {
            searchContractByAddress(startIndex,totalPage);
        }else{
            location.href = "contractList.html?pageIndex=" + totalPage + "&select=" + startIndex + "&coinaddress=" + address;
        }
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
        let searchType = document.getElementById("searchType").value;
        if(curr_page > 1 && searchType != "") {
            searchContractByAddress(startIndex,pageIndex);
        }else{
            location.href = "contractList.html?pageIndex=" + pageIndex + "&select=" + startIndex + "&coinaddress=" + address;
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
        var address = GetQueryString("coinaddress");
        let searchType = document.getElementById("searchType").value;
        if(curr_page < totalPage  && searchType != "") {
            searchContractByAddress(startIndex,pageIndex);
        }else{
            location.href = "contractList.html?pageIndex=" + pageIndex + "&select=" + startIndex + "&coinaddress=" + address;
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


function searchContractByAddress(page1,pageIndex) {
    let startIndex = document.getElementById("select").value;
    let searchType = document.getElementById("searchType").value;
    let searchAddress = searchType.trim();
    let fromAddress = GetQueryString("coinaddress");
    if(page1 == undefined ||
        page1 == null ||
        page1 == "undefined" ||
        page1 == "null" ||
        page1 == ""){
        pageIndex = 1 ;
        page1=startIndex;
    }
    if(pageIndex > 0){
        pageIndex = pageIndex - 1;
    }
    //数据请求部分
    $.get("/v2-web/search_store_rule", {
            per_page: 10,
            page: 0,
            search:fromAddress
        },
        function(result) {
            let coinHash160 = "";
            for(let  i = 0;i<result.data.content.length;i++){
                result.data.content[i].created_at = getTime(result.data.content[i].created_at);
                result.data.content[i].from_address = "WX"+ result.data.content[i].from_address;
                result.data.content[i].draw_rate = result.data.content[i].draw_rate * 100 + "%";
                result.data.content[i].hash_address = "WR"+ result.data.content[i].hash_address;
                if(result.data.content[i].dest_hash == "0000000000000000000000000000000000000000"){
                    result.data.content[i].dest_address = "任意地址";
                }else{
                    if(result.data.content[i].type == 2){
                        result.data.content[i].dest_address = "WR"+ result.data.content[i].dest_address;
                    }else{
                        result.data.content[i].dest_address = "WX"+ result.data.content[i].dest_address;
                    }
                }
                if(result.data.content[i].rule_name == null){
                    result.data.content[i].rule_name = "";
                }
                if(result.data.content[i].asset_hash160 == "0000000000000000000000000000000000000000"){
                    $('.codes').html("WDC");
                }
                coinHash160 = result.data.content[i].hash160;
            }
            setHtml(result.data.content, 'tpl2', 'block-content');
            $.get("/v2-web/get_transfer_in_list", {
                    coin_hash_160: coinHash160,
                    per_page:10000000,
                    page:0
                },
                function(result) {
                    if (result.code == "2000") {
                        let list_map = new Array();
                        let list_map_1 = new Array();
                        let j =0;
                        for (let i = 0; i < result.data.list.content.length; i++) {
                            result.data.list.content[i].from_address = "WX" + result.data.list.content[i].from_address;
                            result.data.list.content[i].number = j+ 1;
                            result.data.list.content[i].created_at = getTime(result.data.list.content[i].created_at);
                            if(result.data.list.content[i].from_address == searchAddress || result.data.list.content[i].to_address == searchAddress){
                                list_map.push(result.data.list.content[i]);
                                j++;
                            }else if(searchAddress == ""){
        list_map.push(result.data.list.content[i]);
        j++;
    }
}
            let total;
            if((pageIndex+1)*page1 > list_map.length){
                for (var k = pageIndex * page1; k < list_map.length; k++) {
                    list_map_1.push(list_map[k]);
                }
                total = Math.ceil(list_map.length/page1);
            }else {
                for(var k = pageIndex*page1; k < (pageIndex+1)*page1;k++){
                    list_map_1.push(list_map[k]);
                }
                total = Math.ceil(list_map.length/page1);
            }
            setHtml(list_map_1, 'tpl3', 'block-transferList');
            //$('#totalCount').html(list_map.length);
            $('#curr_page').html(pageIndex + 1);
            $('#totalPage').html(total);
        }
    });

});
}