mui.init();

var provinceId = '';
var cityId = '';
var areaId = '';

var userId = 1;

$.getJSON("../../region.json", function(data) {
	UplinkData = data.districtList[0].districtList;
	//        console.log(UplinkData);
	var mobileSelect5 = new MobileSelect({
		trigger: '#address',
		title: '选择',
		wheels: [{
			data: UplinkData
		}],
		transitionEnd: function(indexArr, data) {
			//滚动过程中的回调
			//                console.log(data);
		},
		callback: function(indexArr, data) {
			//点击确定回调
			console.log(indexArr);
			console.log(data);
			$('#address').val((data[0] || {}).value + "," + (data[1] || {}).value + "," + (data[2] || {}).value);
			provinceId = (data[0] || {}).id;
			cityId = (data[1] || {}).id;
			areaId = (data[2] || {}).id;
			console.log(provinceId, cityId, areaId);
		}
	});
});

function addArea() {

    mui.alert('添加成功', function() {
        mui.back();
    });

}