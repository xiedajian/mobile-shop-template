mui.init();
var userId = 1;

//判断是否登录
if(localStorage.getItem('userId') && localStorage.getItem('userId') != '') {
	$('.please-login-mask').css('display', 'none');
	//获取用户信息
	userId = localStorage.getItem('userId');
	getUserInfo();
	getUserJifen();
} else {
	$('.please-login-mask').css('display', 'block');

}

//获取用户基本信息
function getUserInfo() {
	$.ajax({
		url: rootPath + "/userLoginRegisterjfsc/getUserInfo",
		type: 'POST',
		data: {
			userId: userId
		},
		dataType: 'json',
		async: false,
		success: function(data) {
			console.log(data);
			if(data.result == "success") {
				if(data.data.portail && data.data.portail != '') {
					$("#txPic").attr('src', data.data.portail);
				}
				if(data.data.nickName && data.data.nickName != '') {
					$("#nikeName").html(data.data.nickName);
				} else {
					$("#nikeName").html(data.data.loginName);
				}
				if(data.data.sex) {
					//性别图标i
					if(data.data.sex == 'true') {
						$('#sex').attr('src', '../../img/wode/nan.png');
					} else {
						$('#sex').attr('src', '../../img/wode/nv.png');
					}
				}
			} else {
				mui.toast('个人资料获取失败');
				console.log(data);
			}
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//获取用户积分
function getUserJifen() {
	$.ajax({
		url: rootPath + "/userLoginRegisterjfsc/selecIntegralApi?userId=" + userId,
		// type: 'POST',
		// data: {userId: userId},
		dataType: 'json',
		async: false,
		success: function(data) {
			console.log(data.sum);
			$("#jifenNum").html(data.sum);
			//			if(data.sum && data.sum != '') {
			//				$("#jifenNum").html(data.sum);
			//			} else {
			//				$("#jifenNum").html('获取失败');
			//			}
		},
		error: function(err) {
			console.log(err);
		}
	});
}

//链接跳转
$('.content-content , .content-header').on('tap', 'li>a', function() {
	console.log($(this).attr('data-href'));
	var url = $(this).attr('data-href');
	goToPage(url);
})

//去登录
$('.queren').on('tap', function() {
	goToPage('../enter/enter.html');
})
//返回上一页刷新上一页案例
//在父页面中添加事件监听
window.addEventListener('refresh', function(e) { //执行刷新
	location.reload();
});

//如果是App环境，隐藏页面的tab导航
if(mui.os.plus) {
	$('.nav-tab-isshow').css('display', 'none');
	$('.mui-content').css('padding-bottom', '0');
	$('.please-login-mask').css('margin-bottom', '0');
}