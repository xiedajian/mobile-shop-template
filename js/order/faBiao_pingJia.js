var orderId=getQueryString('orderid');
var shopId;
$(function(){
 		$.ajax({
			url:rootPath+'/orderControllerapi/getOrderById',
			data:{'orderId':orderId},
			dataType:'JSON',
			success:function(data){
				console.log(data);
				data.data.rootPath=imgRootPath;
				console.log(data.data);
				shopId=data.data.shopId;
				addHtmlForTemplte(data.data,'order_info','order_info_templete');
				addHtmlForTemplte(data.data,'order','order_templete');
				addHtmlForTemplte(data.data,'express_info','express_info_templete');
			}
		});
 })
$('.pingji>img').on('tap',function(){
	$(this).parent().find('img').attr('src','../../img/order/star_hui@2x.png');
	var a= $(this).index();
	for(var i=0;i<=a;i++){
		$(this).parent().find('img').eq(i).attr('src','../../img/order/star_1@2x.png')
	}
	document.getElementById('level').innerHTML=a+1;
})
$('.two_bot').toggle(function(){
	$('.checked').append('<img src="../../img/order/check.png" class="check"/>');
	$('.checked').css('border','none');
	document.getElementById('niming').dataset.yl=0;
},function(){
	$('.check').remove();
	$('.checked').css('border','1px solid #ddd');
	document.getElementById('niming').dataset.yl=1;
})
$('#submit').on('tap',function(){
	alert('111')
	var userId=localStorage.getItem('userId');
	var level=document.getElementById('level').innerHTML;
	var yl=document.getElementById('niming').dataset.yl;
	if(userId==null||userId==undefined){
		window.location.href=rootPath+'jfscHtml/html/enter/enter.html';
		return false;
	}else{
		orderEntity.userId=userId;
	}
	$.ajax({
		type:'post',
		url:rootPath+'/orderControllerapi/insertordercomment',
		data:{'orderid':orderId,'userid':userId,'productPing':level,'yl':yl,'yl2':shopId},
		dataType:'JSON',
		success:function(data){
			if(resultSuccess){
				mui.alert('评价成功');
			}else{
				mui.alert('评价失败');
			}
		}
	})
	
})

