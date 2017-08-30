//当前选择的选项卡索引
var nowTab = 1;

var postData = [
	//全部
	{
		index: 0,
		pageNo: 1,
		pageSize: 10,
		totalPage: 10,
		statusId: undefined,
	},
	//未付款
	{
		index: 1,
		pageNo: 1,
		pageSize: 10,
		totalPage: 10,
		statusId: 1,
	},
	//待使用
	{
		index: 2,
		pageNo: 1,
		pageSize: 10,
		totalPage: 10,
		statusId: 2,
	},
	//待评价
	{
		index: 3,
		pageNo: 1,
		pageSize: 10,
		totalPage: 10,
		statusId: 4,
	},
	//退款
	{
		index: 4,
		pageNo: 1,
		pageSize: 10,
		totalPage: 10,
		statusId: 6,
	}
];
//根据入口选择不同的 默认选项卡
var pageIndex = getQueryString('index');
console.log('page', pageIndex);
$('.mui-slider-item').eq(pageIndex).addClass('mui-active');
$('.mui-control-item').eq(pageIndex).addClass('mui-active');
var userId = '';
if(localStorage.getItem('userId') && localStorage.getItem('userId') != '') {
	//获取用户信息
	userId = localStorage.getItem('userId');
} else {
	mui.confirm('需要登录', ' ', ['返回', '去登录'], function(val) {
		console.log(val);
		if(val.index === 1) {
			window.location.href = "../enter/enter.html";
		} else {
			window.history.back();
		}
	}, 'div');
}

//获取订单列表
function getOrderList(data, callback) {
	$.ajax({
		url: rootPath + '/orderControllerapi/selectAllOrderByOrderType',
		data: {
			'userId': data.userId,
			'status': data.status,
			'pageNo': data.pageNo,
			'pageSize': data.pageSize,
		},
		async: false,
		type: "POST",
		dataType: 'json',
		success: function(returnData) {
			console.log(returnData);
			callback(returnData);
		}
	});
};

mui.init();
(function($) {
	//阻尼系数
	//	var deceleration = mui.os.ios ? 0.003 : 0.0009;
	$('.mui-scroll-wrapper').scroll({
		indicators: true, //是否显示滚动条
		//		deceleration: deceleration
	});

	//添加文档碎片   
	var createFragment = function(listArr) {
//		console.log(listArr);
		var _len = listArr.length;
		var fragment = document.createDocumentFragment();
		var html = template('main_templete', {
			list: listArr
		});
		var div = document.createElement('div');
		div.innerHTML = html;
		fragment.appendChild(div);
		return fragment;
	};

	$.ready(function() {
		//循环初始化所有下拉刷新，上拉加载。
		$.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
			$(pullRefreshEl).pullToRefresh({
				up: {
					height: 100, //可选.默认50.触发上拉加载拖动距离
					auto: true, //可选,默认false.自动上拉加载一次
					contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
					contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
					callback: function() {
						var self = this;
						var _postData = {
							'userId': userId,
							'status': postData[index].statusId,
							'pageNo': postData[index].pageNo,
							'pageSize': postData[index].pageSize,
						}
//						console.log(index);
//						console.log(_postData);
						getOrderList(_postData, function(returnData) {
							if(returnData.result == 'success') {
								console.log(postData);
								postData[index].totalPage = returnData.data.totalPage;
								//获取到所在tab的容器
								var ul = self.element.querySelector('.main');
								if(postData[index].pageNo >= postData[index].totalPage) {
									self.endPullUpToRefresh(true);
								} else {
									self.endPullUpToRefresh(false);
								}
								if(returnData.data.listRoute && returnData.data.listRoute.length > 0) {
									ul.appendChild(createFragment(returnData.data.listRoute));
								}
								postData[index].pageNo += 1;
							} else {
								mui.toast('数据获取失败');
								self.endPullUpToRefresh(true);
							}

						});
					}
				}
			});
		});

	});
})(mui);