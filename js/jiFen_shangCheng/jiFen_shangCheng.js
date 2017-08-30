mui.init();

var source2 = '';
var pageNo = 1;
var pageSize = 2;
var totalPage = 0;
var shopid = 4;

$(function() {
	mui("#brand").on("tap", "li", function(event) {
		var cid = this.dataset.cid;
		selectBylei(cid);
	});
	carousel(9);
	mui('#pullrefresh').pullRefresh({
		container: '#pullrefresh',
		up: {
			height: 50, //可选.默认50.触发上拉加载拖动距离
			auto: false, //可选,默认false.自动上拉加载一次
			contentrefresh: '正在加载...',
			callback: pulldownRefresh
		}
	});
	var categoryId = getQueryString('categoryId');
	//九宫格数据
	var source = $("#brandTemplate").html();
	var queryTerm = new QueryTerm();
	queryTerm.typeid = 19; //积分商城首页分类
	addDataToBox(queryTerm, source, 'brand', rootPath + '/api/shop/selectBymovebrand', 2);
	//爱生活
	var source1 = $("#aishenghuoTemplate").html();
	var queryTerm1 = new QueryTerm();
	queryTerm1.adsenseid = 20;
	queryTerm1.pageNo = 1;
	queryTerm1.advertstatus = true;
	addDataToBox(queryTerm1, source1, 'aishenghuo', rootPath + '/advertControllerapi/selectByfirst', 2);

	var source3 = $("#xiaoziTemplate").html();
	var queryTerm3 = new QueryTerm();
	queryTerm3.adsenseid = 21;
	queryTerm3.pageNo = 1;
	queryTerm3.advertstatus = true;
	addDataToBox(queryTerm3, source3, 'xiaozi', rootPath + '/advertControllerapi/selectByfirst', 2);

	var source4 = $("#hengdaTemplate").html();
	var queryTerm4 = new QueryTerm();
	queryTerm4.adsenseid = 22;
	queryTerm4.pageNo = 1;
	queryTerm4.advertstatus = true;
	addDataToBox(queryTerm4, source4, 'hengda', rootPath + '/advertControllerapi/selectByfirst', 2);

	//品质时尚
	var source5 = $("#pingzhiTemplate").html();
	var queryTerm5 = new QueryTerm();
	queryTerm5.adsenseid = 23;
	queryTerm5.pageNo = 1;
	queryTerm5.advertstatus = true;
	addDataToBox(queryTerm5, source5, 'pingzhi', rootPath + '/advertControllerapi/selectByfirst', 2);

	var source6 = $("#pingzhidaTemplate").html();
	var queryTerm6 = new QueryTerm();
	queryTerm6.adsenseid = 24;
	queryTerm6.pageNo = 1;
	queryTerm6.advertstatus = true;
	addDataToBox(queryTerm6, source6, 'pingzhida', rootPath + '/advertControllerapi/selectByfirst', 2);

	//大家都在兑列表
	//shopid=getQueryString('shopid');
	shopid = 4;
	source2 = $("#duihuanTemplate").html();
	var queryTerm2 = new QueryTerm();
	queryTerm2.shopid = shopid;
	queryTerm2.pageNo = pageNo;
	queryTerm2.pageSize = pageSize;
	addDataToBox(queryTerm2, source2, 'duihuan', rootPath + '/api/product/selectByProduct', 1);
});

// 九宫格跳转页面
function selectBylei(categoryId) {
	/*	if(categoryId == 36) {
			window.location.href = 'jiaJu_yongPin.html?categoryId=' + categoryId;
		} else if(categoryId == 37) {
			window.location.href = 'jiaJu_yongPin.html?categoryId=' + categoryId;
		} else if(categoryId == 38) {
			window.location.href = 'jiaJu_yongPin.html?categoryId=' + categoryId;
		} else if(categoryId == 39) {
			window.location.href = 'jiaJu_yongPin.html?categoryId=' + categoryId;
		} else if(categoryId == 40) {
			window.location.href = 'jiaJu_yongPin.html?categoryId=' + categoryId;
		} else if(categoryId == 41) {
			window.location.href = 'jiaJu_yongPin.html?categoryId=' + categoryId;
		} else if(categoryId == 42) {
			window.location.href = 'jiaJu_yongPin.html?categoryId=' + categoryId;
		} else if(categoryId == 43) {
			window.location.href = 'jiaJu_yongPin.html?categoryId=' + categoryId;
		} else if(categoryId == 44) {
			window.location.href = 'jiaJu_yongPin.html?categoryId=' + categoryId;
		} else {
			window.location.href = 'jiaJu_yongPin.html';
		}*/

	//新版跳转
	window.localStorage.setItem('jiaJu_yongPinPage-categoryId', categoryId || '');
	goToPage('jiaJu_yongPin.html', 'jiFen_shangCheng/jiaJu_yongPin.html');

};
//
function pulldownRefresh() {
	setTimeout(function() {
		if(pageNo < totalPage) {
			pageNo++;
			var queryTerm2 = new QueryTerm();
			queryTerm2.shopid = shopid;
			queryTerm2.pageNo = pageNo;
			queryTerm2.pageSize = pageSize;
			addDataToBox(queryTerm2, source2, 'duihuan', rootPath + '/api/product/selectByProduct', 1);
			mui('#pullrefresh').pullRefresh().endPullupToRefresh((false)); //参数为true代表没有更多数据了。
//			mui('#pullrefresh').pullRefresh().refresh(true);
		} else {
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。	
		}
	}, 500);
}

//图片跳转统一处理
function picTapCallback(el) {
	console.log($(el).attr('data-adverturl'));
	var adverttype = $(el).attr('data-adverttype');
	var adverturl = $(el).attr('data-adverturl');
	var shoporproductid = $(el).attr('data-shoporproductid');
	if(adverttype == '3' || adverttype == '4') {
		window.localStorage.setItem('ad-page-url', adverturl);
		goToPage('../shouye/AD-detail.html', 'shouye/AD-detail.html');
	} else if(adverttype == '2') {
		window.localStorage.setItem('shangPin_detail-productId', shoporproductid);
		goToPage('shangPin_detail.html', 'jiFen_shangCheng/shangPin_detail.html');
	} else if(adverttype == '1') {
		window.localStorage.setItem('dianPu_detail-shopId', shoporproductid);
		goToPage('../shouye/dianPu_detail.html', 'shouye/dianPu_detail.html');
	}
}

//图片点击事件
$("#aishenghuo,#xiaozi,#hengda,#pingzhi,#pingzhida").on("tap", "a", function() {
	console.log('图片点击事件', $(this));
	picTapCallback(this);
});

//推荐商品点击事件
$('#duihuan').on('tap', 'img', function() {
	var proId = $(this).attr('data-proId');
	console.log('推荐商品点击事件', proId);
	window.localStorage.setItem('shangPin_detail-productId', proId);
	goToPage('shangPin_detail.html', 'jiFen_shangCheng/shangPin_detail.html');
})

//轮播图点击事件
$(document).on('tap', '.mui-slider-item a', function() {
	console.log('轮播图点击事件', $(this));
	picTapCallback(this);
})

//搜索
$('#searchBox').on('keyup', function(e) {
	//	console.log($(this).val());
	console.log(e.keyCode);
	var val = $(this).val();
	if(e.keyCode === 13) {
		if(val == undefined || val == '') {
			mui.toast('请输入搜索内容')
			return;
		}
//		window.localStorage.setItem('search_product-searchContent', val);
//		window.localStorage.setItem('search_product-shopId', '0');
		goToPage('../shouye/search_product.html?shopId=0&searchContent=' + val);
	}
})