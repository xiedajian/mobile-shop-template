var pageNo = 1;
var pageSize = 10;
var totalPage = 10;
var shopListSource = '';

$(function() {
	var hei = $('.mui-content').height();
	if(hei < $('body').height()) {
		$('.nav_txt').css('height', '100%')
	} else {
		$('.nav_txt').css('height', hei)
	}
	$('.head_tit p').css({
		'color': '#fff',
		'background': '#fd5100'
	});
	$("#lvyou").css({
		'color': '#fd5100',
		'background': '#fff'
	});

	//分类导航
	var queryTerm = new QueryTerm();
	queryTerm.typeid = 27;
	var source = '{{each list value i}}' +
		'<p><a href="javascript:void(0);"  data-categoryid="{{value.categoryid}}" data-categoryname="{{value.name}}">' +
		'<img src="{{value.picture}}"/>' +
		'<span>{{value.name}}</span>' +
		'</a></p>' +
		'{{/each}}' +
		'<p><a href="javascript:void(0);"  data-categoryid="27" data-categoryname="全部"><img src="../../img/shouye/nav8.png"/><span>全部</span></a></p>';
	addDataToBox(queryTerm, source, 'ly_main_one', rootPath + '/api/shop/selectBymovebrand', 2);

	//主题推荐
	var queryTerm1 = new QueryTerm();
	queryTerm1.pageNo = 0;
	queryTerm1.adsenseid = 15;
	var source1 = '{{each list value i}}' +
		'<a href="javascript:void(0);" data-adverttype="{{value.adverttype}}" data-shoporproductid="{{value.shoporproductid}}" data-adverturl="{{value.adverturl}}">' +
		'<img src="{{value.advertpic}}"/>' +
		'</a>' +
		'{{/each}}' +
		'<div style="clear: both;"></div>';
	addDataToBox(queryTerm1, source1, 'huodong_txt', rootPath + '/advertControllerapi/selectByfirst', 2);

	//人气推荐
	var queryTerm2 = new QueryTerm();
	queryTerm2.pageNo = 0;
	queryTerm2.adsenseid = 16;
	addDataToBox(queryTerm2, source1, 'renqi_txt', rootPath + '/advertControllerapi/selectByfirst', 2);

	//猜你喜欢
	var queryTerm3 = new QueryTerm();
	queryTerm3.pageNo = 0;
	queryTerm3.adsenseid = 17;
	addDataToBox(queryTerm3, source1, 'fenlei_txt', rootPath + '/advertControllerapi/selectByfirst', 2);

/*
	//店铺列表
	var queryTerm4 = new QueryTerm();
	queryTerm4.categoryId = 27;
	queryTerm4.pageNo = pageNo;
	queryTerm4.pageSize = pageSize;
	shopListSource = '{{each list value i}}' +
		'<div class="cont_list"  data-shopid="{{value.shopId}}">' +
		'<div class="cont_left"><img src="{{value.shopLogo}}" alt="" /></div>' +
		'<div class="cont_right"><p><span class="mui-ellipsis">' +
		'{{value.shopName}}' +
		'</span></p>' +
		'<p>' +
		'{{if (value.shopGrade==1)}}' +
		'<span><img src="../../img/shouye/star@2x.png" alt="" /><img src="../../img/shouye/star_1@2x.png" alt="" />' +
		'<img src="../../img/shouye/star_1@2x.png" alt="" /><img src="../../img/shouye/star_1@2x.png" alt="" />' +
		'<img src="../../img/shouye/star_1@2x.png" alt="" /></span>' +
		'{{/if}}'

		+
		'{{if (value.shopGrade==2)}}' +
		'<span><img src="../../img/shouye/star@2x.png" alt="" /><img src="../../img/shouye/star@2x.png" alt="" />' +
		'<img src="../../img/shouye/star_1@2x.png" alt="" /><img src="../../img/shouye/star_1@2x.png" alt="" />' +
		'<img src="../../img/shouye/star_1@2x.png" alt="" /></span>' +
		'{{/if}}'

		+
		'{{if (value.shopGrade==3)}}' +
		'<span><img src="../../img/shouye/star@2x.png" alt="" /><img src="../../img/shouye/star@2x.png" alt="" />' +
		'<img src="../../img/shouye/star@2x.png" alt="" /><img src="../../img/shouye/star_1@2x.png" alt="" />' +
		'<img src="../../img/shouye/star_1@2x.png" alt="" /></span>' +
		'{{/if}}'

		+
		'{{if (value.shopGrade==4)}}' +
		'<span><img src="../../img/shouye/star@2x.png" alt="" /><img src="../../img/shouye/star@2x.png" alt="" />' +
		'<img src="../../img/shouye/star@2x.png" alt="" /><img src="../../img/shouye/star@2x.png" alt="" />' +
		'<img src="../../img/shouye/star_1@2x.png" alt="" /></span>' +
		'{{/if}}'

		+
		'{{if (value.shopGrade==5)}}' +
		'<span><img src="../../img/shouye/star@2x.png" alt="" /><img src="../../img/shouye/star@2x.png" alt="" />' +
		'<img src="../../img/shouye/star@2x.png" alt="" /><img src="../../img/shouye/star@2x.png" alt="" />' +
		'<img src="../../img/shouye/star@2x.png" alt="" /></span>' +
		'{{/if}}'

		+
		'<span>{{value.shopGrade}}</span></p>' +
		'<p><span>￥{{value.avgPrice}}</span><span>起</span><span>{{value.shopNotice}}</span></p>' +
		'<p class="look"><img src="../../img/shouye/look.png"/></p></div>' +
		'<a href="javascript:;"></a>' +
		'<div style="clear: both;"></div></div>{{/each}}';

	addDataToBox(queryTerm4, shopListSource, 'cont', rootPath + '/api/shop/selectByleisureshop', 1);
*/
})

$(document).on('tap', '#huodong_txt a', function() {
	var url = this.dataset.url;
	picTapCallback(this);
//	window.location.href = url;
});
$(document).on('tap', '#renqi_txt a', function() {
	var url = this.dataset.url;
	picTapCallback(this);
//	window.location.href = url;
});
$(document).on('tap', '#fenlei_txt a', function() {
	var url = this.dataset.url;
	picTapCallback(this);
//	window.location.href = url;
});

$(document).on('tap', '.cont_list', function() {
	var shopId = this.dataset.shopid;
	var shop_page_templete_flag = $('#shop_page_templete').val();
	if(shop_page_templete_flag == 1) {
		window.location.href = 'dianPu_detail.html?shopId=' + shopId;
	} else {
		window.location.href = 'dianpu_detail_2.html?shopId=' + shopId;
	}
})
//切换至电影
$(document).on('tap', '#dianying', function() {
	mui.back();
});

//点击分类跳转页面
$(document).on('tap', '#ly_main_one a', function() {
	var categoryId = this.dataset.categoryid;
	var categoryName = this.dataset.categoryname;
	console.log(categoryName);
//	window.location.href = 'quanBu.html?categoryId=' + categoryId + '&categoryName=' + categoryName;
	goToPage('quanBu.html?categoryId=' + categoryId + '&categoryName=' + categoryName);
})