///////////从本地存储中去数据
var gpsdingwei=localStorage.getItem('city_name')
var gpsdingweigps=localStorage.getItem('city_namegps');
 $('.weizhi').html(gpsdingweigps);
	if (gpsdingwei!=null){
	    $('.weizhi').html(gpsdingwei);
	}else {
	    $('.weizhi').html(gpsdingweigps);
	}