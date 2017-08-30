var flag;
if(getQueryString('productId')){
	console.log('通过url传值');
	flag=getQueryString('productId');
}else if(window.localStorage.getItem('shangPin_detail-productId')){
	console.log('通过storage传值');
	flag=window.localStorage.getItem('shangPin_detail-productId');
}
console.log('接受参数-商品Id:',flag);

var page = 1;
var pageSize = 6;
var picSrc='';
var title='';
if(flag == '' || flag ==undefined || flag==null) {
	mui.alert("商品信息维护中");
} else {
	//		发送接口请求
	getImg(rootPath + '/api/product/selectByPimg?productid=' + flag);
	getInfo(rootPath + '/api/product/selectByproductdetail?productid=' + flag);
	getPingjia(rootPath + '/api/product/selectByproductcomment?productid=' + flag + '&pageNo=' + page + '&pageSize=' + pageSize);
}
var hei = $('body').height() - $('#slider').height() - $('.cp_tit').height();
console.log(hei);
$('#slider1').css('height', hei);
//
var hei1 = $('.mui-slider#slider1').height() - $('#sliderSegmentedControl1').height();
$('.mui-slider-group').css('height', hei1);
console.log(hei1);

//标题栏右侧按钮
$('.ss').toggle(function() {
		$('.gengduo_pop').css('display', 'block');
	},
	function() {
		$('.gengduo_pop').css('display', 'none');
	})

//点击其他地方关闭遮罩 和 规格弹窗
$(document).on('tap', function(e) {
	console.log(e.target.className);
	if(e.target.className == "yanse_pop") {
		$('.yanse_pop').css('display', 'none');
	}
})

//规格弹窗的开关
$('.yanse').on('tap', function() {
	$('#yanse').css('display', 'block');
})
//兑换弹窗的开关
$('.duihuan').on('tap', function() {
	$('#duihuan').css('display', 'block');
})

/*//商品中的点击加一事件 
$(".add").on("tap", function() {
	console.log('111');
	$(this).prev().html(parseInt($(this).prev().html()) + 1);
	var add = $(this).prev().html();
	if(add > 0) {
		$(".fenshu").css('display', 'block');

	}
	sub()
})
//商品中的点击减一事件 
$(".sub").on("tap", function() {
	$(this).next().html(parseInt($(this).next().html()) - 1);
	var sub1 = $(this).next().html();
	if(sub1 <= 0) {
		$(this).next().html(0);
		$(".fenshu").css('display', 'none');
	}
	sub();
})*/

function sub() {
	var sum = 0;
	$(".choose").each(function(a) {
		sum += parseInt($(".choose").eq(a).find(".sp").html())
	})
	//	$(".fenshu").css('display','block');
	$(".fenshu").html(sum);
}
//
//window.onscroll=function(){
//	console.log($('body').scrollTop());
//	var xt=$('.xuanfu').css('top');
//	console.log(xt);
//	if($('body').scrollTop()>0){
//		$('.xuanfu').css({'position':'fixed','top':xt,'z-index':'99'})
//	}
//	else if($('body').scrollTop()==0){
//		$('.xuanfu').css({'position':'absolute','top':'0'})
//	}
//}
//
$('.gwc1').on('tap', function() {
	$('.gwc_pop').css('display', 'block');
	$('.yanse_pop').css('display', 'none');
	setTimeout(function() {
		$('.gwc_pop').css('display', 'none');

	}, 1000)
})

/*//调至确定订单
$('.queren').on('tap', function() {
	window.location.href = "queRen_dingDan.html?productId=" + $('.title').attr('proid') + "&count=" + $('#sp1').text()
	$('#sp')
})
$('.fenleiBuy').on('tap', function() {
	window.location.href = "queRen_dingDan.html?productId=" + $('.title').attr('proid') + "&count=" + $('#sp').text()

})
*/

//产品规格切换
$('.ys li').on('tap', function() {
	$('.ys li').css({
		'background': '#fff',
		'border': '1px solid #ddd',
		'color': '#666'
	});
	$(this).css({
		'background': '#fd5100',
		'border': '1px solid #fd5100',
		'color': '#fff'
	})
})

//mui('#item3mobile').pullRefresh({
//		container: '#item3mobile',		
//		up: {
//			
//			height: 50, //可选.默认50.触发上拉加载拖动距离
//			auto: true, //可选,默认false.自动上拉加载一次
//			  contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
//		      contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
//		      contentrefresh : "正在加载...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
//			
//		    callback: addPingLun
//		}
//	});
mui.init({
	pullRefresh: {
		container: "#item3mobile", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
		down: {
			range: '100px',
			height: 50, //可选,默认50.触发下拉刷新拖动距离,
			offset: '20px',
			auto: false, //可选,默认false.首次加载自动下拉刷新一次
			contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
			contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
			contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
			callback: addPingLun //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		}
	}
});

function addPingLun() {
	page += 1;
	clearTimeout(timer)
	getPingjia(rootPath + '/api/product/selectByproductcomment?productid=' + flag + '&pageNo=' + page + '&pageSize=' + pageSize);
	var timer = setTimeout("mui('#item3mobile').pullRefresh().endPulldownToRefresh()", 500)

}

//=============================分割线===================================
//=============================分割线===================================
//=============================分割线===================================

var vueData = {
	//商品规格属性数组
	productguige: [],
	//商品 详细规格对应的库存数组
	productSizeData: [],
	total: 1,
}

//商品id
var _selfProdictId = flag;

console.log(_selfProdictId);
getProductGuige();

//获取产品规格详细信息
function getProductGuige() {
	$.ajax({
		url: rootPath + "/api/product/selectByproductguige",
		data: {
			productid: _selfProdictId
		},
		type: "GET",
		dataType: "json",
		success: function(data) {
			console.log('success')
			console.info(data);
			if(data.resultSuccess) {
				if(data.data && data.data.length > 0) {
					for(var i = 0; i < data.data.length; i++) {
						data.data[i].selectAttrId = 0;
						if(data.data[i].psList && data.data[i].psList.length > 0) {
							for(var y = 0; y < data.data[i].psList.length; y++) {
								data.data[i].psList[y].className = 'not_active';
							}
							data.data[i].psList[0].className = 'is_active';
						}
						if(data.data[i].psList[0].id) {
							data.data[i].selectAttrId = data.data[i].psList[0].id
						}
					}
					console.log(data.data);
					vueData.productguige = data.data || [];
				}
				if(data.productSizeData) {
					vueData.productSizeData = data.productSizeData || [];
				}

			} else {
				mui.toast('商品规格获取失败');
			}
		},
		error: function() {
			console.log('请求超时')
		}
	});
}

//下订单    跳转至下订单页面  
function makeOrder() {
	console.log(111);
	$('#yanse').css('display', 'none');
	$('#popTitle').html('人造标题');
}


var guige_app = new Vue({
	el: '#yanse',
	data: vueData,
	methods: {
		//确定 属性类别 及 所选型号属性id
		select_guige: function(index, specItemId, index2, attrId) {
			console.log('event2');
			console.log(index, specItemId, index2, attrId);
			this.productguige[index].selectAttrId = attrId;
			for(var i = 0; i < this.productguige[index].psList.length; i++) {
				this.productguige[index].psList[i].className = 'not_active';
			}
			this.productguige[index].psList[index2].className = 'is_active';
			//			console.log(this);
		},
		addNum: function() {
			console.log(this.total);
			if(this.total > 99) {
				mui.toast('数量过多');
				return;
			}
			this.total += 1;
		},
		delNum: function() {
			if(this.total <= 1) {
				mui.toast('数量不能少于1');
				return;
			}
			this.total -= 1;
		},
		//订单 需要  产品id ，属性id组合，单价，数量
		makeOrder: function() {
			console.log('下单');

			var str='';
			var len=this.productguige.length;
			for(var i=0;i<len;i++){
				var _attrId=this.productguige[i].selectAttrId;
				var _psList=this.productguige[i].psList;
				var _psListLen=this.productguige[i].psList.length;
				for (var y=0;y<_psListLen;y++) {
					if(_psList[y].id==_attrId){
						str+=_psList[y].sizename+",";
					}
				}
//				str+='-'+this.productguige[i].psList;
				
			}
//			str=str.substr(1);
			console.log(str);
			console.log('数量：'+this.total);
			console.log('商品id：'+_selfProdictId);
			var _pirce=0;
			//是否有货
			var hasGood=false;
			for(var x=0;x<this.productSizeData.length;x++){
				if(this.productSizeData[x].propertyid==str){
					hasGood=true;
					if(this.productSizeData[x].num<this.total){
						mui.toast('库存不足');
						return;
					}
					console.log(this.productSizeData[x]);
					_pirce=this.productSizeData[x].price || 0;
				}
			}
			if(!hasGood){
				mui.toast('所选商品暂时无货');
				return;
			}
			localStorage.setItem('waitOrder',JSON.stringify({
				productId:_selfProdictId,
				quantity:this.total,
				property:str,
				pirce:_pirce,
				preOrderId:Math.random(),
				picSrc:picSrc,
				title:title,
			}));
			console.log(JSON.parse(localStorage.getItem('waitOrder')));
			$('#yanse').css('display', 'none');
			window.location.href='queRen_dingDan.html';
		}
	}
});

function showPop() {
	$('#yanse').css('display', 'block');
}

