//var pageIndex = 1;
//var totalPage = 0;

function getTransferLogList(pageSize, pageIndex) {
	var pageSize=pageSize||10;
	var pageIndex=pageIndex||1;
	if (pageIndex == "") {
		pageIndex = 1;
	}
	var pageSize = GetQueryString("select");
	if(pageSize == null){
		pageSize = 10;
	}
	//数据请求部分
	$.post(HttpHead + "/userTransferLog/getTransferLogList/", {

			pageSize: pageSize,
			pageIndex: pageIndex
		},

		function(result) {
			let number;
			if(pageIndex == null || pageIndex ==1){
				number = 1;
			}else{
				number = ((pageIndex-1)*pageSize)+1;
			}
			if (result.code == "2000") {
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
				//totalPage=result.pageQuery.totalPage;
				//pageIndex=result.pageQuery.pageIndex;
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
	if (pageIndex == "") {
		pageIndex = 1;
	}
	//数据请求部分
	$.post(HttpHead + "/userTransferLog/getTransferLogList/", {
			pageSize: pageSize,
			pageIndex: pageIndex
		},

		function(result) {
			let number;
			if(pageIndex == null || pageIndex ==1){
				number = 1;
			}else{
				number = ((pageIndex-1)*pageSize)+1;
			}
			if (result.code == "2000") {
				let len = result.pageQuery.totalPage;
				if(pageIndex > len){
					if(len == 0){
						return;
					}else {
						alert("Please enter the correct number!");
					}
				}else {
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
				//totalPage=result.pageQuery.totalPage;
				//pageIndex=result.pageQuery.pageIndex;
			}

		});
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
		alert("Please enter the search content!");
		return;
	}
	$.post(HttpHead + "/userTransferLog/verifyAddress/", {
			coinAddress: sosoval,
		},

		function(result) {
			if (result.data == "0") {
				location.href = "particulars.html?coinaddress=" + sosoval;
			} else {
				location.href = "account.html?hash=" + sosoval;
			}

		});
}

function jumpSize(){
	let page = document.getElementById("page").value;
	if(isNaN(page)){
		alert("Please enter the correct number!");
	}
	changePageSize(page);
}
