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
    getRuleLogList(0,startIndex2);
} else {
    getRuleLogList(pageIndex, startIndex2);
}


function getRuleLogList(pageIndex,pageSize) {
    if(pageIndex>0){
        pageIndex = pageIndex -1;
    }
    //数据请求部分
    $.get("/v2-web/search_store_rule", {
            page: pageIndex,
            per_page: pageSize
        },

        function(result) {
            if (result.code == "2000") {
                for (let i = 0; i < result.data.content.length; i++) {
                    result.data.content[i].number = ((pageIndex)*pageSize)+i+1;
                    result.data.content[i].created_at = getTime(result.data.content[i].created_at);
                    result.data.content[i].from_address = "WX" + result.data.content[i].from_address;
                    result.data.content[i].hash_address = "WR" + result.data.content[i].hash_address;
                    if(result.data.content[i].rule_name == null){
                        result.data.content[i].rule_name = "";
                    }
                }
                setHtml(result.data.content, 'tpl2', 'block-content');
                //分页处理
                $('#totalCount').html(result.data.totalElements);
                $('#curr_page').html(pageIndex+1);
                $('#totalPage').html(result.data.totalPages);
            }
        });
}

function changePageSize(page){
    let startIndex = document.getElementById("select").value;
    let total = $('#totalPage').html();
    if(page == undefined ||
        page == null ||
        page == "undefined" ||
        page == "null" ||
        page == ""){
        location.href = "contract.html?pageIndex=1&select=" + startIndex;
    }else {
        if(parseInt(total)<parseInt(page)){
            alert("number is big than the max page!");
            return;
        }else {
            location.href = "contract.html?pageIndex=" + page + "&select=" + startIndex;
        }
    }
}

$(function() {
    //首页
    $("#first_page").click(function() {
        //getTransferLogList(10, 1);
        var curr_page = parseInt($('#curr_page').html());
        let startIndex = document.getElementById("select").value;
        if(curr_page > 1) {
            location.href = "contract.html?pageIndex=1&select=" + startIndex;
        }
    });

    //最后一页
    $('#last_page').click(function() {
        var curr_page = parseInt($('#curr_page').html());
        var totalPage = $('#totalPage').html();
        if(curr_page < totalPage) {
            let startIndex = document.getElementById("select").value;
            location.href = "contract.html?pageIndex=" + totalPage + "&select=" + startIndex;
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
        if(curr_page > 1){
            let startIndex = document.getElementById("select").value;
            location.href = "contract.html?pageIndex=" + pageIndex+"&select=" + startIndex;
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
        if(curr_page < totalPage){
            let startIndex = document.getElementById("select").value;
            location.href = "contract.html?pageIndex=" + pageIndex+"&select=" + startIndex;
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

function soso_address() {
    let sosoval = document.getElementById("soso_address").value;
    if (sosoval == "") {
        alert("Please enter address!");
        return;
    }
    if(sosoval.substring(0,2) == "WR"){
        location.href = "contractList.html?coinaddress="+ sosoval;
    }else{
        alert("Please enter the correct address！");
        return;
    }
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