//var pageIndex = 1;
//var totalPage = 0;


// function getTransferLogList() {
//
//
// 	//数据请求部分
// 	$.post(HttpHead + "/coin/getCoinList/",

function getTransferLogList(pageSize = 10, pageIndex = 1) {


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

				console.log(result.data);
				setHtml(result.data, 'tpl2', 'block-content');
				//分页处理
				$('#totalCount').html(result.pageQuery.totalCount);
				$('#curr_page').html(result.pageQuery.pageIndex);
				$('#totalPage').html(result.pageQuery.totalPage);

			}

		});
}


// $(function(){
// 	getTransferLogList();
//
// })
	

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

$(function() {
	//首页
	$("#first_page").click(function() {
		//getTransferLogList(10, 1);
		location.href = "assets.html?pageIndex=1";
	});

	//最后一页
	$('#last_page').click(function() {
		var totalPage = $('#totalPage').html();
		location.href = "assets.html?pageIndex=" + totalPage;
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
		location.href = "assets.html?pageIndex=" + pageIndex;
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
		location.href = "assets.html?pageIndex=" + pageIndex;
	});
})




