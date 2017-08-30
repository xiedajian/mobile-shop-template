    var map, geolocation;
    //加载地图，调用浏览器定位服务
    map = new AMap.Map('container', {
        resizeEnable: true
    });
    map.plugin('AMap.Geolocation', function() {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition:'RB',
            extensions:'base'
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    });
 
    
    var opts = {
        subdistrict: 3,   //返回下一级行政区
        showbiz:true  //最后一级返回街道信息
    };
    district = new AMap.DistrictSearch(opts);//注意：需要使用插件同步下发功能才能这样直接使用
    district.search('中国', function(status, result) {
        if(status=='complete'){
           //console.log(JSON.stringify(result))
        }
    });
    //解析定位结果
    function onComplete(data) {
        var str='';
        str+=data.position.getLng()+','+data.position.getLat();
        localStorage.setItem('coordinate',str);
    }
    //解析定位错误信息
    function onError(data) {
      //  document.getElementById('myTest').innerHTML = '定位失败';
      alert('定位失败');
    }
    
    $(document).on('tap','#test',function(){
    	getCurrentPoint();
    })
    function getCurrentPoint(){
    	map.plugin('AMap.Geolocation', function() {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                buttonPosition:'RB',
                extensions:'base'
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition(function(status,result){
            	alert(status);
            	if(status=='complete'){
            		var str='';
            		str+=result.position.getLng()+','+result.position.getLat();
            		localStorage.setItem('coordinate',str);
            	}else{
            		alert('定位失败');
            	}
            });
//            geolocation.getCurrentPosition();
//            AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
//            AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
        });
    }
    
