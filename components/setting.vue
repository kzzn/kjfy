<template name="settingpage">
	<view>
		<view class="fixed">
			<cu-custom  bgColor="text-white" :bgColor="barColor" :isBack="false">
				<block slot="content">慧生活流控管家</block>
			</cu-custom>
		</view>
		<scroll-view :scroll-y="true" class="page show fixed" :style="[{height:'calc(100vh - '+ CustomBar + 'px - 50px)'}]"
		 :scroll-with-animation="true" :enable-back-to-top="true"> 
		 
			<view class="cu-card no-card article ">
				<view class="cu-item shadow">
					<view class="content">
						<image class="padding-top" :src="webUser.qrcode!=null?(baseUrl+webUser.qrcode):defaultimg" mode="aspectFit" style="width: 120px;height: 120px;"></image>
						<view class="desc padding-top">
							<view class="">
								<view >姓名：{{webUser.username}}</view>
								<view>
									小区：{{webUser.community+webUser.village}}
								</view>
								<view >住址：{{webUser.address}}</view>
								<view >电话：{{webUser.phone}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="cu-list menu margin-top" >			
				<view class="cu-item arrow" @tap="updatePwd" >
					<navigator class="content" hover-class="none" url="../list/list" open-type="redirect">
						<text class="cuIcon-title text-green"></text>
						<text class="text-grey">密码：******</text>
					</navigator>
					<view class="action">
						<text class="text-grey text-sm">修改</text>
					</view>
				</view>
				<!--#ifdef APP-PLUS-->
				<view class="cu-item arrow"  @tap="updateApp">
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">当前版本</text>
					</view>
					<view class="action">
						<text :class="newversion?'cuIcon-new':''"></text>
						<text class="text-grey text-sm">{{nowversion}}</text>
					</view>
				</view>
				<!--#endif-->
				<view class="cu-item arrow"  @tap="clearCache">
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">清除缓存</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{appcatch}}</text>
					</view>
				</view>
				<view class="cu-item arrow"  @tap="aboutUs">
					<view class="content">
						<text class="cuIcon-phone text-green"></text>
						<text class="text-grey">联系我们</text>
					</view>
				</view>
				<view class="cu-item arrow"  @tap="logOff">
					<view class="content">
						<text class="cuIcon-close text-green"></text>
						<text class="text-grey">注销登录</text>
					</view>
				</view>
				
				<!--#ifndef MP-ALIPAY-->
					<view class="flex solid-bottom justify-center margin-top">
						<view class="">
							<image @longpress="saveImg" :data-img="downloadQR" :src="downloadQR" mode="aspectFill" style="height: 150px;width: 150px;"></image>
						</view>
					</view>
					<view class="text-center">微信扫码访问小程序(长按下载二维码)</view>
				<!--#endif-->
				<view v-if="(webUser.rolename!='业主'&&webUser.selfQR!='')?true:false" class="flex solid-bottom justify-center margin-top">
					<view class="">
						<image @longpress="saveImg" :data-img="baseUrl+webUser.selfQR" :src="baseUrl+webUser.selfQR" mode="aspectFill" style="height: 150px;width: 150px;"></image>
					</view>
				</view>
				<view class="text-center">小区专属二维码，可用于业主扫码注册(长按下载二维码)</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barColor:this.barColor,
				bgColor:this.bgColor,
				webUser:this.$webUser(),
				nowversion:"1.0.1",
				appcatch:"0M",
				onevent:"settingindex",
				defaultimg:this.defaultimg,
				downloadQR:"",
				CustomBar:this.CustomBar,
				baseUrl:this.baseurl,
				newversion:false,
				initpage:false
			};
		},
		mounted() {
			console.log("initpage=============="+JSON.stringify(this.webUser)) 
			if(this.initpage)return;
			this.initpage=true;
			
			this.initdatas();
			/**
			 * 页面数据监听程序
			 * @param {Object} data
			 */
			uni.$on(this.onevent,function(data){
				var updatetype=data.updatetype;//login
				if(updatetype=="pulldown"){//下拉刷新
					this.currpage=1;
					this.viewlist=[];//滞空list
					this.initdatas(function(){
						uni.stopPullDownRefresh();
					});
				}
			}.bind(this))
		}, 
		methods: {
			saveImg(e){//长按保存
				var imgurl=e.currentTarget.dataset.img;
				var that=this;
				uni.downloadFile({      //下载图片
					url:imgurl,
					success:(res)=>{
						console.log(res.tempFilePath)
						uni.saveImageToPhotosAlbum({     //将图片保存在手机
							filePath:res.tempFilePath,     //保存的位置
							success: (res) => {
								console.log(res)
								console.log('长按保存图片')
								
							}
						})
					}
				})
			},
			initdatas(callback,listtype){
				var that=this;
				uni.getStorageInfo({
				    success: function (res) {
				       that.catch=res.currentSize
				    }
				});
				var that=this;
				if(this.appDatas){
					var newversiondb=this.appDatas.version;//当前版本号如1.1.0
					var downloadurl=this.appDatas.url;//apk下载地址 http://ip:port/xx.apk
					var newversion=newversiondb.split('.').join('');
					console.log("newversion==========="+newversion);
					//#ifdef APP-PLUS
					var nowversion=(plus.runtime.version).split('.').join('');
					if(newversion>nowversion){
						that.newversion=true;
					}
					this.appDatas.qrcode=this.appDatas.appQrcode;//app二维码
					//#endif
					console.log("this.appDatas.qrcode=============="+JSON.stringify(this.appDatas));
					//#ifndef MP-ALIPAY
						that.downloadQR=that.baseurl+this.appDatas.qrcode;//微信小程序关注二维码
					//#endif
				}
				uni.getStorageInfo({
				    success: function (res) {
				        that.appcatch=(res.currentSize/1024).toFixed(2)+"M";
				    }
				});
				if(callback){
					callback();
				}
				
			},
			updateApp(){//更新app
				/**
				 * 版本号检测
				 */
				var that=this;
				this.$api.appUpdate({},function(result){
					if(result.success){
						var vdata=result.data;
						var newversiondb=vdata.version;//当前版本号如1.1.0
						var downloadurl=vdata.url;//apk下载地址 http://ip:port/xx.apk
						var downloadQR=that.baseurl+vdata.qrcode;//apk下载二维码 http://ip:port/xx.jpg
						var newversion=newversiondb.split('.').join('');
						//#ifdef APP-PLUS
						if(plus){
							var nowversion=(plus.runtime.version).split('.').join('');
							if(newversion>nowversion){
								that.$common.modelShow("检测到新版本","最新版本为"+newversiondb+"，您是否确定更新",function(){
									plus.runtime.openURL( downloadurl,  function(res) {
										console.log(res);  
									});  
								})
							}else{
								that.$common.successToShow("已是最新版本")
							}
						}
						//#endif
					}else{
						that.$common.errorToShow(result.message)
					}
				})
			},
			// 清除缓存
			clearCache () {
				var that=this;
				uni.clearStorage();
				uni.setStorage({
				    key: 'webUser',
				    data: JSON.stringify(this.webUser),
				    success: function () {
				        setTimeout(() => {
				        	that.$common.successToShow('清除成功')
				        }, 500)
				    }
				});
				
			},
			aboutUs () {// 关于我们
				let articleId = this.$config.aboutArticleId
				this.$common.navigateTo('/pages/notice/article?articleid=' + articleId)
			},
			// 退出登录
			logOff () {
				var that=this;
				this.$common.modelShow('退出', '确认退出登录吗?', () => {
					that.$db.del('webUser');
					that.$common.redirectTo('/pages/login',{})
					//that.$common.navigateTo('/pages/login',{})
				})
			},
			updatePwd(){
				this.$common.navigateTo('/pages/setting/updatepwd',{})
			}
			
		}
	}
</script>

<style>
	.cu-list.menu-avatar>.cu-item .content {
	
	}
</style>
