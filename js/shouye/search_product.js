mui.init();

var pageNo = 1;
var pageSize = 10;
var totalPage = 10;
var shopId = getQueryString('shopId');
var searchContent = getQueryString('searchContent');
mui('#pullrefresh').pullRefresh({
	container: '#pullrefresh',
	up: {
		height: 50, //可选.默认50.触发上拉加载拖动距离
		auto: true, //可选,默认false.自动上拉加载一次
		contentrefresh: '正在加载...',
		callback: function() {
			_that = this;
			getProductList(function(returnData) {
				if(returnData.resultSuccess) {
					totalPage = returnData.data.totalPage;
					addEleToList(returnData.data.listRoute);
					if(pageNo >= totalPage) {
						_that.endPullupToRefresh(true);
					} else {
						_that.endPullupToRefresh(false);
					}
					pageNo += 1;
				} else {
					mui.alert(returnData.msg);
					_that.endPullupToRefresh(true);
				}
			});
		}
	}
});

//向列表追加
function addEleToList(list) {
	if(list.length === 0) return;
	// console.log(data.data);
	var source = $("#product_list_templete").html();
	var render = template.compile(source);
	var html = render({
		list: list
	});
	 console.log('has data')

	var oldHtml = document.getElementById('product_list').innerHTML;
	document.getElementById('product_list').innerHTML = oldHtml + html;
}

//查找列表
function getProductList(callback) {
	
	var queryTerm2 = new QueryTerm();
	queryTerm2.shopid = shopId;
	queryTerm2.name = searchContent;
	queryTerm2.pageNo = pageNo;
	queryTerm2.pageSize = pageSize;
	$.ajax({
		url: rootPath + '/api/product/selectByProduct',
		data: queryTerm2,
		dataType: 'json',
		success: function(returnData) {
			console.log(returnData);
			callback(returnData);
		},
		error: function(err) {
			console.log(err);
		}
	});
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
	var productId = $(this).attr('data-productId');
	console.log(shopId);
	console.log(productId);
	if(shopId === 0) {
		window.location.href = "../jiFen_shangCheng/shangPin_detail.html?productId=" + productId;
	} else {
		window.location.href = "shop_detail_cate.html?productId=" + productId + "&shopId=" + shopId;
	}
})