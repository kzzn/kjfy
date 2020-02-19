import * as config from './config.js';
import * as common from './common.js' //引入common
import * as db from './db.js' //引入common
import areas from '@/static/areas.json'
// 需要登陆的，都写到这里，否则就是不需要登陆的接口
const methodsToken = [
	'/shfwApi/auth'
];
function getAreas(){
	return areas;
}
function getWebUser(){
	const webUserstr = uni.getStorageSync('webUser');
	if(webUserstr!=""&&webUserstr!=null){
		return JSON.parse(webUserstr);	 	
	}else{
		return new Object();
	}
}
const post = (url, data, callback) => {
	uni.showLoading({
		title: '加载中'
	});
	var requestHeader=new Object();
	requestHeader.Accept='application/json';
	requestHeader["Content-Type"]='application/x-www-form-urlencoded';
	// 判断token是否存在
	if (url.indexOf("/shfwApi/auth")!=-1||url.indexOf("/shfwApi/appUpdate")!=-1
	||url.indexOf("/shfwApi/getArealistByCode")!=-1||url.indexOf("/shfwApi/registersysApi")!=-1
	) {
	
	}else{
		var webuser=getWebUser();
		if(webuser.token&&webuser.token!=null&&webuser.token!=""){
			requestHeader.Authorization="Bearer"+webuser.token;
		}else{//跳转到登录页面
			var param=new Object();
			param.onevent="indexupdate";
			common.redirectTo("./login",param);
			console.log("跳转到登录页面")
		}
	}
	
	/***********测试请求数据****************/
	/* callback(apidata[method]);
	uni.hideLoading(); */
	uni.request({
		url: url,
		dataType: 'json',//json 、text
		data: {params:JSON.stringify(data)},
		header:requestHeader, 
		method:"POST",//GET\POST
		success: (res) => {
			uni.hideLoading();
			const result = res.data
			if (!result.status) {
				// 登录信息过期或者未登录
				if (result.data === 14007 || result.data === 14006) {
					db.del("webUser");
					uni.showToast({
						title: result.msg,	
						icon: 'none',
						duration: 2000,
						complete: function () {
							var param=new Object();
							param.onevent="indexupdate";
							common.navigateTo("./login",param)
						}
					});
				}
			}
			uni.hideLoading(); 
			callback(result);
		},
		fail: (error, code) => {
			uni.hideLoading();
			if (error && error.response) {
				showError(error.response);
			}
		},
		complete: () => {
			
		}
	});
}

const get = (url,params, callback) => {
	uni.showLoading({
		title: '加载中'
	});
	console.log("url=============="+url)
	var requestHeader=new Object();
	requestHeader.Accept='application/json';
	requestHeader["Content-Type"]='application/x-www-form-urlencoded';
	
	url=common.builderUrlParams(url,params) ;
	console.log("url=============="+url)
	uni.request({
		url: url,
		header: requestHeader,
		method: 'GET',
		success: (response) => {
			uni.hideLoading();
			callback(response.data);
		},
		fail: (error) => {
			console.log("失败"+JSON.stringify(error.response))
			uni.hideLoading();
			if (error && error.response) {
				showError(error.response);
			}
			callback();
		},
		complete: () => {
		}
	});
}

const showError = error => {
	let errorMsg = ''
	switch (error.status) {
		case 400:
			errorMsg = '请求参数错误'
			break
		case 401:
			errorMsg = '未授权，请登录'
			break
		case 403:
			errorMsg = '跨域拒绝访问'
			break
		case 404:
			errorMsg = `请求地址出错: ${error.config.url}`
			break
		case 408:
			errorMsg = '请求超时'
			break
		case 500:
			errorMsg = '服务器内部错误'
			break
		case 501:
			errorMsg = '服务未实现'
			break
		case 502:
			errorMsg = '网关错误'
			break
		case 503:
			errorMsg = '服务不可用'
			break
		case 504:
			errorMsg = '网关超时'
			break
		case 505:
			errorMsg = 'HTTP版本不受支持'
			break
		default:
			if(error.msg){
				errorMsg = error.msg
			}else{
				errorMsg="网络错误"
			}
			break
	}

	uni.showToast({
		title: errorMsg,
		icon: 'none',
		duration: 2000
	});
}
// 登录
export const login = (data, callback) => post(config.loginApi, data, callback);
//门卫查看全小区人员登记记录
export const recods = (data, callback) => post(config.recodsApi, data, callback);
// 获取小区楼栋单元楼层
export const floorlist = (data, callback) => post(config.floorlistApi, data, callback);
//获取小区楼栋单元楼层下的门牌与对应业主
export const rooms = (data, callback) => post(config.roomownersApi, data, callback);
//获取公告新闻列表
export const articles = (data, callback) => post(config.articlesApi, data, callback);
//获取公告新闻
export const article = (data, callback) => post(config.articleApi, data, callback);
//添加业主
export const saveOwner = (data, callback) => post(config.addOwnerApi, data, callback);
//根据用户标识获取用户详细信息
export const getuserbyid = (data, callback) => post(config.getuserbyidApi, data, callback);

//获取广告信息详情
export const ADInfo = (data, callback) => post(config.ADInfoApi, data, callback);
//获取广告信息列表
export const ADList = (data, callback) => post(config.ADListApi, data, callback);

//获取广告信息列表
export const viewRecode = (data, callback) => post(config.viewRecodeApi, data, callback);

//获取房间中的用户
export const roomusers = (data, callback) => post(config.roomusersApi, data, callback);

// app更新
export const appUpdate = (data, callback) => post(config.appUpdateApi, data, callback);

//查看预警数据
export const warndatas = (data, callback) => post(config.warndatasApi, data, callback);
//登记
export const register = (data, callback) => post(config.registerApi, data, callback);
//更改密码
export const updatepwd = (data, callback) => post(config.updatepwdApi, data, callback);

//签到签退
export const location = (data, callback) => post(config.locationApi, data, callback);

//诉求申报
export const postAffair = (data, callback) => post(config.postAffairApi, data, callback);
//诉求申报
export const affairs = (data, callback) => post(config.affairsApi, data, callback);
//诉求申报
export const affair = (data, callback) => post(config.affairApi, data, callback);
//诉求处理结果评价
export const rate = (data, callback) => post(config.rateApi, data, callback);

//物业/社区/业主 注册登记
export const  registerowner= (data, callback) => post(config.registerownerApi, data, callback);
export const  registersys= (data, callback) => post(config.registersysApi, data, callback);

//根据社区获取小区
export const  arealist= (data, callback) => post(config.arealistApi, data, callback);


//根据社区获取小区
export const  baidu= (data, callback) => get(config.baiduApi, data, callback);
export const  baiduZFB= (data, callback) => get(config.baiduZFBApi, data, callback);

export {
	getWebUser,getAreas
}