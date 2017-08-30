var pageNo = 1,
	pageSize = 10,
	totalPage = 10;
//接口ok
var userId = 1;
checkIsLogin();
if(localStorage.getItem('userId') && localStorage.getItem('userId') != '') {
	//获取用户信息
	userId = localStorage.getItem('userId');
}

mui.init({
	//上拉加载
	pullRefresh: {
		container: pullrefresh, //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
		up: {
			height: 100, //可选.默认50.触发上拉加载拖动距离
			auto: true, //可选,默认false.自动上拉加载一次
			contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
			contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
			//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
			callback: function() {
				//注意：
				//1、加载完新数据后，必须执行如下代码，true表示没有更多数据了：
				//2、若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
				_that = this;
				getUserJifenList(function(returnData) {
					if(returnData.result == "success") {
						$("#jifenNum").html(returnData.data.totalRecord);
						totalPage = returnData.data.totalPage;
						addEleToList(returnData.data.listRoute);
						if(pageNo >= totalPage) {
							_that.endPullupToRefresh(true);
						} else {
							_that.endPullupToRefresh(false);
						}
						pageNo += 1;
					} else {
						mui.alert(returnData.msg);
						_that.endPullupToRefresh(true);
					}
				});
			}, 
		}
	}
});

function getUserJifenList(callback) {
	$.ajax({
		url: rootPath + "/orderControllerapi/getIntegralsByuserId",
		type: 'GET',
		data: {
			'pageNo': pageNo,
			'userId': userId,
			'pageSize': pageSize,
		},
		dataType: 'json',
		// async:false,
		success: function(returnData) {
			console.log(returnData);
			callback(returnData);
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//向列表追加
function addEleToList(list) {
	if(list.length === 0) return;
	var len = list.length;
	//添加记录
	var ul = document.querySelector('.main');
	// var length = ul.querySelectorAll('div').length;
	//添加文档碎片   ，碎片避免多次整平渲染
	var fragment = document.createDocumentFragment();
	var li;
	for(var i = 0; i < len; i++) {
		li = document.createElement('div');
		li.className = 'list';
		li.innerHTML = '<p><span>' + list[i].name + '</span><span>' + list[i].creattime + '</span></p><p>' + list[i].integral + '</p>';
		fragment.appendChild(li);
	}
	// return fragment;
	// ul.insertBefore(fragment, ul.firstChild);
	ul.appendChild(fragment);
}

//时间戳转时间  格式为：2010-10-20 10:00:00
function getLocalTime(nS) {
	return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}

//时间戳转时间   格式为：2010年12月23日 10:53
function getLocalTime2(nS) {
	return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
}