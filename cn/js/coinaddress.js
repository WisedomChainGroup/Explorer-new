/**
 * 根据事务hash获取区块信息
 * @param {Object} hash
 */
function getBalance(coinaddress) {
	//var hash = "undefined" ? "" : hash;
	if (coinaddress == "") {
		//alert();
		$("#con-box-yu").html("No information was found！");
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

function getTransferLogList(coinaddress, pageIndex,startIndex2) {
	var pageIndex=pageIndex||1;
	if (coinaddress == "") {
		//alert();
		$("#block-content").html("No information was found！");
		return;
	}

	$("#accountAddress").html(coinaddress);
	//数据请求部分
	$.post(HttpHead + "/userTransferLog/getTransferLogList/", {
			coinAddress: coinaddress,
			pageSize: startIndex2,
			pageIndex: pageIndex
		},

		function(result) {
			if (result.code == "2000") {
				let number;
				if(pageIndex == null || pageIndex ==1){
					number = 1;
				}else{
					number = ((pageIndex-1)*startIndex2)+1;
				}
				for (var i = 0; i < result.data.length; i++) {
					result.data[i].hash = result.data[i].blockHash;
					var blockHash = result.data[i].blockHash.substring(0, 5) + "***" + result.data[i].blockHash.substring(result.data[
						i].blockHash.length - 5, result.data[
						i].blockHash.length);
					result.data[i].blockHash = blockHash;
					result.data[i].number = number+i;
				}
				setHtml(result.data, 'tpl2', 'block-content');
				//分页处理
				$('#totalCount').html(result.pageQuery.totalCount);
				$('#curr_page').html(result.pageQuery.pageIndex);
				$('#totalPage').html(result.pageQuery.totalPage);
			}

		});
}
//getBalance("1FyA6jTrC2MSKoLUS8BxZdqgZWkxFH7G1n");
//getTransferLogList("1FyA6jTrC2MSKoLUS8BxZdqgZWkxFH7G1n");
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
	$("#soso").val(GetQueryString_address);
	$("#sosowap").val(GetQueryString_address);
	getBalance(GetQueryString_address);
	getTransferLogList(GetQueryString_address,pageIndex,startIndex2);
}else{
	$("#soso").val(GetQueryString_address);
	//alert($("#soso").val());
	$("#sosowap").val(GetQueryString_address);

	//alert($("#sosowap").val());
	getBalance(GetQueryString_address);
	getTransferLogList(GetQueryString_address,1,startIndex2);
}

function changePageSize(page){
	let startIndex = document.getElementById("select").value;
	var GetQueryString_address = GetQueryString("coinaddress");
	if(page == undefined ||
		page == null ||
		page == "undefined" ||
		page == "null" ||
		page == "") {
		getTransferLogList1(GetQueryString_address, 1, startIndex);
	}else{
		getTransferLogList1(GetQueryString_address, page, startIndex);
	}
}

function getTransferLogList1(coinaddress, pageIndex,startIndex) {
	var pageIndex=pageIndex||1;
	if (coinaddress == "") {
		//alert();
		$("#block-content").html("No information was found！");
		return;
	}
	$("#accountAddress").html(coinaddress);
	//数据请求部分
	$.post(HttpHead + "/userTransferLog/getTransferLogList/", {
			coinAddress: coinaddress,
			pageSize: startIndex,
			pageIndex: pageIndex
		},

		function(result) {
			if (result.code == "2000") {
				let len = result.pageQuery.totalPage;
				if (pageIndex > len) {
					if(len == 0){
						return;
					}else {
						alert("请输入正确的数字!");
					}
				} else {
					let number;
					if (pageIndex == null || pageIndex == 1) {
						number = 1;
					} else {
						number = ((pageIndex - 1) * startIndex2) + 1;
					}
					for (var i = 0; i < result.data.length; i++) {
						result.data[i].hash = result.data[i].blockHash;
						var blockHash = result.data[i].blockHash.substring(0, 5) + "***" + result.data[i].blockHash.substring(result.data[
							i].blockHash.length - 5, result.data[
							i].blockHash.length);
						result.data[i].blockHash = blockHash;
						result.data[i].number = number + i;
					}
					setHtml(result.data, 'tpl2', 'block-content');
					//分页处理
					$('#totalCount').html(result.pageQuery.totalCount);
					$('#curr_page').html(result.pageQuery.pageIndex);
					$('#totalPage').html(result.pageQuery.totalPage);
				}
			}
		});
}

$(function() {
	var coinaddress=GetQueryString_address;//$("#soso").val();
	//首页
	$("#first_page").click(function() {;
		//getTransferLogList(10, 1);
		var curr_page = parseInt($('#curr_page').html());
		let startIndex = document.getElementById("select").value;
		if(curr_page > 1) {
			location.href = "particulars.html?pageIndex=1&coinaddress=" + coinaddress + "&select=" + startIndex;
		}
	});

	//最后一页
	$('#last_page').click(function() {
		var totalPage = $('#totalPage').html();
		var curr_page = parseInt($('#curr_page').html());
		let startIndex = document.getElementById("select").value;
		if(curr_page < totalPage) {
			location.href = "particulars.html?pageIndex=" + totalPage + "&coinaddress=" + coinaddress + "&select=" + startIndex;
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
			location.href = "particulars.html?pageIndex=" + pageIndex + "&coinaddress=" + coinaddress + "&select=" + startIndex;
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
		let startIndex = document.getElementById("select").value;
		if(curr_page < totalPage) {
			location.href = "particulars.html?pageIndex=" + pageIndex + "&coinaddress=" + coinaddress + "&select=" + startIndex;
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
	if(isNaN(page)){
		alert("Please enter the correct number!");
	}
	changePageSize(page);
}