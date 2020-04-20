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
	getVoteLogList(GetQueryString_address,pageIndex);
	

}else{
	getBalance(GetQueryString_address);
	getVoteLogList(GetQueryString_address,1);
}




function getVoteLogList(coinaddress, pageIndex) {
	if (coinaddress == "") {
		//alert();
		$("#block-content").html("未查到该信息");
		return;
	}
	
	
	//数据请求部分
	$.post(HttpHead + "/userVote/getAddrVote", {
			coinAddress: coinaddress,
			pageSize: 10,
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
				console.log("result========="+result.data);
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
		location.href = "nodesList.html?pageIndex=1&coinaddress="+coinaddress;
	});

	//最后一页
	$('#last_page').click(function() {
		var totalPage = $('#totalPage').html();
		location.href = "nodesList.html?pageIndex=" + totalPage+"&coinaddress="+coinaddress;
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
		location.href = "nodesList.html?pageIndex=" + pageIndex+"&coinaddress="+coinaddress;
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
		location.href = "nodesList.html?pageIndex=" + pageIndex+"&coinaddress="+coinaddress;
	});
})







