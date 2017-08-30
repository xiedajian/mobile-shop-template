//接口ok

var canSendSms = true;

$('#login').on('tap', function () {
    if ($('#account').val() == '' && $('#password').val() == '') {
        alert('请输入手机号和验证码！');
    }
    else if ($('#account').val() == '') {
        alert('请输入手机号！');
    }
    else if ($('#password').val() == '') {
        alert('请输入验证码！');
    }
    else if ($('#account').val() != '' && $('#password').val() != '') {
        var phone = document.getElementById('account').value;
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
            alert("手机号码有误，请重填");
        }
        else {
            checkSmsCode($('#account').val(), $('#password').val(), function () {
                window.localStorage.setItem('forgetPwdMobile',$('#account').val());
                window.location.href = 'forget_pwd_2.html';
            })
        }
    }
});


function sendSms() {
    if (canSendSms === false) return;
    var mobile = $('#account').val();
    if (checkMobilePhone(mobile)) {
        //发送验证码
        // console.log(sendSmsCode(mobile));
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
