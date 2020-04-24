/**
 * 根据事务hash获取区块信息
 * @param {Object} hash
 */
function getBalance(coinaddress) {
	//var hash = "undefined" ? "" : hash;
	if (coinaddress == "") {
		//alert();
		$("#con-box-yu").html("未查到该信息");
		return;
	}
	$("#accountAddress").html(coinaddress);
    $("#sosoApp").val(coinaddress);
	//数据请求部分
	$.post(HttpHead + "/userAccount/getAccount/", {
			coinAddress: coinaddress,
		},

		function(result) {
			if (result.code == "2000") {
				$("#lockAccount").html(result.data.account.lockAccount);
				//setHtml(result.data.account, 'tpl', 'con-box-yu');
			}

		});
}

function getTransferLogList(coinaddress, pageIndex = 1) {
	if (coinaddress == "") {
		//alert();
		$("#block-content").html("未查到该信息");
		return;
	}

	$("#accountAddress").html(coinaddress);
	//数据请求部分
	$.post(HttpHead + "/userTrade/getTradeList/", {
			coinAddress: coinaddress,
			pageSize: 10,
			pageIndex: pageIndex
		},

		function(result) {
			if (result.code == "2000") {
				for (var i = 0; i < result.data.length; i++) {
					 result.data[i].hash = result.data[i].coinHash;
					var blockHash = result.data[i].hash.substring(0, 5) + "***" + result.data[i].hash.substring(result.data[
						i].hash.length - 5, result.data[i].hash.length);
					result.data[i].coinHash = blockHash; 

				}
				setHtml(result.data, 'tpl2', 'block-content');
				//分页处理
				$('#totalCount').html(result.pageQuery.totalCount);
				$('#curr_page').html(result.pageQuery.pageIndex);
				$('#totalPage').html(result.pageQuery.totalPage);
				$("#tradeCount").html(result.pageQuery.totalCount);
				
			}

		});
}
//getBalance("1FyA6jTrC2MSKoLUS8BxZdqgZWkxFH7G1n");
//getTransferLogList("1FyA6jTrC2MSKoLUS8BxZdqgZWkxFH7G1n");
var GetQueryString_address = GetQueryString("coinaddress");
var pageIndex = GetQueryString("pageIndex");

if (GetQueryString_address != undefined &&
	GetQueryString_address != null &&
	GetQueryString_address != "undefined" &&
	GetQueryString_address != "null" &&
	GetQueryString_address != "" && pageIndex != undefined &&
	pageIndex != null &&
	pageIndex != "undefined" &&
	pageIndex != "null" &&
	pageIndex != "") {
	$("#soso").val(GetQueryString_address)
	getBalance(GetQueryString_address);
	getTransferLogList(GetQueryString_address,pageIndex);
}else{
	$("#soso").val(GetQueryString_address)
	getBalance(GetQueryString_address);
	getTransferLogList(GetQueryString_address);
}

$(function() {


    var coinaddress=$("#sosoApp").val();

	//首页
	$("#first_page").click(function() {
		//getTransferLogList(10, 1);
		location.href = "hatch.html?pageIndex=1&coinaddress="+coinaddress;
	});

	//最后一页
	$('#last_page').click(function() {
		var totalPage = $('#totalPage').html();
		location.href = "hatch.html?pageIndex=" + totalPage+"&coinaddress="+coinaddress;
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
		location.href = "hatch.html?pageIndex=" + pageIndex+"&coinaddress="+coinaddress;
	});
	//下一頁
	$("#next_page").click(function() {
		var curr_page = parseInt($('#curr_page').html());
		
		var totalPage = parseInt($('#totalPage').html());
		if (curr_page < totalPage) {
			pageIndex = curr_page; + 1;
		}else{
			pageIndex=curr_page;
		}
		location.href = "hatch.html?pageIndex=" + pageIndex+"&coinaddress="+coinaddress;
	});
})
