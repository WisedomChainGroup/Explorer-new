/**
 * 根据事务hash获取区块信息
 * @param {Object} hash
 */
function getBalance(coinaddress) {
	//var hash = "undefined" ? "" : hash;
	if (coinaddress == "") {
		//alert("aaa");
		$("#con-box-yu").html("未查到该信息");
		return;
	}



	//数据请求部分
	$.post(HttpHead + "/userAccount/getAccount/", {
			coinAddress: coinaddress,
		},

		function(result) {

			//console.log(result.data.account);

			if (result.code == "2000") {
				setHtml(result.data.account, 'tpl', 'con-box-yu');

			}

		});
}


var GetQueryString_address = GetQueryString("coinaddress");
var pageIndex = GetQueryString("pageIndex");

var startIndex2 = GetQueryString("select");
if(startIndex2 == null){
	startIndex2 = 10;
}

if (GetQueryString_address != undefined &&
	GetQueryString_address != null &&
	GetQueryString_address != "undefined" &&
	GetQueryString_address != "null" &&
	GetQueryString_address != "" && pageIndex != undefined &&
	pageIndex != null &&
	pageIndex != "undefined" &&
	pageIndex != "null" &&
	pageIndex != "") {

	getBalance(GetQueryString_address);
	getVoteLogList(GetQueryString_address,pageIndex,startIndex2);


}else{
	getBalance(GetQueryString_address);
	getVoteLogList(GetQueryString_address,1,startIndex2);
}




function getVoteLogList(coinaddress, pageIndex,startIndex2) {
	if (coinaddress == "") {
		//alert();
		$("#block-content").html("未查到该信息");
		return;
	}


	//数据请求部分
	$.post(HttpHead + "/userVote/getAddrVote", {
			coinAddress: coinaddress,
			pageSize: startIndex2,
			pageIndex: pageIndex
		},

		function(result) {

			//alert(result.coinHash);

			if (result.code == "2000"&&result.data.length>0) {
				for (var i = 0; i < result.data.length; i++) {
					// result.data[i].hash = result.data[i].coinHash;
					// var blockHash = result.data[i].coinHash.substring(0, 5) + "***" + result.data[i].coinHash.substring(result.data[
					// 	i].coinHash.length - 5, result.data[
					// 	i].coinHash.length);
					// result.data[i].coinHash = blockHash;
					var amount=result.data[i].amount;
					result.data[i].amount=amount;
				}
				setHtml(result.data, 'tpl2', 'block-content');
				//分页处理
				$('#totalCount').html(result.pageQuery.totalCount);
				$('#curr_page').html(result.pageQuery.pageIndex);
				$('#totalPage').html(result.pageQuery.totalPage);

			}else{
				$("#content-no").html("暂无数据...");
			}

		});
}

function changePageSize(){
	let startIndex = document.getElementById("select").value;
	var GetQueryString_address = GetQueryString("coinaddress");
	getVoteLogList1(GetQueryString_address,1,startIndex);
}

function getVoteLogList1(coinaddress, pageIndex,startIndex) {
	if (coinaddress == "") {
		//alert();
		$("#block-content").html("未查到该信息");
		return;
	}


	//数据请求部分
	$.post(HttpHead + "/userVote/getAddrVote", {
			coinAddress: coinaddress,
			pageSize: startIndex,
			pageIndex: pageIndex
		},

		function(result) {

			//alert(result.coinHash);

			if (result.code == "2000"&&result.data.length>0) {
				for (var i = 0; i < result.data.length; i++) {
					// result.data[i].hash = result.data[i].coinHash;
					// var blockHash = result.data[i].coinHash.substring(0, 5) + "***" + result.data[i].coinHash.substring(result.data[
					// 	i].coinHash.length - 5, result.data[
					// 	i].coinHash.length);
					// result.data[i].coinHash = blockHash;
					var amount=result.data[i].amount;
					result.data[i].amount=amount;
				}
				setHtml(result.data, 'tpl2', 'block-content');
				//分页处理
				$('#totalCount').html(result.pageQuery.totalCount);
				$('#curr_page').html(result.pageQuery.pageIndex);
				$('#totalPage').html(result.pageQuery.totalPage);

			}else{
				$("#content-no").html("暂无数据...");
			}

		});
}


$(function() {


	var coinaddress=GetQueryString_address;

	$("#accountAddress").html(coinaddress);
	//首页
	$("#first_page").click(function() {
		//getVoteLogList(10, 1);
		let startIndex = document.getElementById("select").value;
		location.href = "nodesList.html?pageIndex=1&coinaddress="+coinaddress+"&select=" + startIndex;
	});

	//最后一页
	$('#last_page').click(function() {
		var totalPage = $('#totalPage').html();
		let startIndex = document.getElementById("select").value;
		location.href = "nodesList.html?pageIndex=" + totalPage+"&coinaddress="+coinaddress+"&select=" + startIndex;
		//getVoteLogList(10, totalPage);
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
		location.href = "nodesList.html?pageIndex=" + pageIndex+"&coinaddress="+coinaddress+"&select=" + startIndex;
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
		let startIndex = document.getElementById("select").value;
		location.href = "nodesList.html?pageIndex=" + pageIndex+"&coinaddress="+coinaddress+"&select=" + startIndex;
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





