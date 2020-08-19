
/**
 * 根据事务hash获取区块信息
 * @param {Object} hash
 */
function getParseContract(coinaddress,type,pageIndex,addressSearch) {
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
				if(result.data.code == "WGC"){
					result.data.info = "十方盾，英文：Wisdom guardian coin，简称：WGC，WGC是基于公链WDC底层技术，实现实时的点对点交换和支付服务。WGC将适用于贝诺国际全球业务以及影视众筹等项目。";
				}
				if(result.data.code == "TGB"){
					result.data.info = "TGB 基于公链WDC底层技术，实现实时的点对点交换和支付服务。TGB将适用于泰国境内旅游、酒店预订、餐饮、购买水果等一条龙服务。";
				}
				if (result.data.allowincrease==1) {
					result.data.allowincrease = "Yes"
				} else{
					result.data.allowincrease = "No"
				}

				if(type==1){
					getTransferLogList(result.data.coinHash160,'',type,pageIndex,addressSearch);
				}else if(type==2){//转账记录
					getTransferLogList(result.data.createuserAddress,result.data.coinHash160,type,pageIndex,addressSearch);

				}else if(type==3){
					getTransferLogList(result.data.coinHash160,'',type,pageIndex,addressSearch);
				}


				$('.codes').html(result.data.code);
				setHtml(result.data, 'tpl', 'blocks_data_List');
			}

		});
}

function searchCoinContract(page,index){
	var GetQueryString_address = GetQueryString("coinaddress");
	var type = GetQueryString("type");
	let addressSearch = document.getElementById("searchType").value;
	addressSearch = addressSearch.trim();
	getParseContract(GetQueryString_address,type,index,addressSearch);
}

function getTransferLogList(coinhash,coinhash160,type, pageIndex,addressSearch) {
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
	if(type==2){  //转账事务
		//数据请求部分
		if(addressSearch == "" || addressSearch == undefined ||
			addressSearch == null ||
			addressSearch == "undefined" ||
			addressSearch == "null" ) {
			$.post(HttpHead + "/userTransferLog/getTransferLogList/", {
					txHash: coinhash160,
					pageSize: startIndex2,
					pageIndex: pageIndex
				},

				function (result) {
					let number;
					if (pageIndex == null || pageIndex == 1) {
						number = 1;
					} else {
						number = ((pageIndex - 1) * startIndex2) + 1;
					}
					if (result.code == "2000") {

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

				});

		}else{
			if(addressSearch.slice(0,2) == "WX"){
				$.post(HttpHead + "/userTransferLog/getTransferLogList/", {
						txHash: coinhash160,
						coinAddress:addressSearch,
						pageSize: startIndex2,
						pageIndex: pageIndex
					},

					function (result) {
						let number;
						if (pageIndex == null || pageIndex == 1) {
							number = 1;
						} else {
							number = ((pageIndex - 1) * startIndex2) + 1;
						}
						if (result.code == "2000") {

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

					});
			}else{
				$.get(HttpHead + "/userTransferLog/getAssetTransferLogListByTxHash/", {
						txHash: addressSearch
					},
					function (result) {
						if (result.code == "2000") {
							var list = new Array();
							result.data.hash = result.data.blockHash;
							var blockHash = result.data.blockHash.substring(0, 5) + "***" + result.data.blockHash.substring(result.data.blockHash.length - 5, result.data
								.blockHash.length);
							result.data.blockHash = blockHash;
							result.data.number = 1;
							list[0] = result.data;
							setHtml(list, 'tpl2', 'transactions_data_List');
							//分页处理
							$('#totalCount').html(1);
							$('#curr_page').html(1);
							$('#totalPage').html(1);
						}
					});
			}

		}
	}else if(type==3){  //所有权
		if(addressSearch == "" || addressSearch == undefined ||
			addressSearch == null ||
			addressSearch == "undefined" ||
			addressSearch == "null" ) {
			//数据请求部分
			$.post(HttpHead + "/assetOwner/getAssetOwner/", {
					coidHash160: coinhash,
					pageSize: startIndex2,
					pageIndex: pageIndex
				},
				function (result) {
					let number;
					if (pageIndex == null || pageIndex == 1) {
						number = 1;
					} else {
						number = ((pageIndex - 1) * startIndex2) + 1;
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

				});
		}else if(addressSearch.slice(0,2) == "WX"){
			//数据请求部分
			$.post(HttpHead + "/assetOwner/getAssetOwner/", {
					coidHash160: coinhash,
					coinAddress:addressSearch,
					pageSize: startIndex2,
					pageIndex: pageIndex
				},
				function (result) {
					let number;
					if (pageIndex == null || pageIndex == 1) {
						number = 1;
					} else {
						number = ((pageIndex - 1) * startIndex2) + 1;
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

				});
		}else{
			//数据请求部分
			$.get(HttpHead + "/assetOwner/getAssetOwnerByTxHash/", {
					txHash:addressSearch
				},
				function (result) {
					if (result.code == "2000") {
						var list = new Array();
						result.data.hash = result.data.coinHash;
						var blockHash = result.data.coinHash.substring(0, 5) + "***" + result.data.coinHash.substring(result.data
							.coinHash.length - 5, result.data
							.coinHash.length);
						result.data.coinHash = blockHash;
						result.data.number = 1;
						list[0] = result.data;
						setHtml(list, 'tpl3', 'transactions_data_List');
						//分页处理
						$('#totalCount').html(1);
						$('#curr_page').html(1);
						$('#totalPage').html(1);
					}

				});
		}
	}else{  //增发
		//数据请求部分
		if(addressSearch == "" || addressSearch == undefined ||
			addressSearch == null ||
			addressSearch == "undefined" ||
			addressSearch == "null" ) {
			$.post(HttpHead + "/assetIncreased/getAssetIncreased/", {
					coidHash160: coinhash,
					pageSize: startIndex2,
					pageIndex: pageIndex
				},
				function (result) {
					let number;
					if (pageIndex == null || pageIndex == 1) {
						number = 1;
					} else {
						number = ((pageIndex - 1) * startIndex2) + 1;
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

				});

		}else if (addressSearch.slice(0,2) == "WX"){
			$.post(HttpHead + "/assetIncreased/getAssetIncreasedByAddress/", {
					coidHash160: coinhash,
					pageSize: startIndex2,
					pageIndex: pageIndex,
					ownerAddress:addressSearch
				},
				function (result) {
					let number;
					if (pageIndex == null || pageIndex == 1) {
						number = 1;
					} else {
						number = ((pageIndex - 1) * startIndex2) + 1;
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

				});
		}else{
			//数据请求部分
			$.get(HttpHead + "/assetIncreased/getAssetIncreasedByTxHash/", {
					txHash: addressSearch
				},
				function (result) {
					if (result.code == "2000") {
						var list = new Array();
						result.data.hash = result.data.coinHash;
						var blockHash = result.data.coinHash.substring(0, 5) + "***" + result.data.coinHash.substring(result.data
							.coinHash.length - 5, result.data
							.coinHash.length);
						result.data.coinHash = blockHash;
						result.data.number = 1;
						list[0] = result.data;
						setHtml(list, 'tpl1', 'transactions_data_List');
						//分页处理
						$('#totalCount').html(1);
						$('#curr_page').html(1);
						$('#totalPage').html(1);
					}

				});
		}
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
		$('.tabst').css('left','1。7rem');
	}else if(type==2){
		$('.tabst').css('left','6.3rem');
	}else{
		$('.tabst').css('left','12.1rem');
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

	getParseContract(GetQueryString_address,1,1);
	//getTransferLogList(GetQueryString_address,1,1);
}

function changePageSize(page){
	let startIndex = document.getElementById("select").value;
	var GetQueryString_address = GetQueryString("coinaddress");
	var type = GetQueryString("type");
	var searchType = GetQueryString("searchType");
	searchType = searchType.trim();
	if(page == undefined ||
		page == null ||
		page == "undefined" ||
		page == "null" ||
		page == ""){
		getParseContract1(GetQueryString_address,type,1,startIndex,searchType);
	}else {
		getParseContract1(GetQueryString_address,type,page,startIndex,searchType);
	}
}

/**
 * 根据事务hash获取区块信息
 * @param {Object} hash
 */
function getParseContract1(coinaddress,type,pageIndex,startIndex,searchType) {
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
				if(result.data.code == "WGC"){
					result.data.info = "十方盾，英文：Wisdom guardian coin，简称：WGC，WGC是基于公链WDC底层技术，实现实时的点对点交换和支付服务。WGC将适用于贝诺国际全球业务以及影视众筹等项目。";
				}
				if(result.data.code == "TGB"){
					result.data.info = "TGB 基于公链WDC底层技术，实现实时的点对点交换和支付服务。TGB将适用于泰国境内旅游、酒店预订、餐饮、购买水果等一条龙服务。";
				}
				if (result.data.allowincrease==1) {
					result.data.allowincrease = "Yes"
				} else{
					result.data.allowincrease = "No"
				}

				if(type==1){
					getTransferLogList1(result.data.coinHash160,'',type,pageIndex,startIndex,searchType);
				}else if(type==2){//转账记录
					getTransferLogList1(result.data.createuserAddress,result.data.coinHash160,type,pageIndex,startIndex,searchType);

				}else if(type==3){
					getTransferLogList1(result.data.coinHash160,'',type,pageIndex,startIndex,searchType);
				}


				$('.codes').html(result.data.code);
				setHtml(result.data, 'tpl', 'blocks_data_List');
			}

		});
}


function getTransferLogList1(coinhash,coinhash160,type, pageIndex,startIndex,searchType) {
	var coinhash=coinhash||'';
	var coinhash160=coinhash160||'';
	var type=type||1;
	var pageIndex=pageIndex||1;
	if (coinhash == "") {
		//alert();
		$("#block-content").html("信息未找到");
		return;
	}
	//console.log(coinhash)
	//console.log(type)
	if(type==2){  //转账事务
		//数据请求部分
		if(searchType == "" || searchType == undefined ||
			searchType == null ||
			searchType == "undefined" ||
			searchType == "null" ) {
			$.post(HttpHead + "/userTransferLog/getTransferLogList/", {
					txHash: coinhash160,
					pageSize: startIndex,
					pageIndex: pageIndex
				},

				function (result) {
					if (result.code == "2000") {
						let len = result.pageQuery.totalPage;
						if (pageIndex > len) {
							if (len == 0) {
								return;
							} else {
								alert("请输入正确的数字!");
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
		}else{
			if(searchType.slice(0,2) == "WX"){
				$.post(HttpHead + "/userTransferLog/getTransferLogList/", {
						txHash: coinhash160,
						coinAddress:addressSearch,
						pageSize: startIndex2,
						pageIndex: pageIndex
					},

					function (result) {
						let len = result.pageQuery.totalPage;
						if (pageIndex > len) {
							if (len == 0) {
								return;
							} else {
								alert("请输入正确的数字!");
							}
						} else {
							let number;
							if (pageIndex == null || pageIndex == 1) {
								number = 1;
							} else {
								number = ((pageIndex - 1) * startIndex2) + 1;
							}
							if (result.code == "2000") {

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
			}else{
				$.get(HttpHead + "/userTransferLog/getAssetTransferLogListByTxHash/", {
						txHash: searchType
					},
					function (result) {
						if (result.code == "2000") {
							var list = new Array();
							result.data.hash = result.data.blockHash;
							var blockHash = result.data.blockHash.substring(0, 5) + "***" + result.data.blockHash.substring(result.data.blockHash.length - 5, result.data
								.blockHash.length);
							result.data.blockHash = blockHash;
							result.data.number = 1;
							list[0] = result.data;
							setHtml(list, 'tpl2', 'transactions_data_List');
							//分页处理
							$('#totalCount').html(1);
							$('#curr_page').html(1);
							$('#totalPage').html(1);
						}
					});
			}
		}
	}else if(type==3){  //所有权
		//数据请求部分
		if(searchType == "" || searchType == undefined ||
			searchType == null ||
			searchType == "undefined" ||
			searchType == "null" ) {
			$.post(HttpHead + "/assetOwner/getAssetOwner/", {
					coidHash160: coinhash,
					pageSize: startIndex,
					pageIndex: pageIndex
				},
				function (result) {
					let len = result.pageQuery.totalPage;
					if (pageIndex > len) {
						if (len == 0) {
							return;
						} else {
							alert("请输入正确的数字!");
						}
					} else {
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
		}else if(searchType.slice(0,2) == "WX"){
			//数据请求部分
			$.post(HttpHead + "/assetOwner/getAssetOwnerByAddress/", {
					coidHash160: coinhash,
					address:searchType,
					pageSize: startIndex2,
					pageIndex: pageIndex
				},
				function (result) {
					let len = result.pageQuery.totalPage;
					if (pageIndex > len) {
						if (len == 0) {
							return;
						} else {
							alert("请输入正确的数字!");
						}
					} else {
						let number;
						if (pageIndex == null || pageIndex == 1) {
							number = 1;
						} else {
							number = ((pageIndex - 1) * startIndex2) + 1;
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
		}else{
			//数据请求部分
			$.get(HttpHead + "/assetOwner/getAssetOwnerByTxHash/", {
					txHash:searchType
				},
				function (result) {
					if (result.code == "2000") {
						var list = new Array();
						result.data.hash = result.data.coinHash;
						var blockHash = result.data.coinHash.substring(0, 5) + "***" + result.data.coinHash.substring(result.data
							.coinHash.length - 5, result.data
							.coinHash.length);
						result.data.coinHash = blockHash;
						result.data.number = 1;
						list[0] = result.data;
						setHtml(list, 'tpl3', 'transactions_data_List');
						//分页处理
						$('#totalCount').html(1);
						$('#curr_page').html(1);
						$('#totalPage').html(1);
					}

				});
		}
	}else{  //增发
		//数据请求部分
		if(searchType == "" || searchType == undefined ||
			searchType == null ||
			searchType == "undefined" ||
			searchType == "null" ) {
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
							alert("请输入正确的数字!");
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

		}else if (searchType.slice(0,2) == "WX"){
			$.post(HttpHead + "/assetIncreased/getAssetIncreasedByAddress/", {
					coidHash160: coinhash,
					pageSize: startIndex2,
					pageIndex: pageIndex,
					ownerAddress:searchType
				},
				function (result) {
					let len = result.pageQuery.totalPage;
					if(pageIndex > len){
						if(len == 0){
							return;
						}else {
							alert("请输入正确的数字!");
						}
					}else {
						let number;
						if (pageIndex == null || pageIndex == 1) {
							number = 1;
						} else {
							number = ((pageIndex - 1) * startIndex2) + 1;
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
		}else{
			//数据请求部分
			$.get(HttpHead + "/assetIncreased/getAssetIncreasedByTxHash/", {
					txHash: searchType
				},
				function (result) {
					if (result.code == "2000") {
						var list = new Array();
						result.data.hash = result.data.coinHash;
						var blockHash = result.data.coinHash.substring(0, 5) + "***" + result.data.coinHash.substring(result.data
							.coinHash.length - 5, result.data
							.coinHash.length);
						result.data.coinHash = blockHash;
						result.data.number = 1;
						list[0] = result.data;
						setHtml(list, 'tpl1', 'transactions_data_List');
						//分页处理
						$('#totalCount').html(1);
						$('#curr_page').html(1);
						$('#totalPage').html(1);
					}

				});
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

	var coinaddress=GetQueryString_address;//$("#soso").val();
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
		}else{
			location.href = "assetsList.html?pageIndex=1&coinaddress=" + coinaddress + "&type=" + type + "&select=" + startIndex + "&searchType=" +searchType;
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
		}else{
			location.href = "assetsList.html?pageIndex=" + totalPage + "&coinaddress=" + coinaddress + "&type=" + type + "&select=" + startIndex+ "&searchType=" +searchType;;
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
		}else{
			location.href = "assetsList.html?pageIndex=" + pageIndex + "&coinaddress=" + coinaddress + "&type=" + type + "&select=" + startIndex+ "&searchType=" +searchType;;
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
		}else{
			location.href = "assetsList.html?pageIndex=" + pageIndex + "&coinaddress=" + coinaddress + "&type=" + type + "&select=" + startIndex+ "&searchType=" +searchType;;
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
		alert("请输入正确的数字!");
	}
	changePageSize(page);
}