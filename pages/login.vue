<template>
	<view>
		<cu-custom  bgColor="text-white" :bgColor="barColor" :isBack="false">
			<block slot="content">用户登录</block>
		</cu-custom>
		<view class="cu-form-group">
			<view class="title">登录账户</view>
			<input @input="getloginno" placeholder="请填写您的账户"  name="loginno" focus="true" confirm-type="go"></input>
			
		</view>
		<view class="cu-form-group">
			<view class="title">登录密码</view>
			<input @input="getloginpwd" placeholder="请输入登录密码" name="loginpwd" password="true" confirm-type="go"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">是否自动登录</view>
			<switch @change="autologinC" :class="autologin?'checked':''" :checked="autologin?true:false"></switch>  
		</view>
		<view class="padding flex flex-direction">
			<button @tap="login" class="cu-btn margin-tb-sm lg" :class="'bg-'+bgColor" :loading="islogin?true:false">登录</button> 
		</view>
		<view class="text-center">
			<button class="cu-btn" @tap="openArticle"><text class="cuIcon-file"></text> 使用手册</button>
		</view>
		<view class="text-center">
			<button class="cu-btn" @tap="registerCode">(<text class="cuIcon-qrcode"></text>扫码注册</button>
			<button class="cu-btn" @tap="register('物业')"><text class="cuIcon-friendadd"></text>小区注册</button>
			<button class="cu-btn" @tap="register('业主')"><text class="cuIcon-friendaddfill"></text>业主注册)</button>
		</view>
		<view class="text-center margin-top">
			Copyright© 2009-2020 nmghl.com 内蒙古汇联
		</view>
		<view class="text-center">
			联系电话：0471-3284826
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgColor:this.bgColor,
				barColor:this.barColor,
				autologin: true,
				loginpwd:'',
				loginno:"",
				islogin:false,
				requestParams:{},
			};
		},
		onLoad(e) {
			this.requestParams=e;
		},
		methods: {
			login(e){
				if(this.islogin)return;
				this.islogin=true;		
				var params=this.$common.getParams("login");
				params.autologin=false;
				params.username=this.loginno;
				params.password=this.loginpwd;				
				var autologin=this.autologin;
				const that=this;
				
				console.log(params);
				this.$api.login(params,function(data){
					//记录登录用户信息
					if(data.success){
						uni.setStorageSync("autologin",autologin);//记录用户是否设置自动登录
						uni.setStorageSync("webUser", JSON.stringify(data.data));//更新用户信息
						//uni.$emit("indexupdate",{"updatetype":'login',"params":data.data});//刷新父页面数据
						that.$common.successToShow("登录成功",function(){
							that.$common.redirectTo("/pages/index",{});//返回主页 		
						})
					
					}else{
						uni.showToast({
							title:data.message,
							icon:"none"
						})
					}
				})
				this.islogin=false;//登录完成
				return;
				
			},
			register(type){
				var params=this.$common.getParams("");
				params.registertype=type;
				this.$common.navigateTo("/pages/register/index",params)
			},
			registerCode(e){
				var that=this;
				uni.scanCode({
				    onlyFromCamera: false,
					scanType:['qrCode'],
				    success: function (res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						console.log("reuslt==========="+res.result)
						var codecontent=res.result
						var param=new Object();
						param.onevent=that.onevent;
						param.codecontent=codecontent;
						that.$common.navigateTo("/pages/register/index",param);
				    },
					fail:function(res){
						//that.$common.errorToShow(res.errMsg)
					}
				}); 
			},
			openArticle(){
				let articleId = this.$config.handbookId
				this.$common.navigateTo('/pages/notice/article?articleid=' + articleId)
			},
			autologinC(e) {
				this.autologin = e.detail.value
			},
			getloginno(e){
				this.loginno=e.detail.value;
			},
			getloginpwd(e){
				this.loginpwd=e.detail.value;
			}
			
		}
	}
</script>

<style>
	
</style>
