/////注册判断
$('#login').on('tap', function() {
		if($('#account').val() == '' && $('#password').val() == ''&& $('#password1').val() == '') {
			alert('请输入手机号,验证码和密码！');
		} 
		else if($('#account').val() == '') {
			alert('请输入手机号！');
		} 		
		else if($('#password').val() == ''){
			alert('请输入验证码！');
		}
		else if($('#password1').val() == ''){
			alert('请输入密码！');
		}
		else if($('#account').val() != '' && $('#password').val() != ''&& $('#password1').val() != '') {
			 var phone = document.getElementById('account').value;
		   if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
			     alert("手机号码有误，请重填");		
		   }			
			else{
					window.location.href='../../html/shouye/shouye.html';
             }
			
	    }
				
	})
		

