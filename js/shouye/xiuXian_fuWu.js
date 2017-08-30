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
if(!categoryId || categoryId=='' || categoryId==undefined){
	categoryId=3;
}

var pageNo=0;
var pageSize=10;
var totalPage=0;

var pageNo1=0;
var pageSize1=10;
var totalPage1=0;

var pageNo2=0;
var pageSize2=10;
var totalPage2=0;

var pageNo3=0;
var pageSize3=10;
var totalPage3=0;

var pageNoUse=0;
var pageSizeUse=10;
var totalPageUse=0;


var source='{{each list value i}}'
	  +'<div class="main_list" data-shopid="{{value.shopId}}">'
	  +'<div class="list_left"><img src="{{value.shopLogo}}" alt="" /></div>'
	  +'<div class="list_right">'
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
	  +'<p><span>{{value.shopNotice}}</span><span><100m</span></p>'
	  +'</div>'
	  +'<a href="javascript:;"></a><div style="clear: both;"></div></div>{{/each}}';
$(function(){
	
	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			up: {
				height: 10, //可选.默认50.触发上拉加载拖动距离
				auto: true, //可选,默认false.自动上拉加载一次
				contentrefresh: '正在加载...',
				callback: pulldownRefresh
			}
		}
	});
	
	
	var source = '{{each list value i}}'
		+    '<li><a href="javascript:void(0);" data-categoryid="{{value.categoryid}}">'
		+    '<img src="{{value.picture}}"/>'
		+	 '<span>{{value.name}}</span>'
		+    '</a></li>' 
		+    '{{/each}}'
		+	 '<li><a href="quanBu.html"><img src="../../img/shouye/nav8.png"/><span>全部</span></a></li>';
	var queryTerm=new QueryTerm();
	queryTerm.typeid=categoryId;
	addDataToBox(queryTerm,source,'xiuxianfuwu',rootPath+'/api/shop/selectBymovebrand',2);
	/*$.ajax({
		url:,
		data:{'typeid':categoryId},
		dataType:'JSON',
		success:function(data){
			//<p>横店电影城</p>
			console.log(data.data);
			var source = '{{each list value i}}'
				+    '<li><a href="javascript:void(0);" onclick="getShopsByCategory(\'{{value.categoryid}}\')">'
				+    '<img src="{{value.picture}}"/>'
				+	 '<span>{{value.name}}</span>'
				+    '</a></li>' 
				+    '{{/each}}'
				+	 '<li><a href="quanBu.html"><img src="../../img/shouye/nav8.png"/><span>全部</span></a></li>';
			var render = template.compile(source);
			var html = render({
				list:data.data
			});
			console.log(html)
			document.getElementById('xiuxianfuwu').innerHTML = html;
		},
		error:function(data){
		}
	});*/
	
	var source1 = '{{each list value i}}'
		+    '<a href="javascript:void(0);" data-url="{{value.adverturl}}">'
		+    '<img src="{{value.advertpic}}"/>'
		+    '</a>' 
		+    '{{/each}}'
		+	 '<div style="clear: both;"></div>';
	var queryTerm1=new QueryTerm();
	queryTerm1.pageNo=0;
	queryTerm1.adsenseid=15;
	addDataToBox(queryTerm1,source1,'renqi_txt',rootPath+'/advertControllerapi/selectByfirst',2);
})

function pulldownRefresh() {
	console.log('上拉事件');
	var index=$('#sliderSegmentedControl .mui-active').index('#sliderSegmentedControl a');
	var ext=$('#sliderSegmentedControl .mui-active').attr('value');
	selectPageInfo(index);
	setTimeout(function() {
		if(totalPageUse==0||pageNoUse<totalPageUse){
			pageNoUse++;
			var queryTerm=new QueryTerm();
			queryTerm.categoryId=parseInt(ext)+1;
			queryTerm.pageNo=pageNoUse;
			queryTerm.pageSize=pageSizeUse;
			addDataToBox(queryTerm,source,'item'+(index+1)+'mobile',rootPath+'/api/shop/selectByleisureshop',1,index);
			var hei=0;
			var time1=setInterval(function(){
				var hei=$('#item'+(index+1)+'mobile').height();
				if(hei!=0){
					hei=hei+412;
					console.log(hei);
					clearInterval(time1);
					$('.mui-scroll').css('height',hei);
				}
			},10);
			
			
			
			
			mui('#pullrefresh').pullRefresh().endPullupToRefresh((true | false)); //参数为true代表没有更多数据了。
			mui('#pullrefresh').pullRefresh().refresh(true);
		}else{
			/*var hei=0;
			var time1=setInterval(function(){
				var hei=$('#item'+(index+1)+'mobile').height();
				if(hei!=0){
					hei=hei+412;
					console.log(hei);
					clearInterval(time1);
					$('.mui-scroll').css('height',hei);
				}
			},10);*/
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(false); //参数为true代表没有更多数据了。	
		}
	}, 500);
}


function selectPageInfo(multiDownFlag){
	if(multiDownFlag==0){
		pageNoUse=pageNo;
		pageSizeUse=pageSize;
		totalPageUse=totalPage;
	}else if(multiDownFlag==1){
		pageNoUse=pageNo1;
		pageSizeUse=pageSize1;
		totalPageUse=totalPage1;
	}else if(multiDownFlag==2){
		pageNoUse=pageNo2;
		pageSizeUse=pageSize2;
		totalPageUse=totalPage2;
	}else{
		pageNoUse=pageNo3;
		pageSizeUse=pageSize3;
		totalPageUse=totalPage3;
	}
}

$(document).on('tap','#renqi_txt a',function(){
	var url=this.dataset.url;
	window.location.href=url;
});

$(document).on('tap','.main_list',function(){
	var shopId=this.dataset.shopid;
	var shop_page_templete_flag=$('#shop_page_templete').val();
	shop_page_templete_flag=1;
	if(shop_page_templete_flag==1){		
		window.location.href='dianPu_detail.html?shopId='+shopId;
	}else{
		window.location.href='dianpu_detail_2.html?shopId='+shopId;
	}
});
$(document).on('tap','#xiuxianfuwu li a',function(){
	var categoryId=this.dataset.categoryid;	
	
	
	window.location.href='meiShi_waiMai.html?categoryId='+categoryId;
});
//