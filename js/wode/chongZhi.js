$('.check').on('tap',function(){
	$('.check').find('.dui').remove();
	$('.check').css('border','1px solid #ccc');
	$(this).append('<img src="../../img/wode/xuanzhong.png" class="dui"/>');
	$(this).css('border','none');
})
//
$('#acc').focus(function(){
	$(this).attr('value','');
})
$('#acc').blur(function(){

	$(this).attr('value','请输入充值金额');
})

