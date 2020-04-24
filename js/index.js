$(function() {
	 $.post(HttpHead+"/product/getTicker?market=wdc_qc",
		function(result) {
			//$('#price').find('font').find('font').innerText=result.data.last;
			setHtml(result.data, 'tpl', 'block_data_test');
		}); 
		
	 $.get(HttpHead+"/accountSort/explorerInfo",
		function(result) {
			setHtml(result.data, 'tpl1', 'block_data_browser');
			
			/* $("#add").mouseenter(function(){
			    alert('id="add" 的元素上!');
			  }); */
		}); 
 });
