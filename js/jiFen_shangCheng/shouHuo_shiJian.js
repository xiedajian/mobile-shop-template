
//
$('.ss').toggle(function(){
	$('.gengduo_pop').css('display','block');
},
function(){
	$('.gengduo_pop').css('display','none');
})
//

//
$('.check p').on('tap',function(){
	$('.ok').remove();
	$('.radio').css('border','1px solid #ddd');
	$(this).find('.radio').append('<img src="../../img/jiFen_shangCheng/xuanzhe.png" class="ok"/>');
	$(this).find('.radio').css('border','none');
	
})
