$(function() {
	getList();
});

function getList() {
	$.post(HttpHead+"/userMortgage/getUserMortgageList", {
		pageSize: pageSize,
		pageIndex: pageIndex
	},
		function(result) {
			//alert(result.data.length)
			var sum=0;
			for(var i=0;i<result.data.length;i++)
			{
				sum+=result.data[i].voteAmount;
			}
			var restr=fmoney(sum, 1).replace('.0','');
			$('#totalCount').html(restr);
			setHtml(result.data, 'tpl3', 'block_data_node');
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

function changePageSize(){
	let startIndex = document.getElementById("select").value;
	var GetQueryString_address = GetQueryString("coinaddress");
	getList1(GetQueryString_address,1,startIndex);
}

function getList1(coinaddress, pageIndex,startIndex) {
	$.post(HttpHead+"/userMortgage/getUserMortgageList",
		function(result) {
			//alert(result.data.length)
			var sum=0;
			for(var i=0;i<result.data.length;i++)
			{
				sum+=result.data[i].voteAmount;
			}
			var restr=fmoney(sum, 1).replace('.0','');
			$('#totalCount').html(restr);
			setHtml(result.data, 'tpl3', 'block_data_node');
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
		$("#select").val("10");
	}else {
		$("#select").val(test);
	}
});

