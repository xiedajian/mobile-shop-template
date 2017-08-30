mui.init({
	//返回上一页需要刷新上一页
	beforeback: function() {
		if(mui.os.plus) {
			//获得父页面的webview
			var list = plus.webview.currentWebview().opener();　
			//触发父页面的自定义事件(refresh),从而进行刷新
			mui.fire(list, 'refresh');
			//返回true,继续页面关闭逻辑
			return true;
		}
	}
});

var userId = 1;

if (localStorage.getItem('userId') && localStorage.getItem('userId') != '') {
    //获取用户信息
    userId = localStorage.getItem('userId');
    // userId=1;
} else {
    //登陆
    // mui.alert('需要重新登录', function () {
    //     window.location.href = "../enter/enter.html";
    // });
}


function logout() {
    localStorage.removeItem('userId');
    mui.back();
}

//获取用户基本信息
(function getUserInfo() {
    $.ajax({
        url: rootPath + "/userLoginRegisterjfsc/getUserInfo",
        type: 'POST',
        data: {userId: userId},
        dataType: 'json',
        async: false,
        success: function (data) {
            console.log(data);
            if (data.result == "success") {
                if(data.data.payMentCode && data.data.payMentCode!=''){
                    $('#paymentPwd').attr('href','updata_zhiFu_mima.html');
                    $('#paymentPwd span:eq(1)').html('修改支付密码');
                }
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
})();

