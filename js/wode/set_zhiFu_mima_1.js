
var canSendSms = true;


$('#login').click(function () {

    window.location.href='set_zhiFu_mima.html';
});


function sendSms() {
    if (canSendSms === false) return;
    canSendSms = false;
    countDown();
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
            canSendSms = true;
        }
    }, 1000);
}