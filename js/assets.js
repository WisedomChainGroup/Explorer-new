//var pageIndex = 1;
//var totalPage = 0;

function getTransferLogList() {

	
	//数据请求部分
	$.post(HttpHead + "/coin/getCoinList/",

		function(result) {

			if (result.code == "2000") {
				
				console.log(result.data);
				setHtml(result.data, 'tpl2', 'block-content');
				//分页处理
				$('#totalCount').html(result.data.length);
			
			}

		});
}

$(function(){
	getTransferLogList();
	
})
	



