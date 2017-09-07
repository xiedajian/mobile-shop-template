
//电影图片广告跳转统一处理
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
//		window.localStorage.setItem('dianPu_detail-shopId', shoporproductid);
		goToPage('dianpu_detail_2.html?shopId=' + shoporproductid);
	}
}
