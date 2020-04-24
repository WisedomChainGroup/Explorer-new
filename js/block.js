$(function() {
	$.get(HttpHead+"/accountSort/explorerInfo",
			function(result) {
				setHtml(result.data, 'tpl', 'block_data_browser1');
				$('#totalPage').html(parseInt(result.data.lastConfirmedHeight/10));
			}); 
			var page = GetQueryString("page");
			 
			if (page != undefined &&
				page != null &&
				page != "undefined" &&
				page != "null" &&
				page != "") {
			
				if (page < 1) {
					page = 1;
				}
				Blocklist(page);
			} else {
				Blocklist(1);
			} 
			function Blocklist(page = 1)
			{
				 $.post(HttpBlockHead+"/block/list", {page:page},
				 		function(result) {
						var sortlist=result.data.sort(function(a,b){return b.nheight-a.nheight});
						$('#curr_page').html(page)
				 		setHtml(sortlist, 'tpl3', 'block-details');
						
						//首页
						$("#first_page").click(function() {
							//getTransferLogList(10, 1);
							location.href = "block.html?page=0";
						});
						
						//最后一页
						$('#last_page').click(function() {
							var totalPage = $('#totalPage').html();
						
							location.href = "block.html?page=" + totalPage;
							//getTransferLogList(10, totalPage);
						});
						 	 	
						//上一頁
						$("#pre_page").click(function() {
							var curr_page = parseInt($('#curr_page').html());
							var totalPage = parseInt($('#totalPage').html());
							if (curr_page > 0) {
								page = curr_page - 1;
							}else{
								page=curr_page;
							}
							location.href = "block.html?page=" + page;
						});
						//下一頁
						$("#next_page").click(function() {
							var curr_page = parseInt($('#curr_page').html());
							var totalPage = parseInt($('#totalPage').html());
							if (curr_page < totalPage) {
								page = curr_page + 1;
							}else{
								page=curr_page;
							}
							location.href = "block.html?page=" + page;
						});
				 });
			}
 });
 
 

 

 
/* $(function(){
 	

 //});
  
  
  /*function blocklist(page = 1){
 	 $.post("http://127.0.0.1:8080/block/list", {page:page,size:'10'},
 	 		function(result) {
 				console.log(result.data.pages)
 	 		$('#totalPage').html(result.data.pages)
 			$('#curr_page').html(page)
 	 			//alert(result.data.list.length);
 	 		setHtml(result.data.list, 'tpl3', 'block-details');
 
 	 		//首页
 	 		$("#first_page").click(function() {
 	 			//getTransferLogList(10, 1);
 	 			location.href = "block.html?page=1";
 	 		});
 	 		
 	 		//最后一页
 	 		$('#last_page').click(function() {
 	 			var totalPage = $('#totalPage').html();
 				console.log(totalPage)
 	 			location.href = "block.html?page=" + totalPage;
 	 			//getTransferLogList(10, totalPage);
 	 		});
 	 	
 	 		//上一頁
 	 		$("#pre_page").click(function() {
 	 			var curr_page = parseInt($('#curr_page').html());
 	 			var totalPage = parseInt($('#totalPage').html());
 	 			if (curr_page > 1) {
 	 				page = curr_page - 1;
 	 			}else{
 	 				page=curr_page;
 	 			}
 	 			location.href = "block.html?page=" + page;
 	 		});
 	 		//下一頁
 	 		$("#next_page").click(function() {
 	 			var curr_page = parseInt($('#curr_page').html());
 	 			var totalPage = parseInt($('#totalPage').html());
 	 			if (curr_page < totalPage) {
 	 				page = curr_page + 1;
 	 			}else{
 	 				page=curr_page;
 	 			}
 	 			location.href = "block.html?page=" + page;
 	 		}); 
 	 }); */
 	 
  //}