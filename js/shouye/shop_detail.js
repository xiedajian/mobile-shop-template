var shopId=getQueryString('shopId');
var productId=getQueryString('productId');
var buy_car=new Map();
var buy_car_product=new Map();
$(function(){
	var buy_car_str=localStorage.getItem(SHOPKEY+shopId);
	var buy_car_obj;
	$.ajax({
		url:rootPath+'/api/index/recommentProductInfo',
		data:{'productId':productId},
		dataType:'JSON',
		success:function(data){
			data.data.rootPath=imgRootPath;
			data.data.PRODUCTKEY=PRODUCTKEY;
			data.data.shopDto.rootPath=imgRootPath;
			console.log(data.data);
			addHtmlForTemplte(data.data,'buy_car_shopname','buy_car_shopname_templete');
			addHtmlForTemplte(data.data,'product_img','product_img_templet');
			addHtmlForTemplte(data.data,'product_info','product_info_templet');
			addHtmlForTemplte(data.data.shopDto,'shop','shop_templet');
			addHtmlForTemplte(data.data,'product_content','product_content_templete');
			/**
			 * 根据本地存储的内容更新页面
			 */
			//把localstorage的数据放到map集合里
			if(buy_car_str!=undefined){
				buy_car_obj=JSON.parse(buy_car_str);
				console.log(buy_car_obj);
				for (var i = 0; i < buy_car_obj.keys.length; i++) {
			        buy_car.put(buy_car_obj.keys[i],buy_car_obj.data[buy_car_obj.keys[i]]);
			        if(buy_car_obj.keys[i]==PRODUCTKEY+productId){
			        	document.getElementById(buy_car_obj.keys[i]).innerHTML=buy_car_obj.data[buy_car_obj.keys[i]].quantity;
			        	buy_car_product.put(buy_car_obj.keys[i],buy_car_obj.data[buy_car_obj.keys[i]]);
			        }
			        $("#"+buy_car_obj.keys[i]).parent().css('display','block');
			    };
			    var sum=sub();
			    if(sum>0){
			    	$('.submit_order').css({'background-color':'#FD5100','color':'#fff'});	
					$(".fenshu").css('display','block');
			    }
			    //计算总价
				getTotalMoney(buy_car);
			}
			
		}
	});
});
/*//
$('.mai').on('tap',function(){
	$(this).next().css('display','block');
	$('.mai').css('display','block');
	$(this).css('display','none');
	$('.add').on('tap',function(){		
	})
	sub()
})
//商品中的点击加一事件 
$(document).on("tap",'.add',function(){
	$(this).prev().html(parseInt($(this).prev().html())+1);
	var add=$(this).prev().html();
	if(add>0){
		$('.submit_order').css({'background-color':'#FD5100','color':'#fff'});	
		$(".fenshu").css('display','block');
		
	}
	sub()
})
//商品中的点击减一事件 
$(document).on("tap",'.sub',function(){
	$(this).next().html(parseInt($(this).next().html())-1);
	var sub1=$(this).next().html();
	if(sub1<=0){
		$(this).next().html(0);
		$(this).prev().css({'background-color':'#999999','color':'#fff'});
		$(".fenshu").css('display','none');
	}
	sub();
})
function sub(){
	var sum=0;
	$(".fenshu").html($(".fenshu2").html());
}*/
//
var hei=$('body').height()-$('.banner').height()-$('.dianpu').height();
console.log(hei);
$('.mui-slider').css('height',hei);
$('#bottomPopover').css('top',hei);
//
var hei1=$('.mui-slider').height()-$('#sliderSegmentedControl').height();
$('.mui-slider-group').css('height',hei1);
console.log(hei1);
//
$('.ss').on('tap',function(){
	$('.fenxiang').css('display','block')
})
$('.ss').on('tap',function(e){
	$('.fenxiang').css('display','block');
	$(document).on("tap",function(e){
		if(e.target.className=="fenxiang"){
			$('.fenxiang').css('display','none');
		}
	})
})
//

