 // var HttpHead="http://192.168.1.138:8080";  //正式
 var HttpBlockHead = "https://scannode.hkcyb.pro"; //正式
//var HttpBlockHead="http://192.168.1.67:8080";//测试
//var HttpBlock="http://47.96.67.155:19585"; //节点请求地址

//var HttpHead;
//	测试线上
//var HttpHead = "http://47.52.195.58:9090/wisechain";
//正式
//var HttpBlockHead = "https://scannode.hkcyb.pro";
//var HttpBlockHead = "http://192.168.1.137:8081";
 var HttpHead="https://wdcwallet.hkcyb.pro/wisechain";

/**
 * 设置模板宣言
 * @param {Object} val
 * @param {Object} p
 * @param {Object} s
 */
function setHtml(val, p, s) {
	var type = typeof val;
	if (type != "object" || val.length <= 0) return;
	var tpl = $("#" + p).html(); //document.getElementById(p).innerHTML;
	if (tpl===""){
		tpl = $("#page_footer").html(); //document.getElementById(p).innerHTML;
	}
	var data = {
		obj: val
	};
	var html = template(tpl, data);
	//document.getElementById(s).innerHTML = html;
	$("#" + s).html(html);
}
/**
 * 参数接收
 * @param {Object} name
 */
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

/**
 * 搜索
 */
function soso_tag(type) {
    var type=type||1;
	var sosoval;
	if (type == 2) {
		sosoval = $("#sosowap").val();

		if (sosoval == "") {
			alert("Please enter the search content!");
			return;
		}
	} else {
		sosoval = $("#soso").val();

		if (sosoval == "") {
			alert("Please enter the search content!");
			return;
		}
	}
			var indexsearch = $('#indexsearch').val();
			if (indexsearch == 2) {
				//存证
				location.href = "blockverify.html?hash=" + sosoval;

			} else if (indexsearch == 3) {
				//资产
				location.href = "assetsList.html?coinaddress=" + sosoval;

			} else {
				if (sosoval.substring(0,2) == "WX") {

					location.href = "particulars.html?coinaddress=" + sosoval;


				} else {
					if (!isNaN(sosoval)) {
						location.href = "blockList.html?height=" + sosoval;
					} else {
						location.href = "account.html?hash=" + sosoval;
					}
				}
			}

}

$('#indexsearch').bind("change", function() {
	var searchval = $(this).val();
	if (searchval == 2) {
		//$("#soso").attr('placeholder','请输入企业名')
		$("#soso").attr('placeholder', 'trading hash');
	} else if (searchval == 3) {
		$("#soso").attr("placeholder", "token name/trading hash/hash160");
	} else {
		$("#soso").attr("placeholder", "address/trading Hash/block height");
	}
});

$('.soso').keydown(function(e) {
	var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
	if (key == 13) {
		soso_tag();
	}
});



/**
 * 应用搜索
 */
function sosoApp_tag() {
	var sosoval = $("#sosoApp").val();
	//alert(sosoval);
	if (sosoval == "") {
		alert("Please enter the search content!");
		return;
	}
	$.post("/v2-web/get_transfer_by_tx_hash", {
			tx_hash: sosoval,
		},

		function(result) {

			if (result.data == "0") {
				location.href = "hatch.html?coinaddress=" + sosoval;
			} else {
				location.href = "incubation.html?hash=" + sosoval;
			}

		});
}

$('#sosoApp').keydown(function(e) {
	var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
	if (key == 13) {
		sosoApp_tag();
	}
});



/**
 * 事务池搜索
 */
function sosoPool_tag() {
	var sosoval = $("#sosoPool").val();
	//alert(sosoval);
		if (sosoval == "") {
			alert("请输入搜索内容");
			return;
		}
		if (sosoval.substring(0,2) == "WX") {
			location.href = "poolList.html?coinaddress=" + sosoval;
		} else {
			//location.href = "incubation.html?hash=" + sosoval;
			alert("非法地址");
		}
	}


$('#sosoPool').keydown(function(e) {
	var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
	if (key == 13) {
		sosoPool_tag();
	}
});

$('#soso').keydown(function(e) {
	var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
	if (key == 13) {
		soso_tag();
	}
});
