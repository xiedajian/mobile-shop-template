var rootPath = 'http://118.190.150.148:9001/jfsc';
var imgRootPath = 'http://118.190.150.148:9001';

//var rootPath = 'http://192.168.3.172/jfsc';
//var imgRootPath = 'http://192.168.3.172';
var PRODUCTKEY = 'jfscproductkey';
var SHOPKEY = 'jfscshopkey';

/**
 * 根据条件查询店铺对象的条件集合 data:advertstatus':true},
 */
function QueryTerm() {
	this.categoryId;
	this.ishot;
	this.province;
	this.city;
	this.area;
	this.pageNo;
	this.pageSize;
	this.typeid;
	this.adsenseid;
	this.advertstatus;
};

/**
 * 商超的二级跳转页面分类
 * 
 * @param categoryId
 */
function getShopsByID(categoryId) {
	if(categoryId == 16) {
		window.location.href = 'shangChao_2.html?categoryId=' + categoryId;
	} else if(categoryId == 17) {
		window.location.href = 'fuZhuang.html?categoryId=' + categoryId;
	} else if(categoryId == 18) {
		window.location.href = 'xieBao.html?categoryId=' + categoryId;
	} else {
		window.location.href = 'meiShi_waiMai.html?categoryId=' + categoryId;
	}
}
//					查询对象 script 插入点   接口    页数     次数
function addDataToBox(data, source, boxId, url, type, multiDownFlag) {
	var coordinate = localStorage.getItem('coordinate');
	if(coordinate) {
		data.coordinate = coordinate;
	} else {
		data.coordinate = 'error';
	}
	$.ajax({
		url: url,
		// data:{'categoryId':categoryId,'pageNo':pageNo,'pageSize':pageSize,'province':province,'city':city},
		data: data,
		dataType: 'JSON',
		success: function(data) {
			//			console.log(data);
			if(type == 1) {
				if(multiDownFlag == 1) {
					pageNo1 = data.data.pageNo;
					pageSize1 = data.data.pageSize;
					totalPage1 = data.data.totalPage;
				} else if(multiDownFlag == 2) {
					pageNo2 = data.data.pageNo;
					pageSize2 = data.data.pageSize;
					totalPage2 = data.data.totalPage;
				} else if(multiDownFlag == 3) {
					pageNo3 = data.data.pageNo;
					pageSize3 = data.data.pageSize;
					totalPage3 = data.data.totalPage;
				} else {
					pageNo = data.data.pageNo;
					pageSize = data.data.pageSize;
					totalPage = data.data.totalPage;
				}
			}
			var dataList;
			if(type == 1) {
				dataList = data.data.listRoute;
			} else {
				dataList = data.data;
			}
			// console.log(data.data);
			var render = template.compile(source);
			var html = render({
				list: dataList
			});
			// console.log(html)

			var oldHtml = document.getElementById(boxId).innerHTML;
			document.getElementById(boxId).innerHTML = oldHtml + html;
		},
		error: function(data) {
			console.log('网络连接超时')
		}
	});

}

function addHtmlForTemplte(data, boxId, sourceId) {
	var html = template(sourceId, data);
	document.getElementById(boxId).innerHTML = html;
}
/**
 * 日期格式化方法 调用示例 var time1 = new Date().Format("yyyy-MM-dd"); var time2 = new
 * Date().Format("yyyy-MM-dd HH:mm:ss");
 */
Date.prototype.Format = function(fmt) { // author: meizz
	var o = {
		"M+": this.getMonth() + 1, // 月份
		"d+": this.getDate(), // 日
		"H+": this.getHours(), // 小时
		"m+": this.getMinutes(), // 分
		"s+": this.getSeconds(), // 秒
		"q+": Math.floor((this.getMonth() + 3) / 3), // 季度
		"S": this.getMilliseconds()
		// 毫秒
	};
	if(/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
			.substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) :
				(("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};

/**
 *从地址栏提取参数 
 */
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null)
		return decodeURI(r[2]);
	return null;
}
/**
 * 轮播图展示
 * 
 * @param adsenseid
 */

function carousel(adsenseid) {
	mui
		.ajax({
			url: rootPath + '/advertControllerapi/selectByfirst',
			data: {
				'pageNo': 1,
				'adsenseid': adsenseid,
				'advertstatus': true
			},
			dataType: 'JSON',
			success: function(data) {
				var advertStr = '';
				var advertPoint = '<div class="mui-slider-indicator">';
				var arr = JSON.parse(data).data;
				var length = arr.length;
				//				console.log('轮播图');
				//				console.log(arr)

				$.each(
					arr,
					function(index, value) {

						if(index == 0) {
							advertStr = '<div class="mui-slider-group mui-slider-loop"><div class="mui-slider-item mui-slider-item-duplicate">' +
								'<a href="javascript:void(0);"  data-adverttype="' + value.adverttype + '" data-shoporproductid="' + value.shoporproductid + '"  data-adverturl="' +
								value.adverturl +
								'"><img src="' +
								value.advertpic +
								'" id="banner"> </a></div>' +
								advertStr;
							advertPoint = advertPoint +
								'<div class="mui-indicator mui-active"></div>'
						} else {
							advertPoint = advertPoint +
								'<div class="mui-indicator"></div>'
						}

						advertStr = advertStr +
							'<div class="mui-slider-item">' +
							'<a href="javascript:void(0);" data-adverttype="' + value.adverttype + '" data-shoporproductid="' + value.shoporproductid + '" data-adverturl="' +
							value.adverturl +
							'"><img src="' +
							value.advertpic +
							'" id="banner"> </a></div>';
						if(index == length - 1) {
							advertStr = advertStr +
								'<div class="mui-slider-item mui-slider-item-duplicate">' +
								'<a href="javascript:void(0);" data-adverttype="' + value.adverttype + '" data-shoporproductid="' + value.shoporproductid + '" data-adverturl="' +
								value.adverturl +
								'"><img src="' +
								value.advertpic +
								'" id="banner"> </a></div>';
						}
					});
				var box = document.getElementById('slider');
				box.innerHTML = (advertStr + '</div>' + advertPoint + '</div>');
				var gallery = mui('.mui-slider');
				gallery.slider({
					interval: 4000
					// 自动轮播周期，若为0则不自动播放，默认为0；
				});

			}

		});

	function skipPage(url) {

		window.location.href = url;

	}
}
/**
 * 验证手机号是否标准
 *
 *   @param mobile 手机号
 *   @return bool  true表示发送成功
 * */
function checkMobilePhone(mobile) {
	var result = true;
	if(!(/^1[34578]\d{9}$/.test(mobile))) {
		result = false;
	}
	return result;
}
/**
 * 发送验证码
 *
 *   @param mobile -手机号
 *   @return bool  true表示发送成功
 * */
function sendSmsCode(mobile, successCallback, failCallback) {
	$.ajax({
		url: rootPath + "/userLoginRegisterjfsc/getValidateCode?mobile=" + mobile,
		dataType: 'json',
		async: false,
		success: function(data) {
			console.log(data);
			alert(data.code);
			if(data.result == "success") {
				if(successCallback && typeof successCallback === "function") {
					successCallback();
				}
			} else {
				if(failCallback && typeof failCallback === "function") {
					failCallback();
				}
			}
		},
		error: function(err) {
			console.log(err);
			if(failCallback && typeof failCallback === "function") {
				failCallback();
			}
		}
	});
}

/**
 * 验证验证码是否正确
 *
 *   @param mobile 手机号  ，code 验证码
 *   @return bool  true表示发送成功
 * */
function checkSmsCode(mobile, code, successCallback, failCallback) {
	$.ajax({
		url: rootPath + "/userLoginRegisterjfsc/checkValidateCode",
		type: 'POST',
		data: {
			mobile: mobile,
			code: code
		},
		dataType: 'json',
		async: false,
		success: function(data) {
			console.log(data);

			if(data.result == "success") {
				if(successCallback && typeof successCallback === "function") {
					successCallback();
				}
			} else {
				if(failCallback && typeof failCallback === "function") {
					failCallback(data);
				}
			}
		},
		error: function(err) {
			console.log(err);
			if(failCallback && typeof failCallback === "function") {
				failCallback();
			}
		}
	});
}

//
//$(document).on('tap', '.mui-slider-item a', function() {
//	var url = this.dataset.url;
//	window.location.href = url;
//});
function getImg(jieKouUrl) {
	$.ajax({
		type: "GET",
		url: jieKouUrl,
		async: true,
		dataType: "json",
		success: function(data) {
			console.log('success')
			console.info(data);
			$('.img1').attr('src', data.data[0].img1);
			$('.img2').attr('src', data.data[1].img1);
			$('.img3').attr('src', data.data[2].img1);

			return data;

		},

		error: function() {
			console.log('请求超时')
		}
	});
}

function getPingjia(jieKouUrl) {
	$.ajax({
		type: "GET",
		url: jieKouUrl,
		async: true,
		dataType: "json",
		success: function(data) {
			var page = 1;
			var pageSize = 6;
			console.log('PingJi success')
			var newArray = data.data.listRoute
			console.info(data.data.listRoute);
			//                     	$('#item3txt').empty();

			//   用户评论逻辑实现          
			// product_ping 是评分  star@2x.png是实心 star_1@2x.png是空心
			var str = '';
			var img = '';
			for(var i = 0; i < newArray.length; i++) {

				img = '';
				for(var j = 0; j < newArray[i].product_ping; j++) {
					img += '<img src="../../img/shouye/star@2x.png" alt="" />'

				}
				for(var m = 0; m < (5 - newArray[i].product_ping); m++) {
					img += '<img src="../../img/shouye/star_1@2x.png" alt="" />'
					//									console.log(img)
				}

				//							str += '<li><span><img src="../../img/shouye/pingjiatx.png"/></span><span>YNGNI</span><span><img src="../../img/shouye/star@2x.png" alt="" /><img src="../../img/shouye/star@2x.png" alt="" /><img src="../../img/shouye/star@2x.png" alt="" /><img src="../../img/shouye/star@2x.png" alt="" /><img src="../../img/shouye/star_1@2x.png" alt="" /></span><span>2017-7-12</span></li>'

				str += `<li userid=` + newArray[i].UserId + `>
								<span>
									<img src=` + newArray[i].Portail + `></span><span class='nick'>` +
					newArray[i].NickName + `</span>
								<span>`

					+
					img +

					`</span>	
								<span class=timer>` +
					newArray[i].comment_time +
					`</span> 
								
							</li>`

			}

			$('#item3txt').append(str);
			return data;

		},

		error: function() {
			console.log('请求超时')
		}
	});

};

/**
 * 通用跳转函数
 * 在不同的环境中表现形式不同
 * 1.浏览器：用window.location.href进行导航
 * 2.APP：打开一个HTML5Plus中的webview页面
 * @param  pageHref {String} 页面的路径
 * @param  id		{String} 给页面起的id名称，默认与pageHref相同
 * 说明：为了兼顾 浏览器 与 APP统一使用，页面传值统一使用localStorage来传递
 * @example    
 * //跳转方
 * <p>跳转至商品详情</p>
 * 	window.localStorage.setItem('productDetail-product-id', productId);
 *  goToPage('shangPin_detail.html', 'jiFen_shangCheng/shangPin_detail.html');
 * //接收方
 * 	productId=window.localStorage.getItem('productDetail-product-id');
 *  window.localStorage.removeItem('productDetail-product-id'); //避免污染，记得销毁
 */
function goToPage(pageHref, id) {
	if(pageHref == undefined || pageHref == null || pageHref == '') {
		return;
	}
	if(id == undefined || id == null || id == '') {
		id = pageHref;
	}
	//非plus环境，直接走href跳转
	if(!mui.os.plus) {
		location.href = pageHref;
		return;
	}
	mui.openWindow({
		url: pageHref,
		id: id,
	});
}

//检查是否需要登录,在APP环境下会监听页面返回上一页刷新页面事件
function checkIsLogin() {
	if(localStorage.getItem('userId') && localStorage.getItem('userId') != '') {

	} else {
		mui.confirm('需要登录', ' ', ['取消', '去登录'], function(val) {
			console.log(val);
			if(val.index === 1) {
				if(mui.os.plus) {
					//在父页面中添加事件监听
					window.addEventListener('refresh', function(e) { //执行刷新
						location.reload();
					});
				}
				goToPage('../enter/enter.html');
			}
		}, 'div');
	}
}

//如果是App环境，隐藏页面的tab导航
if(mui.os.plus) {
	$('.nav-tab-isshow').css('display', 'none');
	$('.mui-content').css('padding-bottom', '0');
}