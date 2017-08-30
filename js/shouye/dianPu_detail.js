var pageNo = 1;
var pageSize = 10;
var totalPage = 0;
var buy_car = new Map();

var shopId;
if(getQueryString('shopId')) {
	console.log('通过url传值');
	shopId = getQueryString('shopId');
}else if(window.localStorage.getItem('dianPu_detail-shopId')) {
	console.log('通过storage传值');
	shopId = window.localStorage.getItem('dianPu_detail-shopId');
}
console.log('接受参数-shopId:', shopId);

$(function() {
	var buy_car_str = localStorage.getItem(SHOPKEY + shopId);
	var buy_car_obj;
	$.ajax({
		url: rootPath + '/api/shop/getShopProductInfo',
		data: {
			'shopId': shopId
		},
		dataType: 'JSON',
		success: function(data) {
			console.log(data);
			if(!data.resultSuccess) {
				mui.toast('店铺信息查询失败');
				return;
			}
			data.data.rootPath = imgRootPath;
			data.data.PRODUCTKEY = PRODUCTKEY;
			console.log(data.data);
			//			document.getElementById('search_url').setAttribute('href','Search1.html?shopId='+data.data.shopId);

			addHtmlForTemplte(data.data, 'buy_car_shopname', 'buy_car_shopname_templete');
			//店铺详情
			addHtmlForTemplte(data.data, 'dianpu', 'dianpu_templete');
			//优惠列表
			addHtmlForTemplte(data.data, 'segmentedControls1', 'segmentedControls1_templete');
			//var index=$('#segmentedControls1 .mui-active').index('#segmentedControls1 a');
			//获取含有.mui-active的a标签的跳转位置
			var activeDom = document.getElementById('segmentedControls1').getElementsByClassName('mui-active')[0];
			console.log(activeId)
			if(activeDom) {
				var activeId = activeDom.attributes['href'].value;
				data.data.ext1 = activeId.replace(/#item/, '');
			} else {
				activeId = '';
			}
			data.data.rootPath = imgRootPath;
			//商品列表
			addHtmlForTemplte(data.data, 'segmentedControlContents1', 'segmentedControlContents1_templete');
			//店铺星级
			addHtmlForTemplte(data.data, 'item2mobile', 'item2mobile_templete1');
			//店铺详情
			addHtmlForTemplte(data.data, 'item3_txt', 'item3_txt_templete');
			//用户评价
			var source = $("#item2mobile_templete2").html();
			var queryTerm = new QueryTerm();
			queryTerm.shopid = shopId;
			queryTerm.pageNo = pageNo;
			queryTerm.pageSize = pageSize;
			addDataToBox(queryTerm, source, 'item2mobile2', rootPath + '/api/shop/selectByshopcommenet', 1);

			/**
			 * 根据本地存储的内容更新页面
			 */
			//把localstorage的数据放到map集合里
			if(buy_car_str != undefined) {
				buy_car_obj = JSON.parse(buy_car_str);
				console.log(buy_car_obj);
				for(var i = 0; i < buy_car_obj.keys.length; i++) {
					buy_car.put(buy_car_obj.keys[i], buy_car_obj.data[buy_car_obj.keys[i]]);
					document.getElementById(buy_car_obj.keys[i]).innerHTML = buy_car_obj.data[buy_car_obj.keys[i]].quantity;
					$("#" + buy_car_obj.keys[i]).parent().css('display', 'block');
				};
				var sum = sub();
				if(sum > 0) {
					$('.submit_order').css({
						'background-color': '#FD5100',
						'color': '#fff'
					});
					$(".fenshu").css('display', 'block');
				}
				//计算总价
				getTotalMoney(buy_car);
			}

		},
		error: function(err) {
			mui.toast('店铺信息查询失败');
			return;
		}
	});
})

//
var hei = $('body').height() - $('.banner').height() - $('.dianpu').height();
console.log(hei);
$('.mui-slider').css('height', hei);
$('#bottomPopover').css('top', hei);
//
var hei1 = $('.mui-slider').height() - $('#sliderSegmentedControl').height();
$('.mui-slider-group').css('height', hei1);
console.log(hei1);
//
$('.ss').on('tap', function() {
	$('.fenxiang').css('display', 'block')
})
$('.ss').on('tap', function(e) {
	$('.fenxiang').css('display', 'block');
	$(document).on("tap", function(e) {
		if(e.target.className == "fenxiang") {
			$('.fenxiang').css('display', 'none');
		}
	})
})
//点击跳转到商品页面
$(document).on('tap', '.clickSkip', function() {
	var productId = this.dataset.productId;
	var product_templete_flag = $('#product_templete').val();
	if(product_templete_flag == 1) {
		window.location.href = 'shop_detail_cate.html?productId=' + productId + '&shopId=' + shopId;
	} else {
		window.location.href = 'shop_detail_clothes.html?productId=' + productId + '&shopId=' + shopId;
	}
})
//跳转营业执照页面
$(document).on('tap', '#business_license', function() {
	var licenseUrl = this.dataset.businessLicense;
	console.log(licenseUrl);
	window.location.href = 'shop_yingYe_xuKeZheng.html?licenseUrl=' + licenseUrl;
})

//搜索
$('#searchBox').on('keyup', function(e) {
	console.log(e.keyCode);
	var val = $(this).val();
	console.log(val);
	if(e.keyCode === 13) {
		if(val == undefined || val == '') {
			mui.toast('请输入搜索内容')
			return;
		}
		window.location.href = 'search_product.html?shopId=' + shopId + '&searchContent=' + val;
	}
})