mui.init();

//判断是否登录
if(localStorage.getItem('userId') && localStorage.getItem('userId') != '') {
	$('.please-login-mask').css('display', 'none');
	//获取用户信息
	userId = localStorage.getItem('userId');
} else {
	$('.please-login-mask').css('display', 'block');
}


    // 性别
    // if(sex == 'true') {
    //     $('#sex').attr('src', '../../img/wode/nan.png');
    // } else {
    //     $('#sex').attr('src', '../../img/wode/nv.png');
    // }



//链接跳转
$('.content-content , .content-header').on('tap', 'li>a', function() {
	console.log($(this).attr('data-href'));
	var url = $(this).attr('data-href');
	goToPage(url);
})

//去登录
$('.queren').on('tap', function() {
    $('.please-login-mask').css('display', 'none');
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