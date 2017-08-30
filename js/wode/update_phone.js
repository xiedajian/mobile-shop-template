function goNext() {
    var phone = $('#phone').val();
    console.log(phone);
    if (!(/^1[34578]\d{9}$/.test(phone))) {
        mui.alert('新手机号格式不正确');
        return;
    }
    window.localStorage.setItem('update_phone_number',phone);
    window.location.href='updata_phone_2.html';

}