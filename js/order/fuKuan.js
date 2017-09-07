var shi=$('.shi').html();
var fen=$('.fen').html();
var miao=$('.miao').html();
var active = 0;
var orderId=getQueryString('orderId');
var userId='';
//初始化仿支付密码键盘
PwdBox.init('', 'img/pwd_keyboard.png', '请输入支付密码', '安全支付环境，请放心使用！');

if(localStorage.getItem('userId') && localStorage.getItem('userId') != '') {
	//获取用户信息
	userId = localStorage.getItem('userId');
} else {
	mui.confirm('需要登录', ' ', ['返回', '去登录'], function(val) {
		console.log(val);
		if(val.index === 1) {
			window.location.href = "../enter/enter.html";
		}else{
			window.history.back();
		}
	}, 'div');
}

$(function(){
	$.ajax({
	url:rootPath+'/orderControllerapi/getOrderById',
	data:{'orderId':orderId},
	dataType:'JSON',
	success:function(data){
		console.log(data);
//		data.data.rootPath=imgRootPath;
		console.log(data.data);
		document.getElementById('pay_money').innerHTML='￥'+data.data.actualPayment;
		addHtmlForTemplte(data.data,'shop_info','shop_info_templete');
		}
	});
})

/**
 * 模拟支付宝的密码输入形式
 */

var timer=setInterval(function(){
	if(miao>0){
		miao--;
		$('.miao').html(miao);
	}
	else{
		if(fen>0){
			fen--;
			miao=60;
			$('.miao').html(miao);
			$('.fen').html(fen);
		}else{			
			if(shi>0){
				shi--;
				miao=60;
				fen=60;
				$('.shi').html(shi);
				$('.miao').html(miao);
				$('.fen').html(fen-1);
			}else{
					clearInterval(timer);
					fen=0;
					shi=0;
					miao=0;			
				}
			}
		}
	
},1000)
//
$('.quxiao').on('tap',function(){
	$('.pop').css('display','none')
})

//确认支付按钮点击事件
$('.btn').on('tap',function(){
	
//	$('.pop').css('display','block')
//  inputBtn = document.querySelectorAll('input');
//  for (var i = 0; i < inputBtn.length; i++) {
//      /*inputBtn[i].addEventListener('tap', function () {
//          inputBtn[active].focus();
//      }, false);*/
//      inputBtn[i].addEventListener('focus', function () {
//          this.addEventListener('keyup', listenKeyUp, false);
//      }, false);
//      inputBtn[i].addEventListener('blur', function () {
//          this.removeEventListener('keyup', listenKeyUp, false);
//      }, false);
//      inputBtn[active].focus();
//  }
	document.querySelector('.password-box .inner-box').style.background = "url(../../img/pwd_keyboard.png) center bottom / 100% 100%";
    	PwdBox.show(function(res) {
		console.log(res);
		PwdBox.reset();
//		var data = {
//			orderId: orderId,
//			userId: userId,
//			password: res.password
//		}
		//支付
        $.ajax({
        	type:'post',
        	url:rootPath+'/orderControllerapi/payOrder',
        	data:{'userId':userId,'password':res.password,'orderId':orderId},
        	dataType:'JSON',
        	success:function(data){
        		console.log(data);
        		if(data.result=='success'){
        			document.getElementById('pay_info').innerHTML='支付成功';
        			mui.alert('支付成功',function(){
        				window.location.href='order_detail_3.html?type=1&orderId='+orderId;
        			});

        		}else {
					mui.toast(data.msg);
				}

        	}
        })

	});
})
/**
 * 监听键盘的敲击事件
 */
function listenKeyUp() {
    if (!isNaN(this.value) && this.value.length != 0) {
        if (active < 6) {
            active += 1;
        }
        inputBtn[active].focus();
    } else if (this.value.length == 0) {
        if (active > 0) {
            active -= 1;
        }
        inputBtn[active].focus();
    }
    if (active >= 6) {
        var _value = inputBtn[active].value;
        inputBtn[active-1].blur();
        $('.pop').css('display','none');
        document.getElementById('pay_info').innerHTML='正在支付...';
        $('.pop1').css('display','block');
        var password='';
        for(var i=0;i<6;i++){
        	password+=inputBtn[i].value;
        }
    
        $.ajax({
        	type:'post',
        	url:rootPath+'/orderControllerapi/payOrder',
        	data:{'userId':userId,'password':password,'orderId':orderId},
        	dataType:'JSON',
        	success:function(data){
        		console.log(data);
        		if(data.result=='success'){
        			active=0;
        			$('.input input').val('');
        			document.getElementById('pay_info').innerHTML='支付成功';
        			setTimeout(function(){
        				window.location.href='order_detail_3.html?type=1&orderId='+orderId;
        			},1000);
        		}else{
        			active=0;
        			$('.input input').val('');
        			document.getElementById('pay_info').innerHTML=data.msg;
        			setTimeout(function(){
        				$('.pop1').css('display','none');
        			},2000)
        		}
        	}
        })
    }
}
