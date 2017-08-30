$(function(){
	var source=document.getElementById('del_order_reason_templete').innerHTML;
	var queryTerm=new QueryTerm();
	queryTerm.remark=false;
	addDataToBox(queryTerm,source,'del_order_reason',rootPath+'/orderControllerapi/getAllReason',2)
})
$(document).on('tap','.checked',function(){
	if($(this).find('.check1').length>0){
		$('.checked').find('.check1').remove();
		$(this).find('.check').css('border','1px solid #ccc');
	}else{
		$('.checked').find('.check1').remove();
		$(this).find('.check').append('<img src="../../img/order/radio.png" class="check1"/>');
		$(this).find('.check').css('border','none');
		$(this).find('.check').css('border','1px solid #ccc');
	}
})
var submit_btn = document.getElementById("submit"); 
 //addEventListener：绑定函数 
 submit_btn.addEventListener("tap",function(){
 	var reason_box=document.getElementsByClassName('check1');
 	var reasonId;
 	var orderId=getQueryString('orderId');
 	var describe=document.getElementById('describe').innerText;
 	console.log(describe);
 	var describe1=document.getElementById('describe').value;
 	console.log(describe1);
 	if(reason_box.length>0){
 		reasonId=document.getElementsByClassName('check1')[0].parentNode.parentNode.dataset.reasonId;
 	}else{
 		mui.alert('请选择取消订单的原因！');
 	}
 	$.ajax({
 		type:'post',
 		url:rootPath+'/orderControllerapi/updateOrder',
 		data:{'orderId':orderId,'reasonId':reasonId,'describe':describe,'orderStatus':'6'},
 		dataType:'JSON',
 		success:function(data){
 			console.log(data);
 			if(data.resultSuccess){
 				window.location.href=rootPath+'/jfscHtml/html/order/tuiKuan_detail.html?orderId='+data.data;
 			}
 		}
 	})
 });


