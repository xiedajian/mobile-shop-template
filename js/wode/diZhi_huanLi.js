var userId = 1;
//用于区分页面是否从订单页进入
var orderId = getQueryString('orderId');
checkIsLogin();
if(localStorage.getItem('userId') && localStorage.getItem('userId') != '') {
	//获取用户信息
	userId = localStorage.getItem('userId');
	getUserAddress();
}

function getUserAddress() {
	var ran=Math.random();
	$.ajax({
		url: rootPath + "/UserConsigneeApi/appConsignee?userId=" + userId+"&ran="+ran,
		dataType: 'json',
		// async:false,
		success: function(data) {
			console.log(data);
			if(data.result == 'success') {
				addEleToList(data.data);
			} else {
				console.log(data);
				$('.noAdress').css('display', 'block');
			}

		},
		error: function(err) {
			console.log(err);
			mui.alert('服务器连接失败', function() {
				$('.noAdress').css('display', 'block');
			});
		}
	});
}

//向列表追加  list为数组
function addEleToList(list) {
	if(list.length === 0) {
		$('.noAdress').css('display', 'block');
		return;
	};
	var len = list.length;
	//添加记录
	var ul = document.querySelector('.mui-content');
	// var length = ul.querySelectorAll('div').length;
	//添加文档碎片   ，碎片避免多次整屏渲染
	var fragment = document.createDocumentFragment();
	var li;
	for(var i = 0; i < len; i++) {
		li = document.createElement('div');
		li.className = 'list';
		if(list[i].addressDetailedInfo == undefined) list[i].addressDetailedInfo = '暂无';

		li.innerHTML = '<div class="main_weizhi" data-consigneeId="' + list[i].consigneeId + '" >' +
			'<p class="mui-ellipsis" onclick="selectOrderAddress(' + list[i].consigneeId + ')">' + list[i].addressDetailedInfo + '</p><p onclick="selectOrderAddress(' + list[i].consigneeId + ')">' +
			'<span>联系人 </span>' +
			'<span>' + list[i].condigneeName + '，' + list[i].telephone + '</span>' +
			'</p>' +
			'<p>' +
			'<span class="moren" data-defaultStatus="' + list[i].defaultStatus + '" onclick="setDefaultAdress(' + list[i].consigneeId + ',this)"><img class="imgs" src="../../img/wode/checked (2).png"/>默认地址</span>' +
			'<span class="del" onclick="delAdress(' + list[i].consigneeId + ')">删除</span>' +
			'<span>编辑<a href="bianJi_area.html?consigneeId=' + list[i].consigneeId + '"></a></span></p></div>';

		fragment.appendChild(li);
	}
	// return fragment;
	// ul.insertBefore(fragment, ul.firstChild);
	ul.appendChild(fragment);

	//本地样式修改
	updateDefaultAdressStyle();
}

//从订单页面进入时，选择地址，并返回订单页面
function selectOrderAddress(consigneeId) {
	console.log(consigneeId);
	if(orderId && orderId != null && orderId != '' && orderId != undefined) {
		window.localStorage.setItem('address' + orderId, consigneeId);
//		window.history.go(-1);
		mui.back();
	}
}

//删除地址
function delAdress(consigneeId) {
	//提交服务器修改
	$.ajax({
		url: rootPath + "/UserConsigneeApi/deleteShippingAddressapp",
		type: 'POST',
		data: {
			consigneeId: consigneeId,
		},
		dataType: 'json',
		// async: false,
		success: function(data) {
			console.log(data);
			if(data.result == 'success') {
				console.log('delOK');
				//本地样式修改
				$('.main_weizhi[data-consigneeId="' + consigneeId + '"]').remove();
			} else {
				mui.alert(data.msg);
			}
		},
		error: function(err) {
			console.log(err);
		}
	});

	//本地样式修改
	$('.main_weizhi[data-consigneeId="' + consigneeId + '"]').remove();
}

//设置默认地址
function setDefaultAdress(consigneeId, eleMent) {
	//提交服务器修改
	$.ajax({
		url: rootPath + "/UserConsigneeApi/setdefaultConsignee",
		type: 'POST',
		data: {
			consigneeId: consigneeId,
			userId: userId,
		},
		dataType: 'json',
		// async: false,
		success: function(data) {
			console.log(data);
			if(data.result == 'success') {
				console.log('setDefaultOK');
				//本地样式修改
				$('.moren').attr('data-defaultStatus', false);
				$(eleMent).attr('data-defaultStatus', true);
				updateDefaultAdressStyle();
			} else {
				mui.alert(data.msg);
			}
		},
		error: function(err) {
			console.log(err);
		}
	});

	//本地样式修改
	$('.moren').attr('data-defaultStatus', false);
	$(eleMent).attr('data-defaultStatus', true);
	updateDefaultAdressStyle();
}

//修改默认地址的样式
function updateDefaultAdressStyle() {
	$('.moren img').attr('src', '../../img/wode/check (2).png');
	$('.moren[data-defaultStatus=true] img').attr('src', '../../img/wode/checked (2).png');
}

//返回上一页刷新上一页案例
//在父页面中添加事件监听
window.addEventListener('refresh', function(e) { //执行刷新
	location.reload();
});