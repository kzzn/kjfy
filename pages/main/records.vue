<template>
	<view>
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="text-white" :bgColor="barColor">
				<block slot="backText">返回</block>
				<block slot="content">出入登记</block>
			</cu-custom>
		</view>
		<view class="flex solid-bottom justify-center">
			<view class="">
				<image v-if="requestParams.qrcode!=null?'true':false" :src="baseUrl+requestParams.qrcode" mode="aspectFill" style="width: 180px;height: 180px;" ></image>
			</view>
		</view>
		<view id="titleview" class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 出入记录
			</view>
		</view>
		<scroll-view scroll-y class="page">
			<view class="cu-list menu-avatar">
				<view class="cu-item" v-for="(item,index) in recods" :key="index" @tap="openRecod"  :data-name="item.name"
				 :data-id="item.id" >
					<view class="cu-avatar lg round " :class="item.state=='出'?'bg-red':'bg-'+bgColor ">{{item.state}}</view>
					
					<view class="content">
						<view class="text-grey">
							<view class="text-cut">{{item.name}}</view>
							<view class="cu-tag round bg-orange sm">{{item.temperature}} ℃</view>
						</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								<text class="cuIcon-location text-red  margin-right-xs"></text>
								{{item.address}}
							</view>
						</view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">{{item.date}}</view>
						<view class="cu-tag round bg-grey sm">{{item.time}}</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadStatus"></uni-load-more>
		</scroll-view>
		<view  v-if="webUser.rolename=='物业'?true:false">
			<view class="fab-box fab rightBottom" @tap="registerCode">
				<view class="fab-circle bottom" :class="'bg-'+bgColor" style="right: 0px;">
					<text class="cuIcon-add text-white xl" style="font-size: 20px;" ></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	import uniFab from '@/components/uni-fab/uni-fab.vue';
	
	export default {
		components: {
			uniLoadMore,uniFab
		},
		data() {
			return {
				barColor:this.barColor,
				bgColor:this.bgColor,
				recods:[],
				webUser:this.$webUser(),
				loadStatus: 'more',
				requestParams:{},
				currpage:1,
				onevent:"updaterecords",
				baseUrl:this.baseurl,
				pagesize:10
			}
		},
		onLoad(e) {
			this.requestParams=e;
			var that=this;
			this.initdatas();
			/**
			 * 页面数据监听程序
			 * @param {Object} data
			 */
			uni.$on(this.onevent,function(data){
				var updatetype=data.updatetype;//login
				if(updatetype=="updaterecode"){//登记完成后更新数据
					//自数据库中重新更新记录值
					that.initdatas();
				}
			}.bind(this))
		},
		methods: {
			openRecod(e){
				var recodeid=e.currentTarget.dataset.id;
				var params=new Object();
				params.recodeid=recodeid;
				this.$common.navigateTo("./viewRegister",params)
			},
			registerCode(e){
				var ownerid=this.requestParams.userid
				var param=new Object();
				param.onevent=this.onevent;
				param.ownerid=ownerid;
				this.$common.navigateTo("/pages/main/register",param);
			},
			initdatas(callback,listtype){
				var that=this;
				var param=this.$common.getParams("userRecords");
				this.loadStatus = 'loading';
				param.id=this.requestParams.userid;
				param.currpage=this.currpage;
				param.pagesize=this.pagesize;
				
				this.$api.recods(param,function(result){
					if(result.success){
						if(listtype=="up")//上拉加载
							that.recods = [...that.recods, ...result.data];
						else
							that.recods=result.data;
						if (that.pagesize < result.data.length) {
							that.loadStatus = 'more'
							that.currpage ++
						} else {
							// 数据已加载完毕
							that.loadStatus = 'noMore'
						}
						if(callback){
							callback();
						} 
					}else{
						that.$common.errorToShow(result.message)
					}
				})
			}
		},
		
		onPullDownRefresh() {//下啦刷新
			this.currpage=1;
			this.recods=[];//滞空list
			this.initdatas(function(){
				uni.stopPullDownRefresh();
			});
		},
		onReachBottom(){//上拉加载
			this.currpage=this.currpage+1;
			this.initdatas(function(){
			
			},"up");
			console.log("已加载到底部")
		}
	}
</script>

<style>
@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('https://img-cdn-qiniu.dcloud.net.cn/fonts/uni.ttf') format('truetype');
	}
	
	.uni-icon {
		font-family: uniicons;
		font-size: 24px;
		font-weight: normal;
		font-style: normal;
		line-height: 1;
		display: inline-block;
		text-decoration: none;
		-webkit-font-smoothing: antialiased;
	}
	
	.uni-icon-plusempty:before {
		content: '\e468';
	}
	
	.fab-box {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 2;
	}
	
	.fab-box.top {
		width: 60upx;
		height: 60upx;
		right: 30upx;
		bottom: 60upx;
		border: 1px #5989b9 solid;
		background: #6699cc;
		border-radius: 10upx;
		color: #fff;
		transition: all 0.3;
		opacity: 0;
	}
	
	.fab-box.active {
		opacity: 1;
	}
	
	.fab-box.fab {
		z-index: 10;
	}
	
	.fab-box.fab.leftBottom {
		left: 30upx;
		bottom: 110upx;
	}
	
	.fab-box.fab.leftTop {
		left: 30upx;
		top: 80upx;
		/* #ifdef H5 */
		top: calc(80upx + var(--window-top));
		/* #endif */
	}
	
	.fab-box.fab.rightBottom {
		right: 30upx;
		bottom: 110upx;
	}
	
	.fab-box.fab.rightTop {
		right: 30upx;
		top: 80upx;
		/* #ifdef H5 */
		top: calc(80upx + var(--window-top));
		/* #endif */
	}
	
	.fab-circle {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		width: 110upx;
		height: 110upx;
		background: #3c3e49;
		/* background: #5989b9; */
		border-radius: 50%;
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
		z-index: 11;
	}
	
	.fab-circle.left {
		left: 0;
	}
	
	.fab-circle.right {
		right: 0;
	}
	
	.fab-circle.top {
		top: 0;
	}
	
	.fab-circle.bottom {
		bottom: 0;
	}
	
	.fab-circle .uni-icon-plusempty {
		color: #ffffff;
		font-size: 80upx;
		transition: all 0.3s;
		font-weight: bold;
	}
	
	.fab-circle .uni-icon-plusempty.active {
		transform: rotate(135deg);
		font-size: 80upx;
	}
	
	.fab-content {
		background: #6699cc;
		box-sizing: border-box;
		display: flex;
		border-radius: 100upx;
		overflow: hidden;
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
		transition: all 0.2s;
		width: 110upx;
	}
	
	.fab-content.left {
		justify-content: flex-start;
	}
	
	.fab-content.right {
		justify-content: flex-end;
	}
	
	.fab-content.flexDirection {
		flex-direction: column;
		justify-content: flex-end;
	}
	
	.fab-content.flexDirectionStart {
		flex-direction: column;
		justify-content: flex-start;
	}
	
	.fab-content.flexDirectionEnd {
		flex-direction: column;
		justify-content: flex-end;
	}
	
	.fab-content .fab-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 110upx;
		height: 110upx;
		font-size: 24upx;
		color: #fff;
		opacity: 0;
		transition: opacity 0.2s;
	}
	
	.fab-content .fab-item.active {
		opacity: 1;
	}
	
	.fab-content .fab-item .content-image {
		width: 50upx;
		height: 50upx;
		margin-bottom: 5upx;
	}
	
	.fab-content .fab-item.first {
		width: 110upx;
	}
</style>
