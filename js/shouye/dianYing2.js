
var shopListSource='{{each list value i}}'
	  +'<div class="main_list" data-shopid="{{value.shopId}}">'
	  +'<div class="list_left"><img src="{{value.shopLogo}}" alt="" /></div>'
	  +'<div class="list_right">'
	  +'<p><span class="mui-ellipsis"><a href="javascript:void(0);" >{{value.shopName}}</a><a href="javascript:void(0);">({{value.shopNotice}})</a></span></p>'
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
	$('.head_tit p').css({'color':'#fff','background':'#fd5100'});
	$("#dianying").css({'color':'#fd5100','background':'#fff'});
	carousel(2);
	var source= '{{each list value i}}'
			   +'<li><a href="javascript:void(0);" data-url="{{value.adverturl}}" >'
			   +'<img src="{{value.advertpic}}" alt="" />'
			   +'</a></li>{{/each}}<p style="clear: both;height: 0;"></p>';
	
	var queryTerm=new QueryTerm();
	queryTerm.pageNo=0;
	queryTerm.adsenseid=13;
	addDataToBox(queryTerm,source,'carousel_box',rootPath+'/advertControllerapi/selectByfirst',2);
	
	var source1 = '{{each list value i}}'
		+    '<p data-value="{{value.categoryid}}">'
		+    '{{value.name}}'
		+    '</p>' 
		+    '{{/each}}'
		+		 '<p data-value="35">全部</p>';
	var queryTerm1=new QueryTerm();
	queryTerm1.typeid=35;
	addDataToBox(queryTerm1,source1,'brand',rootPath+'/api/shop/selectBymovebrand',2);
	//根据城市查询地区
	var adcode=localStorage.getItem('adcode');
	if(adcode==undefined){
		adcode='410100';
	}
	var source2 =document.getElementById('area_list_templete').innerHTML;
	var queryTerm2=new QueryTerm();
	queryTerm2.adcode=adcode;
	addDataToBox(queryTerm2,source2,'area_list',rootPath+'/api/region/getAreasByCityCode',2);
	
	var hei=$('.mui-content').height();
	if(hei<$('body').height()){
		$('.nav_txt').css('height','100%')
	}
	else{
		$('.nav_txt').css('height',hei)
	}
	
	
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
})
mui('#pullrefresh').pullRefresh({
	container: '#pullrefresh',		
	up: {
		height: 50, //可选.默认50.触发上拉加载拖动距离
		auto: true, //可选,默认false.自动上拉加载一次
		contentrefresh: '正在加载...',
	  callback: pulldownRefresh
	}
});
		
$(document).on('tap','.nav_tit p',function(){
	$('.mui-slider').css({'height':'0','margin':'0'});
	$('.tjyy').css({'height':'0','margin':'0'});
	$('.nav').css({'top':'0px','transition':'all 0.3s'});
	$('.nav_tit p').css('color','#333');
	$('.nav_tit img').attr('src','../../img/shouye/jiantou-hui.png');
	$(this).css('color','#2F9EF0');
	$(this).find('img').attr('src','../../img/shouye/jiantou-lan.png');
	$('.nav_txt>div').css('display','none');
	
	$('.nav_txt').css('display','block');
	$('.nav_txt').find('.txt_one').css('display','none');
	$('.nav_txt').find('.txt_one').eq($(this).index()).css('display','block');
});
$(document).on('tap','.txt_one p',function(){
	$('.txt_one p').css('color','#333');
	$(this).css('color','#2F9EF0');
	$('.nav_tit').children().eq($(this).parent().index()).html($(this).html()+'<img src="../../img/shouye/jiantou-hui.png"/>');
	$('.nav_tit').children().eq($(this).parent().index()).attr('data-value',this.dataset.value);
	$('.nav_txt').css('display','none');
	//根据条件查询店铺列表
	$('.main').empty();
	pageNo=0;
	selectShopByTerm();		
});
//
$(document).on('tap',function(e){
	if(e.target.className=='nav_txt'){
		$('.nav_txt').css('display','none');
	}
});
//

setInterval(function(){
	if($('.nav_txt').css('display')=='none'){		
	$('.nav_tit>p').css('color','#333');
	$('.nav_tit p').find('img').attr('src','../../img/shouye/jiantou-hui.png');
}	
},10)
//
function pulldownRefresh() {
	setTimeout(function() {
		if(totalPage==0||pageNo<totalPage){
			pageNo++;
			selectShopByTerm();
			mui('#pullrefresh').pullRefresh().endPullupToRefresh((true)); //参数为true代表没有更多数据了。
//			mui('#pullrefresh').pullRefresh().refresh(true);
		}else{
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(false); //参数为true代表没有更多数据了。	
		}
	}, 500);
}


function selectShopByTerm(){
	var adcode=document.getElementsByClassName('nav_tit')[0].getElementsByTagName('p')[0].dataset.value;
	var categoryId=document.getElementsByClassName('nav_tit')[0].getElementsByTagName('p')[1].dataset.value;
	var otherTerm=document.getElementsByClassName('nav_tit')[0].getElementsByTagName('p')[2].dataset.value;
	var queryTerm=new QueryTerm();
	queryTerm.adcode=adcode;
	queryTerm.categoryId=categoryId;
	queryTerm.otherTerm=otherTerm;
	queryTerm.pageNo=pageNo;
	queryTerm.pageSize=pageSize;
	addDataToBox(queryTerm,shopListSource,'main',rootPath+'/api/shop/selectByleisureshop',1);				
}

$(document).on('tap','.main_list',function(){
	var shopId=this.dataset.shopid;
	var shop_page_templete_flag=$('#shop_page_templete').val();
	if(shop_page_templete_flag==1){		
		window.location.href='dianPu_detail.html?shopId='+shopId;
	}else{
		window.location.href='dianpu_detail_2.html?shopId='+shopId;
	}
})
$(document).on('tap','#carousel_box li a',function(){
	var url=this.dataset.url;
	window.location.href=url;
})


