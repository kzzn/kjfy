<template name="messagepage">
	<view>
		<view class="fixed">
			<cu-custom  bgColor="text-white" :bgColor="barColor" :isBack="false">
				<block slot="content">慧生活流控管家</block>
			</cu-custom>
		</view>
		<swiper class="screen-swiper round-dot fixed" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500">
			<swiper-item v-for="(item,index) in ads" :key="index" @tap="openAds" :data-isurl="item.isurl" :data-url="item.url" :data-id="item.id">
				<image :src="item.titleImg" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view >
			<view class="fab-box fab rightBottom" @tap="postAffair()">
				<view class="fab-circle bottom" :class="'bg-'+bgColor" style="right: 0px;">
					<text class="cuIcon-upload text-white xl" style="font-size: 20px;" ></text>
				</view>
			</view>
		</view>
		<scroll-view id="fiexdview" scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="TabCur=='2'?'text-'+bgColor+' cur':''"  @tap="tabSelect" :data-index="2" index="2">
					未回复
				</view>
				<view class="cu-item flex-sub" :class="TabCur=='3'?'text-'+bgColor+' cur':''" @tap="tabSelect" :data-index="3" index="3">
					已回复
				</view>
				<view class="cu-item flex-sub" :class="TabCur=='4'?'text-'+bgColor+' cur':''" @tap="tabSelect" :data-index="4" index="4">
					已评价
				</view>
			</view>
		</scroll-view>
		<scroll-view id="datasview" :style="{height:scrollviewHeight+'px'}" scroll-y class="page" >
			<view class="cu-card dynamic article" v-for="(entry,index) in affairs" :key="index" :id="entry.id" @tap="openEntry" :data-id="entry.id" >
				<view class="cu-item shadow">
					<view class="flex justify-between">
						<view class="padding-sm margin-xs radius">时间：{{entry.createDate}}</view>
						<view class="padding-sm margin-xs radius">状态：{{entry.status}}</view>
					</view>
					<view class="content">
						<view class="radius">内容：</view>
						<view v-html="entry.content"></view>
					</view>
				</view>
			</view>
		<uni-load-more :status="loadStatus"></uni-load-more>
		</scroll-view>
		
	</view>
</template>
<script>
	import uniFab from '@/components/uni-fab/uni-fab.vue';
	export default {
		name: "messagepage",
		components: {
			uniFab
		},
		data() {
			return {
				barColor:this.barColor,
				bgColor:this.bgColor,
				affairs:[],
				ads:[],
				TabCur:"2",
				loadStatus:"more",
				defaultimg:this.defaultimg,
				onevent:"messageindex",
				currpage:"1",
				pagesize:"20",
				initpage:false,
				scrollviewHeight:400
			}
		}, 
		mounted() {
			var that=this;
			var selector=uni.createSelectorQuery().in(this);
			var datasview=selector.select("#datasview");
			datasview.boundingClientRect((data)=>{
				var adviewHeight=data.top;
				that.scrollviewHeight=that.phoneHeight-adviewHeight-45;
			}).exec();
			/**
			 * 初始化广告信息
			 */
			var adparams=new Object();
			adparams.type="诉求申请";//type为广告类型，未指定获取全部
			this.$api.ADList(adparams,function(result){
				console.log("result===="+JSON.stringify(result));
				if(result.success){
					that.ads=result.data;
				}else{
					that.$common.errorToShow(result.message)
				}
			});
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
				}else if(updatetype=="pulldown"){//下拉刷新
					this.currpage=1;
					this.viewlist=[];//滞空list
					this.initdatas(function(){
						uni.stopPullDownRefresh();
					});
				}else if(updatetype=="affairs"){//添加受刷新
					this.currpage=1;
					this.initdatas();
				} 
			}.bind(this))
		},
		methods: {
			tabSelect(e){
				this.TabCur= e.currentTarget.dataset.index;
				this.affairs=[];
				this.initdatas();
			},
			initdatas(callback,listtype){
				var that=this;
				var params=this.$common.getParams();
				params.currpage=this.currpage;
				params.pagesize=this.pagesize;
				params.type="";//请求内容{type:''},type为公告类型，未指定获取全部 小区公告、活动公告
				params.searchtype=this.TabCur;
				this.loadStatus = 'loading'
				
				console.log("searchtype==================="+JSON.stringify(params))
				this.$api.affairs(params,function(result){
					console.log("result=============="+JSON.stringify(result))
					if(result.success){
						if(listtype=="up")//上拉加载
							that.affairs = [...that.affairs, ...result.data];
						else
							that.affairs=result.data;
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
			},
			postAffair(e){//诉求申报
				var params=new Object();
				params.onevent=this.onevent;
				this.$common.navigateTo("/pages/main/addAffair",params)
			},
			openEntry(e){
				var articleid=e.currentTarget.dataset.id;
				var params=new Object();
				params.affairid=articleid;
				params.onevent=this.onevent;
				this.$common.navigateTo("/pages/affair/affair",params)
			},
			openAds(e){
				var isurl=e.currentTarget.dataset.isurl;
				var url=e.currentTarget.dataset.url;
				var params=new Object();
				if(isurl=="1"){
					//#ifndef APP-PLUS
						params.src=url;
						this.$common.navigateTo("/pages/notice/webview",params)
					//#endif
					//#ifdef APP-PLUS
						plus.runtime.openURL( url,  function(res) {
							console.log(res);  
						}); 
					//#endif
				}else{
					var articleid=e.currentTarget.dataset.id;
					params.articleid=articleid;
					this.$common.navigateTo("/pages/notice/ads",params)
				}
			}
		}
	}
</script>

<style>
.cu-card.article>.cu-item .content>uni-image{
	width: 65px;
	height: 65px;
}
.cu-card.article>.cu-item .content .text-content{
	height: 65px;
}


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
