<template>
	<view>
		<mainpage v-if="PageCur=='main'"></mainpage>
		<warnpage v-if="PageCur=='warn'"></warnpage>
		<messagepage v-if="PageCur=='message'"></messagepage>
		<noticepage v-if="PageCur=='notice'"></noticepage>
		<settingpage v-if="PageCur=='setting'"></settingpage>
		<view class="cu-bar tabbar bg-white shadow foot" :style="{height:StatusBar+'px'}">
			<view class="action" @click="NavChange" data-cur="main">
				<view class='cuIcon-home' :class="PageCur=='main'?'text-'+bgColor:''"></view>
				<view :class="PageCur=='main'?'text-'+bgColor:'text-gray'">主页</view>
			</view>
			<view v-if="webUser.rolename=='物业'?true:false" class="action" @click="NavChange" data-cur="warn">
				<view class='cuIcon-warn' :class="PageCur=='warn'?'text-'+bgColor:''"></view>
				<view :class="PageCur=='warn'?'text-'+bgColor:'text-gray'">预警</view>
			</view>
			<view v-if="webUser.rolename=='业主'?true:false" class="action" @click="NavChange" data-cur="message">
				<view class='cuIcon-message' :class="PageCur=='message'?'text-'+bgColor:''"></view>
				<view :class="PageCur=='message'?'text-'+bgColor:'text-gray'">诉求</view>
			</view>
			<view class="action" @click="NavChange" data-cur="notice">
				<view class='cuIcon-notice' :class="PageCur=='notice'?'text-'+bgColor:''"></view>
				<view :class="PageCur=='notice'?'text-'+bgColor:'text-gray'">公告</view>
			</view>
			<view class="action" @click="NavChange" data-cur="setting">
				<view class='cuIcon-settings' :class="PageCur=='setting'?'text-'+bgColor:''"></view>
				<view :class="PageCur=='setting'?'text-'+bgColor:'text-gray'">我的</view>
			</view>
		</view>
	</view>
</template>
<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				bgColor:this.bgColor,
				webUser:this.$webUser(),
				menulist:[{}],
				viewTouchStartx:0,
				viewTouchMovex:0,
				PageCur: 'main',
				leftmenu:false,
				CustomBar:this.CustomBar,
				StatusBar:this.StatusBar,
				baseurl:this.$config.baseurl,
				onevent:"indexupdate"
			}
		},
		onLoad() {
			/**
			 * 页面数据监听程序
			 * @param {Object} data
			 */
			uni.$on(this.onevent,function(data){
					var updatetype=data.updatetype;//login
				if(updatetype=="login"){//登录或校验用户用户名密码成功，则需要做如下几件事情
					this.webUser=data.params;//初始化全局变量 
					console.log("=====存储用户");
					uni.setStorageSync("webUser", JSON.stringify(data.params));//更新用户信息
				}else if(updatetype=="pulldown"){
					uni.startPullDownRefresh({
						
					})
				}
			}.bind(this))
			/**
			 * 版本号检测
			 */
			var that=this;
			setTimeout(function(){
				if(this.appDatas){
					var newversiondb=this.appDatas.version;//当前版本号如1.1.0
					var downloadurl=this.appDatas.url;//apk下载地址 http://ip:port/xx.apk
					var downloadQR=that.baseurl+this.appDatas.qrcode;//apk下载二维码 http://ip:port/xx.jpg
					var newversion=newversiondb.split('.').join('');
					console.log("newversion==========="+newversion);
					//#ifdef APP-PLUS
					var nowversion=(plus.runtime.version).split('.').join('');
					if(newversion>nowversion){
						that.$common.modelShow("检测到新版本","最新版本为"+newversion+"，您是否确定更新",function(){
							plus.runtime.openURL( downloadurl,  function(res) {
								console.log(res);  
							});  
						})
					}
					//#endif
				}
			},2000)
		},
		onReady() {
			const autologin = uni.getStorageSync('autologin');//是否自动登录
			var webUser= this.$api.getWebUser();
			const webUserstr = uni.getStorageSync('webUser');//是否自动登录
			if(autologin&&webUser.token&&webUser.token!=null){//自动登录
			}else{
				console.log("不是自动登录");
				/* var requestParams=new Object();
				requestParams.onevent=this.onevent;
				this.$common.navigateTo('./login',requestParams) */
			} 
			
		},
		onShow() {
			console.log("indexonShow")
		},
		onUnload() {
			uni.$off(this.onevent,function(data){
				console.log('移除 update 自定义事件');
			})
		},
		onPullDownRefresh() {//下啦刷新
			uni.$emit(this.PageCur+"index",{updatetype:'pulldown',params:{}});//刷新父页面数据				
		},
		onReachBottom(){//上拉加载
			uni.$emit(this.PageCur+"index",{updatetype:'pullup',params:{}});//刷新父页面数据			
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}	
	
</script>

<style>

</style>
