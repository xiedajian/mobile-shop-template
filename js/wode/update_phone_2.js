
var canSendSms = true;
var mobile=window.localStorage.getItem('update_phone_number');
if(mobile==''){
    window.history.go(-1);
}
var userId='';
//判断是否登录
if (localStorage.getItem('userId') && localStorage.getItem('userId') != '') {
    //获取用户信息
    userId = localStorage.getItem('userId');
} else {
    //登陆
    mui.alert('请先登录', function () {
        window.location.href = "../enter/enter.html";
    });
}


$('#mobilePhone').html(mobile);

$('.btn').click(function () {
    var code=$('#phoneCode').val();
    console.log(mobile,code);
    if(code==''){
        mui.alert('验证码不能为空');
        return;
    }

    //提交手机号修改
    $.ajax({
        url: rootPath + "/userLoginRegisterjfsc/modifyMobile",
        type:'POST',
        data:{userId:userId,mobile:mobile,code:code},
        dataType: 'json',
        // async: false,
        success: function (data) {
            console.log(data);
            if (data.result == "success") {
                console.log('手机号修改成功');
                window.history.go(-2);
            } else {
                mui.alert('手机号修改失败');
            }
        },
        error: function (err) {
            console.log(err);
        }
    });


});

//发验证码
function sendSms() {
    if (canSendSms === false) return;
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
        $(".yzm").html(countTime+"秒");
        if (countTime < 1) {
            $(".yzm").html('发送验证码');
            clearInterval(timeout);
        }
    }, 1000);
}