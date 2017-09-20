var orderId=getQueryString('orderid');
$(function(){
 		$.ajax({
			url:rootPath+'/orderControllerapi/getOrderById',
			data:{'orderId':orderId},
			dataType:'JSON',
			success:function(data){
				console.log(data);
				if(data.data){
				data.data.rootPath=imgRootPath;
				console.log(data.data);
				addHtmlForTemplte(data.data,'order_info','order_info_templete');
				addHtmlForTemplte(data.data,'order','order_templete');
				addHtmlForTemplte(data.data,'express_info','express_info_templete');
				}
			}
		});
 })


$('#submit').on('tap',function(){
	window.location.href='fuKuan.html?orderId='+orderId
})

$('#demo5').on('tap',function(){
 	var dtPicker = new mui.DtPicker({type:'time'});
    dtPicker.show(function (selectItems) { 
        $('.time').html(selectItems.h.text+"时"+selectItems.i.text+"分");
    })
 })

$('.ps_type').on('tap',function(){
	var picker = new mui.PopPicker();
		picker.setData([{
		    value: "first",
		    text: "到店自提",
		}, {
		    value: "second",
		    text: "外卖配送"
		}])
		picker.pickers[0].setSelectedIndex(1, 2000);
		picker.show(function(SelectedItem) {
		    console.log(SelectedItem);
		    $('.ps_type_txt').html(SelectedItem[0].text)
		})
})
//
