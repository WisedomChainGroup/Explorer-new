function getTransferLogList(pageSize, pageIndex) {
	if (pageIndex == "") {
		pageIndex = 0;
	}
	if(pageSize == null){
		pageSize = 10;
	}
	if(pageIndex > 0) {
		pageIndex= pageIndex -1;
	}
	//数据请求部分
	$.get("/v2-web/get_all_transfer_list", {

			per_page: pageSize,
			page: pageIndex
		},

		function(result) {
			if (result.code == "2000") {
				for (var i = 0; i < result.data.content.length; i++) {
					result.data.content[i].hash = result.data.content[i].hash;
					var hash = result.data.content[i].hash.substring(0, 5) + "***" + result.data.content[i].hash.substring(result.data.content[
						i].hash.length - 5, result.data.content[
						i].hash.length);
					result.data.content[i].txn_hash = hash;
					result.data.content[i].created_at = getTime(result.data.content[i].created_at);
					result.data.content[i].number = ((pageIndex) * pageSize) + i + 1;
					result.data.content[i].amount = toNonExponential(result.data.content[i].amount);
				}
				setHtml(result.data.content, 'tpl2', 'block-content');
				//分页处理
				$('#totalCount').html(result.data.totalElements);
				$('#curr_page').html(pageIndex + 1);
				$('#totalPage').html(result.data.totalPages);
			}
		});
}

var pageIndex = GetQueryString("pageIndex");
var startIndex2 = GetQueryString("select");
if(startIndex2 == null){
	startIndex2 = 10;
}

if (pageIndex != undefined &&
	pageIndex != null &&
	pageIndex != "undefined" &&
	pageIndex != "null" &&
	pageIndex != "") {

	if (pageIndex < 1) {
		pageIndex = 0;
	}

	getTransferLogList(startIndex2, pageIndex);

} else {

	getTransferLogList(startIndex2, 0);
}

function changePageSize(page){
	let startIndex = document.getElementById("select").value;
	let total = $('#totalPage').html();
	if(page == undefined ||
		page == null ||
		page == "undefined" ||
		page == "null" ||
		page == ""){
		location.href = "deal.html?pageIndex=1&select=" + startIndex;
	}else {
		if(parseInt(total)<parseInt(page)){
			alert("超过最大页数");
			return;
		}else {
			location.href = "deal.html?pageIndex=" + page + "&select=" + startIndex;
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
			location.href = "deal.html?pageIndex=1&select=" + startIndex;
		}
	});

	//最后一页
	$('#last_page').click(function() {
		var totalPage = $('#totalPage').html();
		var curr_page = parseInt($('#curr_page').html());
		let startIndex = document.getElementById("select").value;
		if(curr_page < totalPage) {
			location.href = "deal.html?pageIndex=" + totalPage + "&select=" + startIndex;
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
		if(curr_page > 1) {
			location.href = "deal.html?pageIndex=" + pageIndex + "&select=" + startIndex;
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
		if(curr_page < totalPage) {
			location.href = "deal.html?pageIndex=" + pageIndex + "&select=" + startIndex;
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

function soso_tran() {
	var sosoval;
	sosoval = $("#soso_tran").val();
	if (sosoval == "") {
		alert("请输入搜索内容!");
		return;
	}
	if (sosoval.substring(0,2) == "WX") {
		location.href = "particulars.html?coinaddress=" + sosoval;
	} else {
		location.href = "account.html?hash=" + sosoval;
	}
}

//将科学计数法转换为小数
function toNonExponential(num) {
	var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
	return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
}

function jumpSize(){
	let page = document.getElementById("page").value;
	if(isNaN(page)|| !(/(^[1-9]\d*$)/.test(page))){
		alert("请输入正确的数字!");
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
