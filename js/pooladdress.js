/**
 * 根据事务hash获取区块信息
 * @param {Object} hash
 */
function userTransferLog(hash) {
	
	//var hash = "undefined" ? "" : hash;
	if ( hash== "") {
		//alert();
		$("#content").html("No information was found！");
		return;
	} 
	$("#sosoPool").val(hash);
	$("#sosoPoolwap").val(hash);
	//数据请求部分
	$.post(HttpHead + "/userTransferLog/getPoolAddressInfo/", {
		blockHash: hash,
	},
	function(result) {
		
		console.log(result.data);
		
		if(result.code=="2000" &&result.data!=""){
			setHtml(result.data,'tpl','content');
		}else{
			$("#content").html("No information was found！");
		}
		
	});

}


var GetQueryString_hash = GetQueryString("coinaddress");

if(GetQueryString_hash != undefined && 
	GetQueryString_hash != null && 
	GetQueryString_hash != "undefined" && 
	GetQueryString_hash != "null" && 
	GetQueryString_hash != "") {
		$("#sosoPool").val(GetQueryString_hash);
		$("#sosoPoolwap").val(GetQueryString_hash);
		//alert(GetQueryString_hash);
	//localStorage.hash = GetQueryString_hash;
	//getDetailInfo(localStorage.biMarker);
	userTransferLog(GetQueryString_hash);
	//userTransferLog("83ed8ce2f67cc3e05543d637ddd708ba2691dcd827c54e38a7e37a522739c60f");
}

