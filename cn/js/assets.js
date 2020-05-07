//var pageIndex = 1;
//var totalPage = 0;

function getTransferLogList(pageSize = 10, pageIndex = 1) {

	var pageSize = GetQueryString("select");
	if(pageSize == null){
		pageSize = 10;
	}
	//数据请求部分
	$.post(HttpHead + "/coin/getCoinList/", {
			pageSize: pageSize,
			pageIndex: pageIndex
		},

		function(result) {

			if (result.code == "2000") {

				
				// console.log(result.data);
				// setHtml(result.data, 'tpl2', 'block-content');
				// //分页处理
				// $('#totalCount').html(result.data.length);
				//

				/*for(let i = 0;i<result.data.length;i++){
					if(result.data[i].coinAddress.substring(0,2) != "WX" ){
						result.data[i].coinAddress = "WX" + result.data[i].coinAddress;
					}
					if(result.data[i].coinAddress.substring(0,2) != "WX" ){
						result.data[i].coinAddress = "WX" + result.data[i].coinAddress;
					}
				}*/
				setHtml(result.data, 'tpl2', 'block-content');
				//分页处理
				$('#totalCount').html(result.pageQuery.totalCount);
				$('#curr_page').html(result.pageQuery.pageIndex);
				$('#totalPage').html(result.pageQuery.totalPage);

			}

		});
}

var pageIndex = GetQueryString("pageIndex");

if (pageIndex != undefined &&
	pageIndex != null &&
	pageIndex != "undefined" &&
	pageIndex != "null" &&
	pageIndex != "") {

	if (pageIndex < 1) {
		pageIndex = 1;
	}
	getTransferLogList(10, pageIndex);

} else {
	getTransferLogList(10, 1);
}

function changePageSize(){
	let startIndex = document.getElementById("select").value;
	getTransferLogList1(startIndex,1);
}

function getTransferLogList1(pageSize = 10, pageIndex = 1) {


	//数据请求部分
	$.post(HttpHead + "/coin/getCoinList/", {
			pageSize: pageSize,
			pageIndex: pageIndex
		},

		function(result) {

			if (result.code == "2000") {
				/*for(let i = 0;i<result.data.length;i++){
					if(result.data[i].coinAddress.substring(0,2) != "WX" ){
						result.data[i].coinAddress = "WX" + result.data[i].coinAddress;
					}
					if(result.data[i].coinAddress.substring(0,2) != "WX" ){
						result.data[i].coinAddress = "WX" + result.data[i].coinAddress;
					}
				}*/
				setHtml(result.data, 'tpl2', 'block-content');
				//分页处理
				$('#totalCount').html(result.pageQuery.totalCount);
				$('#curr_page').html(result.pageQuery.pageIndex);
				$('#totalPage').html(result.pageQuery.totalPage);

			}

		});
}

$(function() {
	//首页
	$("#first_page").click(function() {
		//getTransferLogList(10, 1);
		let startIndex = document.getElementById("select").value;
		location.href = "assets.html?pageIndex=1&select=" + startIndex;
	});

	//最后一页
	$('#last_page').click(function() {
		var totalPage = $('#totalPage').html();
		let startIndex = document.getElementById("select").value;
		location.href = "assets.html?pageIndex=" + totalPage+"&select=" + startIndex;
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
		location.href = "assets.html?pageIndex=" + pageIndex+"&select=" + startIndex;
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
		location.href = "assets.html?pageIndex=" + pageIndex+"&select=" + startIndex;
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

