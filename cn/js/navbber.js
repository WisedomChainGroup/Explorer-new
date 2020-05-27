$(document).ready(function(e) {
	$("#h-arrow,#h-assets").click(function(e) {
		if( $("#h-btnshow").hasClass("h-mobileMenuLanguage___3lWvP") ){
	// 执行隐藏
			$("#h-btnshow").hide().removeClass("h-mobileMenuLanguage___3lWvP");
			document.getElementById("h-arrow-down").style.display = "none";
			document.getElementById("h-arrow-right").style.display = "block";
		}else{
			// 显示
			$("#h-btnshow").show().addClass("h-mobileMenuLanguage___3lWvP");
			document.getElementById("h-arrow-down").style.display = "block";
			document.getElementById("h-arrow-right").style.display = "none";
		}
	 });
});
