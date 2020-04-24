
function toUtf8(str) {   
    var out, i, len, c;   
    out = "";   
    len = str.length;   
    for(i = 0; i < len; i++) {   
        c = str.charCodeAt(i);   
        if ((c >= 0x0001) && (c <= 0x007F)) {   
            out += str.charAt(i);   
        } else if (c > 0x07FF) {   
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));   
            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));   
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));   
        } else {   
            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));   
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));   
        }   
    }   
    return out;   
}
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
			result.data.payload = toUtf8(result.data.payload)
			
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


