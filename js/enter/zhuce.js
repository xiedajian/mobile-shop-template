
//接口ok

$('#zhuce').click(function () {
    var userMobile = $('#account').val();
    var code = $('#password').val();
    var password = $('#password1').val();

    if (userMobile=='' || code=='' || password=='') {
        mui.alert('参数不能为空');
        return;
    }

    if (!checkMobilePhone(userMobile)) {
        mui.alert('手机号码格式错误');
        return;
    }

    if (password.length<6) {
        mui.alert('密码长度不能少于6位');
        return;
    }

    //注册
    $.ajax({
        url: rootPath + "/userLoginRegisterjfsc/userRegist",
        dataType: 'json',
        type:"POST",
        data:{
            mobile:userMobile,
            pwd:password,
            vcode:code
        },
        async: false,
        success: function (data) {
            if (data.result == "success") {
                mui.alert('注册成功',function () {
                    window.location.href='zhuce_2.html';
                });
            } else {
                mui.alert('注册失败');
            }
        },
        error: function (err) {
            console.log(err);
            mui.alert('服务器连接失败');
        }
    });
});

var canSendSms = true;

function sendSms() {
    if (canSendSms === false) return;
    var mobile = $('#account').val();
    if (checkMobilePhone(mobile)) {

        sendSmsCode(mobile, function () {
            canSendSms = false;
            //进入倒计时
            countDown();
        }, function () {
            canSendSms = true;
            mui.alert('验证码发送失败，请稍候重试');
        });
    } else {
        mui.alert('手机号码格式错误');
        return;
    }

}

//进入倒计时
function countDown() {
    var countTime = 60;
    var timeout = setInterval(function () {
        countTime--;
        console.log(countTime);
        $("#phoneCode").html(countTime+"秒");
        if (countTime < 1) {
            $("#phoneCode").html('发送验证码');
            clearInterval(timeout);
        }
    }, 1000);


}
