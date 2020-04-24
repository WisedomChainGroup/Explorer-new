//var pageIndex = 1;
//var totalPage = 0;

function getTransferLogList(pageSize = 20, pageIndex = 1) {

	if (pageIndex == "") {
		pageIndex = 1;
	}
	//数据请求部分
	$.post(HttpHead + "/accountSort/accountSort/", {

			pageSize: pageSize,
			pageIndex: pageIndex
		},

		function(result) {





			// if (result.code == "2000") {
			// 	for (var i = 0; i < result.data.length; i++) {
			// 		result.data[i].bili = result.data[i].balance / 590000000 * 100;
			// 		result.data[i].bili = Math.floor(result.data[i].bili * 1000) / 1000;


			if (result.code == "2000") {
				for (var i = 0; i < result.data.length; i++) {
					 result.data[i].balance = result.data[i].balance / 100000000;
					 result.data[i].proportion = (Math.floor(result.data[i].proportion * 100 * 1000)) / 1000;

				}
				//console.log(result.data);
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

function getTransferTotal(pageSize = 10, pageIndex = 1) {

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

if (pageIndex != undefined &&
	pageIndex != null &&
	pageIndex != "undefined" &&
	pageIndex != "null" &&
	pageIndex != "") {

	if (pageIndex < 1) {
		pageIndex = 1;
	}

	getTransferLogList(20, pageIndex);

} else {

	getTransferLogList(20, 1);
}


$(function() {


	//首页
	$("#first_page").click(function() {
		//getTransferLogList(10, 1);
		location.href = "rankList.html?pageIndex=1";
	});

	//最后一页
	$('#last_page').click(function() {
		var totalPage = $('#totalPage').html();
		location.href = "rankList.html?pageIndex=" + totalPage;
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
		location.href = "rankList.html?pageIndex=" + pageIndex;
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
		location.href = "rankList.html?pageIndex=" + pageIndex;
	});
})
