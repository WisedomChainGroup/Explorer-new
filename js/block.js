$(function() {
	getList();
});

function getList() {
	var startIndex2 = GetQueryString("select");
	if(startIndex2 == null){
		startIndex2 = 10;
	}
	$.ajax({
		url:"/WisdomCore/ExplorerInfo",
             headers:{"token":"NUMtD0dEXungVX7eLuXkEurH5BCJzw"},
              success:function(result){
			setHtml(result.data, 'tpl', 'block_data_browser1');
			let startIndex = document.getElementById("select").value;
			var page = GetQueryString("page");
			if (page != undefined &&
				page != null &&
				page != "undefined" &&
				page != "null" &&
				page != "") {

				if (page < 1) {
					page = 0;
				}
				Blocklist(page-1, startIndex2);
			} else {
				Blocklist(0,startIndex);
			}
		},
			 error:function(result){console.log("error");}
	}
	);
}


function Blocklist(page,startIndex)
{
	$.get("v2-web/get_block_list", {
			page:page,
			per_page: startIndex
		},
		function(result) {
			for(let i = 0 ;i<result.data.content.length;i++){
				result.data.content[i].time = formatDate(result.data.content[i].time);
				result.data.content[i].number = result.data.content[i].transaction_size;
			}
			$('#curr_page').html(page+1);
			$('#totalPage').html(result.data.totalPages);
			setHtml(result.data.content, 'tpl3', 'block-details');

			//首页
			$("#first_page").click(function() {
				//getTransferLogList(10, 1);
				var curr_page = parseInt($('#curr_page').html());
				let startIndex = document.getElementById("select").value;
				if(curr_page > 1) {
					location.href = "block.html?page=1&select=" + startIndex;
				}
			});

			//最后一页
			$('#last_page').click(function() {
				var curr_page = parseInt($('#curr_page').html());
				var totalPage = $('#totalPage').html();
				let startIndex = document.getElementById("select").value;
				if(curr_page < totalPage) {
					location.href = "block.html?page=" + totalPage + "&select=" + startIndex;
				}
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
				if(curr_page > 1) {
					location.href = "block.html?page=" + page + "&select=" + startIndex;
				}
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
				if(curr_page < totalPage){
					location.href = "block.html?page=" + page + "&select=" + startIndex;
				}
			});
		});
}

function changePageSize(page)
{
	if(page == undefined ||
		page == null ||
		page == "undefined" ||
		page == "null" ||
		page == ""){
		getList1(0);
	}
	getList1(page-1);
}

function getList1(page) {
	let startIndex = document.getElementById("select").value;
	Blocklist(page, startIndex);
}

$(document).ready(function(){
	var test = GetQueryString("select");
	if (test == null){
		$("#select").val("10");
	}else {
		$("#select").val(test);
	}
});

function soso_block() {
	let sosoval = document.getElementById("soso_block").value;
	if (sosoval == "") {
		alert("Please enter the search content!");
		return;
	}
	location.href = "blockList.html?height="+ sosoval;
}

function jumpSize(){
	let page = document.getElementById("page").value;
	if(isNaN(page)|| !(/(^[1-9]\d*$)/.test(page))){
		alert("Please enter the correct number!");
	}
	changePageSize(page);
}

function jumpSize(){
	let page = document.getElementById("page").value;
	let total = parseInt($('#totalPage').html());
	if(page>total){
		alert("Please enter the correct number!")
	}else {
		if (isNaN(page) || !(/(^[1-9]\d*$)/.test(page))) {
			alert("Please enter the correct number!");
		}
		changePageSize(page);
	}
}

function formatDate(date) {
	var date = new Date(date * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
	var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
	var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
	var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
	var s = (date.getSeconds()< 10 ? '0'+date.getSeconds() : date.getSeconds());
	return Y+M+D+h+m+s;
}