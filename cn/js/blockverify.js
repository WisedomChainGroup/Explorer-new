/**
 * 根据事务hash获取存证信息
 * @param {Object} hash
 */
function userTransferLog(hash) {
	//var hash = "undefined" ? "" : hash;
	if ( hash== "") {
		//alert();
		$("#content").html("未查到该信息");
		return;
	} 
	//GET /userTransferLog/getTransaction
	//数据请求部分
	$.post(HttpHead + "/userTransferLog/getTransaction/", {
		coinHash: hash,
	},
	function(result) {

		if(result.code=="2000"){
			//result.data.fee = result.data.fee*0.00000001
			setHtml(result.data,'tpl','content');
		}
		
	});

}


var GetQueryString_hash = GetQueryString("hash");

if(GetQueryString_hash != undefined && 
	GetQueryString_hash != null && 
	GetQueryString_hash != "undefined" && 
	GetQueryString_hash != "null" && 
	GetQueryString_hash != "") {
		$("#soso").val(GetQueryString_hash);
		$("#sosowap").val(GetQueryString_hash);
		//alert(GetQueryString_hash);
	//localStorage.hash = GetQueryString_hash;
	//getDetailInfo(localStorage.biMarker);
	userTransferLog(GetQueryString_hash);
	//userTransferLog("83ed8ce2f67cc3e05543d637ddd708ba2691dcd827c54e38a7e37a522739c60f");
}

