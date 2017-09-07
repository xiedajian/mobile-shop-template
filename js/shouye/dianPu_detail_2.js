var pageNo = 0;
var pageSize = 10;
var totalPage = 10;

var pageNo1 = 0;
var pageSize1 = 1;
var totalPage1 = 10;

var pageNoUse = 0;
var pageSizeUse = 10;
var toatlPageUse = 10;

var buy_car = new Map();
var shopId = getQueryString('shopId');
console.log('shopId', shopId);
$(function() {
	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			up: {
				height: 50, //可选.默认50.触发上拉加载拖动距离
				auto: true, //可选,默认false.自动上拉加载一次
				contentrefresh: '正在加载...',
				callback: pulldownRefresh()
			}
		}
	});
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
			if(data.resultSuccess) {
				data.data.rootPath = imgRootPath;
				data.data.PRODUCTKEY = PRODUCTKEY;
				addHtmlForTemplte(data.data, 'buy_car_shopname', 'buy_car_shopname_templete');
				//店铺详情
				addHtmlForTemplte(data.data, 'main_list', 'main_list_templete');
				//优惠列表
				addHtmlForTemplte(data.data, 'dianpu_bottom', 'dianpu_bottom_templete');
				//店铺星级
				addHtmlForTemplte(data.data, 'item2mobile', 'item2mobile_templete1');
				//			//店铺详情
				addHtmlForTemplte(data.data, 'item3_txt', 'item3_txt_templete');
			} else {
				mui.toast(data.resultDesc);
			}
		}
	});
	/**
	 * 根据本地存储的内容更新页面
	 */
	//把localstorage的数据放到map集合里
	setTimeout(function() {
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
	}, 500);
})

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

function pulldownRefresh() {
//	console.log('----------------------------------');
	var index = $('#sliderSegmentedControl .mui-active').index('#sliderSegmentedControl a');
	//	var ext=$('#sliderSegmentedControl .mui-active').attr('value');
	if(index <= 1) {
		selectPageInfo(index);
	}

	if(totalPageUse == 0 || pageNoUse < totalPageUse) {
		pageNoUse++;
		var source = '';
		var boxId = '';
		var url = '';
		if(index == 0) {
			source = $('#product_list_templete').html();
			boxId = 'product_list';
			url = rootPath + '/api/shop/getProductByShopId'
		} else if(index == 1) {
			source = $('#item2mobile_templete2').html();
			boxId = 'item2mobile2';
			url = rootPath + '/api/shop/selectByshopcommenet';
		} else {
			mui('#pullrefresh').pullRefresh().endPullupToRefresh((true | false)); //参数为true代表没有更多数据了。
			mui('#pullrefresh').pullRefresh().refresh(true);
			return;
		}
		var queryTerm = new QueryTerm();
		queryTerm.shopId = parseInt(shopId);
		queryTerm.pageNo = pageNoUse;
		queryTerm.pageSize = pageSizeUse;
		addDataToBox(queryTerm, source, boxId, url, 1, index);
		mui('#pullrefresh').pullRefresh().endPullupToRefresh((false)); //参数为true代表没有更多数据了。
		//			mui('#pullrefresh').pullRefresh().refresh(true);
	} else {
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。	
	}

}

function selectPageInfo(multiDownFlag) {
	if(multiDownFlag == 0) {
		pageNoUse = pageNo;
		pageSizeUse = pageSize;
		totalPageUse = totalPage;
	} else if(multiDownFlag == 1) {
		pageNoUse = pageNo1;
		pageSizeUse = pageSize1;
		totalPageUse = totalPage1;
	} else if(multiDownFlag == 2) {
		pageNoUse = pageNo2;
		pageSizeUse = pageSize2;
		totalPageUse = totalPage2;
	} else {
		pageNoUse = pageNo3;
		pageSizeUse = pageSize3;
		totalPageUse = totalPage3;
	}
}

$(document).on('tap', '.clickSkip', function() {
	var productId = this.dataset.productId;
	var product_templete_flag = $('#product_templete').val();
	if(product_templete_flag == 1) {
		window.location.href = 'shop_detail_cate.html?productId=' + productId + '&shopId=' + shopId;
	} else {
		window.location.href = 'shop_detail_clothes.html?productId=' + productId + '&shopId=' + shopId;
	}
})

$(document).on('tap', '#dianpu_bottom', function() {
	var coordinateBox = document.getElementById('coordinate');
	var coordinate = coordinateBox.dataset.coordinate;
	console.log(coordinate);
//	window.location.href = 'dingWei.html?coordinate=' + coordinate;
	goToPage('dingWei.html?coordinate=' + coordinate);
})
//跳转营业执照页面
$(document).on('tap', '#business_license', function() {
	var licenseUrl = this.dataset.businessLicense;
	console.log(licenseUrl);
//	window.location.href = 'shop_yingYe_xuKeZheng.html?licenseUrl=' + licenseUrl;
	goToPage('shop_yingYe_xuKeZheng.html?licenseUrl=' + licenseUrl);
})