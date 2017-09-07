var pageNo = 1;
var pageSize = 10;
var totalPage = 10;

var categoryName = getQueryString('categoryName');
var categoryId = getQueryString('categoryId');
console.log(categoryName);
$('.mui-title').html(categoryName);

var source = '{{each list value i}}' +
	'<div class="cont_list" data-shopid="{{value.shopId}}" >' +
	'<div class="cont_left"><img src="{{value.shopLogo}}" alt="" /></div>' +
	'<div class="cont_right">' +
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

//向列表追加
function addEleToList(list) {
	if(list.length === 0) return;
	// console.log(data.data);
	var render = template.compile(source);
	var html = render({
		list: list
	});
	console.log('has data');

	var oldHtml = document.getElementById('contAll').innerHTML;
	document.getElementById('contAll').innerHTML = oldHtml + html;
}

function getList(callback) {
	var queryTerm1 = new QueryTerm();
	queryTerm1.categoryId = categoryId;
	queryTerm1.pageNo = pageNo;
	queryTerm1.pageSize = pageSize;
	var coordinate = localStorage.getItem('coordinate');
	if(coordinate) {
		queryTerm1.coordinate = coordinate;
	} else {
		queryTerm1.coordinate = 'error';
	}
	$.ajax({
		url: rootPath + "/api/shop/selectByleisureshop",
		type: 'GET',
		data: queryTerm1,
		dataType: 'json',
		// async:false,
		success: function(returnData) {
			if(callback) {
				callback(returnData);
			}
		},
		error: function(err) {
			console.log(err);
		}
	});
}

mui.init();
mui('#ly #pullrefresh1').pullRefresh({
	container: '#pullrefresh1',
	up: {
		height: 50, //可选.默认50.触发上拉加载拖动距离
		auto: true, //可选,默认false.自动上拉加载一次
		contentrefresh: '正在加载...',
		callback: function() {
			_that = this;
			getList(function(returnData) {
				if(returnData.resultSuccess) {
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
		}
	}
});