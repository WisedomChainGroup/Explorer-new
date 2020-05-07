//	测试线上
//var HttpHead = "http://47.52.195.58:9090/wisechain";
 //正式
// var HttpBlockHead = "https://scannode.hkcyb.pro";
// var HttpHead="https://wdcwallet.hkcyb.pro/wisechain";  //正式
//var HttpBlockHead="http://localhost:8080";//测试
//var HttpBlock="http://47.96.67.155:19585"; //节点请求地址


// var HttpBlockHead = "http://192.168.1.83:8081";
// var HttpHead = "http://192.168.1.83:9090/wisechain";
//测试链是
var HttpBlockHead = "http://139.129.12.159:19585";
//测试后端服务器
var HttpHead = "http://139.129.12.159:9090/wisechain";


 



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
function soso_tag(type = 1) {;
	var sosoval;
	if (type == 2) {
		sosoval = $("#sosowap").val();

		if (sosoval == "") {
			alert("请输入搜索内容");
			return;
		}
	} else {
		sosoval = $("#soso").val();

		if (sosoval == "") {
			alert("请输入搜索内容");
			return;
		}
	}
	$.post(HttpHead + "/userTransferLog/verifyAddress/", {
			coinAddress: sosoval,
		},

		function(result) {

			
			var indexsearch = $('#indexsearch').val();
			if (indexsearch == 2) {
				//存证
				location.href = "blockverify.html?hash=" + sosoval;

			} else if (indexsearch == 3) {
				//资产
               location.href = "assetsList.html?coinaddress=" + sosoval;

			} else {
				if (result.data == "0") {
					
						location.href = "particulars.html?coinaddress=" + sosoval;
					

				} else {
					if (!isNaN(sosoval)) {
						location.href = "blockList.html?height=" + sosoval;
					} else {
					  location.href = "account.html?hash=" + sosoval;
					}
				}
			}


		});
}

$('#indexsearch').bind("change", function() {
	var searchval = $(this).val();
	if (searchval == 2) {
		//$("#soso").attr('placeholder','请输入企业名')
		$("#soso").attr('placeholder', '交易hash');
	} else if (searchval == 3) {
		$("#soso").attr("placeholder", "代币名称/交易hash/160hash");
	} else {
		$("#soso").attr("placeholder", "地址/交易Hash/区块高度");
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
		alert("请输入搜索内容");
		return;
	}
	$.post(HttpHead + "/userTransferLog/verifyAddress/", {
			coinAddress: sosoval,
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
	$.post(HttpHead + "/userTransferLog/verifyAddress/", {
			coinAddress: sosoval,
		},

		function(result) {
			if (result.data == "0") {
				location.href = "poolList.html?coinaddress=" + sosoval;
			} else {
				//location.href = "incubation.html?hash=" + sosoval;
				alert("非法地址");
			}

		});
}


$('#sosoPool').keydown(function(e) {
	var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
	if (key == 13) {
		sosoPool_tag();
	}
});
