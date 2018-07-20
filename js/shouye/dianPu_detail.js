
//
$(document).on('tap','.mai',function(){
    $(this).next().css('display','block');
    $('.mai').css('display','block');
    $(this).css('display','none');
    $('.add').on('tap',function(){
    })
    sub()
})

//商品中的点击加一事件
$(document).on("tap",".aa",function(){
    $(this).prev().html(parseInt($(this).prev().html())+1);
    var add=$(this).prev().html();
    var productId=$(this).parent().parent().attr('data-id');
    $("#"+PRODUCTKEY+productId).html(add);
    if(add>0){
        $('.submit_order').css({'background-color':'#FD5100','color':'#fff'});
        $(".fenshu").css('display','block');
    }
    var price=$(this).parent().parent().attr('data-price');
    var name=$(this).parent().parent().attr('data-name');
    var product=new Product();
    product.productId=productId;
    product.price=price;
    product.quantity=add;
    product.money=add*price;
    product.name=name;
    buy_car.put(PRODUCTKEY+productId,product);
    //计算总价
    var total_money=getTotalMoney(buy_car);
    sub()
})

//商品中的点击减一事件
$(document).on("tap",".ss",function(){
    $(this).next().html(parseInt($(this).next().html())-1);
    var sub1=$(this).next().html();
    var productId=$(this).parent().parent().attr('data-id');
    $("#"+PRODUCTKEY+productId).html(sub1);
    //当商品数量为零时把商品从 购物车移除
    if(sub1<=0){
        $(this).next().html(0);
//		$(this).parent().css('display','none');
//		$(this).parent().prev().css('display','block');
        if($(this).hasClass('sub1')){
            $(this).parent().parent().remove();
        }
        var fenshu=document.getElementsByClassName('fenshu')[0].innerHTML;
        if(fenshu<=1){
            $('.submit_order').css({'background-color':'#999999','color':'#fff'});
            $(".fenshu").css('display','none');
        }
        buy_car.remove(PRODUCTKEY+productId);
        //计算总价
        var total_money=getTotalMoney(buy_car);
    }else{
        var price=$(this).parent().parent().attr('data-price');
        var name=$(this).parent().parent().attr('data-name');
        var product=new Product();
        product.productId=productId;
        product.price=price;
        product.quantity=sub1;
        product.money=sub1*price;
        product.name=name;
        buy_car.put(PRODUCTKEY+productId,product);
        //计算总价
        var total_money=getTotalMoney(buy_car);
    }
    sub();
})

function sub(){
    var sum=0;
    $(".choose").each(function(a){
        sum+=parseInt($(".choose").eq(a).find(".fenshu1").html())
    })
//	$(".fenshu").css('display','block');
    $(".fenshu").html(sum);
    return sum;
}

function getTotalMoney(map){
    var total_money=0;
    map.each(function(key,value,index){
        total_money+=value.money;
    })
    document.getElementById('total_money').innerHTML='￥'+total_money;
    localStorage.setItem(SHOPKEY+shopId,JSON.stringify(map));
    return total_money;
}

//更新购物车
$(document).on('tap','#end',function(){
    console.log(buy_car.data);
    addHtmlForTemplte(buy_car,'buy_car_info','buy_car_info_templete');
})
//清空购物车
$(document).on('tap','#clear_buy_car',function(){
    localStorage.removeItem(SHOPKEY+shopId);
    document.getElementById("buy_car_info").innerHTML="";
    location.reload();
})

function BuyCar(){};

function Product(){
    this.productId;
    this.price;
    this.quantity;
    this.money;
    this.name;
}




var buy_car = new Map();

var hei = $('body').height() - $('.banner').height() - $('.dianpu').height();
console.log(hei);
$('.mui-slider').css('height', hei);
$('#bottomPopover').css('top', hei);
//
var hei1 = $('.mui-slider').height() - $('#sliderSegmentedControl').height();
$('.mui-slider-group').css('height', hei1);
console.log(hei1);
//
$('.ss').on('tap', function() {
	$('.fenxiang').css('display', 'block')
})
$('.ss').on('tap', function(e) {
	$('.fenxiang').css('display', 'block');
	$(document).on("tap", function(e) {
		if(e.target.className == "fenxiang") {
			$('.fenxiang').css('display', 'none');
		}
	})
})
//点击跳转到商品页面
$(document).on('tap', '.clickSkip', function() {
	var productId = this.dataset.productId;
	var product_templete_flag = $('#product_templete').val();
	if(product_templete_flag == 1) {
		window.location.href = 'shop_detail_cate.html?productId=' + productId + '&shopId=' + shopId;
	} else {
		window.location.href = 'shop_detail_clothes.html?productId=' + productId + '&shopId=' + shopId;
	}
})
//跳转营业执照页面
$(document).on('tap', '#business_license', function() {
	var licenseUrl = this.dataset.businessLicense;
	console.log(licenseUrl);
	window.location.href = 'shop_yingYe_xuKeZheng.html?licenseUrl=' + licenseUrl;
})

//搜索
$('#searchBox').on('keyup', function(e) {
	console.log(e.keyCode);
	var val = $(this).val();
	console.log(val);
	if(e.keyCode === 13) {
		if(val == undefined || val == '') {
			mui.toast('请输入搜索内容')
			return;
		}
		window.location.href = 'search_product.html?shopId=' + shopId + '&searchContent=' + val;
	}
})