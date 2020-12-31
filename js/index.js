$(function() {
	 $.get("https://www.ukeyc.com/api/market/tickers",
		function(result) {
		 for(let i=0;i<result.data.length;i++){
			 if(result.data[i].symbol == "wdcusdt"){
				 setHtml(result.data[i], 'tpl', 'block_data_test');
			 }
		 }

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
