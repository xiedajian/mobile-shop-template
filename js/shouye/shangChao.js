var pageNo=0;
var pageSize=10;
var totalPage=0;
var hei=$('.mui-content').height();

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
		//九宫格数据
		var source = '{{each list value i}}'
			+    '<li><a href="javascript:void(0);" data-categoryid="{{value.categoryid}}">'
			+    '<img src="{{value.picture}}"/>'
			+	 '<span>{{value.name}}</span>'
			+    '</a></li>' 
			+    '{{/each}}';
//			+	 '<li><a href="quanBu.html"><img src="../../img/shouye/nav8.png"/><span>全部</span></a></li>';
		var queryTerm=new QueryTerm();
		queryTerm.typeid=4;
		addDataToBox(queryTerm,source,'shangcao',rootPath+'/api/shop/selectBymovebrand',2);
		//优惠专区
		var source=document.getElementById('recommand_activity').innerHTML;
		var queryTerm=new QueryTerm();
		queryTerm.pageNo=1;
		queryTerm.adsenseid=6;
		//queryTrem.advertstatus=1;
		addDataToBox(queryTerm,source,'recommand',rootPath+'/advertControllerapi/selectByfirst',2);
		//品牌优选
		var source=document.getElementById('pinpaiyouxuan_templete').innerHTML;
		var queryTerm=new QueryTerm();
		queryTerm.pageNo=1;
		queryTerm.adsenseid=7;
		//queryTrem.advertstatus=1;
		addDataToBox(queryTerm,source,'pinpaiyouxuan',rootPath+'/advertControllerapi/selectByfirst',2);
		//猜你喜欢
		function pulldownRefresh() {
			setTimeout(function() {
				if(totalPage==0||pageNo<totalPage){
					pageNo++;
					var source = '{{each list value i}}'
					+'<div class="main_list" data-shopid="{{value.shopId}}">'
					+'<div class="list_left"><img src="{{value.shopLogo}}" alt="" /></div>'
			        +'<div class="list_right"><p><span class="mui-ellipsis"><a href="javascript:;">{{value.shopName}}</a>'
					+'<a href="javascript:;">（{{value.shopName}}）</a></span></p>'
				   	+'<p><span>{{if (value.shopGrade==1)}}<span><img src="../../img/shouye/star@2x.png" alt="" />'
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
					+'</span><span>{{value.shopGrade}}</span></p>'
					+'<p><span><{{value.avgPrice}}m</span></p></div>'
				    +'<a href="javascript:;"></a>'
					+'<div style="clear: both;"></div>'
					+'</div>{{/each}}'
					var queryTerm1=new QueryTerm();
					queryTerm1.categoryId=27;
					queryTerm1.pageNo=pageNo;
					queryTerm1.pageSize=pageSize;
					addDataToBox(queryTerm1,source,'cainixihuan',rootPath+'/api/shop/selectByleisureshop',1);
					setTimeout(function(){
						var hei=$('#cont').height()+$('#renqi').height()+$('#slider').height();
						$('.mui-scroll').css('height',hei);
					},1000);
					//下拉刷新，新纪录插到最前面；
					mui('#pullrefresh').pullRefresh().endPullupToRefresh((true | false)); //参数为true代表没有更多数据了。		
					mui('#pullrefresh').pullRefresh().refresh(true);
				}else{
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(false); //参数为true代表没有更多数据了。
				}	
			}, 500);
		}
		//优惠专区跳转页面
		$(document).on('tap','#recommand a',function(){
			var url=this.dataset.url;
			window.location.href=url;
		});
		//品牌优选跳转页面
		$(document).on('tap','#pinpaiyouxuan a',function(){
			var url=this.dataset.url;
			window.location.href=url;
		});
		
		$(document).on('tap','.main_list',function(){
			var shopId=this.dataset.shopid;
			console.log(shopId);
			window.location.href='dianPu_detail.html?shopId='+shopId;
		});
		$(document).on('tap','#shangcao li a',function(){
			var categoryId=this.dataset.categoryid;
			window.location.href='shangChao_2.html?categoryId='+categoryId;
		});
		
		//搜索
		$(document).on('change','#searchBox',function(){
			var categoryId=getQueryString('categoryId');
			var link=this.dataset.link;
//			alert(link);
			var shopname=$('#searchBox').val();
//			alert(shopname)
			var url =encodeURI(link+'?shopname='+shopname+'&categoryId='+categoryId);
			//$('.mui-content').css('display','none');
			window.location.href=url;
		})
//