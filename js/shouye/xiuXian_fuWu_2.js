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

		function pulldownRefresh() {
			setTimeout(function() {
				var table = document.body.querySelector('.main');
				var cells = document.body.querySelectorAll('.main_list');
				for(var i = 0; i < 3; i++) {
					$(".main").append('<div class="main_list"><div class="list_left"><img src="../../img/shouye/wm2.png" alt="" /></div><div class="list_right"><p><span class="mui-ellipsis">龙游美发</span></p><p><span><img src="../../img/shouye/huangguang.png"/></span><span>人气76</span><span>人均30元</span></p><p><span>0.5km</span></p></div><a href="javascript:;"></a><div style="clear: both;"></div></div>');
					//下拉刷新，新纪录插到最前面；
				}
				mui('#pullrefresh').pullRefresh().endPullupToRefresh((true | false)); //参数为true代表没有更多数据了。		
				mui('#pullrefresh').pullRefresh().refresh(true);
			}, 500);
		}
//