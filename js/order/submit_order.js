var orderId = getQueryString('orderId');
var userId = localStorage.getItem('userId');
$(function() {
	$('#select_address_page').attr('href', '../../html/wode/diZhi_huanLi.html?orderId=' + orderId);
	var addressId = localStorage.getItem('address' + orderId);
	console.log(addressId);
	if(addressId == null || addressId == undefined) {
		$.ajax({
			url: rootPath + '/UserConsigneeApi/getdefaultConsignee',
			data: {
				'userId': userId
			},
			dataType: 'JSON',
			success: function(data) {
				if(data.data == null || data.data == undefined) {
					document.getElementById('address').innerHTML = data.msg;
				} else {
					document.getElementById('address').innerHTML = data.data.addressDetailedInfo.replace(/,/g, '') + data.data.liveAddress;
					document.getElementById('name').innerHTML = data.data.condigneeName;
					document.getElementById('phone').innerHTML = data.data.telephone;
				}
			}
		})
	} else {
		$.ajax({
			url: rootPath + '/UserConsigneeApi/getAddressInfo',
			data: {
				'consigneeId': addressId
			},
			dataType: 'JSON',
			success: function(data) {
				console.log(data);
				document.getElementById('address').innerHTML = data.data.addressDetailedInfo.replace(/,/g, '') + data.data.liveAddress;
				document.getElementById('name').innerHTML = data.data.condigneeName;
				document.getElementById('phone').innerHTML = data.data.telephone;
				localStorage.removeItem('address' + orderId);
			}
		})
	}
	$.ajax({
		url: rootPath + '/orderControllerapi/getOrderById',
		data: {
			'orderId': orderId
		},
		dataType: 'JSON',
		success: function(data) {
			if(data.resultSuccess) {
				console.log(data);
				data.data.rootPath = imgRootPath;
				console.log(data.data);
				$('#waitingPayTotal').html(data.data.actualPayment);
				addHtmlForTemplte(data.data, 'order_info', 'order_info_templete');

			} else {
				mui.toast('订单信息获取失败');
			}
		}
	});
})

$('#demo5').on('tap', function() {
	var dtPicker = new mui.DtPicker({
		type: 'time'
	});
	dtPicker.show(function(selectItems) {
		$('.time').html(selectItems.h.text + "时" + selectItems.i.text + "分");
	})
})
//
$('.ps_type').on('tap', function() {
	$.ajax({
		url: rootPath + '/orderControllerapi/getAllExpressMethod',
		dataType: 'JSON',
		success: function(data) {
			var picker = new mui.PopPicker();
			picker.setData(data.data)
			picker.pickers[0].setSelectedIndex(1, 2000);
			picker.show(function(SelectedItem) {
				console.log(SelectedItem);
				$('.ps_type_txt').html(SelectedItem[0].shipping);
				$('.ps_type_txt').attr('data-shipping-method', SelectedItem[0].shippingid)
			})

		}
	});

})
//提交订单
$('#submit').on('tap', function() {
	var address = document.getElementById('address').innerHTML;
	var name = document.getElementById('name').innerHTML;
	var phone = document.getElementById('phone').innerHTML;
	var shippingId = document.getElementById('shipping_method').dataset.shippingMethod;
	var remark = document.getElementById('remark').value;
	if(address == undefined || address == '') {
		mui.alert('请填写收货地址');
		return false;
	}
	if(name == undefined || name == '') {
		mui.alert('请填写收货人姓名');
		return false;
	}
	if(shippingId == undefined || shippingId == '') {
		mui.toast('请选择配送方式');
		return false;
	}
	if(localStorage.getItem('userId') && localStorage.getItem('userId') != '') {

	} else {
		mui.confirm('需要登录', ' ', ['返回', '去登录'], function(val) {
			console.log(val);
			if(val.index === 1) {
				window.location.href = "../enter/enter.html";
			}
		}, 'div');
		return;
	}
	$.ajax({
		url: rootPath + '/orderControllerapi/updateOrder',
		data: {
			'orderId': orderId,
			'address': address,
			'shippingName': name,
			'shippingMethod': shippingId,
			'remark': remark,
			'shippingPhone': phone
		},
		dataType: 'JSON',
		success: function(data) {
			if(data.resultSuccess) {
				window.location.href = 'order_detail.html?orderId=' + orderId
			} else {
				mui.toast(data.resultDesc);
			}
		}
	})
})