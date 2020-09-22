/**
 * 根据事务hash获取区块信息
 * @param {Object} hash
 */
function getBalance(coinaddress) {
	//var hash = "undefined" ? "" : hash;
	if (coinaddress == "") {
		//alert("aaa");
		$("#con-box-yu").html("The information was not found");
		return;
	}
	//数据请求部分
	$.post("/getAddressBalance/", {
			address: coinaddress
		},
		function(result) {
			if (result.code == "2000") {
				setHtml(result, 'tpl', 'con-box-yu');
			}

		});
}


var GetQueryString_address = GetQueryString("coinaddress");
var pageIndex = GetQueryString("pageIndex");

var startIndex2 = GetQueryString("select");
if(startIndex2 == null){
	startIndex2 = 10;
}

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
	getVoteLogList(GetQueryString_address,pageIndex,startIndex2);


}else{
	getBalance(GetQueryString_address);
	getVoteLogList(GetQueryString_address,1,startIndex2);
}




function getVoteLogList(coinaddress, pageIndex,startIndex2) {
	if (coinaddress == "") {
		//alert();
		$("#block-content").html("The information was not found");
		return;
	}

	if(pageIndex > 0){
		pageIndex = pageIndex-1;
	}

	//数据请求部分
	$.get("/v2-web/get_vote_list_by_to_address", {
			to_address: coinaddress,
			per_page: startIndex2,
			page: pageIndex
		},
		function(result) {
			if (result.code == "2000"&&result.data.content.length>0) {
				for (var i = 0; i < result.data.content.length; i++) {
					result.data.content[i].number = ((pageIndex) * startIndex2) + i + 1;
					if (result.data.content[i].from_address.substring(0, 2) != "WX") {
						result.data.content[i].from_address = "WX" + result.data.content[i].from_address;
					}
					result.data.content[i].created_at = getTime(result.data.content[i].created_at);
				}
				setHtml(result.data.content, 'tpl2', 'block-content');
				//分页处理
				$('#totalCount').html(result.data.totalElements);
				$('#curr_page').html(pageIndex + 1);
				$('#totalPage').html(result.data.totalPages);
			}else{
				$("#content-no").html("No data...");
			}

		});
}

function changePageSize(page){
	let startIndex = document.getElementById("select").value;
	let total = $('#totalPage').html();
	var GetQueryString_address = GetQueryString("coinaddress");
	if(page == undefined ||
		page == null ||
		page == "undefined" ||
		page == "null" ||
		page == ""){
		location.href = "nodesList.html?pageIndex=1&coinaddress=" + GetQueryString_address + "&select=" + startIndex;
	}else {
		if(parseInt(total)<parseInt(page)){
			alert("超过最大页数");
			return;
		}else {
			location.href = "nodesList.html?pageIndex=" + page + "&coinaddress=" + GetQueryString_address + "&select=" + startIndex;
		}
	}
}

$(function() {


	var coinaddress=GetQueryString_address;

	$("#accountAddress").html(coinaddress);
	//首页
	$("#first_page").click(function() {
		//getVoteLogList(10, 1);
		var curr_page = parseInt($('#curr_page').html());
		let startIndex = document.getElementById("select").value;
		if(curr_page > 1) {
			location.href = "nodesList.html?pageIndex=1&coinaddress=" + coinaddress + "&select=" + startIndex;
		}
	});

	//最后一页
	$('#last_page').click(function() {
		var totalPage = $('#totalPage').html();
		var curr_page = parseInt($('#curr_page').html());
		let startIndex = document.getElementById("select").value;
		if(curr_page < totalPage) {
			location.href = "nodesList.html?pageIndex=" + totalPage + "&coinaddress=" + coinaddress + "&select=" + startIndex;
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
			location.href = "nodesList.html?pageIndex=" + pageIndex + "&coinaddress=" + coinaddress + "&select=" + startIndex;
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
			location.href = "nodesList.html?pageIndex=" + pageIndex + "&coinaddress=" + coinaddress + "&select=" + startIndex;
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
		alert("请输入正确的数字！");
	}
	changePageSize(page);
}


function replaceAll(str)
{
	if(str!=null)
		str = str.replace(/-/g,"/")
	return str;
}


function getTime(UTCDateString) {
	//获取当前时区
	var offset = new Date().getTimezoneOffset()/60;
	if(!UTCDateString){
		return '-';
	}
	//UTCDateString = renderTime(UTCDateString);
	UTCDateString = UTCDateString.replace("-","/");
	UTCDateString = UTCDateString.replace("T"," ");
	UTCDateString = replaceAll(UTCDateString);
	UTCDateString = UTCDateString.substring(0,19);

	function formatFunc(str) {    //格式化显示
		return str > 9 ? str : '0' + str
	}
	var date2 = new Date(UTCDateString);//这步是关键
	var year = date2.getFullYear();
	var mon = formatFunc(date2.getMonth() + 1);
	var day = formatFunc(date2.getDate());
	var hour = date2.getHours();
	hour = formatFunc(hour);
	var min = formatFunc(date2.getMinutes());
	var sec = formatFunc(date2.getSeconds());
	var dateStr = year+'/'+mon+'/'+day+' '+hour+':'+min+':'+sec;
	//var dateStr = "2020/9/2 23:01:01";
	var dateStr1 = eosFormatTime2(dateStr,offset);
	var year1 = dateStr1.getFullYear();
	var mon1 = formatFunc(dateStr1.getMonth() + 1);
	var day1 = formatFunc(dateStr1.getDate());
	var hour1 = dateStr1.getHours();
	hour1 = formatFunc(hour1);
	var min1 = formatFunc(dateStr1.getMinutes());
	var sec1 = formatFunc(dateStr1.getSeconds());
	var dateStr2 = year1+'-'+mon1+'-'+day1+' '+hour1+':'+min1+':'+sec1;
	return dateStr2;
}

function eosFormatTime2(oldTimes1,offset) {
	var x = oldTimes1; // 取得时间"2017-07-08 13:00:00"
	var time = new Date(x);
	var timeNum = offset;//小时数
	time.setHours(time.getHours() - timeNum);
	return time;
}

function searchByHeight() {
	let address = GetQueryString("coinaddress");
	let height = document.getElementById("height").value;

	let publicKeyHash = null;
	let blockhash = null;
	if(height != undefined &&
		height != null &&
		height != "undefined" &&
		height != "null" &&
		height != "" && !isNaN(height)) {
		//数据请求部分
		$.get("/v2-web/get_public_key_hash_by_address", {
				from_address: address
			},
			function (result1) {
				publicKeyHash = result1.data;

				//数据请求部分
				$.get("/v2-web/get_block_by_height?height=" + height,
					function (result2) {
						blockhash = result2.data.block_hash;

						//数据请求部分
						$.get("/internal/accountState", {
								publicKeyHash: publicKeyHash,
								blockHash: blockhash
							},
							function (result) {
								$("#HistoricalBalance").html(result.data.account.balance/100000000);
								$("#HistoricalVotes").html(result.data.account.vote/100000000);

								address = address.substring(2,address.length);
								//数据请求部分
								$.get("/v2-web/get_vote_list_by_height",{
										from_address:address,
										height:height
								},
									function (result3) {
										if (result3.code == "2000"&&result3.data.length>0) {
											setHtml(result3.data, 'tpl4', 'blockHeight-content');
										}
							 		});
							 });
					});
			});
	}
}


