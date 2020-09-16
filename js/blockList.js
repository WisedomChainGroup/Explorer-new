$(function() {
	var height = GetQueryString("height");
	if (height != undefined &&
		height != null &&
		height != "undefined" &&
		height != "null" &&
		height != "") {
		blockListPlay(height);
	} else {
		window.location.href='block.html';
	}

	$('#div_transaction').click(function(){
		$('.box').slideToggle();
		$('#table_showdiv').css('visibility','visible');
	});
	$('#table_showdiv').click(function(){
		$('.box').slideToggle();
		$('#table_showdiv').css('visibility','hidden');
	});
});

function blockListPlay(height){
	$.get("/v2-web/get_block_by_height?height="+height,
		function(result) {
			let blockRewade;
			for(let i = 0;i<result.data.body.length;i++){
				if(result.data.body[i].type == 0){
					blockRewade = result.data.body[i].amount;
				}
			}
			if(result.data.miner_address.substring(0,2) != "WX" ){
				result.data.miner_address= "WX" + result.data.miner_address;
			}
			result.data.blockRewade = blockRewade;
			result.data.remarks = result.data.body.length;
			result.data.time = formatDate(result.data.time);
			setHtml(result.data, 'tpl3', 'blocks_data_List');
		for (let i = 0; i < result.data.body.length; i++) {
			if(result.data.body[i].to_address.substring(0,2) != "WX" ){
				result.data.body[i].to_address= "WX" + result.data.body[i].to_address;
			}
			if(result.data.body[i].from == "0000000000000000000000000000000000000000000000000000000000000000"){
				result.data.body[i].from_address = "";
			}else if(result.data.body[i].from.substring(0,2) != "WX" ){
				result.data.body[i].from_address = "WX" + result.data.body[i].from_address;
			}
			if(result.data.body[i].type == "7" || result.data.body[i].to == "0000000000000000000000000000000000000000"){
				result.data.body[i].to_address = result.data.body[i].to + "(WDC)";
			}
			result.data.body[i].tx_hash = result.data.body[i].tx_hash.substring(0, 5) + "***" + result.data.body[i].tx_hash.substring(result.data.body[i].tx_hash.length - 5, result.data.body[i].tx_hash.length);
			//事务类型处理
				if(result.data.body[i].type == "0"){
				result.data.body[i].type='CoinBase';
			}else if(result.data.body[i].type == "1"){
				result.data.body[i].type='Transfer';
			}else if(result.data.body[i].type == "2"){
				result.data.body[i].type='Vote';
			}else if(result.data.body[i].type == "3"){
				result.data.body[i].type='Deposit';
			}else if(result.data.body[i].type == "7"){
				result.data.body[i].type='Rule Deployment';
			}else if(result.data.body[i].type == "8"){
				result.data.body[i].type='Rule Call';
			}else if(result.data.body[i].type == "9"){
				result.data.body[i].type='Incubator';
			}else if(result.data.body[i].type == "10"){
				result.data.body[i].type='Extract Interest';
			}else if(result.data.body[i].type == "11"){
				result.data.body[i].type='Extract sharing';
			}else if(result.data.body[i].type == "12"){
				result.data.body[i].type='Extract Cost';
			}else if(result.data.body[i].type == "13"){
				result.data.body[i].type='Quit Vote';
			}else if(result.data.body[i].type == "14"){
				result.data.body[i].type='Mortgage';
			}else if(result.data.body[i].type == "15"){
				result.data.body[i].type='Quit Mortgage';
			}
		}
		setHtml(result.data.body, 'tpl4', 'transactions_data_List');
	});
}

function formatDate(date) {
	var date = new Date(date * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
	var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
	var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
	var s = (date.getSeconds()< 10 ? '0'+date.getSeconds() : date.getSeconds());
	return Y+M+D+h+m+s;
}
