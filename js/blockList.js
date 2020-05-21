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
	$.get(HttpBlockHead+"/block/detail?height="+height,
			function(result) {
			if(result.data.Minner.substring(0,2) != "WX" ){
				result.data.Minner = "WX" + result.data.Minner;
			}
				setHtml(result.data, 'tpl3', 'blocks_data_List');
			}); 
			
	$.get(HttpBlockHead+"/transactions/list?height="+height,
			function(result) {
				if (result.code == "200") {
					for (let i = 0; i < result.data.length; i++) {
						if(result.data[i].toaddress.substring(0,2) != "WX" ){
							result.data[i].toaddress = "WX" + result.data[i].toaddress;
						}
						if(result.data[i].fromaddress.substring(0,2) != "WX" ){
							result.data[i].fromaddress = "WX" + result.data[i].fromaddress;
						}
						//hash处理
						result.data[i].hash = result.data[i].transactionhash;
						var transactionhash = result.data[i].transactionhash.substring(0, 5) + "***" + result.data[i].transactionhash.substring(result.data[i].transactionhash.length - 5, result.data[i].transactionhash.length);
						result.data[i].transactionhash = transactionhash;
						//事务类型处理
						var type =  result.data[i].type;
						switch (type){
							case '0':
								result.data[i].type='CoinBase';
								result.data[i].fromaddress='';
								break;
							case '1':
								result.data[i].type='Transfer';
								break;
							case '2':
								result.data[i].type='Vote';
								break;
							case '3':
								result.data[i].type='Deposit';
								break;
							case '9':
								result.data[i].type='Incubator';
								break;
							case '10':
								result.data[i].type='Extract Interest';
								break;
							case '11':
								result.data[i].type='Extract sharing';
								break;
							case '12':
								result.data[i].type='Extract Cost';
								break;
							case '13':
								result.data[i].type='Quit Vote';
								break;
							case '14':
								result.data[i].type='Mortgage';
								break;
							case '15':
								result.data[i].type='Quit Mortgage';
								break;
							default:
								break;
						}
						result.data[i].transactionhash = transactionhash;
						result.data[i].amount = result.data[i].amount/100000000;
					}
					setHtml(result.data, 'tpl4', 'transactions_data_List');
				}
			}); 
}