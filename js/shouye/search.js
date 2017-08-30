var categoryId;
if(getQueryString('categoryId')) {
	console.log('通过url传值');
	categoryId = getQueryString('productId');
} else if(window.localStorage.getItem('meiShi_waiMaiPage-categoryId')) {
	console.log('通过storage传值');
	categoryId = window.localStorage.getItem('meiShi_waiMaiPage-categoryId');
	//避免污染，记得销毁
	window.localStorage.removeItem('meiShi_waiMaiPage-categoryId');
}
console.log('接受参数-categoryId:', categoryId);

var shopname;
if(getQueryString('shopname')) {
	console.log('通过url传值');
	shopname = getQueryString('shopname');
} else if(window.localStorage.getItem('search-shopname')) {
	console.log('通过storage传值');
	shopname = window.localStorage.getItem('search-shopname');
}
console.log('接受参数-shopname:', shopname);
if(!shopname || shopname=='' || shopname==undefined){
	mui.toast('搜索内容不能为空');
}


var pageNo=0;
var pageSize=10;
var totalpage=10;
mui.init({
			pullRefresh: {
				container: '#pullrefresh',
				up: {
					height: 50, //可选.默认50.触发上拉加载拖动距离
					auto: true, //可选,默认false.自动上拉加载一次
					contentrefresh: '正在加载...',
					callback: pulldownRefresh
				}
			}
		});
var hei=$('.mui-content').height();
var hei1=$('body').height()-88;
if(hei<$('body').height()){
	$('.nav_txt').css('height','100%');
	$('#pullrefresh').css('height','500px');
}
else{
	$('.nav_txt').css('height',hei)
	$('#pullrefresh').css('height',hei);
}
function pulldownRefresh() {

	if(totalpage==0||pageNo<pageSize){
		pageNo++;
		setTimeout(function() {
var source = '{{each list value i}}' +
	'<div class="main_list" data-shopid="{{value.shopId}}" >' +
	'<div class="list_left"><img src="{{value.shopLogo}}" alt="" /></div>' +
	'<div class="list_right">' +
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
			var queryTerm1=new QueryTerm();
			if(categoryId){				
				queryTerm1.categoryId=categoryId;
			}
			queryTerm1.pageNo=pageNo;
			queryTerm1.pageSize=pageSize;
			if(shopname){
				console.log(shopname)
				queryTerm1.shopname=shopname;
			}
			addDataToBox(queryTerm1,source,'search',rootPath+'/api/shop/selectByleisureshop',1);
			//下拉刷新，新纪录插到最前面；
			mui('#pullrefresh').pullRefresh().endPullupToRefresh((true)); //参数为true代表没有更多数据了。		
//			mui('#pullrefresh').pullRefresh().refresh(true);
		}, 500);
	}else{
		mui('#pullrefresh').pullRefresh().refresh(true);
	}
	
}


$(document).on('tap','.main_list',function(){
	var shopId=this.dataset.shopid;
	console.log(shopId);
//	window.location.href='dianPu_detail.html?shopId='+shopId;
			window.localStorage.setItem('dianPu_detail-shopId', shopId);
		goToPage('dianPu_detail.html', 'shoye/dianPu_detail.html');
});