
var coinAddress = GetQueryString("coinaddress");
getProveList(coinAddress)

function getProveList(coinAddress) {
    //数据请求部分
    $.post(HttpHead + "/prove/getProveListByCoinHash/",{
            coinHash:coinAddress
    },
        function(result) {
            if (result.code == "2000") {
                result.data.fee = (result.data.fee)/100000000;
                if(result.data.status == 1){
                    result.data.status = "成功";
                }else{
                    result.data.status = "失败";
                }
                let address = result.data.coinAddress.substring(0, 2);
                if(address !=  "WX"){
                    result.data.coinAddress = "WX" + result.data.coinAddress;
                }
                setHtml(result.data, 'tpl3', 'block-content');
            }

   });

}



