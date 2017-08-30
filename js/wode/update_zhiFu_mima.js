var userId = 1;

if (localStorage.getItem('userId') && localStorage.getItem('userId') != '') {
    //获取用户信息
    userId = localStorage.getItem('userId');
} else {
    //登陆
    window.location.href = "../enter/enter.html";
}
$('#login').click(function () {
    var oldPwd = $('#account').val();
    var newPwd = $('#password').val();
    var newPwd2 = $('#password1').val();

    if (oldPwd == '' || newPwd == '' || newPwd2 == '') {
        mui.alert('请输入原密码或新密码！');
        return;
    }
    if (newPwd !== newPwd2) {
        mui.alert('两次新密码不一致！');
        return;
    }
    if (newPwd.length < 6) {
        mui.alert("密码长度必须大于六位！");
        return;
    }

    $.ajax({
        url: rootPath + "/userLoginRegisterjfsc/modifyPaymentPwd",
        dataType: 'json',
        type: 'POST',
        data: {userId: userId, oldPayMentCode: oldPwd, newPayMentCode: newPwd},
        // async: false,
        success: function (data) {
            console.log(data);
            if (data.result == 'success') {
                mui.alert('修改成功', function () {
                    window.history.back(-1);
                })
            } else {
                console.log(data);
                mui.alert(data.msg);
            }
        },
        error: function (err) {
            mui.alert('服务器连接失败，请稍候重试');
            console.log(err);
        }
    });
});

