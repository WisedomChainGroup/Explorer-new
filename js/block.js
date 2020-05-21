$(function() {
	getList();
});

function getList() {
	var startIndex2 = GetQueryString("select");
	if(startIndex2 == null){
		startIndex2 = 10;
	}
	$.get(HttpHead+"/accountSort/explorerInfo",
		function(result) {
			setHtml(result.data, 'tpl', 'block_data_browser1');
			let total = result.data.lastConfirmedHeight / startIndex2;
			if(result.data.lastConfirmedHeight % startIndex2 != 0){
				total = total + 1;
			}
			$('#totalPage').html(parseInt(total));
		});
	let startIndex = document.getElementById("select").value;
	var page = GetQueryString("page");
	if (page != undefined &&
		page != null &&
		page != "undefined" &&
		page != "null" &&
		page != "") {

		if (page < 1) {
			page = 1;
		}
		Blocklist(page, startIndex2);
	} else {
		Blocklist(1,startIndex);
	}
}


function Blocklist(page,startIndex)
{
    var page=page||1;
	$.post(HttpBlockHead+"/block/list", {
			page:page,
			startIndex: startIndex
		},
		function(result) {
			var sortlist=result.data.sort(function(a,b){return b.nheight-a.nheight});
			$('#curr_page').html(page)
			setHtml(sortlist, 'tpl3', 'block-details');

			//首页
			$("#first_page").click(function() {
				//getTransferLogList(10, 1);
				let startIndex = document.getElementById("select").value;
				location.href = "block.html?page=0&select=" + startIndex;
			});

			//最后一页
			$('#last_page').click(function() {
				var totalPage = $('#totalPage').html();
				var curr_page  = totalPage;
				let startIndex = document.getElementById("select").value;
				location.href = "block.html?page=" + totalPage + "&select=" + startIndex;
				//getTransferLogList(10, totalPage);
			});

			//上一頁
			$("#pre_page").click(function() {
				var curr_page = parseInt($('#curr_page').html());
				var totalPage = parseInt($('#totalPage').html());
				if (curr_page > 0) {
					page = curr_page - 1;
				}else{
					page=curr_page;
				}
				let startIndex = document.getElementById("select").value;
				location.href = "block.html?page=" + page + "&select=" + startIndex;
			});
			//下一頁
			$("#next_page").click(function() {
				var curr_page = parseInt($('#curr_page').html());
				var totalPage = parseInt($('#totalPage').html());
				if (curr_page < totalPage) {
					page = curr_page + 1;
				}else{
					page=curr_page;
				}
				let startIndex = document.getElementById("select").value;
				location.href = "block.html?page=" + page + "&select=" + startIndex;
			});
		});
}

function changePageSize()
{
	getList1();
}
function getList1() {
	$.get(HttpHead+"/accountSort/explorerInfo",
		function(result) {
			let startIndex = document.getElementById("select").value;
			setHtml(result.data, 'tpl', 'block_data_browser1');
			let total = result.data.lastConfirmedHeight/startIndex
			if(result.data.lastConfirmedHeight % startIndex != 0){
				total = total + 1;
			}
			$('#totalPage').html(parseInt(total));
		});
		let startIndex = document.getElementById("select").value;
		Blocklist(1,startIndex);
}
$(document).ready(function(){
	var test = GetQueryString("select");
	if (test == null){
		$("#select").val("10");
	}else {
		$("#select").val(test);
	}
});

function test() {
	let soso = document.getElementById("soso1").value;
	location.href = "blockList.html?height="+ soso;
}