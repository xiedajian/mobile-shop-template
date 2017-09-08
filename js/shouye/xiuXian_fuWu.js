var categoryId;
if(getQueryString('categoryId')) {
	console.log('通过url传值');
	categoryId = getQueryString('productId');
} else if(window.localStorage.getItem('xiuXian_fuWuPage-categoryId')) {
	console.log('通过storage传值');
	categoryId = window.localStorage.getItem('xiuXian_fuWuPage-categoryId');
	//避免污染，记得销毁
	window.localStorage.removeItem('xiuXian_fuWuPage-categoryId');
}
console.log('接受参数-categoryId:', categoryId);
if(!categoryId || categoryId == '' || categoryId == undefined) {
	categoryId = 3;
}
//店铺列表
var listSource = '{{each list value i}}' +
	'<div class="main_list" data-shopid="{{value.shopId}}">' +
	'<div class="list_left"><img src="{{value.shopLogo}}" alt="" /></div>' +
	'<div class="list_right">'
	//	  +'<p><span class="mui-ellipsis"><a href="javascript:void(0);">{{value.shopName}}</a><a href="javascript:void(0);">({{value.shopNotice}})</a></span></p>'
	+
	'<p><span class="mui-ellipsis"><a href="javascript:void(0);">{{value.shopName}}</a><a href="javascript:void(0);"></a></span></p>' +
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
	'<span>&nbsp;&nbsp;</span><span>人均{{value.avgPrice}}元</span>' +
	'</p>' +
	'<p><span>{{value.shopNotice}}</span><span>&nbsp;&nbsp;{{value.distance}}Km</span></p>' +
	'</div>' +
	'<a href="javascript:;"></a><div style="clear: both;"></div></div>{{/each}}';


//分类
var fenleiSource = '{{each list value i}}' +
	'<li><a href="javascript:void(0);" data-categoryid="{{value.categoryid}}">' +
	'<img src="{{value.picture}}"/>' +
	'<span>{{value.name}}</span>' +
	'</a></li>' +
	'{{/each}}' +
	'<li><a href="javascript:void(0);" data-categoryid="3"><img src="../../img/shouye/nav8.png"/><span>全部</span></a></li>';
//推荐
var tuijianSource = '{{each list value index}}<a value="{{index}}" data-categoryid="{{value.categoryid}}" class="mui-control-item {{if (index===0)}}mui-active{{/if}}" href="#item{{index + 1}}mobile">{{value.name}}推荐</a>{{/each}}';
var tuijianTabSource = '{{each list value index}}<div id="item{{index+1}}mobile" class="mui-slider-item mui-control-content {{if (index===1)}}mui-active{{/if}}">{{index}}</div>{{/each}}';
(function getFenlei() {
	var queryTerm = new QueryTerm();
	queryTerm.typeid = categoryId;

	$.ajax({
		url: rootPath + "/api/shop/selectBymovebrand",
		type: 'GET',
		data: queryTerm,
		dataType: 'json',
		// async:false,
		success: function(returnData) {
			console.log(returnData);
			if(returnData.resultSuccess) {
				var postData = returnData.data;

				//分类dom拼接
				var fenleiRender = template.compile(fenleiSource);
				var fenleiHtml = fenleiRender({
					'list': returnData.data
				});
				document.querySelector('#xiuxianfuwu').innerHTML = fenleiHtml;
				//推荐dom拼接
				var tuijianRender = template.compile(tuijianSource);
				var tuijianHtml = tuijianRender({
					'list': returnData.data
				});
				document.querySelector('#sliderSegmentedControl').innerHTML = tuijianHtml;
				//推荐
				//				var tuijianTabRender = template.compile(tuijianTabSource);
				//				var tuijianTabHtml = tuijianTabRender({
				//					'list': returnData.data
				//				});
				//				console.log(tuijianTabHtml);
				//				document.querySelector('.mui-slider-group').innerHTML = tuijianTabHtml;

				//推荐各个选项查询推荐店铺
				var coordinate = localStorage.getItem('coordinate');
				if(coordinate) {
					coordinate = coordinate;
				} else {
					coordinate = 'error';
				}
				$.each(document.querySelectorAll('.mui-slider-group .mui-slider-item'), function(index, pullRefreshEl) {
					console.log(index);
					console.log(pullRefreshEl.innerHTML);
					$.ajax({
						url: rootPath + '/api/shop/selectByleisureshop',
						data: {
							'pageNo': 1,
							'pageSize': 2,
							'auto': 1,
							'categoryId': postData[index].categoryid,
							'coordinate': coordinate,
						},
						async: false,
						type: "POST",
						dataType: 'json',
						success: function(returnData2) {
							console.log(returnData2);
							if(returnData2.resultSuccess) {

								var listRender = template.compile(listSource);
								var listHtml;

								if(returnData2.data.listRoute && returnData2.data.listRoute.length>0) {
									listHtml = listRender({
										'list': returnData2.data.listRoute
									});
								}else{
									
									listHtml='<div style="text-align:center;color:#777;">没有更多数据了</div>';
								}
								pullRefreshEl.innerHTML = listHtml;
							} else {

							}
						}
					});
				});

			} else {
				mui.toast('获取分类失败');
			}
		},
		error: function(err) {
			console.log(err);
		}
	});

	//	addDataToBox(queryTerm, source, 'xiuxianfuwu', rootPath + '/api/shop/selectBymovebrand', 2);
})();

//图片广告
var source1 = '{{each list value i}}' +
	'<a href="javascript:void(0);" data-adverttype="{{value.adverttype}}" data-shoporproductid="{{value.shoporproductid}}" data-adverturl="{{value.adverturl}}">' +
	'<img src="{{value.advertpic}}"/>' +
	'</a>' +
	'{{/each}}' +
	'<div style="clear: both;"></div>';
var queryTerm1 = new QueryTerm();
queryTerm1.pageNo = 0;
queryTerm1.adsenseid = 15;
addDataToBox(queryTerm1, source1, 'renqi_txt', rootPath + '/advertControllerapi/selectByfirst', 2);

//图片广告跳转统一处理
function picTapCallback(el) {
	console.log($(el).attr('data-adverturl'));
	var adverttype = $(el).attr('data-adverttype');
	var adverturl = $(el).attr('data-adverturl');
	var shoporproductid = $(el).attr('data-shoporproductid');
	if(adverttype == '3' || adverttype == '4') {
		window.localStorage.setItem('ad-page-url', adverturl);
		goToPage('AD-detail.html', 'shouye/AD-detail.html');
	} else if(adverttype == '2') {
		window.localStorage.setItem('shop_detail-productId', shoporproductid);
		goToPage('shop_detail_cate.html', 'shouye/shop_detail_cate.html');
	} else if(adverttype == '1') {
		//		window.localStorage.setItem('dianPu_detail-shopId', shoporproductid);
		goToPage('dianpu_detail_2.html?shopId=' + shoporproductid);
	}
}

//图片广告
$(document).on('tap', '#renqi_txt a', function() {
	var url = this.dataset.url;
	console.log(url);
	picTapCallback(this);
	//	window.location.href=url;
});

//列表点击
$(document).on('tap', '.main_list', function() {
	var shopId = this.dataset.shopid;
	var shop_page_templete_flag = $('#shop_page_templete').val();
	shop_page_templete_flag = 1;
	if(shop_page_templete_flag == 1) {
		//		window.location.href='dianPu_detail.html?shopId='+shopId;
		goToPage('dianPu_detail.html?shopId=' + shopId);

	} else {
		//		window.location.href='dianpu_detail_2.html?shopId='+shopId;
		goToPage('dianpu_detail_2.html?shopId=' + shopId);
	}
});
//分类
$(document).on('tap', '#xiuxianfuwu li a', function() {
	var categoryId = this.dataset.categoryid;
	console.log(categoryId);
	goToPage('movice_list.html?categoryId=' + categoryId);
});
//