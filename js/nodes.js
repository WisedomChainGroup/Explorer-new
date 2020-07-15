$(function() {
	var pageIndex = GetQueryString("pageIndex");
	var select = GetQueryString("select");
	if(select == null){
		select = 50;
	}
	if(pageIndex == null || pageIndex=="undenfind"){
		pageIndex = 1;
	}
	getList(select,pageIndex);
});

function getList(select, pageIndex) {
	if(pageIndex > 0){
		pageIndex = pageIndex -1;
	}

	$.get("v2-web/get_user_mortgage_list", {
			per_page: select,
			page: pageIndex
		},
		function(result) {
		let len = result.data.totalPages;
			if(pageIndex+1 > len) {
				if(len == 0){
					return;
				}else {
					alert("超过最大页数!");
				}
			}else {
				var sum=0;
				for(var i=0;i<result.data.content.length;i++)
				{
					sum+=result.data.content[i].vote_amount;
				}
				var restr=fmoney(sum, 1).replace('.0','');
				$('#totalCount').html(restr);
				setHtml(result.data.content, 'tpl3', 'block_data_node');
				//分页处理
				$('#curr_page').html(pageIndex+1);
				$('#totalPage').html(result.data.totalPages);
			}
		});
	function fmoney(s, n) {
		n = n > 0 && n <= 20 ? n : 2;
		s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
		var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
		t = "";
		for (i = 0; i < l.length; i++) {
			t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
		}
		return t.split("").reverse().join("") + "." + r;
	}
}

function changePageSize(page){
	let pageSize = document.getElementById("select").value;
	let total = $('#totalPage').html();
	if(page == undefined ||
		page == null ||
		page == "undefined" ||
		page == "null" ||
		page == ""){
		location.href = "nodes.html?pageIndex=1&select=" + pageSize;
	}else {
		if(parseInt(total)<parseInt(page)){
			alert("number is big than the max page!");
			return;
		}else {
			location.href = "nodes.html?pageIndex=" + page + "&select=" + pageSize;
		}
	}
}

$(function() {

	//首页
	$("#first_page").click(function() {
		//getVoteLogList(10, 1);
		var curr_page = parseInt($('#curr_page').html());
		let startIndex = document.getElementById("select").value;
		if(curr_page > 1) {
			location.href = "nodes.html?pageIndex=1&select=" + startIndex;
		}
	});

	//最后一页
	$('#last_page').click(function() {
		var totalPage = $('#totalPage').html();
		var curr_page = parseInt($('#curr_page').html());
		let startIndex = document.getElementById("select").value;
		if(curr_page < totalPage) {
			location.href = "nodes.html?pageIndex=" + totalPage + "&select=" + startIndex;
		}
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
		if(curr_page > 1) {
			location.href = "nodes.html?pageIndex=" + pageIndex + "&select=" + startIndex;
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
			location.href = "nodes.html?pageIndex=" + pageIndex + "&select=" + startIndex;
		}
	});
})

$(document).ready(function(){
	var test = GetQueryString("select");
	if (test == null){
		$("#select").val("50");
	}else {
		$("#select").val(test);
	}
});

function soso_nodes() {
	let sosoval = document.getElementById("soso_node").value;
	if (sosoval == "") {
		alert("Please enter the search content!");
		return;
	}
	if(sosoval.substring(0,2) != "WX"){
		alert("Please enter the correct address!");
		return;
	}else {
		location.href = "nodesList.html?coinaddress=" + sosoval;
	}
}

function jumpSize(){
	let page = document.getElementById("page").value;
	if(isNaN(page)|| !(/(^[1-9]\d*$)/.test(page))){
		alert("Please enter the correct number!");
	}
	changePageSize(page);
}
