
var canSendSms = true;


$('#login').click(function () {

    var mobile = $('#mobilePhone').val();
    var phoneCode = $('#password1').val();
    console.log(mobile,phoneCode);
    if(mobile=='' || phoneCode==''){
        mui.alert('参数不能为空');
        return;
    }
    if (!checkMobilePhone(mobile)) {
        mui.alert('手机号码格式错误');
        return;
    }
    //验证验证码
    checkSmsCode(mobile,phoneCode, function () {
        window.location.href='set_zhiFu_mima.html';
    },function (data) {
        mui.alert(data.msg);
    })
});


function sendSms() {
    if (canSendSms === false) return;
    var mobile = $('#mobilePhone').val();
    if (checkMobilePhone(mobile)) {
        //发送验证码
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
    }
}

//进入倒计时
function countDown() {
    var countTime = 60;
    var timeout = setInterval(function () {
        countTime--;
        console.log(countTime);
        $('.yzm').html(countTime+"秒");
        if (countTime < 1) {
            $(".yzm").html('发送验证码');
            clearInterval(timeout);
        }
    }, 1000);
}