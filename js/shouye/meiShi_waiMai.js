var categoryId;
if(getQueryString('categoryId')) {
	console.log('通过url传值');
	categoryId = getQueryString('productId');
} else if(window.localStorage.getItem('meiShi_waiMaiPage-categoryId')) {
	console.log('通过storage传值');
	categoryId = window.localStorage.getItem('meiShi_waiMaiPage-categoryId');
	//避免污染，记得销毁
	window.localStorage.removeItem('meiShi_waiMaiPage-categoryId');
}
console.log('接受参数-categoryId:', categoryId);
if(!categoryId || categoryId=='' || categoryId==undefined){
	categoryId=1;
}

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
//
$(function() {

	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			up: {
				height: 50, //可选.默认50.触发上拉加载拖动距离
				auto: true, //可选,默认false.自动上拉加载一次
				contentrefresh: '正在加载...',
				callback: pulldownRefresh
			}
		}
	});
})

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
	selectShopByTerm();
});
//
/*$(document).on('tap',function(e){
	if(e.target.className=='nav_txt'){
		$('.nav_txt').css('display','none')
	}
})*/
//
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
//
$('.reset').on('tap', function() {
	$('.txt_two li').css({
		'color': '#333',
		'background': '#fff',
		'border': '1px solid #ccc'
	});
});
//
$('.enter').on('tap', function() {
	$('.nav_txt').css('display', 'none');
	$('#main').empty();
	selectShopByTerm();

});
/*setInterval(function(){
	if($('.nav_txt').css('display')=='none'){		
	$('.nav_tit>p').css('color','#333');
	$('.nav_tit p').find('img').attr('src','../../img/shouye/jiantou-hui.png');
}	
},10)*/
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
		window.location.href = url;
	}

})

function selectShopByTerm() {
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
//	queryTerm.all = all;
	queryTerm.distance = distance;
	queryTerm.auto = auto;
	queryTerm.serviceid = serviceid;
	queryTerm.avgprice = avgprice;
	if(all=='0'){
		all=categoryId;
	}
//	queryTerm.categoryId = parseInt(categoryId);
	queryTerm.categoryId = all;
	queryTerm.pageNo = pageNo;
	queryTerm.pageSize = pageSize;
//	console.log(JSON.stringify(queryTerm));
	addDataToBox(queryTerm, source, 'main', rootPath + '/api/shop/selectByleisureshop', 1);
}