var categoryId;
if(getQueryString('categoryId')) {
	console.log('通过url传值');
	categoryId = getQueryString('productId');
} else if(window.localStorage.getItem('shangChaoPage-categoryId')) {
	console.log('通过storage传值');
	categoryId = window.localStorage.getItem('shangChaoPage-categoryId');
	//避免污染，记得销毁
	//	window.localStorage.removeItem('shangChaoPage-categoryId');
}
console.log('接受参数-categoryId:', categoryId);
if(!categoryId || categoryId == '' || categoryId == undefined) {
	categoryId = 4;
}

var pageNo = 0;
var pageSize = 10;
var totalPage = 0;
var hei = $('.mui-content').height();

//九宫格数据
var source = '{{each list value i}}' +
	'<li><a href="javascript:void(0);" data-categoryid="{{value.categoryid}}" data-categoryname="{{value.name}}">' +
	'<img src="{{value.picture}}"/>' +
	'<span>{{value.name}}</span>' +
	'</a></li>' +
	'{{/each}}' +
	'<li><a href="javascript:void(0);"  data-categoryid="4" data-categoryname="全部"><img src="../../img/shouye/nav8.png"/><span>全部</span></a></li>';
var queryTerm = new QueryTerm();
queryTerm.typeid = 4;
addDataToBox(queryTerm, source, 'shangcao', rootPath + '/api/shop/selectBymovebrand', 2);
//优惠专区
var source = document.getElementById('recommand_activity').innerHTML;
var queryTerm = new QueryTerm();
queryTerm.pageNo = 1;
queryTerm.adsenseid = 6;
//queryTrem.advertstatus=1;
addDataToBox(queryTerm, source, 'recommand', rootPath + '/advertControllerapi/selectByfirst', 2);
//品牌优选
var source = document.getElementById('pinpaiyouxuan_templete').innerHTML;
var queryTerm = new QueryTerm();
queryTerm.pageNo = 1;
queryTerm.adsenseid = 7;
//queryTrem.advertstatus=1;
addDataToBox(queryTerm, source, 'pinpaiyouxuan', rootPath + '/advertControllerapi/selectByfirst', 2);

//猜你喜欢
var source = '{{each list value i}}' +
	'<div class="main_list" data-shopid="{{value.shopId}}">' +
	'<div class="list_left"><img src="{{value.shopLogo}}" alt="" /></div>' +
	'<div class="list_right"><p><span class="mui-ellipsis"><a href="javascript:;">{{value.shopName}}</a>' +
	'<a href="javascript:;">（{{value.shopName}}）</a></span></p>' +
	'<p><span>{{if (value.shopGrade==1)}}<span><img src="../../img/shouye/star@2x.png" alt="" />' +
	'<img src="../../img/shouye/star_1@2x.png" alt="" /><img src="../../img/shouye/star_1@2x.png" alt="" />' +
	'<img src="../../img/shouye/star_1@2x.png" alt="" /><img src="../../img/shouye/star_1@2x.png" alt="" /></span>{{/if}}'

	+
	'{{if (value.shopGrade==2)}}<span><img src="../../img/shouye/star@2x.png" alt="" />' +
	'<img src="../../img/shouye/star@2x.png" alt="" /><img src="../../img/shouye/star_1@2x.png" alt="" />' +
	'<img src="../../img/shouye/star_1@2x.png" alt="" /><img src="../../img/shouye/star_1@2x.png" alt="" /></span>{{/if}}'

	+
	'{{if (value.shopGrade==3)}}<span><img src="../../img/shouye/star@2x.png" alt="" />' +
	'<img src="../../img/shouye/star@2x.png" alt="" /><img src="../../img/shouye/star@2x.png" alt="" />' +
	'<img src="../../img/shouye/star_1@2x.png" alt="" /><img src="../../img/shouye/star_1@2x.png" alt="" /></span>{{/if}}'

	+
	'{{if (value.shopGrade==4)}}<span><img src="../../img/shouye/star@2x.png" alt="" />' +
	'<img src="../../img/shouye/star@2x.png" alt="" /><img src="../../img/shouye/star@2x.png" alt="" />' +
	'<img src="../../img/shouye/star@2x.png" alt="" /><img src="../../img/shouye/star_1@2x.png" alt="" /></span>{{/if}}'

	+
	'{{if (value.shopGrade==5)}}<span><img src="../../img/shouye/star@2x.png" alt="" />' +
	'<img src="../../img/shouye/star@2x.png" alt="" /><img src="../../img/shouye/star@2x.png" alt="" />' +
	'<img src="../../img/shouye/star@2x.png" alt="" /><img src="../../img/shouye/star@2x.png" alt="" /></span>{{/if}}' +
	'<span>&nbsp;&nbsp;</span><span>人均{{value.avgPrice}}元</span>' +
	'</p>' +
	'<p><span>{{value.shopNotice}}</span><span>&nbsp;&nbsp;{{value.distance}}Km</span></p>' +
	'</div>' +
	'<a href="javascript:;"></a><div style="clear: both;"></div></div>{{/each}}';

//猜你喜欢
var queryTerm1 = new QueryTerm();
queryTerm1.pageNo = 1;
queryTerm1.pageSize = 2;
queryTerm1.categoryId = 4;
queryTerm1.auto = 1;
addDataToBox(queryTerm1, source, 'cainixihuan', rootPath + '/api/shop/selectByleisureshop', 1);

//优惠专区跳转页面
$(document).on('tap', '#recommand a', function() {
	var url = this.dataset.url;
	console.log('click', url);
	picTapCallback(this);
	//			window.location.href=url;
});
//品牌优选跳转页面
$(document).on('tap', '#pinpaiyouxuan a', function() {
	var url = this.dataset.url;
	console.log('click', url);
	picTapCallback(this);
	//			window.location.href=url;
});
//轮播图
$(document).on('tap', '#slider .mui-slider-item a', function() {
	var url = this.dataset.url;
	console.log('click', url);
	picTapCallback(this);
	//			window.location.href=url;
});
//子分类
$(document).on('tap', '#shangcao li a', function() {
	var categoryId = this.dataset.categoryid;
	var categoryName = this.dataset.categoryname;
	//	window.location.href = 'shangChao_2.html?categoryId=' + categoryId;
	goToPage('quanBu.html?categoryId=' + categoryId + '&categoryName=' + categoryName);
});

//才你喜欢  列表
$(document).on('tap', '.main_list', function() {
	var shopId = this.dataset.shopid;
	console.log(shopId);
	//	window.location.href = 'dianPu_detail.html?shopId=' + shopId;
	goToPage('dianpu_detail_2.html?shopId=' + shopId);
});
//搜索
$(document).on('change', '#searchBox', function() {
	var link = this.dataset.link;
	var shopname = $('#searchBox').val();
	console.log(categoryId);
	console.log(shopname);
	var url = encodeURI(link + '?shopname=' + shopname + '&categoryId=' + categoryId);
	//$('.mui-content').css('display','none');
//	window.location.href = url;
	goToPage(url);
})

//图片广告跳转统一处理
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