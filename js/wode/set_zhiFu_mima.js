
var userId = 1;

if (localStorage.getItem('userId') && localStorage.getItem('userId') != '') {
    //获取用户信息
    userId = localStorage.getItem('userId');
} else {
    //登陆
    window.location.href = "../enter/enter.html";
}

$('#login').on('tap', function () {
    var pwd1 = $('#password').val();
    var pwd2 = $('#password1').val();
    if (pwd1 == '' || pwd2 == '') {
        mui.alert('请输入密码并确认密码！');
        return;
    }
    if(pwd1.length > 16 || pwd1.length < 6){
        mui.alert('请输入6-16位密码');
        return;
    }
    if(pwd1!=pwd2 ){
        mui.alert('两次密码不一致');
        return;
    }

    $.ajax({
        url: rootPath + "/userLoginRegisterjfsc/setPaymentPwd",
        dataType: 'json',
        type: 'POST',
        data: {userId: userId, payMentCode: pwd1},
        // async: false,
        success: function (data) {
            console.log(data);
            if (data.result == 'success') {
                mui.alert('设置成功', function () {
                    window.history.go(-2);
                })
            } else {
                console.log(data);
                mui.alert(data.msg);
            }
        },
        error: function (err) {
            console.log(err);
            mui.alert('服务器连接失败，请稍候重试');
        }
    });


})