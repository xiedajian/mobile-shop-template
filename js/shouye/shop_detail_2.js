var shopId=getQueryString('shopId');
var productId=getQueryString('productId');
var buy_car=new Map();
var buy_car_product=new Map();
var allProductSpec;
var propertyKey='';
var propertyValue='';
var propertyKeyIds='';
$(function(){
	var buy_car_str=localStorage.getItem(SHOPKEY+shopId);
	var buy_car_obj;
	$.ajax({
		url:rootPath+'/api/index/recommentProductInfo',
		data:{'productId':productId},
		dataType:'JSON',
		success:function(data){
			data.data.PRODUCTKEY=PRODUCTKEY;
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
			        	propertyKey=buy_car_obj.data[buy_car_obj.keys[i]].propertyKey;
			        	propertyValue=buy_car_obj.data[buy_car_obj.keys[i]].propertyValue;
			        	propertyKeyIds=buy_car_obj.data[buy_car_obj.keys[i]].propertyKeyIds;
			        	console.log(propertyKey);
			        	console.log(propertyValue);
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
			$.ajax({
				url:rootPath+'/api/product/selectByproductguige',
				data:{'productid':productId},
				dataType:'JSON',
				success:function(data){
					console.log(data);
					allProductSpec=data.productSizeData;
					addHtmlForTemplte(data,'property','property_templete');
					if(propertyKey!=''){
						var propertyKeys=propertyKeyIds.substr(0,propertyKeyIds.length-1).split(',');
						for (var i = 0; i < propertyKeys.length; i++) {
							$('#'+propertyKeys[i]).parent().find('li').css({'background':'#fff','border':'1px solid #ccc','color':'#666'});
							$('#'+propertyKeys[i]).parent().find('li').removeClass('active');
							$('#'+propertyKeys[i]).css({'background':'#fff','border':'1px solid #ddd','color':'#666'});
							$('#'+propertyKeys[i]).css({'background':'#fd5100','border':'1px solid #fd5100','color':'#fff'})
							$('#'+propertyKeys[i]).addClass('active');
						}
					}else{
						var propertyValueArr=document.getElementsByClassName('yanse');
						var propertyKeyArr=$('.yanse_mid div p');
						propertyKey='';
						propertyKeyIds='';
						propertyValue='{';
						for (var i = 0; i < propertyKeyArr.length; i++) {
							propertyKey+=$(propertyKeyArr[i]).html()+',';
							propertyKeyIds+=propertyValueArr[i].getElementsByClassName('active')[0].dataset.id+',';
							propertyValue+='"'+$(propertyKeyArr[i]).html()+'":"'+propertyValueArr[i].getElementsByClassName('active')[0].innerHTML+'",';
						}
						propertyValue=propertyValue.substr(0,propertyValue.length-1);
						propertyValue+='}';
					}
				}
			})
			
			
		}
	});
	
	
	
});

var hei=$('body').height()-$('.banner').height()-$('.dianpu').height();
console.log(hei);
$('.mui-slider').css('height',hei);
$('#bottomPopover').css('top',hei);
//
var hei1=$('.mui-slider').height()-$('#sliderSegmentedControl').height();
$('.mui-slider-group').css('height',hei1);
console.log(hei1);
//
$('.sss').on('tap',function(){
	$('.fenxiang').css('display','block')
})
$('.sss').on('tap',function(e){
	$('.fenxiang').css('display','block');
	$(document).on("tap",function(e){
		if(e.target.className=="fenxiang"){
			$('.fenxiang').css('display','none');
		}
	})
})
//
$('.xuanze').on('tap',function(){
	$('.yanse_pop').css('display','block')
})
$(document).on('tap',function(e){
	if(e.target.className=="yanse_pop"){
		$('.yanse_pop').css('display','none')
	}
})
$(document).on('tap','.yanse li',function(){
	$(this).parent().find('li').css({'background':'#fff','border':'1px solid #ccc','color':'#666'});
	$(this).parent().find('li').removeClass('active');
	$(this).css({'background':'#fff','border':'1px solid #ddd','color':'#666'});
	$(this).css({'background':'#fd5100','border':'1px solid #fd5100','color':'#fff'})
	$(this).addClass('active');
	updatePrice();
})
function updatePrice(){
	var propertyValueArr=document.getElementsByClassName('yanse');
	var propertyKeyArr=$('.yanse_mid div p');
	propertyKey='';
	propertyKeyIds='';
	propertyValue='{';
	for (var i = 0; i < propertyKeyArr.length; i++) {
		propertyKey+=$(propertyKeyArr[i]).html()+',';
		propertyKeyIds+=propertyValueArr[i].getElementsByClassName('active')[0].dataset.id+',';
		propertyValue+='"'+$(propertyKeyArr[i]).html()+'":"'+propertyValueArr[i].getElementsByClassName('active')[0].innerHTML+'",';
	}
	propertyValue=propertyValue.substr(0,propertyValue.length-1);
	propertyValue+='}';
	console.log(JSON.parse(propertyValue));
	console.log(propertyKeyIds);
	var orderSmall=buy_car_product.get(PRODUCTKEY+productId);
	orderSmall.propertyKey=propertyKey;
	orderSmall.propertyKeyIds=propertyKeyIds;
	orderSmall.propertyValue=propertyValue;
	buy_car.put(PRODUCTKEY+productId,orderSmall);
	buy_car_product.put(PRODUCTKEY+productId,orderSmall);
	console.log(buy_car_product);
	localStorage.setItem(SHOPKEY+shopId,JSON.stringify(buy_car));
//	for (var i = 0; i < allProductSpec.length; i++) {
//		if(allProductSpec[i].propertyid==propertyValue){
//			document.getElementsByClassName('projectList1')[0].getElementsByTagName('p')[2].innerHTML=allProductSpec[i].price;
//		}
//		var orderSmall=buy_car_product.get(PRODUCTKEY+productId);
//		console.log(orderSmall);
//	}
}
