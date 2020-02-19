import * as db from './db.js' //引入common
//把obj对象里的值覆盖到newobj里面
function deepCopy(newobj,obj) {
  if (typeof obj != 'object') {
    return obj;
  }
  for (var attr in obj) {
    var a = {};
    if (newobj[attr]){
      a = newobj[attr];
    }
    newobj[attr] = deepCopy(a,obj[attr]);
  }
  return newobj;
}
//操作成功后，的提示信息
function successToShow(msg='保存成功', callback=function(){}){
  uni.showToast({
    title: msg,
    icon: 'success',
    duration: 2000,
  });
  setTimeout(function () {
    callback();
  }, 1500);
}


//操作失败的提示信息
function errorToShow(msg = '操作失败', callback = function () { }) {
  uni.showToast({
    title: msg,
    icon: 'none',
    duration: 3000,
  });
	setTimeout(function () {
	  callback();
	}, 2000);
}

//加载显示
function loadToShow(msg = '加载中') {
  uni.showToast({
    title: msg,
    icon: 'loading',
  });
}

//加载隐藏
function loadToHide() {
  uni.hideToast();
}

// 提示框
function modelShow (title = '提示', content = '确认执行此操作吗?',callback = () => {}, showCancel = true,  cancelText = '取消', confirmText = '确定') {
	uni.showModal({
			title: title,
			content: content,
			showCancel: showCancel,
			cancelText: cancelText,
			confirmText: confirmText,
			cancelText: cancelText,
			success: function (res) {
					if (res.confirm) {
							// 用户点击确定操作
							setTimeout(() => {
								callback()
							}, 500)
					} else if (res.cancel) {
							// 用户取消操作
					}
			}
	});
}


//时间戳转时间格式
function timeToDate(date) {
  var date = new Date(date * 1000);//如果date为13位不需要乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return Y + M + D + h + m + s;
}

function time2date(micro_second) {
    var time = {};
    // 总秒数
    var second = Math.floor(micro_second);
    // 天数
    time.day = PrefixInteger(Math.floor(second / 3600 / 24), 2);
    // 小时
    time.hour = PrefixInteger(Math.floor(second / 3600 % 24), 2);
    // 分钟
    time.minute = PrefixInteger(Math.floor(second / 60 % 60), 2);
    // 秒
    time.second = PrefixInteger(Math.floor(second % 60), 2);

    var newtime = '';
    if (time.day > 0) {
        newtime = time.day + '天' + time.hour + '小时' + time.minute + '分' + time.second + '秒';
    } else {
        if (time.hour != 0) {
            newtime = time.hour + '小时' + time.minute + '分' + time.second + '秒';
        } else {
            newtime = time.minute + '分' + time.second + '秒';
        }
    }
    return newtime;
}

//货币格式化
function formatMoney(number, places, symbol, thousand, decimal) {
  number = number || 0;
  places = !isNaN(places = Math.abs(places)) ? places : 2;
  symbol = symbol !== undefined ? symbol : "￥";
  thousand = thousand || ",";
  decimal = decimal || ".";
  var negative = number < 0 ? "-" : "",
    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
  return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
}
function throttle(fn, context, delay) {
  clearTimeout(fn.timeoutId);
  fn.timeoutId = setTimeout(function () {
    fn.call(context);
  }, delay);
}

// 时间格式化输出，如11:03 25:19 每1s都会调用一次
function dateformat(micro_second) {
		var time = {};
		// 总秒数
		var second = Math.floor(micro_second / 1000);
		  // 天数
		time.day = PrefixInteger(Math.floor(second / 3600 / 24),2);
		  // 小时
		time.hour = PrefixInteger(Math.floor(second / 3600 % 24),2);
		  // 分钟
		time.minute = PrefixInteger(Math.floor(second / 60 % 60),2);
		  // 秒
		time.second = PrefixInteger(Math.floor(second % 60),2);
		return time;
}
/**
 * 格式化日期
 * @param {Object} fmt
 * @param {Object} date
 */

function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

//不足位数前面补0
function PrefixInteger(num, length) {
  return (Array(length).join('0') + num).slice(-length); 
}

//验证是否是手机号
function isPhoneNumber(str){
    var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myreg.test(str)) {
        return false;
    } else {
        return true;
    }
}
//验证是否身份证号
function isCardNumber(cardNo){
	console.log("cardNo================"+cardNo);
	// 正则表达式：
	var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
	if(idcardReg.test(cardNo)) {
		return true;
	}
	return false;
}

function isBlack(str){
	if(str&&str!=null&&str!=""&&str!=undefined&&str.trim().length>0){
		return true;
	}else{
		return false;
	}
}

/**
 * 
 * 对象参数转为url参数
 * 
 */
function builderUrlParams(url, data) {
		if(typeof(url) == 'undefined' || url == null || url == '') {
				return '';
		}
		if(typeof(data) == 'undefined' || data == null || typeof(data) != 'object') {
				return '';
		}
		url += (url.indexOf("?") != -1) ? "" : "?";
		for(var k in data) {
				url += ((url.indexOf("=") != -1) ? "&" : "") + k + "=" + encodeURI(data[k]);
		}
		return url;
}

/**
 * 使用循环的方式判断一个元素是否存在于一个数组中
 * @param {Object} arr 数组
 * @param {Object} value 元素值
 */
function isInArray(arr, value) {
  for (var i = 0; i < arr.length; i++) {
    if (value === arr[i]) {
      return true;
    }
  }
  return false;
}
/**
 * 统一跳转
 */
function navigateTo(url,params){
	if(params){
		url=builderUrlParams(url,params);
	}
	uni.navigateTo({
    url:url,
		animationType:'pop-in',
		animationDuration:300
	});
}


/**
 *  关闭当前页面并跳转
 */
function redirectTo (url,params) {
	if(params){
		url=builderUrlParams(url,params);
	}
	uni.redirectTo({
		url: url,
		animationType: 'pop-in',
		animationDuration: 300
	})
}


/**
 * 
 *  判断是否在微信浏览器 true是
 */
function isWeiXinBrowser () {
	 // #ifdef H5
    // window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    let ua = window.navigator.userAgent.toLowerCase()
    // 通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
    } else {
        return false
    }
		 // #endif
		 
		 // #ifdef MP
		 return false;
		 // #endif
}
/**
 * 获取参数值
 * @param {Object} url
 * @param {Object} name
 */
function getUrlParam(name,url) {
	if(!url)url=window.location.href;
	url=url.split("?")[1];
	url=decodeURI(url)
   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
   var r = url.match(reg);
   if (r!=null) 
	return decodeURIComponent(unescape((r[2])));
   return null;
}
/**
 * 获取请求参数集合
 * @param {Object} url
 */
function getUrlParams(name,url) {
	var params=new Object();
	if(!url)url=window.location.href
	if(url){
		var urls=url.split("?")
		if(urls.length>1){
			url=urls[1];
			var urls=url.split("&");
			for(var i=0;i<urls.length;i++){
				var param=urls[i];
				if(param){
					var results=param.split("=");
					params[results[0]]=decodeURIComponent(unescape(results[1]));
				}
			}
		}
	}
	return params
}
function getParams(action,params){
	var obj=new Object();
	if(params){
		for(var key in params){
			obj[key]=params[key];
		}
	}
	return obj;
}
function isInteger(obj) {
	var r=/^[0-9]*[1-9][0-9]*$/; 
  return r.test(obj);
}
export {
	deepCopy,//复制对象信息
	timeToDate,//时间戳转日期
	formatMoney,//格式化货币
	/* errorToBack, */
	successToShow,//成功显示
	throttle,//
	errorToShow,//错误显示
	time2date,//时间戳转日期
	isPhoneNumber,//是否手机号
	isInArray,//是否在数组中
	loadToShow,//加载显示
	loadToHide,//隐藏加载显示
	navigateTo,//跳转页面
	redirectTo,//重置页面
	modelShow,//模态窗口显示
	builderUrlParams,//构造请求地址
	isWeiXinBrowser,//是否微信浏览器
	dateformat,//格式化日期
	dateFormat,
	getUrlParams,//获取请求参数哦
	getUrlParam,//获取请求参数值
	isCardNumber,//验证是否身份证号
	isBlack,
	isInteger,
	getParams//获取传递参数
}
