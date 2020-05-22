$(function() {
	var pageIndex = GetQueryString("pageIndex");
	var select = GetQueryString("select");
	if(select == null){
		select = 50;
	}
	if(pageIndex == null){
		pageIndex = 1;
	}
	getList(select,pageIndex);
});

function getList(select, pageIndex) {

	$.post(HttpHead+"/userMortgage/queryPageUserMortgageList", {
		pageSize: select,
		pageIndex: pageIndex
	},
		function(result) {
			let number;
			if(pageIndex == null || pageIndex ==1){
				number = 1;
			}else{
				number = ((pageIndex-1)*pageSize)+1;
			}
			var sum=0;
			for(var i=0;i<result.data.length;i++)
			{
				result.data[i].number = number+i;
				sum+=result.data[i].voteAmount;
			}
			var restr=fmoney(sum, 1).replace('.0','');
			$('#totalCount').html(restr);
			setHtml(result.data, 'tpl3', 'block_data_node');
			//分页处理
			$('#curr_page').html(result.pageQuery.pageIndex);
			$('#totalPage').html(result.pageQuery.totalPage);
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
	var GetQueryString_address = GetQueryString("coinaddress");
	if(page == undefined ||
		page == null ||
		page == "undefined" ||
		page == "null" ||
		page == ""){
		getList1(GetQueryString_address,1,pageSize);
	}else {
		getList1(GetQueryString_address,page,pageSize);
	}
}

function getList1(coinaddress, pageIndex,pageSize) {
	$.post(HttpHead+"/userMortgage/queryPageUserMortgageList",{
		pageSize: pageSize,
		pageIndex: pageIndex
	},
		function(result) {
			if(result.code == "5000"){
				alert("Please enter the correct number!");
			}else{
				let number;
				if (pageIndex == null || pageIndex == 1) {
					number = 1;
				} else {
					number = ((pageIndex - 1) * pageSize) + 1;
				}
				var sum = 0;
				for (var i = 0; i < result.data.length; i++) {
					result.data[i].number = number + i;
					sum += result.data[i].voteAmount;
				}
				var restr = fmoney(sum, 1).replace('.0', '');
				$('#totalCount').html(restr);
				setHtml(result.data, 'tpl3', 'block_data_node');
				//分页处理
				$('#curr_page').html(result.pageQuery.pageIndex);
				$('#totalPage').html(result.pageQuery.totalPage);
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


$(function() {

	//首页
	$("#first_page").click(function() {
		//getVoteLogList(10, 1);
		let startIndex = document.getElementById("select").value;
		location.href = "nodes.html?pageIndex=1&select=" + startIndex;
	});

	//最后一页
	$('#last_page').click(function() {
		var totalPage = $('#totalPage').html();
		let startIndex = document.getElementById("select").value;
		location.href = "nodes.html?pageIndex=" + totalPage+"&select=" + startIndex;
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
		location.href = "nodes.html?pageIndex=" + pageIndex+"&select=" + startIndex;
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
		location.href = "nodes.html?pageIndex=" + pageIndex+"&select=" + startIndex;
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

function test() {
	let soso = document.getElementById("soso1").value;
	location.href = "nodesList.html?coinaddress="+ soso;
}

function jumpSize(){
	let page = document.getElementById("page").value;
	if(isNaN(page)){
		alert("Please enter the correct number!");
	}
	changePageSize(page);
}
