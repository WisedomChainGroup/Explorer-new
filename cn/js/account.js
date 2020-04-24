/**
 * 根据事务hash获取区块信息
 * @param {Object} hash
 */
function userTransferLog(hash) {
	//var hash = "undefined" ? "" : hash;
	if ( hash== "") {
		//alert();
		$("#content").html("未查到该信息");
		return;
	} 
	//数据请求部分
	$.post(HttpHead + "/userTransferLog/getTransferLog/", {
		blockHash: hash,
	},
	function(result) {
		
		var coinHash160=result.data[0].coinHash160;
		if(result.code=="2000"){
			if(coinHash160!=null){
				//判断是否转的代币
				getParseContract(coinHash160);
			}
			setHtml(result.data,'tpl','content');
		}
		
	});

}
/**
 * 根据事务hash获取区块信息
 * @param {Object} hash
 */
function getParseContract(coinHash160) {
	//var hash = "undefined" ? "" : hash;
	if (coinHash160 == "") {
	
		return;
	}
			//数据请求部分
		$.post(HttpHead + "/userTransferLog/getParseContractTx/", {
				coincode: coinHash160,
			},
		
			function(result) {
				if (result.code == "2000") {
					
					$('#biname').html(result.data.code);
					
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

