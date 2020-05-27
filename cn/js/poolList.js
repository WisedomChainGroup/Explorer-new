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

	//数据请求部分
	$.post(HttpHead + "/userAccount/getAccount/", {
			coinAddress: coinaddress,
		},

		function(result) {
			if (result.code == "2000") {
				setHtml(result.data.account, 'tpl', 'con-box-yu');
			}

		});
}

function getTransferLogList(coinaddress, pageIndex) {
	var pageIndex=pageIndex||1;
	if (coinaddress == "") {
		//alert();
		$("#block-content").html("未查到该信息");
		return;
	}

	$("#accountAddress").html(coinaddress);
	//数据请求部分
	$.post(HttpHead + "/userTransferLog/getPoolAddressInfo/", {
			coinAddress: coinaddress,
			pageSize: 10,
			pageIndex: pageIndex
		},

		function(result) {

			//console.log(result.pageQuery);

			if (result.code == "2000"&&result.data.length>0) {
				for (var i = 0; i < result.data.length; i++) {
					result.data[i].hash = result.data[i].tranhash;
					var blockHash = result.data[i].tranhaxh.substring(0, 5) + "***" + result.data[i].tranhaxh.substring(result.data[
						i].tranhash.length - 5, result.data[
						i].tranhash.length);
					result.data[i].tranhash = blockHash;
                   var amount=result.data[i].amount/100000000;
				   result.data[i].amount=amount;
				}
				setHtml(result.data, 'tpl2', 'block-content');
				//分页处理
				/*$('#totalCount').html(result.pageQuery.totalCount);
				$('#curr_page').html(result.pageQuery.pageIndex);
				$('#totalPage').html(result.pageQuery.totalPage);*/
			}else{
				$("#content-no").html("暂无数据...");
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
	$("#sosoPool").val(GetQueryString_address);
	$("#sosoPoolwap").val(GetQueryString_address);
	getBalance(GetQueryString_address);
	getTransferLogList(GetQueryString_address,pageIndex);
}else{
	$("#sosoPool").val(GetQueryString_address);
	//alert($("#soso").val());
	$("#sosoPoolwap").val(GetQueryString_address);
	
	//alert($("#sosowap").val());
	getBalance(GetQueryString_address);
	getTransferLogList(GetQueryString_address);
}

$(function() {


    var coinaddress=$("#soso").val();

	//首页
	$("#first_page").click(function() {
		//getTransferLogList(10, 1);
		var curr_page = parseInt($('#curr_page').html());
		if(curr_page > 1) {
			location.href = "particulars.html?pageIndex=1&coinaddress=" + coinaddress;
		}
	});

	//最后一页
	$('#last_page').click(function() {
		var totalPage = $('#totalPage').html();
		var curr_page = parseInt($('#curr_page').html());
		if(curr_page < totalPage) {
			location.href = "particulars.html?pageIndex=" + totalPage + "&coinaddress=" + coinaddress;
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
		if(curr_page > 1) {
			location.href = "particulars.html?pageIndex=" + pageIndex + "&coinaddress=" + coinaddress;
		}
	});
	//下一頁
	$("#next_page").click(function() {
		var curr_page = parseInt($('#curr_page').html());
		
		var totalPage = parseInt($('#totalPage').html());
		if (curr_page < totalPage) {
			pageIndex = curr_page+ 1;
		}else{
			pageIndex=curr_page;
		}
		if(curr_page < totalPage) {
			location.href = "particulars.html?pageIndex=" + pageIndex + "&coinaddress=" + coinaddress;
		}
	});
})
