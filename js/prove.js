//var pageIndex = 1;
//var totalPage = 0;

function getTransferLogList(pageSize = 10, pageIndex = 1) {


    //数据请求部分
    $.post(HttpHead + "/prove/getProveList/", {
            pageSize: pageSize,
            pageIndex: pageIndex
        },

        function(result) {
            if (result.code == "2000") {
                var list = result.data;
                for (var i = 0;i<list.length;i++){
                    var arr = list[i].payload;
                    if(arr == null){
                        list[i].payload = "";
                    }else {
                        if (typeof arr === 'string') {
                            return arr;
                        }
                        var str = "";
                        for (var j = 0; j < arr.length; j++) {
                            var tmp;
                            var num = arr[j];
                            if (num < 0) {
                                //此处填坑，当byte因为符合位导致数值为负时候，需要对数据进行处理
                                tmp = (255 + num + 1).toString(16);
                            } else {
                                tmp = num.toString(16);
                            }
                            if (tmp.length == 1) {
                                tmp = "0" + tmp;
                            }
                            str += tmp;
                        }
                        list[i].payload = str;
                    }
                }
                setHtml(list, 'tpl2', 'block-content');
                //分页处理
                $('#totalCount').html(result.pageQuery.totalCount);
                $('#curr_page').html(result.pageQuery.pageIndex);
                $('#totalPage').html(result.pageQuery.totalPage);

            }

        });
}

var pageIndex = GetQueryString("pageIndex");

if (pageIndex != undefined &&
    pageIndex != null &&
    pageIndex != "undefined" &&
    pageIndex != "null" &&
    pageIndex != "") {

    if (pageIndex < 1) {
        pageIndex = 1;
    }
    getTransferLogList(10, pageIndex);

} else {
    getTransferLogList(10, 1);
}

$(function() {
    //首页
    $("#first_page").click(function() {
        //getTransferLogList(10, 1);
        location.href = "assets.html?pageIndex=1";
    });

    //最后一页
    $('#last_page').click(function() {
        var totalPage = $('#totalPage').html();
        location.href = "assets.html?pageIndex=" + totalPage;
        //getTransferLogList(10, totalPage);
    });
    //上一頁
    $("#pre_page").click(function() {
        var curr_page = parseInt($('#curr_page').html());
        var totalPage = parseInt($('#totalPage').html());
        if (curr_page > 1) {
            pageIndex = curr_page - 1;
        }else{
            pageIndex=curr_page;
        }
        location.href = "assets.html?pageIndex=" + pageIndex;
    });
    //下一頁
    $("#next_page").click(function() {
        var curr_page = parseInt($('#curr_page').html());
        var totalPage = parseInt($('#totalPage').html());
        if (curr_page < totalPage) {
            pageIndex = curr_page + 1;
        }else{
            pageIndex=curr_page;
        }
        location.href = "assets.html?pageIndex=" + pageIndex;
    });
})



