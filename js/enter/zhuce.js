

$('#zhuce').click(function () {

    window.location.href='zhuce_2.html';



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
