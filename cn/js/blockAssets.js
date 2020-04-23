
/**
 * 根据事务hash获取区块信息
 * @param {Object} hash
 */
function getParseContract(coinaddress,type=1,pageIndex=1) {
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
		
				console.log(result.data);
		
				if (result.code == "2000") {
					if (result.data.allowincrease==1) {
						result.data.allowincrease = "允许"
					} else{
						result.data.allowincrease = "不允许"
					}
					
					if(type==1){
						 getTransferLogList(result.data.coinHash160,'',type,pageIndex);
					}else if(type==2){//转账记录
						 getTransferLogList(result.data.createuserAddress,result.data.coinHash160,type,pageIndex);
						
					}else if(type==3){
						 getTransferLogList(result.data.coinHash160,'',type,pageIndex);
					}
				   
					
					$('.codes').html(result.data.code);
					setHtml(result.data, 'tpl', 'blocks_data_List');
				}
		
			});
}


function getTransferLogList(coinhash='',coinhash160='',type=1, pageIndex = 1) {
	if (coinhash == "") {
		//alert();
		$("#block-content").html("未查到该信息");
		return;
	}

	//console.log(coinhash)
	//console.log(type)
	if(type==2){  //转账事务
		//数据请求部分
		$.post(HttpHead + "/userTransferLog/getTransferLogList/", {
				coinAddress:coinhash,
				txHash:coinhash160,
				pageSize: 10,
				pageIndex: pageIndex
			},
		
			function(result) {
		
				console.log(result);
		
				if (result.code == "2000") {
					
					for (var i = 0; i < result.data.length; i++) {
						result.data[i].hash = result.data[i].blockHash;
						var blockHash = result.data[i].blockHash.substring(0, 5) + "***" + result.data[i].blockHash.substring(result.data[
							i].blockHash.length - 5, result.data[
							i].blockHash.length);
						result.data[i].blockHash = blockHash;
		
					}
					setHtml(result.data, 'tpl2', 'transactions_data_List');
					//分页处理
					$('#totalCount').html(result.pageQuery.totalCount);
					$('#curr_page').html(result.pageQuery.pageIndex);
					$('#totalPage').html(result.pageQuery.totalPage);
				}
		
			});
			
	}else if(type==3){  //所有权
			//数据请求部分
		$.post(HttpHead + "/assetOwner/getAssetOwner/", {
				coidHash160: coinhash,
				pageSize: 10,
				pageIndex: pageIndex
			},
			function(result) {
		
				console.log(result);
		
				if (result.code == "2000") {
					for (var i = 0; i < result.data.length; i++) {
						result.data[i].hash = result.data[i].coinHash;
						var blockHash = result.data[i].coinHash.substring(0, 5) + "***" + result.data[i].coinHash.substring(result.data[
							i].coinHash.length - 5, result.data[
							i].coinHash.length);
						result.data[i].coinHash = blockHash;
		
					}
					setHtml(result.data, 'tpl3', 'transactions_data_List');
					//分页处理
					/* $('#totalCount').html(result.pageQuery.totalCount);
					$('#curr_page').html(result.pageQuery.pageIndex);
					$('#totalPage').html(result.pageQuery.totalPage); */
				}
		
			});
	}else{  //增发
			//数据请求部分
		$.post(HttpHead + "/assetIncreased/getAssetIncreased/", {
				coidHash160: coinhash,
				pageSize: 10,
				pageIndex: pageIndex
			},
			function(result) {
		
				//console.log(result.data);
		
				if (result.code == "2000") {
					for (var i = 0; i < result.data.length; i++) {
						result.data[i].coinHash = result.data[i].coinHash;
						var blockHash = result.data[i].coinHash.substring(0, 5) + "***" + result.data[i].coinHash.substring(result.data[
							i].coinHash.length - 5, result.data[
							i].coinHash.length);
						result.data[i].coinHash = blockHash;
		
					}
					setHtml(result.data, 'tpl1', 'transactions_data_List');
					//分页处理
				/* 	$('#totalCount').html(result.pageQuery.totalCount);
					$('#curr_page').html(result.pageQuery.pageIndex);
					$('#totalPage').html(result.pageQuery.totalPage); */
				}
		
			});
		
		
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
		 $('.tabst').css('left','1.5rem');
	}else if(type==2){
		$('.tabst').css('left','6.3rem');
	}else{
		$('.tabst').css('left','11.6rem');
	}
	
	for(var i =1 ;i<4;i++){
	     if(i!=type){
				    $('.tab'+i).css('display','none');
		 }
	}
	
}else{
	//alert($("#sosowap").val());
	 $('.tabst').css('left','1.5rem');
	 for(var i =1 ;i<4;i++){
          if(i!=1){
			    $('.tab'+i).css('display','none');
		  }
	 }
	
	getParseContract(GetQueryString_address,1,1);
	//getTransferLogList(GetQueryString_address,1,1);
}

$(function() {

   $(".sub").click(function() {
   	//getTransferLogList(10, 1);
	 var type =$(this).attr("data-type");

   	 location.href = "assetsList.html?pageIndex=1&coinaddress="+coinaddress+"&type="+type;
   });
   
    var coinaddress=GetQueryString_address;//$("#soso").val();
    if(type==null){
		type=1;
	}
	//首页
	$("#first_page").click(function() {
		//getTransferLogList(10, 1);
		location.href = "assetsList.html?pageIndex=1&coinaddress="+coinaddress+"&type="+type;
	});

	//最后一页
	$('#last_page').click(function() {
		var totalPage = $('#totalPage').html();
		location.href = "assetsList.html?pageIndex=" + totalPage+"&coinaddress="+coinaddress+"&type="+type;
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
		location.href = "assetsList.html?pageIndex=" + pageIndex+"&coinaddress="+coinaddress+"&type="+type;
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
		location.href = "assetsList.html?pageIndex=" + pageIndex+"&coinaddress="+coinaddress+"&type="+type;
	});
})
