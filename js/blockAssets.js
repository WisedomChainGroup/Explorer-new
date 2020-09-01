
/**
 * 根据事务hash获取区块信息
 * @param {Object} hash
 */
function getParseContract(coinaddress,type,pageIndex) {
	if (coinaddress == "") {
		$("#con-box-yu").html("未查到该信息");
		return;
	}
	$("#accountAddress").html(coinaddress);
	//数据请求部分
	$.get("/v2-web/get_coin_by_code", {
		code: coinaddress
	},
		function(result) {
		if (result.code == "2000") {
			let hash = result.data.hash;
			$.get("/ParseContractTx", {
				txhash: hash
			},
					function(result1) {
				if (result1.code == "2000") {
					if(result1.data.code == "WGC"){
						result1.data.info = "十方盾，英文：Wisdom guardian coin，简称：WGC，WGC是基于公链WDC底层技术，实现实时的点对点交换和支付服务。WGC将适用于贝诺国际全球业务以及影视众筹等项目。";
					}
					if(result.data.code == "TGB"){
						result1.data.info = "TGB 基于公链WDC底层技术，实现实时的点对点交换和支付服务。TGB将适用于泰国境内旅游、酒店预订、餐饮、购买水果等一条龙服务。";
					}
					if (result1.data.allowincrease==1) {
						result1.data.allowincrease = "Yes";
					} else{
						result1.data.allowincrease = "No";
					}
				}
				setHtml(result1.data, 'tpl', 'blocks_data_List');
			});
			if(type==1){
				getTransferLogList(result.data.hash160,'',type,pageIndex);
			}else if(type==2){//转账记录
				getTransferLogList(result.data.address,result.data.hash160,type,pageIndex,result.data.code);

			}else if(type==3){
				getTransferLogList(result.data.hash160,'',type,pageIndex);
			}
			$('.codes').html(result.data.code);
		}

	});
}


function getTransferLogList(coinhash,coinhash160,type, pageIndex,code) {
	var coinhash=coinhash||'';
	var coinhash160=coinhash160||'';
	var type=type||1;
	var pageIndex=pageIndex||1;
	if (coinhash == "") {
		//alert();
		$("#block-content").html("未查到该信息");
		return;
	}
	let code1;
	if(type == 2){
		code1 = code;
	}
	var startIndex2 = GetQueryString("select");
	if(startIndex2 == undefined ||
		startIndex2 == null ||
		startIndex2 == "undefined" ||
		startIndex2 == "null" ||
		startIndex2 == ""){
		startIndex2 = 10;
	}
	if(pageIndex > 0){
		pageIndex = pageIndex - 1;
	}
	if(type==2){  //转账事务
		//数据请求部分
		$.get("/v2-web/get_code_transfer_by_hash160", {
				hash160:coinhash160,
				per_page: startIndex2,
				page: pageIndex
	},
			function(result) {
		if (result.code == "2000") {
			for (var i = 0;i < result.data.content.length;i++) {
				var blockHash = result.data.content[i].hash.substring(0, 5) + "***" + result.data.content[i].hash.substring(result.data.content[
						i].hash.length - 5, result.data.content[
						i].hash.length);
				result.data.content[i].blockHash = blockHash;
				result.data.content[i].number = ((pageIndex)*startIndex2)+i+1;
				if (result.data.content[i].from_address.substring(0, 2)!= "WX") {
					result.data.content[i].from_address = "WX" + result.data.content[i].from_address;
				}
				if (result.data.content[i].to_address.substring(0, 2)!= "WX") {
					result.data.content[i].to_address = "WX" + result.data.content[i].to_address;
				}
				result.data.content[i].coinHash = coinhash;
				result.data.content[i].created_at = getTime(result.data.content[i].created_at);
				result.data.content[i].code = code1;
			}
			setHtml(result.data.content, 'tpl2', 'transactions_data_List');
			//分页处理
			$('#totalCount').html(result.data.totalElements);
			$('#curr_page').html(pageIndex+1);
			$('#totalPage').html(result.data.totalPages);
		}
	});

	}else if(type==3){  //所有权
		//数据请求部分
		$.get("/v2-web/get_asset_owner_list_by_hash160", {
				hash160: coinhash,
				per_page: startIndex2,
				page: pageIndex
		},
		function(result) {
		if (result.code == "2000") {
			for (var i = 0;i < result.data.content.length;i++) {
				var blockHash = result.data.content[i].hash.substring(0, 5) + "***" + result.data.content[i].hash.substring(result.data.content[
						i].hash.length - 5, result.data.content[
						i].hash.length);
				result.data.content[i].coinHash = blockHash;
				result.data.content[i].number = ((pageIndex)*startIndex2)+i+1;
				if (result.data.content[i].old_address.substring(0, 2)!= "WX") {
					result.data.content[i].old_address = "WX" + result.data.content[i].old_address;
				}
				if (result.data.content[i].new_address.substring(0, 2)!= "WX") {
					result.data.content[i].new_address = "WX" + result.data.content[i].new_address;
				}
				result.data.content[i].created_at = getTime(result.data.content[i].created_at);
			}
			setHtml(result.data.content, 'tpl3', 'transactions_data_List');
			//分页处理
			$('#totalCount').html(result.data.totalElements);
			$('#curr_page').html(pageIndex+1);
			$('#totalPage').html(result.data.totalPages);
		}
	});
	}else{  //增发
		//数据请求部分
		$.get("/v2-web/get_asset_increased", {
				hash160: coinhash,
				per_page: startIndex2,
				page: pageIndex
		},
		function(result) {
			if (result.code == "2000") {
				for (var i = 0;i < result.data.content.length;i++) {
					var blockHash = result.data.content[i].hash.substring(0, 5) + "***" + result.data.content[i].hash.substring(result.data.content[
							i].hash.length - 5, result.data.content[
							i].hash.length);
					result.data.content[i].blockHash = blockHash;
					result.data.content[i].created_at = getTime(result.data.content[i].created_at);
					result.data.content[i].number = ((pageIndex)*startIndex2)+i+1;
					if (result.data.content[i].address.substring(0, 2)!= "WX") {
						result.data.content[i].address = "WX" + result.data.content[i].address;
					}
				}
				setHtml(result.data.content, 'tpl1', 'transactions_data_List');
				//分页处理
				$('#totalCount').html(result.data.totalElements);
				$('#curr_page').html(pageIndex+1);
				$('#totalPage').html(result.data.totalPages);
			}
	});
}

	}

var coinaddress = GetQueryString("coinaddress");
var pageIndex = GetQueryString("pageIndex");
var type = GetQueryString("type");
if (coinaddress != undefined &&
	coinaddress != null &&
	coinaddress != "undefined" &&
	coinaddress != "null" &&
	coinaddress != "" &&
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
	getParseContract(coinaddress,type,pageIndex);
	if (type==1) {
		$('.tabst').css('left','2.5rem');
	}else if(type==2){
		$('.tabst').css('left','9.1rem');
	}else{
		$('.tabst').css('left','15.6rem');
	}

	for(var i =1 ;i<4;i++){
		if(i!=type){
			$('.tab'+i).css('display','none');
		}
	}

}else{
	//alert($("#sosowap").val());
	$('.tabst').css('left','2.5rem');
	for(var i =1 ;i<4;i++){
		if(i!=1){
			$('.tab'+i).css('display','none');
		}
	}
	getParseContract(coinaddress,1,0);
}

function changePageSize(page){
	let startIndex = document.getElementById("select").value;
	var coinaddress = GetQueryString("coinaddress");
	var hash160 = GetQueryString("hash160");
	var type = GetQueryString("type");
	let total = $('#totalPage').html();
	let searchType = document.getElementById("searchType").value;
	if(searchType != ""){
		if (page === undefined ||
			page == null ||
			page == "undefined" ||
			page == "null" ||
			page == "") {
			searchCoinContract(startIndex, 1);
		}else {
			if (parseInt(total) < parseInt(page)) {
				alert("number is big than the max page!");
				return;
			} else {
				searchCoinContract(startIndex, page);
			}
		}
	}else {
		if(page == undefined ||
			page == null ||
			page == "undefined" ||
			page == "null" ||
			page == ""){
			location.href = "assetsList.html?pageIndex=1&coinaddress=" + coinaddress + "&type=" + type + "&select=" + startIndex+"&hash160=" + hash160;
		}else {
			if(parseInt(total)<parseInt(page)){
				alert("number is big than the max page!");
				return;
			}else {
				location.href = "assetsList.html?pageIndex=" + page + "&coinaddress=" + coinaddress + "&type=" + type + "&select=" + startIndex + "&hash160=" + hash160;
			}
		}
		}
}

$(function() {

	$(".sub").click(function() {
		//getTransferLogList(10, 1);
		var type =$(this).attr("data-type");
		let startIndex = document.getElementById("select").value;
		location.href = "assetsList.html?pageIndex=1&coinaddress="+coinaddress+"&type="+type+"&select=" + startIndex;
	});

	if(type==null){
		type=1;
	}
	//首页
	$("#first_page").click(function() {
		//getTransferLogList(10, 1);
		var curr_page = parseInt($('#curr_page').html());
		let startIndex = document.getElementById("select").value;
		let searchType = document.getElementById("searchType").value;
		if(curr_page > 1 && searchType != "") {
			searchCoinContract(startIndex,1);
		}else if(curr_page == 1){
			return;
		}else{
			location.href = "assetsList.html?pageIndex=1" + "&type=" + type + "&select=" + startIndex+ "&coinaddress=" + coinaddress;
		}
	});

	//最后一页
	$('#last_page').click(function() {
		var totalPage = $('#totalPage').html();
		var curr_page = parseInt($('#curr_page').html());
		let startIndex = document.getElementById("select").value;
		let searchType = document.getElementById("searchType").value;
		if(curr_page < totalPage && searchType != "") {
			searchCoinContract(startIndex,totalPage);
		}else if(curr_page == totalPage){
			return;
		}else{
			location.href = "assetsList.html?pageIndex=" + totalPage +"&type=" + type + "&select=" + startIndex+ "&coinaddress=" + coinaddress;
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
		let searchType = document.getElementById("searchType").value;
		if(curr_page > 1 && searchType != "") {
			searchCoinContract(startIndex,pageIndex);
		}else if(curr_page == 1){
			return;
		}else{
			location.href = "assetsList.html?pageIndex=" + pageIndex + "&type=" + type + "&select=" + startIndex+ "&coinaddress=" + coinaddress;
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
		let searchType = document.getElementById("searchType").value;
		if(curr_page < totalPage  && searchType != "") {
			searchCoinContract(startIndex,pageIndex);
		}else if(curr_page == totalPage){
			return;
		}else{
			location.href = "assetsList.html?pageIndex=" + pageIndex + "&type=" + type + "&select=" + startIndex+ "&coinaddress=" + coinaddress;
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
	if(isNaN(page)|| !(/(^[1-9]\d*$)/.test(page))){
		alert("Please enter the correct number!");
	}else{
		changePageSize(page);
	}
}

function getTime(UTCDateString) {
	if(!UTCDateString){
		return '-';
	}
	function formatFunc(str) {    //格式化显示
		return str > 9 ? str : '0' + str
	}
	var date2 = new Date(UTCDateString);     //这步是关键
	var year = date2.getFullYear();
	var mon = formatFunc(date2.getMonth() + 1);
	var day = formatFunc(date2.getDate());
	var hour = date2.getHours();
	hour = formatFunc(hour);
	var min = formatFunc(date2.getMinutes());
	var sec = formatFunc(date2.getSeconds());
	var dateStr = year+'-'+mon+'-'+day+' '+hour+':'+min+':'+sec;
	return dateStr;
}


function searchCoinContract(page,index) {
	let startIndex = document.getElementById("select").value;
	let coinaddress = GetQueryString("coinaddress");
	let type = GetQueryString("type");
	let searchType = document.getElementById("searchType").value;
	searchType = searchType.trim();
	if(type == undefined ||
		type == null ||
		type == "undefined" ||
		type == "null" ||
		type == ""){
		type = 1;
	}
	if(page == undefined ||
		page == null ||
		page == "undefined" ||
		page == "null" ||
		page == ""){
		index =1 ;
		page=startIndex;
	}
	$.get("/v2-web/get_coin_by_code", {
			code: coinaddress
		},
		function(result) {
			if (result.code == "2000") {
				if(type==1){
					getTransferLogList1(result.data.hash160,'',type,index,result.data.code,searchType,page);
				}else if(type==2){//转账记录
					getTransferLogList1(result.data.address,result.data.hash160,type,index,result.data.code,searchType,page);

				}else if(type==3){
					getTransferLogList1(result.data.hash160,'',type,index,result.data.code,searchType,page);
				}
			}

		});

	function getTransferLogList1(coinhash,coinhash160,type, pageIndex,code,searchType,page1) {
		var coinhash=coinhash||'';
		var coinhash160=coinhash160||'';
		var type=type||1;
		var pageIndex=pageIndex||1;
		let searchAddress = searchType;
		if (coinhash == "") {
			//alert();
			$("#block-content").html("未查到该信息");
			return;
	}
	let code1;
	if(type == 2){
		code1 = code;
	}
	if(page1 == undefined ||
			page1 == null ||
			page1 == "undefined" ||
			page1 == "null" ||
			page1 == ""){
		page = 10;
	}
	if(pageIndex > 0){
		pageIndex = pageIndex - 1;
	}
	if(type==2){  //转账事务
			//数据请求部分
			$.get("/v2-web/get_code_transfer_by_hash160", {
					hash160:coinhash160,
					per_page: 10000000,
					page: 0
	},
				function(result) {
		if (result.code == "2000") {
			let list_map = new Array();
			let list_map_1 = new Array();
			let j =0;
			for (var i = 0; i < result.data.content.length; i++) {
				var blockHash = result.data.content[i].hash.substring(0, 5) + "***" + result.data.content[i].hash.substring(result.data.content[
								i].hash.length - 5, result.data.content[
								i].hash.length);
				result.data.content[i].blockHash = blockHash;
				result.data.content[i].number =  j + 1;
				if (result.data.content[i].from_address.substring(0, 2) != "WX") {
					result.data.content[i].from_address = "WX" + result.data.content[i].from_address;
				}
				if (result.data.content[i].to_address.substring(0, 2) != "WX") {
					result.data.content[i].to_address = "WX" + result.data.content[i].to_address;
				}
				result.data.content[i].created_at = getTime(result.data.content[i].created_at);
				result.data.content[i].code = code1;

				if(searchAddress == ""){
					list_map.push(result.data.content[i]);
					j++;
				}else{
					if(searchAddress.substring(0,2) == "WX"){
						if(result.data.content[i].from_address == searchAddress || result.data.content[i].to_address == searchAddress){
							list_map.push(result.data.content[i]);
							j++;
						}
					}else{
						if(result.data.content[i].hash == searchAddress){
							list_map.push(result.data.content[i]);
							j++;
						}
					}
				}
			}
			let total;
			if((pageIndex+1)*page1 > list_map.length){
				for (var k = pageIndex * page; k < list_map.length; k++) {
					list_map_1.push(list_map[k]);
				}
				total = Math.ceil(list_map.length/page1);
			}else {
				for(var k = pageIndex*page1; k < (pageIndex+1)*page1;k++){
					list_map_1.push(list_map[k]);
				}
				total = Math.ceil(list_map.length/page1);
			}
			setHtml(list_map_1, 'tpl2', 'transactions_data_List');
			//分页处理
			//$('#totalCount').html(list_map.length);
			$('#curr_page').html(pageIndex + 1);
			$('#totalPage').html(total);
		}
	});

	}else if(type==3){  //所有权
	//数据请求部分
	$.get("/v2-web/get_asset_owner_list_by_hash160", {
		hash160: coinhash,
		per_page: 1000000,
		page: 0
	},
		function(result) {
		if (result.code == "2000") {
			let list_map = new Array();
			let list_map_1 = new Array();
			let j =0;
			for (var i = 0; i < result.data.content.length; i++) {
				var blockHash = result.data.content[i].hash.substring(0, 5) + "***" + result.data.content[i].hash.substring(result.data.content[
								i].hash.length - 5, result.data.content[
								i].hash.length);
				result.data.content[i].coinHash = blockHash;
				result.data.content[i].number = j + 1;
				if (result.data.content[i].old_address.substring(0, 2) != "WX") {
					result.data.content[i].old_address = "WX" + result.data.content[i].old_address;
				}
				if (result.data.content[i].new_address.substring(0, 2) != "WX") {
					result.data.content[i].new_address = "WX" + result.data.content[i].new_address;
				}
				result.data.content[i].created_at = getTime(result.data.content[i].created_at);
				if(searchAddress == ""){
					list_map.push(result.data.content[i]);
					j++;
				}else{
					if(searchAddress.substring(0,2) == "WX"){
						if(result.data.content[i].old_address == searchAddress || result.data.content[i].new_address == searchAddress){
							list_map.push(result.data.content[i]);
							j++;
						}
					}else{
						if(result.data.content[i].hash == searchAddress){
							list_map.push(result.data.content[i]);
							j++;
						}
					}
				}
			}
			let total;
			if((pageIndex+1)*page1 > list_map.length){
				for (var k = pageIndex * page; k < list_map.length; k++) {
					list_map_1.push(list_map[k]);
				}
				total = Math.ceil(list_map.length/page1);
			}else {
				for(var k = pageIndex*page1; k < (pageIndex+1)*page1;k++){
					list_map_1.push(list_map[k]);
				}
				total = Math.ceil(list_map.length/page1);
			}
			setHtml(list_map_1, 'tpl3', 'transactions_data_List');
			//分页处理
						//$('#totalCount').html(1);
			$('#curr_page').html(pageIndex + 1);
			$('#totalPage').html(total);
		}
	});
	}else{  //增发
			//数据请求部分
			$.get("/v2-web/get_asset_increased", {
		hash160: coinhash,
					per_page: 1000000,
					page: 0
	},
				function(result) {
		let list_map = new Array();
		let list_map_1 = new Array();
		let j =0;
		for (var i = 0; i < result.data.content.length; i++) {
			var blockHash = result.data.content[i].hash.substring(0, 5) + "***" + result.data.content[i].hash.substring(result.data.content[
							i].hash.length - 5, result.data.content[
							i].hash.length);
			result.data.content[i].blockHash = blockHash;
			result.data.content[i].created_at = getTime(result.data.content[i].created_at);
			result.data.content[i].number = j + 1;
			if (result.data.content[i].address.substring(0, 2) != "WX") {
				result.data.content[i].address = "WX" + result.data.content[i].address;
			}
			if(searchAddress == ""){
				list_map.push(result.data.content[i]);
				j++;
			}else{
				if(searchAddress.substring(0,2) == "WX"){
					if(result.data.content[i].address == searchAddress){
						list_map.push(result.data.content[i]);
						j++;
					}
				}else{
					if(result.data.content[i].hash == searchAddress){
						list_map.push(result.data.content[i]);
						j++;
					}
				}
			}
		}
		let total;
		if((pageIndex+1)*page1 > list_map.length){
			for (var k = pageIndex * page; k < list_map.length; k++) {
				list_map_1.push(list_map[k]);
			}
			total = Math.ceil(list_map.length/page1);
		}else {
			for(var k = pageIndex*page1; k < (pageIndex+1)*page1;k++){
				list_map_1.push(list_map[k]);
			}
			total = Math.ceil(list_map.length/page1);
		}
		setHtml(list_map_1, 'tpl1', 'transactions_data_List');
		//分页处理
		//$('#totalCount').html(1);
		$('#curr_page').html(pageIndex + 1);
		$('#totalPage').html(total);
	});


	}

}
}