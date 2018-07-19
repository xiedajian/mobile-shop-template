

//banner
$(document).on('tap', '.mui-slider-item a', function() {
    goToPage('AD-detail.html', 'shouye/AD-detail.html');
});
// nav分类
$(document).on('tap', '.nav li a', function() {
    var index = $(this).attr('data-cate');
    getShopsByCategory(index);
});
// 活动
$(document).on('tap', '#huodong_txt a', function() {
    goToPage('shop_detail_cate.html', 'shouye/shop_detail_cate.html');
});
// 推荐分类
$(document).on('tap', '#recommendCategory a', function() {
    goToPage('dianPu_detail.html', 'shoye/dianPu_detail.html');
});
// 商品
$(document).on('tap', '.sp a', function() {
    goToPage('shop_detail_cate.html', 'shouye/shop_detail_cate.html');
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
	var val = $(this).val();
	if(val == undefined || val == '') {
		mui.toast('请输入搜索内容')
		return;
	}
	if(e.keyCode === 13) {
		window.localStorage.setItem('search-shopname', val);
		goToPage('search.html', 'shouye/search.html');
	}
})