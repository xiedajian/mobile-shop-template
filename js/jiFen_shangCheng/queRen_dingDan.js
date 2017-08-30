console.log(JSON.parse(localStorage.getItem('waitOrder')));
var orderData = JSON.parse(localStorage.getItem('waitOrder'));

var userId = '';
var selectAddressId = '';
var orderId = '';
//商品id
var preOrderId = orderData.preOrderId || 'jfsc100';
//单价
var price = orderData.pirce || 0;
console.log(price);
//数量
var quantity = orderData.quantity || '1';
//总价
var sum = price * orderData.quantity;
$('.price').html(price);
$('.sum').html(sum);
$('.sp').html(quantity);
$('.title').html(orderData.title);
$('.proImgUrl').attr('src', orderData.picSrc);

//localStorage.setItem('userId', 1);
if(localStorage.getItem('userId') && localStorage.getItem('userId') != '') {
	userId = localStorage.getItem('userId');
} else {
	mui.toast('请登录后重试');
}

if(localStorage.getItem('address' + preOrderId) && localStorage.getItem('address' + preOrderId) != '') {
	console.log(localStorage.getItem('address' + preOrderId));
	selectAddressId = localStorage.getItem('address' + preOrderId);
	//	window.localStorage.setItem('address'+orderId,consigneeId);
	getAddressById(selectAddressId);
	$('.main_one').css('display', 'block');
	$('.main_one1').css('display', 'none');
} else {
	$('.main_one').css('display', 'none');
	$('.main_one1').css('display', 'block');
}

function getAddressById(id) {
	//根据id查询
	$.ajax({
		url: rootPath + "/UserConsigneeApi/getAddressInfo",
		type: 'GET',
		data: {
			consigneeId: id
		},
		dataType: 'json',
		success: function(data) {
			console.log(data);
			if(data.result == 'success') {

				$('#condigneeName').html(data.data.condigneeName);
				$('#telephone').html(data.data.telephone);
				$('#addressInfo').html(data.data.addressDetailedInfo + '' + data.data.liveAddress);
			} else {
				mui.toast('地址信息获取失败');
			}

		}
	});
}

//初始化仿支付密码键盘
PwdBox.init('', 'img/pwd_keyboard.png', '请输入支付密码', '安全支付环境，请放心使用！');
$('.duihuan').on('tap', function() {
	if(selectAddressId == '') {
		mui.toast('请先选择地址');
		return;
	}

	var postData = {
		userId: userId,
		addressId: selectAddressId,
		productId: orderData.productId,
		quantity: parseInt($('.sp').html()),
		property: orderData.property,
		shopId: 0,
	}
	//	console.log(postData);
	//下单
	$.ajax({
		url: rootPath + "/orderControllerapi/addOrderjfsc",
		type: 'POST',
		data: JSON.stringify(postData),
		dataType: 'json',
		contentType: "application/json",
		success: function(data) {
			console.log(data);
			if(data.result=='success') {
				mui.toast('下单ok');
				console.log(data);
				orderId = data.data;
				$('.zhifu_pop').css('display', 'block');
			} else {
				mui.toast('下单失败');
			}

		}
	});
})

var count;
$('.radio').find('span').append('<img src="../../img/jiFen_shangCheng/xuanzhe.png" class="ok"/>');
$('.radio').find('span').css('border', 'none');
$('.address').on('tap', function() {
	window.location.href = '../../html/wode/diZhi_huanLi.html?orderId=' + preOrderId;
})
$('.ss').toggle(function() {
		$('.gengduo_pop').css('display', 'block');
	},
	function() {
		$('.gengduo_pop').css('display', 'none');
	})
//

//商品中的点击加一事件 
$(".add").on("tap", function() {
	$(this).prev().html(parseInt($(this).prev().html()) + 1);
	var add = $(this).prev().html();
	if(add > 0) {
		$(".fenshu").css('display', 'block');

	}
	sub();
})
//商品中的点击减一事件 
$(".sub").on("tap", function() {
	var sub1 = parseInt($(this).next().html());
	if(sub1 <= 1) {
		sub();
		return;
	}
	$(this).next().html(sub1 - 1);
	sub();
	//		$(this).next().html(0);
	//		$(".fenshu").css('display', 'none');

})

function sub() {
	sum = 0;
	$('.sum').html(parseInt($('.sp').html()) * price);
	//	sum=price * orderData.quantity;
	//	$(".choose").each(function(a) {
	//		sum += parseInt($(".choose").eq(a).find(".sp").html())
	//	})
	//	//	$(".fenshu").css('display','block');
	//	$(".fenshu").html(sum);
	//	count = parseInt($('.sp').text());
	//	price = parseInt($('.price').text());
	//	$('.sum').text(count * price);

	//	console.log(count + "*" + price)
}

//
$('.radio').on('tap', function() {
	$(this).find('span').append('<img src="../../img/jiFen_shangCheng/xuanzhe.png" class="ok"/>');
	$(this).find('span').css('border', 'none');

})

$('.radio1').toggle(function() {
		$(this).find('.ro').append('<img src="../../img/jiFen_shangCheng/xuanzhe.png" class="ok"/>');
		$('.radio').find('span').append('<img src="../../img/jiFen_shangCheng/xuanzhe.png" class="ok"/>');
		$(this).find('span').css('border', 'none');
		$('.radio').find('span').css('border', 'none');

	},
	function() {
		$('.ok').remove();
		$(this).find('.ro').css('border', '1px solid #ddd');
		$('.radio').find('span').css('border', '1px solid #ddd');
	})

$('.quxiao').on('tap', function() {
	$('.zhifu_pop').css('display', 'none');
	$('.pop').css('display', 'none')
})
$('.mima').bind('input propertychange', function() {
	if($(this).val() == 123456) {
		$('.pop').css('display', 'none');
		$('.gwc_pop').css('display', 'block');
	}
})
//点击立即支付
$('.zhifu_bot').on('tap', function() {
	//关闭确认支付 窗口
	$('.zhifu_pop').css('display', 'none');
	//打开支付密码 窗口
	//	$('.pop').css('display', 'block');
	document.querySelector('.password-box .inner-box').style.background = "url(../../img/pwd_keyboard.png) center bottom / 100% 100%";
	PwdBox.show(function(res) {
		console.log(res);
		PwdBox.reset();
		var data = {
			orderId: orderId,
			userId: userId,
			password: res.password
		}
		//支付
		$.ajax({
			url: rootPath + "/orderControllerapi/payOrderjfsc",
			type: 'POST',
//			data: JSON.stringify(postData),
			data: data,
			dataType: 'json',
//			contentType: "application/json",
			success: function(data) {
				console.log(data);
				if(data.result=='success') {
					mui.alert('支付成功');
					window.location.href='../order/order_detail_3.html?type=2&orderId='+orderId;
				} else {
					mui.toast(data.msg);
				}

			}
		});

	});

})
$('.queren').on('tap', function() {
	$('.gwc_pop').css('display', 'none')
})
//var url1 = window.location.href;
//var indexUrl = window.location.href.indexOf('count=')+6;
//var indexUrl1 = window.location.href.indexOf('productId=')+10;
//var count= url1.substring(indexUrl,url1.length)
//var uid= url1.substring(indexUrl1,url1.length)
//$('.sp').text(count)
//getInfo(rootPath+'/api/product/selectByproductdetail?productid='+uid);
//count=parseInt($('.sp').text());
//price=parseInt($('.price').text());