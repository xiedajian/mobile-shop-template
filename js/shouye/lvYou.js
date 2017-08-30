var pageNo=0;
var pageSize=10;
var totalPage=0;
$(function(){
	var categoryName=getQueryString('categoryName');
	console.log(categoryName);
	$('.mui-title').html(categoryName);
});


mui('#ly #pullrefresh1').pullRefresh({
	container: '#pullrefresh1',		
	up: {
		height: 50, //可选.默认50.触发上拉加载拖动距离
		auto: true, //可选,默认false.自动上拉加载一次
		contentrefresh: '正在加载...',
	  callback: pulldownRefresh1
	}
});

function pulldownRefresh1() {
if(totalPage==0||pageNo<totalPage){
	setTimeout(function() {
		var source='{{each list value i}}'
			  +'<div class="cont_list" data-shopid="{{value.shopId}}" >'
			  +'<div class="cont_left"><img src="{{value.shopLogo}}" alt="" /></div>'
			  +'<div class="cont_right">'
			  +'<p><span class="mui-ellipsis"><a href="javascript:void(0);">{{value.shopName}}</a><a href="javascript:void(0);">({{value.shopNotice}})</a></span></p>'
			  +'<p>'
			  
			  +'{{if (value.shopGrade==1)}}<span><img src="../../img/shouye/star@2x.png" alt="" />'
			  +'<img src="../../img/shouye/star_1@2x.png" alt="" /><img src="../../img/shouye/star_1@2x.png" alt="" />'
			  +'<img src="../../img/shouye/star_1@2x.png" alt="" /><img src="../../img/shouye/star_1@2x.png" alt="" /></span>{{/if}}'
			  
			  +'{{if (value.shopGrade==2)}}<span><img src="../../img/shouye/star@2x.png" alt="" />'
			  +'<img src="../../img/shouye/star@2x.png" alt="" /><img src="../../img/shouye/star_1@2x.png" alt="" />'
			  +'<img src="../../img/shouye/star_1@2x.png" alt="" /><img src="../../img/shouye/star_1@2x.png" alt="" /></span>{{/if}}'
			  
			  +'{{if (value.shopGrade==3)}}<span><img src="../../img/shouye/star@2x.png" alt="" />'
			  +'<img src="../../img/shouye/star@2x.png" alt="" /><img src="../../img/shouye/star@2x.png" alt="" />'
			  +'<img src="../../img/shouye/star_1@2x.png" alt="" /><img src="../../img/shouye/star_1@2x.png" alt="" /></span>{{/if}}'
			  
			  +'{{if (value.shopGrade==4)}}<span><img src="../../img/shouye/star@2x.png" alt="" />'
			  +'<img src="../../img/shouye/star@2x.png" alt="" /><img src="../../img/shouye/star@2x.png" alt="" />'
			  +'<img src="../../img/shouye/star@2x.png" alt="" /><img src="../../img/shouye/star_1@2x.png" alt="" /></span>{{/if}}'
			  
			  +'{{if (value.shopGrade==5)}}<span><img src="../../img/shouye/star@2x.png" alt="" />'
			  +'<img src="../../img/shouye/star@2x.png" alt="" /><img src="../../img/shouye/star@2x.png" alt="" />'
			  +'<img src="../../img/shouye/star@2x.png" alt="" /><img src="../../img/shouye/star@2x.png" alt="" /></span>{{/if}}'
			  +'<span>{{value.shopGrade}}</span><span>人均{{value.avgPrice}}元</span>'
			  +'</p>'
			  +'<p><span>{{value.shopNotice}}</span><span>{{value.distance}}Km</span></p>'
			  +'</div>'
			  +'<a href="javascript:;"></a><div style="clear: both;"></div></div>{{/each}}';
			var queryTerm1=new QueryTerm();
			queryTerm1.categoryId=getQueryString('categoryId');
			queryTerm1.pageNo=pageNo;
			queryTerm1.pageSize=pageSize;
			addDataToBox(queryTerm1,source,'contAll',rootPath+'/api/shop/selectByleisureshop',1);
		mui('#pullrefresh1').pullRefresh().endPullupToRefresh((true)); //参数为true代表没有更多数据了。		
//		mui('#pullrefresh1').pullRefresh().refresh(true);
	}, 500);
}
}
//




