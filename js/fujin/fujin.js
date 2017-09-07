/*//当前是第几页
var pageNo = 0;
//每页的记录数
var pageSize = 10;
//总页码
var totalPage = 0;

var pageNo1 = 0;
var pageSize1 = 5;
var totalPage1 = 0;

var pageNo2 = 0;
var pageSize2 = 5;
var totalPage2 = 0;

var pageNo3 = 0;
var pageSize3 = 5;
var totalPage3 = 0;

var pageNoUse = 0;
var pageSizeUse = 5;
var totalPageUse = 0;

mui.init();
(function($) {
	//阻尼系数
	var deceleration = mui.os.ios ? 0.003 : 0.0009;
	$('.mui-slider-item').scroll({
		bounce: false,
		indicators: true, //是否显示滚动条
		deceleration: deceleration,
		//					auto:true//可选,默认false.自动上拉加载一次
	});
	$.ready(function() {
		//循环初始化所有下拉刷新，上拉加载。
		$.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
			$(pullRefreshEl).pullToRefresh({
//				down: {
//					auto: true, //可选,默认false.首次加载自动上拉加载一次
//					callback: function() {
//						var self = this;
//						setTimeout(function() {
//							var ul = self.element.querySelector('.main');
//							selectPageInfo(index);
//							if(totalPageUse == 0 || pageNoUse < totalPageUse) {
//								pageNoUse++;
//								ul.insertBefore(createFragment(ul, index, 10, true), ul.firstChild);
//								self.endPullDownToRefresh(true);
//							}else{
//								self.endPullDownToRefresh(false);
//							}
//						}, 1000);
//					}
//				},
				up: {
					auto: true, //可选,默认false.首次加载自动上拉加载一次
					callback: function() {
						var self = this;
						setTimeout(function() {
							var ul = self.element.querySelector('.main');
							selectPageInfo(index);
							if(totalPageUse == 0 || pageNoUse < totalPageUse) {
								pageNoUse++;
								ul.appendChild(createFragment(ul, index, 5));
								self.endPullUpToRefresh(true);
							}else{
								self.endPullUpToRefresh(false);
							}
						}, 1000);
					}
				}
			});
		});
	});
})(mui);

var createFragment = function(ul, index, count, reverse) {
	console.log(index);
	var ext = document.getElementById('sliderSegmentedControl').getElementsByClassName('mui-control-item')[index].attributes['value'].value;
	//selectPageInfo(index);
	//if(totalPageUse==0||pageNoUse<totalPageUse){
	//	pageNoUse++;
	var length = ul.querySelectorAll('div').length;
	var fragment = document.createDocumentFragment();
	var li;
	li = document.createElement('div');
	li.className = 'main_list2';

	var source = document.getElementById('main_templete').innerHTML;
	var queryTerm = new QueryTerm();
	queryTerm.categoryId = parseInt(ext);
	queryTerm.pageNo = pageNoUse;
	queryTerm.pageSize = pageSizeUse;
	//		var html=addDataToBoxForFuJin(queryTerm,source,'',rootPath+'/api/shop/selectByleisureshop',1,index);
	//console.log(html);
	li.innerHTML = addDataToBoxForFuJin(queryTerm, source, '', rootPath + '/api/shop/selectByleisureshop', 1, index);

	fragment.appendChild(li);
	return fragment;
};

function addDataToBoxForFuJin(data, source, boxId, url, type, multiDownFlag) {
	var coordinate = localStorage.getItem('coordinate');
	var html;
	if(coordinate) {
		data.coordinate = coordinate;
	} else {
		data.coordinate = 'error';
	}
	console.log(data);
	$.ajax({
		url: url,
		// data:{'categoryId':categoryId,'pageNo':pageNo,'pageSize':pageSize,'province':province,'city':city},
		data: data,
		async: false,
		dataType: 'JSON',
		success: function(data) {
			console.log(data);
			if(type == 1) {
				if(multiDownFlag == 1) {
					pageNo1 = data.data.pageNo;
					pageSize1 = data.data.pageSize;
					totalPage1 = data.data.totalPage;
				} else if(multiDownFlag == 2) {
					pageNo2 = data.data.pageNo;
					pageSize2 = data.data.pageSize;
					totalPage2 = data.data.totalPage;
				} else if(multiDownFlag == 3) {
					pageNo3 = data.data.pageNo;
					pageSize3 = data.data.pageSize;
					totalPage3 = data.data.totalPage;
				} else {
					pageNo = data.data.pageNo;
					pageSize = data.data.pageSize;
					totalPage = data.data.totalPage;
				}
			}
			var dataList;

			if(type == 1) {
				dataList = data.data.listRoute;
			} else {
				dataList = data.data;
			}
			// console.log(data.data);
			var render = template.compile(source);
			html = render({
				list: dataList
			});
		}
	});
	//console.log(html)
	return html;
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
}*/

//如果是App环境，隐藏页面的tab导航
if(mui.os.plus) {
	$('.nav-tab-isshow').css('display', 'none');
	$('.mui-content').css('padding-bottom', '0');
}

$('.main').on('tap', '.item', function() {
	var shopId = $(this).attr('data-shopId');
	//	window.location.href = '../shouye/dianPu_detail.html?shopId=' + shopId;
	window.localStorage.setItem('dianPu_detail-shopId', shopId);
	goToPage('../shouye/dianPu_detail.html', 'shoye/dianPu_detail.html');
})

//搜索
$('#searchBox').on('keyup', function(e) {
	//	console.log($(this).val());
	console.log(e.keyCode);
	var val = $(this).val();

	if(e.keyCode === 13) {
		if(val == undefined || val == '') {
			mui.toast('请输入搜索内容')
			return;
		}
		window.localStorage.setItem('search-shopname', val);
		goToPage('../shouye/search.html', 'shouye/search.html');
	}
})

//数组
var postData = [
	//爱美食
	{
		index: 0,
		pageNo: 1,
		pageSize: 10,
		totalPage: 10,
		categoryId: 1,
	},
	//休闲
	{
		index: 1,
		pageNo: 1,
		pageSize: 10,
		totalPage: 10,
		categoryId: 2,
	},
	//逛街
	{
		index: 2,
		pageNo: 1,
		pageSize: 10,
		totalPage: 10,
		categoryId: 3,
	},
	//全部
	{
		index: 3,
		pageNo: 1,
		pageSize: 10,
		totalPage: 10,
		categoryId: 0,
	},
];

//获取订单列表
function getFujinList(data, callback) {
	var coordinate = localStorage.getItem('coordinate');
	if(coordinate) {
		coordinate = coordinate;
	} else {
		coordinate = 'error';
	}
	$.ajax({
		url: rootPath + '/api/shop/selectByleisureshop',
		data: {
			'categoryId': data.categoryId,
			'pageNo': data.pageNo,
			'pageSize': data.pageSize,
			'coordinate': coordinate,
		},
		//		async: false,
		type: "GET",
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
		$.each(document.querySelectorAll('.mui-scroll'), function(index, pullRefreshEl) {
			$(pullRefreshEl).pullToRefresh({
				up: {
					height: 100, //可选.默认50.触发上拉加载拖动距离
					auto: true, //可选,默认false.自动上拉加载一次
					contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
					contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
					callback: function() {
						var self = this;
						var _postData = {
							//							'userId': userId,
							'categoryId': postData[index].categoryId,
							'pageNo': postData[index].pageNo,
							'pageSize': postData[index].pageSize,
						}
						console.log(index);
						console.log(_postData);
						getFujinList(_postData, function(returnData) {
							if(returnData.resultSuccess) {
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