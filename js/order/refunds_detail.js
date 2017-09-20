$(function() {
	var orderId = getQueryString('orderId');
	$.ajax({
		type: 'get',
		url: rootPath + '/orderControllerapi/refundsInfo',
		data: {
			'orderId': orderId
		},
		dataType: 'JSON',
		success: function(data) {
			if(data.resultSuccess) {
				if(data.data) {
					if(data.data.reviewStatus == 0) {
						data.data.reviewStatus1 = '待审核';
					} else if(data.data.reviewStatus == 1) {
						data.data.reviewStatus1 = '已退款到账户';
					} else {
						data.data.reviewStatus1 = '审核被拒绝';
					}
					addHtmlForTemplte(data.data, 'refunds_info', 'refunds_info_templete')
					document.getElementById('refunds_status').innerHTML = data.data.reviewStatus1;
				}

			}

		}
	})
})