
//
$('.ss').toggle(function(){
	$('.gengduo_pop').css('display','block');
},
function(){
	$('.gengduo_pop').css('display','none');
})
//
//商品中的点击加一事件 
$(".add").on("tap",function(){
	$(this).prev().html(parseInt($(this).prev().html())+1);
	var add=$(this).prev().html();
	if(add>0){	
		$(".fenshu").css('display','block');
		
	}
	sub()
})
//商品中的点击减一事件 
$(".sub").on("tap",function(){
	$(this).next().html(parseInt($(this).next().html())-1);
	var sub1=$(this).next().html();
	if(sub1<=0){
		$(this).next().html(0);
		$(".fenshu").css('display','none');
	}
	sub();
})
function sub(){
	var sum=0;
	$(".choose").each(function(a){
		sum+=parseInt($(".choose").eq(a).find(".sp").html())
	})
//	$(".fenshu").css('display','block');
	$(".fenshu").html(sum);
}

//
$('.radio').on('tap',function(){
	$(this).find('span').append('<img src="../../img/jiFen_shangCheng/xuanzhe.png" class="ok"/>');
	$(this).find('span').css('border','none');
	
})

$('.radio1').toggle(function(){
	$(this).find('.ro').append('<img src="../../img/jiFen_shangCheng/xuanzhe.png" class="ok"/>');
	$('.radio').find('span').append('<img src="../../img/jiFen_shangCheng/xuanzhe.png" class="ok"/>');
	$(this).find('span').css('border','none');
	$('.radio').find('span').css('border','none');
	
},
function(){
	$('.ok').remove();
	$(this).find('.ro').css('border','1px solid #ddd');
	$('.radio').find('span').css('border','1px solid #ddd');
})