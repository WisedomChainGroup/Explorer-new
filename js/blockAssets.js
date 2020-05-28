
/**
 * 根据事务hash获取区块信息
 * @param {Object} hash
 */
function getParseContract(coinaddress,type,pageIndex) {
	var type=type||1;
	var pageIndex=pageIndex||1;
	//var hash = "undefined" ? "" : hash;
	if (coinaddress == "") {
		//alert();
		$("#con-box-yu").html("未查到该信息");
		return;
	}
	$("#accountAddress").html(coinaddress);



	//数据请求部分
	$.post(HttpHead + "/userTransferLog/getParseContractTx/", {
			coincode: coinaddress,
		},

		function(result) {
			if (result.code == "2000") {
				if (result.data.allowincrease==1) {
					result.data.allowincrease = "Yes"
				} else{
					result.data.allowincrease = "No"
				}

				if(type==1){
					getTransferLogList(result.data.coinHash160,'',type,pageIndex);
				}else if(type==2){//转账记录
					getTransferLogList(result.data.createuserAddress,result.data.coinHash160,type,pageIndex);

				}else if(type==3){
					getTransferLogList(result.data.coinHash160,'',type,pageIndex);
				}


				$('.codes').html(result.data.code);
				setHtml(result.data, 'tpl', 'blocks_data_List');
			}

		});
}


function getTransferLogList(coinhash,coinhash160,type, pageIndex) {
	var coinhash=coinhash||'';
	var coinhash160=coinhash160||'';
	var type=type||1;
	var pageIndex=pageIndex||1;
	if (coinhash == "") {
		//alert();
		$("#block-content").html("未查到该信息");
		return;
	}
	var startIndex2 = GetQueryString("select");
	if(startIndex2 == undefined &&
		startIndex2 == null &&
		startIndex2 == "undefined" &&
		startIndex2 == "null" &&
		startIndex2 == ""){
		startIndex2 = 10;
	}
	//console.log(coinhash)
	//console.log(type)
	if(type==2){  //转账事务
		//数据请求部分
		$.post(HttpHead + "/userTransferLog/getTransferLogList/", {
				txHash:coinhash160,
				pageSize: startIndex2,
				pageIndex: pageIndex
			},

			function(result) {
				let number;
				if(pageIndex == null || pageIndex ==1){
					number = 1;
				}else{
					number = ((pageIndex-1)*startIndex2)+1;
				}
				if (result.code == "2000") {

					for (var i = 0; i < result.data.length; i++) {
						result.data[i].hash = result.data[i].blockHash;
						var blockHash = result.data[i].blockHash.substring(0, 5) + "***" + result.data[i].blockHash.substring(result.data[
							i].blockHash.length - 5, result.data[
							i].blockHash.length);
						result.data[i].blockHash = blockHash;
						result.data[i].number = i+number;
					}
					setHtml(result.data, 'tpl2', 'transactions_data_List');
					//分页处理
					$('#totalCount').html(result.pageQuery.totalCount);
					$('#curr_page').html(result.pageQuery.pageIndex);
					$('#totalPage').html(result.pageQuery.totalPage);
				}

			});

	}else if(type==3){  //所有权
		//数据请求部分
		$.post(HttpHead + "/assetOwner/getAssetOwner/", {
				coidHash160: coinhash,
				pageSize: startIndex2,
				pageIndex: pageIndex
			},
			function(result) {
				let number;
				if(pageIndex == null || pageIndex ==1){
					number = 1;
				}else{
					number = ((pageIndex-1)*startIndex2)+1;
				}
				if (result.code == "2000") {
					for (var i = 0; i < result.data.length; i++) {
						result.data[i].hash = result.data[i].coinHash;
						var blockHash = result.data[i].coinHash.substring(0, 5) + "***" + result.data[i].coinHash.substring(result.data[
							i].coinHash.length - 5, result.data[
							i].coinHash.length);
						result.data[i].coinHash = blockHash;
						result.data[i].number = i+number;
					}
					console.log(result.data);
					setHtml(result.data, 'tpl3', 'transactions_data_List');
					//分页处理
					$('#totalCount').html(result.pageQuery.totalCount);
					$('#curr_page').html(result.pageQuery.pageIndex);
					$('#totalPage').html(result.pageQuery.totalPage);
				}

			});
	}else{  //增发
		//数据请求部分
		$.post(HttpHead + "/assetIncreased/getAssetIncreased/", {
				coidHash160: coinhash,
				pageSize: startIndex2,
				pageIndex: pageIndex
			},
			function(result) {
				let number;
				if(pageIndex == null || pageIndex ==1){
					number = 1;
				}else{
					number = ((pageIndex-1)*startIndex2)+1;
				}
				if (result.code == "2000") {
					for (var i = 0; i < result.data.length; i++) {
						result.data[i].coinHash = result.data[i].coinHash;
						var blockHash = result.data[i].coinHash.substring(0, 5) + "***" + result.data[i].coinHash.substring(result.data[
							i].coinHash.length - 5, result.data[
							i].coinHash.length);
						result.data[i].coinHash = blockHash;
						result.data[i].number = i+number;
					}
					setHtml(result.data, 'tpl1', 'transactions_data_List');
					//分页处理
					$('#totalCount').html(result.pageQuery.totalCount);
					$('#curr_page').html(result.pageQuery.pageIndex);
					$('#totalPage').html(result.pageQuery.totalPage);
				}

			});


	}

}

//getBalance("1FyA6jTrC2MSKoLUS8BxZdqgZWkxFH7G1n");
//getTransferLogList("1FyA6jTrC2MSKoLUS8BxZdqgZWkxFH7G1n");
var GetQueryString_address = GetQueryString("coinaddress");
var pageIndex = GetQueryString("pageIndex");
var type = GetQueryString("type");
if (GetQueryString_address != undefined &&
	GetQueryString_address != null &&
	GetQueryString_address != "undefined" &&
	GetQueryString_address != "null" &&
	GetQueryString_address != "" &&
	pageIndex != undefined &&
	pageIndex != null &&
	pageIndex != "undefined" &&
	pageIndex != "null" &&
	pageIndex != ""&&
	type != undefined &&
	type != null &&
	type != "undefined" &&
	type != "null" &&
	type != ""
) {

	//getBalance(GetQueryString_address);
	//getTransferLogList(GetQueryString_address,pageIndex);
	getParseContract(GetQueryString_address,type,pageIndex);
	if (type==1) {
		$('.tabst').css('left','1.65rem');
	}else if(type==2){
		$('.tabst').css('left','6.65rem');
	}else{
		$('.tabst').css('left','12rem');
	}

	for(var i =1 ;i<4;i++){
		if(i!=type){
			$('.tab'+i).css('display','none');
		}
	}

}else{
	//alert($("#sosowap").val());
	$('.tabst').css('left','1.5rem');
	for(var i =1 ;i<4;i++){
		if(i!=1){
			$('.tab'+i).css('display','none');
		}
	}

	getParseContract(GetQueryString_address,1,1);
	//getTransferLogList(GetQueryString_address,1,1);
}

function changePageSize(page){
	let startIndex = document.getElementById("select").value;
	var GetQueryString_address = GetQueryString("coinaddress");
	var type = GetQueryString("type");
	if(page == undefined ||
		page == null ||
		page == "undefined" ||
		page == "null" ||
		page == ""){
		getParseContract1(GetQueryString_address,type,1,startIndex);
	}else {
		getParseContract1(GetQueryString_address,type,page,startIndex);
	}
}

/**
 * 根据事务hash获取区块信息
 * @param {Object} hash
 */
function getParseContract1(coinaddress,type,pageIndex,startIndex) {
	var type=type||1;
	var pageIndex=pageIndex||1;
	//var hash = "undefined" ? "" : hash;
	if (coinaddress == "") {
		//alert();
		$("#con-box-yu").html("未查到该信息");
		return;
	}
	$("#accountAddress").html(coinaddress);



	//数据请求部分
	$.post(HttpHead + "/userTransferLog/getParseContractTx/", {
			coincode: coinaddress,
		},

		function(result) {
			if (result.code == "2000") {
				if (result.data.allowincrease==1) {
					result.data.allowincrease = "Yes"
				} else{
					result.data.allowincrease = "No"
				}

				if(type==1){
					getTransferLogList1(result.data.coinHash160,'',type,pageIndex,startIndex);
				}else if(type==2){//转账记录
					getTransferLogList1(result.data.createuserAddress,result.data.coinHash160,type,pageIndex,startIndex);

				}else if(type==3){
					getTransferLogList1(result.data.coinHash160,'',type,pageIndex,startIndex);
				}


				$('.codes').html(result.data.code);
				setHtml(result.data, 'tpl', 'blocks_data_List');
			}

		});
}


function getTransferLogList1(coinhash,coinhash160,type, pageIndex,startIndex) {
	var coinhash=coinhash||'';
	var coinhash160=coinhash160||'';
	var type=type||1;
	var pageIndex=pageIndex||1;
	if (coinhash == "") {
		//alert();
		$("#block-content").html("The information was not found");
		return;
	}

	//console.log(coinhash)
	//console.log(type)
	if(type==2){  //转账事务
		//数据请求部分
		$.post(HttpHead + "/userTransferLog/getTransferLogList/", {
				txHash:coinhash160,
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
							alert("Please enter the correct number!");
						}
					} else {
						let number;
						if (pageIndex == null || pageIndex == 1) {
							number = 1;
						} else {
							number = ((pageIndex - 1) * startIndex) + 1;
						}
						for (var i = 0; i < result.data.length; i++) {
							result.data[i].hash = result.data[i].blockHash;
							var blockHash = result.data[i].blockHash.substring(0, 5) + "***" + result.data[i].blockHash.substring(result.data[
								i].blockHash.length - 5, result.data[
								i].blockHash.length);
							result.data[i].blockHash = blockHash;
							result.data[i].number = i + number;
						}
						setHtml(result.data, 'tpl2', 'transactions_data_List');
						//分页处理
						$('#totalCount').html(result.pageQuery.totalCount);
						$('#curr_page').html(result.pageQuery.pageIndex);
						$('#totalPage').html(result.pageQuery.totalPage);
					}
				}
			});

	}else if(type==3){  //所有权
		//数据请求部分
		$.post(HttpHead + "/assetOwner/getAssetOwner/", {
				coidHash160: coinhash,
				pageSize: startIndex,
				pageIndex: pageIndex
			},
			function(result) {
				let len = result.pageQuery.totalPage;
				if(pageIndex > len){
					if(len == 0){
						return;
					}else {
						alert("Please enter the correct number!");
					}
				}else {
					let number;
					if (pageIndex == null || pageIndex == 1) {
						number = 1;
					} else {
						number = ((pageIndex - 1) * startIndex) + 1;
					}
					if (result.code == "2000") {
						for (var i = 0; i < result.data.length; i++) {
							result.data[i].hash = result.data[i].coinHash;
							var blockHash = result.data[i].coinHash.substring(0, 5) + "***" + result.data[i].coinHash.substring(result.data[
								i].coinHash.length - 5, result.data[
								i].coinHash.length);
							result.data[i].coinHash = blockHash;
							result.data[i].number = i + number;
						}
						setHtml(result.data, 'tpl3', 'transactions_data_List');
						//分页处理
						$('#totalCount').html(result.pageQuery.totalCount);
						$('#curr_page').html(result.pageQuery.pageIndex);
						$('#totalPage').html(result.pageQuery.totalPage);
					}
				}
			});
	}else{  //增发
		//数据请求部分
		$.post(HttpHead + "/assetIncreased/getAssetIncreased/", {
				coidHash160: coinhash,
				pageSize: startIndex,
				pageIndex: pageIndex
			},
			function(result) {
				let len = result.pageQuery.totalPage;
				if(pageIndex > len){
					if(len == 0){
						return;
					}else {
						alert("Please enter the correct number!");
					}
				}else {
					let number;
					if (pageIndex == null || pageIndex == 1) {
						number = 1;
					} else {
						number = ((pageIndex - 1) * startIndex) + 1;
					}
					if (result.code == "2000") {
						for (var i = 0; i < result.data.length; i++) {
							result.data[i].coinHash = result.data[i].coinHash;
							var blockHash = result.data[i].coinHash.substring(0, 5) + "***" + result.data[i].coinHash.substring(result.data[
								i].coinHash.length - 5, result.data[
								i].coinHash.length);
							result.data[i].coinHash = blockHash;
							result.data[i].number = i + number;
						}
						setHtml(result.data, 'tpl1', 'transactions_data_List');
						//分页处理
						$('#totalCount').html(result.pageQuery.totalCount);
						$('#curr_page').html(result.pageQuery.pageIndex);
						$('#totalPage').html(result.pageQuery.totalPage);
					}
				}
			});


	}

}

$(function() {

	$(".sub").click(function() {
		//getTransferLogList(10, 1);
		var type =$(this).attr("data-type");
		let startIndex = document.getElementById("select").value;
		location.href = "assetsList.html?pageIndex=1&coinaddress="+coinaddress+"&type="+type+"&select=" + startIndex;
	});

	var coinaddress=GetQueryString_address;//$("#soso").val();
	if(type==null){
		type=1;
	}
	//首页
	$("#first_page").click(function() {
		//getTransferLogList(10, 1);
		var curr_page = parseInt($('#curr_page').html());
		let startIndex = document.getElementById("select").value;
		if(curr_page > 1) {
			location.href = "assetsList.html?pageIndex=1&coinaddress=" + coinaddress + "&type=" + type + "&select=" + startIndex;
		}
	});

	//最后一页
	$('#last_page').click(function() {
		var totalPage = $('#totalPage').html();
		var curr_page = parseInt($('#curr_page').html());
		let startIndex = document.getElementById("select").value;
		if(curr_page < totalPage) {
			location.href = "assetsList.html?pageIndex=" + totalPage + "&coinaddress=" + coinaddress + "&type=" + type + "&select=" + startIndex;
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
			location.href = "assetsList.html?pageIndex=" + pageIndex + "&coinaddress=" + coinaddress + "&type=" + type + "&select=" + startIndex;
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
			location.href = "assetsList.html?pageIndex=" + pageIndex + "&coinaddress=" + coinaddress + "&type=" + type + "&select=" + startIndex;
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