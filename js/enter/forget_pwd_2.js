
//接口ok

$('#login').on('tap', function () {
    if ($('#password1').val() == '' && $('#password').val() == '') {
        alert('请输入密码并确认新密码！');
    }
    else if ($('#password').val() == '') {
        alert('请输入密码！');
    }
    else if ($('#password1').val() == '') {
        alert('请确认密码！');
    }
    else if ($('#password').val() != $('#password1').val()) {
        alert('两次密码不一致！');
    }
    else if ($('#password').val() != '' && $('#password1').val() != '' && $('#password').val() == $('#password1').val()) {

        var mobile = window.localStorage.getItem('forgetPwdMobile');

        $.ajax({
            url: rootPath + "/userLoginRegisterjfsc/modifyUserPwdCheck",
            dataType: 'json',
            type: 'POST',
            data: {
                mobile: mobile,
                pwd: $('#password').val()
            },
            async: false,
            success: function (data) {
                console.log(data);
                if (data.result == "success") {
                    // window.history.go(-1); //刷新上一页
                    window.location.href = "forget_pwd_3.html"
                } else {
                    mui.alert(data.msg);
                }
            },
            error: function (err) {
                console.log(err);
                mui.alert("连接服务器失败");
            }
        });
    }

})
		

