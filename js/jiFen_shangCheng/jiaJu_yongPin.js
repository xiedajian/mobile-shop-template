var categoryId;

if(getQueryString('categoryId')) {
	console.log('通过url传值');
	categoryId = getQueryString('categoryId');
} else if(window.localStorage.getItem('jiaJu_yongPinPage-categoryId')) {
	console.log('通过storage传值');
	categoryId = window.localStorage.getItem('jiaJu_yongPinPage-categoryId');
	//避免污染，记得销毁
	//	window.localStorage.removeItem('jiaJu_yongPinPage-categoryId');
} else {
	console.log('没有传参');
	categoryId = '';
}
console.log('接受参数-categoryId:', categoryId);


var pageNo = 1;
var pageSize = 10;
var totalPage = 10;
var soncategoryid = '';

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

//
$('#feilei').on('tap', function() {
	$('.fenlei_pop').css('display', 'block');
});

//处理点击选项卡重新加载列表
$(document).on('tap', '.wrapper p', function() {

	var navActive = $(this).html();
	//	console.info(navActive)
	$('.mui-title').html(navActive);
	$('.wrapper p').css('color', '#333');
	$(this).css('color', '#FD5100');
	var link1 = $(this).attr('flag');

	console.log(link1);
	$('.success').remove() //根据类别筛选商品

	//初始化列表 及 下拉加载控件
	mui('#pullrefresh').pullRefresh().refresh(true);
	$('#jiaju1').empty();
	pageNo = 1;
	pageSize = 10;
	totalPage = 10;
	categoryId = '';
	soncategoryid = link1;
	getList(function(returnData) {
		if(returnData.resultSuccess) {
			addEleToList(returnData.data.listRoute);
			totalPage = returnData.data.totalPage;
			if(pageNo >= totalPage) {
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
			} else {
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
			}
			pageNo += 1;
		} else {
			mui.alert(returnData.resultDesc);
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
		}
	});

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

//点击 更多 
//$(document).on('tap', '#gengduo', function() {
//	//	window.location.href = "jiaJu_yongPin.html"
//	$('#gengduo').addClass('mui-active');
//})

//导航标题样式控制
$(document).on('tap', '.mui-control-item', function() {
	//选择全部 与 选择其他分开处理
	if($(this).attr('id') == 'item') {
		//初始化列表 及 下拉加载控件
		mui('#pullrefresh').pullRefresh().refresh(true);
		$('#jiaju1').empty();
		
		pageNo = 1;
		pageSize = 10;
		totalPage = 10;
		categoryId = '';
		soncategoryid = '';
		$('#gengduo').addClass('mui-active');
		getList(function(returnData) {
			if(returnData.resultSuccess) {
				addEleToList(returnData.data.listRoute);
				totalPage = returnData.data.totalPage;
				if(pageNo >= totalPage) {
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
				} else {
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
				}
				pageNo += 1;
			} else {
				mui.alert(returnData.resultDesc);
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
			}
		});

	} else {
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
	}

})
//

//跳转至商品详情页
$('#jiaju1').on('tap', '.flaggg', function() {
	var productId = $(this).parent().attr('data-productId');
	console.log(productId);
	window.localStorage.setItem('shangPin_detail-productId', productId);
	goToPage('shangPin_detail.html', 'jiFen_shangCheng/shangPin_detail.html');
})

//向列表追加
function addEleToList(list) {
	if(list.length === 0) return;
	// console.log(data.data);
//	var source = $("#jiajuTemplate1").html();
//	var render = template.compile(source);
//	var html = render({
//		list: list
//	});
	var html=template('jiajuTemplate1',{'list':list});
	console.log('has data');

	var oldHtml = document.getElementById('jiaju1').innerHTML;
	document.getElementById('jiaju1').innerHTML = oldHtml + html;
}


//获取列表
function getList(callback) {

	var queryTerm2 = new QueryTerm();
	queryTerm2.categoryid = categoryId;
	queryTerm2.pageNo = pageNo;
	queryTerm2.pageSize = pageSize;
	queryTerm2.soncategoryid = soncategoryid;
	$.ajax({
		url: rootPath + "/api/product/selectByProduct",
		type: 'GET',
		data: queryTerm2,
		dataType: 'json',
		success: function(returnData) {
			console.log(returnData);
			if(callback) {
				callback(returnData);
			}
		},
		error: function(err) {
			console.log(err);
		}
	});
}

mui('#pullrefresh').pullRefresh({
	container: '#pullrefresh',
	up: {
		height: 50, //可选.默认50.触发上拉加载拖动距离
		auto: true, //可选,默认false.自动上拉加载一次
		contentrefresh: '正在加载...',
		callback: function() {
			_that = this;
			getList(function(returnData) {
				if(returnData.resultSuccess) {
					addEleToList(returnData.data.listRoute);
					totalPage = returnData.data.totalPage;
					if(pageNo >= totalPage) {
						_that.endPullupToRefresh(true);
					} else {
						_that.endPullupToRefresh(false);
					}
					pageNo += 1;
				} else {
					mui.alert(returnData.resultDesc);
					_that.endPullupToRefresh(true);
				}
			});
		}
	}
});