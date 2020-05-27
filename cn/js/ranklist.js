//var pageIndex = 1;
//var totalPage = 0;

function getTransferLogList(pageSize, pageIndex) {
	var pageSize=pageSize||20;
	var pageIndex=pageIndex||1;
	if (pageIndex == "") {
		pageIndex = 1;
	}
	//数据请求部分
	$.post(HttpHead + "/accountSort/accountSort/", {

			pageSize: pageSize,
			pageIndex: pageIndex
		},

		function(result) {
			if (result.code == "2000") {
				for (var i = 0; i < result.data.length; i++) {
					result.data[i].balance = result.data[i].balance / 100000000;
					result.data[i].proportion = (Math.floor(result.data[i].proportion * 100 * 1000)) / 1000;
					result.data[i].index = result.data[i].index+1;
				}
				console.log(result.data);
				setHtml(result.data, 'tpl2', 'block-content');
				//分页处理
				$('#totalCount').html(result.pageQuery.totalCount);
				$('#curr_page').html(result.pageQuery.pageIndex);
				$('#totalPage').html(result.pageQuery.totalPage);
				//totalPage=result.pageQuery.totalPage;
				//pageIndex=result.pageQuery.pageIndex;
			}

		});
}

function getTotalInfo() {


	//数据请求部分
	$.post(HttpHead + "/accountSort/getTotalInfo/",

		function(result) {
			if (result.code == "2000") {
				$("#tradeTotal").html(result.data.tradeTotal);
				$("#accountSum").html(result.data.accountSum);
				$("#accountNub").html(result.data.accountNub);
				$("#staticTotal").html("590000000");
			}

		});
}

function transaction() {


	//数据请求部分
	$.post(HttpHead + "/dict/transaction_fee/",

		function(result) {
			if (result.code == "2000") {


				// $("#tradeTotal").html(result.data.tradeTotal);
				var accountSum = 5.02 * 100000000 + Number(result.data);

				accountSum=Math.floor(accountSum*1000)/1000;

				$("#accountSum").html(accountSum);
				var tradeTotal = Math.floor((88000000 - Number(result.data)) * 1000) / 1000;
				$("#tradeTotal").html(tradeTotal);
				// $("#staticTotal").html("590000000");
			}

		});
}

function getTransferTotal(pageSize, pageIndex) {
	var pageSize=pageSize||10;
	var pageIndex=pageIndex||1;
	if (pageIndex == "") {
		pageIndex = 1;
	}
	//数据请求部分
	$.post(HttpHead + "/userTransferLog/getTransferLogList/", {

			pageSize: pageSize,
			pageIndex: pageIndex
		},

		function(result) {

			if (result.code == "2000") {


				//分页处理
				$('#accountNub').html(result.pageQuery.totalCount);
				$("#staticTotal").html("590000000");
				//totalPage=result.pageQuery.totalPage;
				//pageIndex=result.pageQuery.pageIndex;
			}

		});
}
transaction();
getTransferTotal();
//getTotalInfo();
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
		pageIndex = 1;
	}
	getTransferLogList(startIndex2, pageIndex);
} else {
	getTransferLogList(startIndex2, 1);
}

function changePageSize(page){
	let startIndex = document.getElementById("select").value;
	if(page == undefined ||
		page == null ||
		page == "undefined" ||
		page == "null" ||
		page == ""){
		getTransferLogList1(startIndex,1);
	}else {
		getTransferLogList1(startIndex, page);
	}
}

function getTransferLogList1(pageSize, pageIndex) {
	var pageSize=pageSize||20;
	var pageIndex=pageIndex||1;
	if (pageIndex == "") {
		pageIndex = 1;
	}
	//数据请求部分
	$.post(HttpHead + "/accountSort/accountSort/", {

			pageSize: pageSize,
			pageIndex: pageIndex
		},

		function(result) {
			if (result.code == "2000") {
				let len = result.pageQuery.totalPage+1;
				if(pageIndex > len) {
					alert("Please enter the correct number!");
				}else {
					for (var i = 0; i < result.data.length; i++) {
						result.data[i].balance = result.data[i].balance / 100000000;
						result.data[i].proportion = (Math.floor(result.data[i].proportion * 100 * 1000)) / 1000;
						result.data[i].index = result.data[i].index + 1;
					}
					console.log(result.data);
					setHtml(result.data, 'tpl2', 'block-content');
					//分页处理
					$('#totalCount').html(result.pageQuery.totalCount);
					$('#curr_page').html(result.pageQuery.pageIndex);
					$('#totalPage').html(result.pageQuery.totalPage);
					//totalPage=result.pageQuery.totalPage;
					//pageIndex=result.pageQuery.pageIndex;
				}
			}

		});
}

$(function() {


	//首页
	$("#first_page").click(function() {
		//getTransferLogList(10, 1);
		let startIndex = document.getElementById("select").value;
		location.href = "rankList.html?pageIndex=1&select=" + startIndex;
	});

	//最后一页
	$('#last_page').click(function() {
		var totalPage = $('#totalPage').html();
		let startIndex = document.getElementById("select").value;
		location.href = "rankList.html?pageIndex=" + totalPage+"&select=" + startIndex;
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
		location.href = "rankList.html?pageIndex=" + pageIndex+"&select=" + startIndex;
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
		location.href = "rankList.html?pageIndex=" + pageIndex+"&select=" + startIndex;
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
		alert("Please enter the search content!");
		return;
	}
	location.href = "particulars.html?coinaddress="+ sosoval;
}

function jumpSize(){
	let page = document.getElementById("page").value;
	if(isNaN(page)){
		alert("Please enter the correct number!");
	}
	changePageSize(page);
}