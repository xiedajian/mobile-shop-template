mui.init({
	//返回上一页需要刷新上一页
	beforeback: function() {
		if(mui.os.plus) {
			//获得父页面的webview
			var list = plus.webview.currentWebview().opener();　
			//触发个人中心页面的自定义事件(refresh),从而进行刷新
			gerenPage = plus.webview.getWebviewById('html/wode/geRen_center.html'); 
			if(gerenPage != null) {
				//触发下一个页面的自定义事件
				mui.fire(gerenPage, 'refresh');
			}
			//触发上个页面的自定义事件
			mui.fire(list, 'refresh');
			//返回true,继续页面关闭逻辑
			return true;
		}
	}
});

$('#login').on('tap', function() {
	if($('#account').val() == '' && $('#password').val() == '') {
		mui.alert('请输入手机号和密码！');
	} else if($('#account').val() == '') {
		mui.alert('请输入手机号！');
	} else if($('#password').val() == '') {
		mui.alert('请输入密码！');
	} else if($('#account').val() != '' && $('#password').val() != '') {
		var password = $('#password').val();
		var phone = document.getElementById('account').value;
		if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
			mui.alert("手机号码有误，请重填");
		} else if(password.length < 6) {
			mui.alert("密码长度必须大于六位！");
		} else {
			$.ajax({
				url: rootPath + "/userLoginRegisterjfsc/userPswdLogin",
				dataType: 'json',
				type: 'POST',
				data: {
					loginName: $('#account').val(),
					pwd: $('#password').val()
				},
				// async: false,
				success: function(data) {
					console.log(data);
					if(data.result == "success") {
						localStorage.setItem('userId', data.data.userId);
						localStorage.setItem('userInfo', data.data);
						mui.back(); //刷新上一页
					} else {
						console.log(data);
						mui.alert(data.msg);
					}
				},
				error: function(err) {
					console.log(err);
					mui.alert("连接服务器失败");
				}
			});
		}
	}
})