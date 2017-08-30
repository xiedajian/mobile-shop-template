mui('#pullrefresh').pullRefresh({
	container: '#pullrefresh',
	up: {
		height: 50, //可选.默认50.触发上拉加载拖动距离
		auto: true, //可选,默认false.自动上拉加载一次
		contentrefresh: '正在加载...',
		callback: pulldownRefresh
	}
});

var categoryId;

if(getQueryString('categoryId')){
	console.log(11);
	categoryId=getQueryString('categoryId');
}else if(window.localStorage.getItem('jiaJu_yongPinPage-categoryId')){
	console.log(22);
	categoryId=window.localStorage.getItem('jiaJu_yongPinPage-categoryId');
	//避免污染，记得销毁
	window.localStorage.removeItem('jiaJu_yongPinPage-categoryId');
}

var source = $("#jiajuTemplate").html();
//	console.info(source)
var queryTerm = new QueryTerm();
queryTerm.typeid = 19; //积分商城首页分类
addDataToBox(queryTerm, source, 'jiaju', rootPath + '/api/shop/selectBymovebrand', 2);
var timer = setInterval(function() {

	if($("#item" + categoryId)) {
		if($("#item" + categoryId).hasClass('mui-active')) {
			clearInterval(timer);

		} else {

			$("#item" + categoryId).addClass('mui-active');
			var navActive = $("#jiaju .mui-active span").html();
			$('.mui-title').html(navActive);
			//			console.log(navActive);
		}
	} else {

	}
}, 10);

$('.mui-slider-group').css('display', 'none');
$('.mui-fullscreen').css('height', '50px')
// 点击二级导航跳转逻辑
$('#erjiTemplate').on('tap', '.nav2', function() {
	clickNav()
})
var qcount = 1;
//积分商城的商品列表
function pulldownRefresh() {
	setTimeout(function() {
		var source2 = $("#jiajuTemplate1").html();
		console.info(source2)
		var queryTerm2 = new QueryTerm();
		queryTerm2.shopid = 4;
		queryTerm2.pageNo = qcount;
		qcount += 1;
		queryTerm2.pageSize = 10;
		addDataToBox(queryTerm2, source2, 'jiaju1', rootPath + '/api/product/selectByProduct', 1);
		mui('#pullrefresh').pullRefresh().endPullupToRefresh((true)); //参数为true代表没有更多数据了。		
		//		mui('#pullrefresh').pullRefresh().refresh(true);
	}, 500);
}
//
$('#feilei').on('tap', function() {
	$('.fenlei_pop').css('display', 'block');
});
$(document).on('tap', '.wrapper p', function() {

	var navActive = $(this).html();
	//	console.info(navActive)
	$('.mui-title').html(navActive);
	$('.wrapper p').css('color', '#333');
	$(this).css('color', '#FD5100');
	var link1 = $(this).attr('flag');

	console.log(link1);
	$('.success').remove() //根据类别筛选商品

	//	getProList(rootPath+'/api/product/selectByProduct)
	var source2 = $("#jiajuTemplate1").html();
	var queryTerm2 = new QueryTerm();
	queryTerm2.shopid = link1;
	qcount = 1;
	queryTerm2.pageNo = qcount;
	queryTerm2.pageSize = 6;
	addDataToBox(queryTerm2, source2, 'jiaju1', rootPath + '/api/product/selectByProduct', 1);
	setTimeout(function() {
		$('.mui-slider-group').css('display', 'none');
		$('#slider').css('height', '50px');

		//	 window.location.href=link1;
	}, 300)

})
$(document).on('tap', function(e) {
	//	console.log(e.target.className);
	if(e.target.className == "mui-slider-item mui-control-content mui-active" || e.target.className == "mui-slider-item mui-control-content") {
		$('.mui-slider-group').css('display', 'none');
		$('#slider').css('height', '50px');
	}
})

$(document).on('tap', '#gengduo', function() {
	window.location.href = "jiaJu_yongPin.html"
	$('#gengduo').addClass('mui-active')
})

//导航标题样式控制
$(document).on('tap', '.mui-control-item', function() {

	$('#wrapper').children('p').remove()
	console.log($(this).attr('rflag'))
	var queryTerm0 = new QueryTerm();
	//	var thisId=$(this).attr('id');
	//	console.log(thisId)
	var source = $("#erjiTemplate").html();
	queryTerm0.categoryId = $(this).attr('rflag'); //积分商城首页分类
	addDataToBox(queryTerm0, source, 'wrapper', rootPath + '/api/shop/selectBymovebrand?typeid=' + queryTerm0.categoryId);
	$('#jiaju a').removeClass('mui-active');
	//	$(this).addClass('mui-active');
	$('.mui-slider-group').css('display', 'block');
	var hei = $('.mui-content').height();
	$('#slider').css('height', hei);
	var navActive = $(this).children('span').first().html();
	console.info(navActive)
	//	$('.mui-title').html(navActive);
	console.log(navActive);
})
//

$('#jiaju1').on('tap', '.flaggg', function() {
	var productId = $(this).parent().attr('data-productId');
	console.log(productId);
	window.localStorage.setItem('shangPin_detail-productId', productId);
	goToPage('shangPin_detail.html', 'jiFen_shangCheng/shangPin_detail.html');
})
