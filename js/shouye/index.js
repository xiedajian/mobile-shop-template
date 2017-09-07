$(function() {
	$.ajax({
		url: rootPath + '/api/index/getPartentCategory',
		dataType: 'JSON',
		success: function(data) {
			var html = template('category', data);
			$('.nav').empty().append(html);
		},
		error: function(data) {}
	});
	//推荐分类
	var source = document.getElementById('recommendCategory_templete').innerHTML;
	var queryTerm = new QueryTerm();
	queryTerm.pageNo = 1;
	queryTerm.adsenseid = 12;
	//queryTrem.advertstatus=1;
	addDataToBox(queryTerm, source, 'recommendCategory', rootPath + '/advertControllerapi/selectByfirst', 2);
	//推荐活动
	var source = document.getElementById('activity').innerHTML;
	var queryTerm = new QueryTerm();
	queryTerm.pageNo = 1;
	queryTerm.adsenseid = 4;
	//queryTrem.advertstatus=1;
	addDataToBox(queryTerm, source, 'huodong_txt', rootPath + '/advertControllerapi/selectByfirst', 2);

	//推荐商品
	$.ajax({
		url: rootPath + '/advertControllerapi/selectByfirst',
		data: {
			'pageNo': 1,
			'adsenseid': 5,
			'advertstatus': true
		},
		dataType: 'JSON',
		success: function(data) {
			var html = template('recommendProductBig', data);
			$('.shangpin_top').empty().append(html);
			var html = template('recommendProductSmall', data);
			$('.shangpin_bot').empty().append(html);
		}
	});
	carousel(1);
});

//图片点击事件处理
$(document).on('tap', '.mui-slider-item a', function() {
	picTapCallback(this)
});
$(document).on('tap', '#huodong_txt a', function() {
	picTapCallback(this)
});
$(document).on('tap', '#recommendCategory a', function() {
	picTapCallback(this)
});
$(document).on('tap', '.sp a', function() {
	picTapCallback(this)
});

//首页-图片跳转统一处理
function picTapCallback(el) {
	console.log($(el).attr('data-adverturl'));
	var adverttype = $(el).attr('data-adverttype');
	var adverturl = $(el).attr('data-adverturl');
	var shoporproductid = $(el).attr('data-shoporproductid');
	if(adverttype == '3' || adverttype == '4') {
		window.localStorage.setItem('ad-page-url', adverturl);
		goToPage('AD-detail.html', 'shouye/AD-detail.html');
	} else if(adverttype == '2') {
		window.localStorage.setItem('shop_detail-productId', shoporproductid);
		goToPage('shop_detail_cate.html', 'shouye/shop_detail_cate.html');
	} else if(adverttype == '1') {
		window.localStorage.setItem('dianPu_detail-shopId', shoporproductid);
		goToPage('dianPu_detail.html', 'shoye/dianPu_detail.html');
	}
}

/**
 * 点击分类跳转页面
 * 
 * @param categoryId
 */
function getShopsByCategory(categoryId) {
	if(categoryId == 2) {
		window.localStorage.setItem('dianYing2Page-categoryId', 35);
		goToPage('dianYing2.html', 'shouye/dianYing2.html');
	} else if(categoryId == 4) {
		window.localStorage.setItem('shangChaoPage-categoryId', categoryId);
		goToPage('shangChao.html', 'shouye/shangChao.html');
	} else if(categoryId == 3) {
		window.localStorage.setItem('xiuXian_fuWuPage-categoryId', categoryId);
		goToPage('xiuXian_fuWu.html', 'shouye/xiuXian_fuWu.html');
	} else if(categoryId == 1) {
		window.localStorage.setItem('meiShi_waiMaiPage-categoryId', categoryId);
		goToPage('meiShi_waiMai.html', 'shouye/meiShi_waiMai.html');
	} else {
		window.localStorage.setItem('meiShi_waiMaiPage-categoryId', categoryId);
		goToPage('movice_list.html', 'shouye/movice_list.html');
	}
}

//搜索
$(document).on('keyup', '#searchBox', function(e) {
	//	console.log($(this).val());
	//	console.log(e.keyCode);
	var val = $(this).val();
	if(val == undefined || val == '') {
		mui.toast('请输入搜索内容')
		return;
	}
	if(e.keyCode === 13) {
//		window.location.href = 'search.html?shopname=' + val;
		window.localStorage.setItem('search-shopname', val);
		goToPage('search.html', 'shouye/search.html');
	}
})