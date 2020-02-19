import Vue from 'vue'
import App from './App'

import * as Api from './config/api.js'
import * as Common from './config/common.js'
import * as Db from './config/db.js'
import * as Config from './config/config.js'

Vue.prototype.contextPath="/"
//用户登录信息			
Vue.prototype.webUser={};

Vue.prototype.$api = Api;
Vue.prototype.$common = Common;
Vue.prototype.$db = Db;
Vue.prototype.$config = Config;
Vue.prototype.downloadQR = "/static/logo.png";
Vue.prototype.defaultimg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAIAAACyr5FlAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozMGU1NGIxOC01OTAxLWVhNGEtYjdjYS0zOTJmY2M1OTJjNTQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjkyNUI3MzU0QzY1MTFFQThDQTJCOEFCNEI1OTc1OTEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjkyNUI3MzQ0QzY1MTFFQThDQTJCOEFCNEI1OTc1OTEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YTQ3ZjMxZTQtYmNhMi1hYTQ4LTliMjEtZWYyMjBkODVmNmI3IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NDI2ZjE3MzUtNGM2NS0xMWVhLWJkYzUt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";
Vue.prototype.baseurl=Config.baseurl;

import cuCustom from './colorui/components/cu-custom.vue'
import mainpage from './components/main.vue'
import warnpage from './components/warn.vue'
import noticepage from './components/notice.vue'
import settingpage from './components/setting.vue'
import messagepage from './components/affair.vue'


Vue.component('messagepage',messagepage)
Vue.component('settingpage',settingpage)
Vue.component('noticepage',noticepage)
Vue.component('warnpage',warnpage)
Vue.component('mainpage',mainpage)
Vue.component('cu-custom',cuCustom)
Vue.config.productionTip = false


Vue.prototype.$webUser=function(){//当前登录账号
	const webUserstr = uni.getStorageSync('webUser');
	if(webUserstr!=""&&webUserstr!=null){
		var webuser=JSON.parse(webUserstr);
		if(!webuser.rolename)webuser.rolename="物业"
		//webuser.storeyid="40ece50bd5b743d7bf1dd176f3ac55b8_1_2_2";//楼层标识
		//webuser.roomid="9";
		return webuser;	 	
		
	}else{
		return null;
	}
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
