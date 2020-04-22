
var coinAddress = GetQueryString("coinaddress");
getProveList(coinAddress)

function getProveList(coinAddress) {
    //数据请求部分
    $.post(HttpHead + "/prove/getProveListByCoinHash/",{
            coinHash:coinAddress
    },
        function(result) {
            if (result.code == "2000") {
                setHtml(result.data, 'tpl3', 'block-content');
            }

   });

}



