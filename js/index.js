$(function() {
	 $.get("/ceo/api/market/ticker?market=wdc_qc",
		function(result) {
			//$('#price').find('font').find('font').innerText=result.data.last;
			setHtml(result.data, 'tpl', 'block_data_test');
		});



         $.ajax(
		 		{
			 url:"/WisdomCore/ExplorerInfo",
            success:function(result){
					setHtml(result.data, 'tpl1', 'block_data_browser');},
            error:function(result){console.log("error");}
          	 }
		);
 });
