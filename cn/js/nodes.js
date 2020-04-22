$(function() {
	
	$.post(HttpHead+"/userMortgage/getUserMortgageList",
			function(result) {
				//alert(result.data.length)
				var sum=0;
				for(var i=0;i<result.data.length;i++)
				{
					sum+=result.data[i].voteAmount;
				}
				var restr=fmoney(sum, 1).replace('.0','');
				$('#totalCount').html(restr);
				setHtml(result.data, 'tpl3', 'block_data_node');
			}); 
	function fmoney(s, n) { 
	n = n > 0 && n <= 20 ? n : 2; 
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ""; 
	var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1]; 
	t = ""; 
	for (i = 0; i < l.length; i++) { 
	t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : ""); 
	} 
	return t.split("").reverse().join("") + "." + r; 
	} 
});

