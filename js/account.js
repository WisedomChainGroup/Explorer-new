/**
 * 根据事务hash获取区块信息
 * @param {Object} hash
 */
function userTransferLog(hash,GetQueryString_hash160) {
	//var hash = "undefined" ? "" : hash;
	if ( hash== "") {
		//alert();
		$("#content").html("No information was found！");
		return;
	}
	//数据请求部分
	$.get("/v2-web/get_transfer_by_tx_hash", {
		tx_hash: hash
	},
		function(result) {

		//var coinHash160=result.data[0].coinHash160;
		if(result.code=="2000"){
			result.data.created_at = getTime(result.data.created_at);
			if (result.data.from_address.substring(0, 2) != "WX") {
				result.data.from_address = "WX" + result.data.from_address;
			}
			if (result.data.to_address.substring(0, 2) != "WX") {
				result.data.to_address = "WX" + result.data.to_address;
			}
			var code = GetQueryString("code");
			if(code!=null){
				//判断是否转的代币
					result.data.code = code;
			}else{
				result.data.code = "WDC";
			}
			setHtml(result.data,'tpl','content');
		}

	});
}
var GetQueryString_hash = GetQueryString("hash");
var code = GetQueryString("code");
if(GetQueryString_hash != undefined &&
	GetQueryString_hash != null &&
	GetQueryString_hash != "undefined" &&
	GetQueryString_hash != "null" &&
	GetQueryString_hash != "") {
	$("#soso").val(GetQueryString_hash);
	$("#sosowap").val(GetQueryString_hash);
	userTransferLog(GetQueryString_hash,code);
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
