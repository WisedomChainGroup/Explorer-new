
function getTransferLogList(pageSize, pageIndex) {
	if (pageIndex == "") {
		pageIndex = 0;
	}
	if(pageIndex>0){
		pageIndex = pageIndex -1;
	}
	//数据请求部分
	$.get("/internal/accountStates", {
			size: pageSize,
			page: pageIndex
		},

		function(result) {
			for (var i = 0; i < result.records.length; i++) {
				result.records[i].balance = result.records[i].balance / 100000000;
				console.log(toNonExponential(result.records[i].proportion));
				result.records[i].proportion = (Math.floor(result.records[i].proportion * 100 * 1000)) / 1000;
				result.records[i].index = result.records[i].index + 1;
			}
			setHtml(result.records, 'tpl2', 'block-content');
			let totalPage = Math.ceil(result.total / pageSize);
			$('#totalCount').html(result.total);
			$('#curr_page').html(result.page + 1);
			$('#totalPage').html(totalPage);
		});
}

//将科学计数法转换为小数
function toNonExponential(num) {
	var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
	return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
}

function getTransferTotal() {
	//数据请求部分
	$.get("/v2-web/get_latest_transfer_size", {
		},
		function(result) {
			if (result.code == "2000") {
				//分页处理
				$('#accountNub').html(result.data);
				$("#staticTotal").html("590000000");
			}

		});
}
getTransferTotal();
var pageIndex = GetQueryString("pageIndex");
var startIndex2 = GetQueryString("select");
if(startIndex2 == null || startIndex2 == undefined){
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
		location.href = "rankList.html?pageIndex=1&select=" + startIndex;
	}else {
		if(parseInt(total)<parseInt(page)){
			alert("超过最大页数");
			return;
		}else {
			location.href = "rankList.html?pageIndex=" + page + "&select=" + startIndex;
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
			location.href = "rankList.html?pageIndex=1&select=" + startIndex;
		}
	});

	//最后一页
	$('#last_page').click(function() {
		var totalPage = $('#totalPage').html();
		var curr_page = parseInt($('#curr_page').html());
		let startIndex = document.getElementById("select").value;
		if(curr_page < totalPage) {
			location.href = "rankList.html?pageIndex=" + totalPage + "&select=" + startIndex;
		}
		//getTransferLogList(10, totalPage);
	});
	//上一頁
	$("#pre_page").click(function() {
		var curr_page = parseInt($('#curr_page').html());
		var totalPage = parseInt($('#totalPage').html());
		if (curr_page > 1) {
			pageIndex = curr_page - 1;
		} else {
			pageIndex = curr_page;
		}
		let startIndex = document.getElementById("select").value;
		if(curr_page > 1) {
			location.href = "rankList.html?pageIndex=" + pageIndex + "&select=" + startIndex;
		}
	});
	//下一頁
	$("#next_page").click(function() {
		var curr_page = parseInt($('#curr_page').html());
		var totalPage = parseInt($('#totalPage').html());
		if (curr_page < totalPage) {
			pageIndex = curr_page + 1;
		} else {
			pageIndex = curr_page;
		}
		let startIndex = document.getElementById("select").value;
		if(curr_page < totalPage) {
			location.href = "rankList.html?pageIndex=" + pageIndex + "&select=" + startIndex;
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

function soso_account() {
	let sosoval = document.getElementById("soso_account").value;
	if (sosoval == "") {
		alert("请输入搜索内容!");
		return;
	}
	if(sosoval.substring(0,2) != "WX"){
		alert("请输入正确的地址!");
		return;
	}else {
		location.href = "particulars.html?coinaddress=" + sosoval;
	}
}

function jumpSize(){
	let page = document.getElementById("page").value;
	if(isNaN(page)|| !(/(^[1-9]\d*$)/.test(page))){
		alert("请输入正确的数字!");
	}
	changePageSize(page);
}