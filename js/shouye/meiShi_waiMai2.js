var categoryId;
if(getQueryString('categoryId')) {
	console.log('通过url传值');
	categoryId = getQueryString('categoryId');
} else if(window.localStorage.getItem('meiShi_waiMaiPage-categoryId')) {
	console.log('通过storage传值');
	categoryId = window.localStorage.getItem('meiShi_waiMaiPage-categoryId');
	//避免污染，记得销毁
	//	window.localStorage.removeItem('meiShi_waiMaiPage-categoryId');
}
console.log('接受参数-categoryId:', categoryId);
if(!categoryId || categoryId == '' || categoryId == undefined) {
	categoryId = 1;
}
//初始化筛选
$(function() {
	//动态获取筛选的内容
	var source1 = document.getElementById('txt_two_lb_templete').innerHTML;
	var queryTerm1 = new QueryTerm();
	addDataToBox(queryTerm1, source1, 'txt_two_lb', rootPath + '/api/shop/selectByshopservice', 2);

	var source2 = document.getElementById('txt_one_templete').innerHTML;
	var queryTerm2 = new QueryTerm();
	queryTerm2.typeid = 1;
	addDataToBox(queryTerm2, source2, 'txt_one', rootPath + '/api/shop/selectBymovebrand', 2);
});
//搜索
$(document).on('keyup', '#searchBox', function(e) {
	var link = this.dataset.link;
	var shopname = $('#searchBox').val();
	if(shopname == undefined || shopname == '') {
		mui.toast('请输入搜索内容');
		return;
	}
	if(e.keyCode === 13) {
		var url = encodeURI(link + '?shopname=' + shopname + '&categoryId=' + categoryId);
		//$('.mui-content').css('display','none');
		//		window.location.href = url;
		goToPage(url);
	}

})
//点击列表进店铺详情
$(document).on('tap', '.main_list', function() {
	var shopId = this.dataset.shopid;
	var shop_page_templete_flag = $('#shop_page_templete').val();
	goToPage('dianPu_detail.html?shopId=' + shopId);
	//		window.location.href = 'dianPu_detail.html?shopId=' + shopId;

});
var hei = $('.mui-content').height();
var hei1 = $('body').height() - 88;
if(hei < $('body').height()) {
	$('.nav_txt').css('height', '100%');
	$('#pullrefresh').css('height', '500px');
} else {
	$('.nav_txt').css('height', hei)
	$('#pullrefresh').css('height', hei);
}
$('.txt_two').css('height', hei1);
//
$('.nav_tit p').on('tap', function() {
	$('.nav_tit p').css('color', '#333');
	$('.nav_tit img').attr('src', '../../img/shouye/jiantou-hui.png');
	$(this).css('color', '#2F9EF0');
	$(this).find('img').attr('src', '../../img/shouye/jiantou-lan.png');
	$('.nav_txt').css('display', 'block');
	$('.nav_txt>div').css('display', 'none');
	$('.nav_txt').children().eq($(this).index()).css('display', 'block');
	//
})

$(document).on('tap', '.lb li', function() {
	$('.lb li').css({
		'color': '#333',
		'background': '#fff',
		'border': '1px solid #ccc'
	});
	$(this).css({
		'color': '#fff',
		'background': '#fd5100',
		'border': '1px solid #fd5100'
	});
	$('.lb li').removeClass('selected');
	$(this).addClass('selected');
});
$(document).on('tap', '.lb1 li', function() {
	$('.lb1 li').css({
		'color': '#333',
		'background': '#fff',
		'border': '1px solid #ccc'
	});
	$(this).css({
		'color': '#fff',
		'background': '#fd5100',
		'border': '1px solid #fd5100'
	});
	$('.lb1 li').removeClass('selected1');
	$(this).addClass('selected1');
});

//筛选重置
$('.reset').on('tap', function() {
	$('.txt_two li').css({
		'color': '#333',
		'background': '#fff',
		'border': '1px solid #ccc'
	});
});
//刷选选择确定
$(document).on('tap', '.txt_one p', function() {

	$('.txt_one p').css('color', '#333');
	$(this).css('color', '#2F9EF0');
	$('.nav_tit').children().eq($(this).parent().index()).html($(this).html() + '<img src="../../img/shouye/jiantou-hui.png"/>');
	$('.nav_tit').children().eq($(this).parent().index()).attr('value', $(this).attr('value'));
	//$('.nav_txt').hide();	
	var target = document.getElementsByClassName('nav_txt')[0];
	target.style.display = 'none';

	//console.log($(this).parent().index())

	var all = $('.nav_tit p').eq(0).attr('value');
	var distance = $('.nav_tit p').eq(1).attr('value');
	var auto = $('.nav_tit p').eq(2).attr('value');
	console.log(distance);
	//根据条件查询
	var queryTerm = new QueryTerm();
	queryTerm.all = all;
	queryTerm.distance = distance;
	queryTerm.auto = auto;

	queryTerm.categoryId = parseInt(categoryId);
	queryTerm.pageNo = pageNo;
	queryTerm.pageSize = pageSize;

	//alert(JSON.stringify(queryTerm))

	//console.log(JSON.stringify(queryTerm));

	$('#main').empty();
	pageNo = 1;
	pageSize = 10;
	totalPage = 10;
	mui('#pullrefresh').pullRefresh().refresh(true);
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

});

$('.enter').on('tap', function() {
	$('.nav_txt').css('display', 'none');
	mui('#pullrefresh').pullRefresh().refresh(true);
	$('#main').empty();
	pageNo = 1;
	pageSize = 10;
	totalPage = 10;
	//=======================================================
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
});

var source = '{{each list value i}}' +
	'<div class="main_list" data-shopid="{{value.shopId}}" >' +
	'<div class="list_left"><img src="{{value.shopLogo}}" alt="" /></div>' +
	'<div class="list_right">' +
	'<p><span class="mui-ellipsis"><a href="javascript:void(0);">{{value.shopName}}</a><a href="javascript:void(0);">({{value.shopNotice}})</a></span></p>' +
	'<p>'

	+
	'{{if (value.shopGrade==1)}}<span><img src="../../img/shouye/star@2x.png" alt="" />' +
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
	'<span>{{value.shopGrade}}</span><span>人均{{value.avgPrice}}元</span>' +
	'</p>' +
	'<p><span>{{value.shopNotice}}</span><span>{{value.distance}}Km</span></p>' +
	'</div>' +
	'<a href="javascript:;"></a><div style="clear: both;"></div></div>{{/each}}';

/**
 * 
 * ================================
 * 
 * 				业务逻辑
 * 
 * ================================
 * 
 */

//查询参数
var pageNo = 1;
var pageSize = 10;
var totalPage = 10;
var foodcategoryId = 1; //食物种类
var distance = 0; //距离
var orderType = 0; //排序
var serviceid = ''; //服务筛选
var avgprice = ''; //价格筛选

function initPageNO() {
	pageNo = 1;
	pageSize = 10;
	totalPage = 10;
	foodcategoryId = 1; //食物种类
	distance = 0; //距离
	orderType = 0; //排序
	serviceid = ''; //服务筛选
	avgprice = ''; //价格筛选

}

//获取列表
function getList(callback) {
	var all = $('.nav_tit p').eq(0).attr('value');
	var distance = $('.nav_tit p').eq(1).attr('value');
	var auto = $('.nav_tit p').eq(2).attr('value');
	var serviceidBox = document.getElementsByClassName('selected');
	var avgpriceBox = document.getElementsByClassName('selected1');
	var serviceid;
	var avgprice;
	//	console.log(serviceidBox);
	//	console.log(avgpriceBox);
	if(serviceidBox.length == 0) {
		serviceid = '';
	} else {
		serviceid = serviceidBox[0].dataset.serviceid;
	}
	if(avgpriceBox.length == 0) {
		avgprice = '';
	} else {
		avgprice = avgpriceBox[0].dataset.avgprice;
	}

	//根据条件查询
	var queryTerm = new QueryTerm();
	queryTerm.distance = distance;
	queryTerm.auto = auto;
	queryTerm.serviceid = serviceid;
	queryTerm.avgprice = avgprice;
	if(all == '0') {
		all = categoryId;
	}
	//		queryTerm.categoryId = parseInt(categoryId);
	queryTerm.categoryId = all;
	queryTerm.pageNo = pageNo;
	queryTerm.pageSize = pageSize;
	var coordinate = localStorage.getItem('coordinate');
	if(coordinate) {
		queryTerm.coordinate = coordinate;
	} else {
		queryTerm.coordinate = 'error';
	}
	$.ajax({
		url: rootPath + "/api/shop/selectByleisureshop",
		type: 'GET',
		data: queryTerm,
		dataType: 'json',
		// async:false,
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

	//	addDataToBox(queryTerm, source, 'main', rootPath + '/api/shop/selectByleisureshop', 1);
}

//向列表追加
function addEleToList(list) {
	if(list.length === 0) return;
	// console.log(data.data);
	var render = template.compile(source);
	var html = render({
		list: list
	});
	console.log('has data')

	var oldHtml = document.getElementById('main').innerHTML;
	document.getElementById('main').innerHTML = oldHtml + html;
}

mui.init({
	pullRefresh: {
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
	}
});