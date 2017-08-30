var pageNo=0;
var pageSize=10;
var totalPage=0;

$(function(){
	//动态获取筛选的内容
	var source1=document.getElementById('txt_two_lb_templete').innerHTML;
	var queryTerm1=new QueryTerm();
	addDataToBox(queryTerm1,source1,'txt_two_lb',rootPath+'/api/shop/selectByshopservice',2);
	
	var source2=document.getElementById('txt_one_templete').innerHTML;
	var queryTerm2=new QueryTerm();
	queryTerm2.typeid=1;
	addDataToBox(queryTerm2,source2,'txt_one',rootPath+'/api/shop/selectBymovebrand',2);
});
/**
 * 初始化页面
 */

function initPage(){
	var categoryId=getQueryString('categoryId');
	var queryTerm=new QueryTerm();
	queryTerm.categoryId=parseInt(categoryId);
	queryTerm.pageNo=pageNo;
	queryTerm.pageSize=pageSize;
	var source='{{each list value i}}'
			  +'<div class="main_list" data-shopid="{{value.shopId}}" >'
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
			  +'<p><span>{{value.shopNotice}}</span><span>{{value.distance}}Km</span></p>'
			  +'</div>'
			  +'<a href="javascript:;"></a><div style="clear: both;"></div></div>{{/each}}';
	addDataToBox(queryTerm,source,'main',rootPath+'/api/shop/selectByleisureshop',1);
}
/**
 * 下拉刷新
 */
function pulldownRefresh() {
	setTimeout(function() {
		var table = document.body.querySelector('.main');
		var cells = document.body.querySelectorAll('.main_list');
		if(totalPage==0||pageNo<totalPage){
			pageNo++;
			//根据条件查询
			selectShopByTerm();
			mui('#pullrefresh').pullRefresh().endPullupToRefresh((true)); //参数为true代表没有更多数据了。
//			mui('#pullrefresh').pullRefresh().refresh(true);
		}else{
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(false); //参数为true代表没有更多数据了。	
		}
	}, 500);
}
$(document).on('tap','.main_list',function(){
	var shopId=this.dataset.shopid;
	var shop_page_templete_flag=$('#shop_page_templete').val();
	if(shop_page_templete_flag==1){		
		window.location.href='dianPu_detail.html?shopId='+shopId;
	}else{
		window.location.href='dianpu_detail_2.html?shopId='+shopId;
	}
});
/*
function getShopList(queryTerm){
	$.ajax({
		type:'post',
		url:rootPath+'/api/shop/selectByleisureshop',
		data:queryTerm,
		dataType:'JSON',
		success:function(data){
			console.log(data);
			pageNo=data.data.pageNo;
			pageSize=data.data.pageSize;
			totalPage=data.data.totalPage;
			var html = template('shops', data.data);
			$('.main').append(html);
		}
	});	
}*/