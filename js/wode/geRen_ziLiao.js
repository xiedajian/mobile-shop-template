var userId = "";
var userInfo = {};
checkIsLogin();
if (localStorage.getItem('userId') && localStorage.getItem('userId') != '') {
    //获取用户信息
    userId = localStorage.getItem('userId');
    getUserInfo();
}

//获取用户信息
function getUserInfo() {
    $.ajax({
        url: rootPath + "/userLoginRegisterjfsc/getUserInfo",
        type: 'POST',
        data: {userId: userId},
        dataType: 'json',
        async: false,
        success: function (data) {
            console.log(data);
            if (data.result == "success") {
                userInfo = data.data;
                if (data.data.portail && data.data.portail != '') {
                    $("#txPic").attr('src', data.data.portail);
                }
                if (data.data.nickName && data.data.nickName != '') {
                    $("#nickName").val(data.data.nickName);
                }
                if (data.data.boundPhone && data.data.boundPhone != '') {
                    $("#mobilePhone").html(data.data.boundPhone);
                }
                $("#mobilePhone").html(data.data.boundPhone);
                var sexVal = (data.data.sex == 'true') ? "男" : "女";
                console.log(sexVal);
                $("#sexName").html(sexVal);
                console.log(data.data.consignee);
                if (data.data.consignee && data.data.consignee.addressDetailedInfo && data.data.consignee.addressDetailedInfo != '' && data.data.consignee.addressDetailedInfo!=undefined) {
                    $("#address").html(data.data.consignee.addressDetailedInfo);
                }


            } else {
                console.log(data);
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

//图片处理
function getUrl(file) {
    var $div = document.getElementById("text");
    var img = document.getElementById("txPic");
    console.log(111);
    console.log(file);
    for (var intI = 0; intI < file.length; intI++) {//图片回显
        var tmpFile = file[intI];
        console.log(222);
        var reader = new FileReader();
        reader.readAsDataURL(tmpFile);
        reader.onload = function (e) {
            var url = e.target.result;
            console.log(url);
            img.src = url;
            // $div.innerHTML=url;


            //修改头像
            $.ajax({
                url: rootPath + "/userLoginRegisterjfsc/updateUserImg",
                type: 'POST',
                data: {
                    userId: userId,
                    imgStr:url,
                },
                dataType: 'json',
                // async: false,
                success: function (data) {
                    console.log(data);
                    if (data.result == "success") {

                        console.log('imgOK');
                    } else {
                        mui.alert('头像修改失败');
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });

        }
    }

/*    var formElement = document.querySelector("#picForm");
    var form = new FormData();
    form.append("userfile", file);

    // =================
    // $('#picForm').action=rootPath + "/userLoginRegisterjfsc/updateUserImg";
    // $('#picForm').submit();
    console.log(565656);
    console.log(form);
    // console.log( $('#yourformid').serialize());
    setTimeout(function () {

        $('#picForm').ajaxForm();
    }, 2000)

    // =====================*/
}


//选择头像
function uploadPic() {
    $('#fileId').click();
}

//弹出选择性别提示框
$(".xingbie").click(function () {
    $(".xingbie_pop").css('display', 'block');
    var sex = userInfo.sex;
    $(".xingbie_pop .radio").html('');
    $('.xingbie_pop p[data-sex=' + sex + ']').children('.radio').html('<img src="../../img/wode/checked.png" class="ok"/>');
});

//修改性别
$(".xingbie_pop p").click(function () {
    $(".radio").html('');
    $(this).children('.radio').html('<img src="../../img/wode/checked.png" class="ok"/>');
    // console.log($(this).attr('data-sex'));
    var selectSex = $(this).attr('data-sex');

    if (selectSex == userInfo.sex) {
        $(".xingbie_pop").css('display', 'none');
        return;
    } else {
        var sexVal = (selectSex == 'true') ? "男" : "女";
        userInfo.sex = selectSex;
        console.log(selectSex);
        console.log(sexVal);
        $("#sexName").html(sexVal);
        $(".xingbie_pop").css('display', 'none');

        //提交性别修改
        $.ajax({
            url: rootPath + "/userLoginRegisterjfsc/modifySex",
            type: 'POST',
            data: {userId: userId, sex: selectSex},
            dataType: 'json',
            // async: false,
            success: function (data) {
                console.log(data);
                if (data.result == "success") {

                    console.log('sexok');
                } else {
                    mui.alert('性别修改失败');
                }
            },
            error: function (err) {
                console.log(err);
            }
        });


    }

});

//修改昵称
function updateNickname() {
    console.log(userInfo);
    var newNikename = $("#nickName").val();
    if (newNikename == '' || newNikename == userInfo.nickName) {
        return;
    }
    //提交昵称修改
    $.ajax({
        url: rootPath + "/userLoginRegisterjfsc/modifynickname",
        type: 'POST',
        data: {userId: userId, nickName: newNikename},
        dataType: 'json',
        // async: false,
        success: function (data) {
            console.log(data);
            if (data.result == "success") {
                console.log('newNikenameok');

            } else {
                mui.alert('性别修改失败');
            }
        },
        error: function (err) {
            console.log(err);
        }
    });

}
$('.select-address').on('tap',function(){
//	alert('dizhihuanli');
//	window.location.href='./diZhi_huanLi.html';
	goToPage('./diZhi_huanLi.html');
})
