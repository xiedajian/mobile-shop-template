mui.init();

var pageNo = 0;
var pageSize = 10;
var totalPage = 0;
var shopId = getQueryString('shopId');
var searchContent = getQueryString('searchContent');
mui('#pullrefresh').pullRefresh({
	container: '#pullrefresh',
	up: {
		height: 50, //可选.默认50.触发上拉加载拖动距离
		auto: true, //可选,默认false.自动上拉加载一次
		contentrefresh: '正在加载...',
		callback: pulldownRefresh
	}
});

function pulldownRefresh() {
	setTimeout(function() {
		if(totalPage == 0 || pageNo < totalPage) {
			pageNo++;
			var source2 = $("#product_list_templete").html();
			var queryTerm2 = new QueryTerm();
			queryTerm2.shopid = shopId;
			queryTerm2.name = searchContent;
			queryTerm2.pageNo = pageNo;
			queryTerm2.pageSize = pageSize;
			addDataToBox(queryTerm2, source2, 'product_list', rootPath + '/api/product/selectByProduct', 1);
			mui('#pullrefresh').pullRefresh().endPullupToRefresh((true)); //参数为true代表没有更多数据了。		
			//			mui('#pullrefresh').pullRefresh().refresh(true);
		}
	}, 500);

}

$('.wrapper p').on('tap', function() {
	$('.wrapper p').css('color', '#333');
	$(this).css('color', '#FD5100');
	var link1 = $(this).parent().attr('data-link');
	console.log(link1);
	setTimeout(function() {
		$('.mui-slider-group').css('display', 'none');
		$('#slider').css('height', '50px');
		window.location.href = link1;
	}, 300)

})
$(document).on('tap', function(e) {
	console.log(e.target.className);
	if(e.target.className == "mui-slider-item mui-control-content mui-active" || e.target.className == "mui-slider-item mui-control-content") {
		$('.mui-slider-group').css('display', 'none');
		$('#slider').css('height', '50px');
	}
})
$('.mui-control-item').on('tap', function() {
	$('.mui-slider-group').css('display', 'block');
	var hei = $('.mui-content').height();
	$('#slider').css('height', hei);
})

//跳转到商品详情
$('.mui-content').on('tap', 'li', function() {
	var productId=$(this).attr('data-productId');
	console.log(shopId);
	console.log(productId);
	if(shopId === 0) {
		window.location.href ="../jiFen_shangCheng/shangPin_detail.html?productId=" + productId;
	} else {
		window.location.href = "shop_detail_cate.html?productId="+productId+"&shopId="+shopId;
	}
})