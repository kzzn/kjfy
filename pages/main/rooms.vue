<template>
	<view>
		<cu-custom :isBack="true" bgColor="text-white" :bgColor="barColor">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		<view >
			<view class="fab-box fab rightBottom" @tap="addOwner()">
				<view class="fab-circle bottom bg-cyan" style="red;right: 0px;">
					<text class="cuIcon-add text-white xl" style="font-size: 20px;" ></text>
				</view>
			</view>
		</view>
		<scroll-view id="fiexdview" scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="room.id==TabCur?'text-'+bgColor+' cur':''" v-for="(room,index) in rooms" :key="room.id" @tap="tabSelect" :data-id="room.id" :data-index="index" :index="index">
					{{room.name}}
				</view>
			</view>
		</scroll-view>
		<scroll-view id="datasview" :style="{height:scrollviewHeight+'px'}" @scrolltolower="pageToLower" scroll-y="true" class="page scroll-Y">
			<view class="cu-card article" v-for="(owner,index) in owners" :key="index" :id="owner.id" >
				<view class="cu-item shadow" @tap="openRecords"  :data-qrcode="owner.qrcode" :data-userid="owner.id">
					<view class="title"><view class="text-cut">{{owner.name}} ({{owner.cardid}})</view></view>
					<view class="content">
						<image :src="baseUrl+owner.qrcode" mode="aspectFit" style="width: 120px;height: 120px;"></image>
						<view class="desc">
							<view class="text-content">
								<view>上次外出时间:{{owner.lastouttime}} </view>
								<view>今日外出次数:
									<view :class="'bg-'+bgColor" class="cu-tag light sm round">{{owner.outcount}}次</view>
								</view>
								<view>今日外出时长:
									<view :class="'bg-'+bgColor" class="cu-tag light sm round">{{owner.outtime}}</view>
								</view>						
							</view>
							<view>
								<view :class="'bg-'+bgColor" class="cu-tag light sm round">{{owner.age}}岁</view>
								<view class="cu-tag bg-green light sm round">{{owner.sex}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadStatus"></uni-load-more>
		</scroll-view>
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
				TabCur: 0,
				scrollLeft: 0,
				owners:[],
				rooms:[],
				roomindex:0,
				currroomid:"",
				onevent:"updateroomowner",
				requestParams:{},
				"title":"",
				currpage:1,
				loadStatus: 'more',
				baseUrl:this.baseurl,
				pagesize:20,
				scrollviewHeight:400
			}
		},
		mounted() {
			var that=this;
			var selector=uni.createSelectorQuery().in(this);
			var datasview=selector.select("#fiexdview");
			datasview.boundingClientRect((data)=>{
				if(data){
					var adviewHeight=data.height;
					if(adviewHeight==0){
						adviewHeight=55;
					}
					that.scrollviewHeight=that.phoneHeight-adviewHeight-that.CustomBar;
				}
			}).exec();
		},
		onLoad(e) {
			var that=this;
			this.requestParams=e;
			this.title=this.requestParams.build+this.requestParams.unit+this.requestParams.storey;
			this.title=decodeURIComponent(this.title) 
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			let list = [{}];
			
			var params=this.$common.getParams();
			params.id=this.requestParams.storeyid;
			this.$api.rooms(params,function(data){
				if(data.success){
					that.rooms=data.data;
					that.currpage=1;
					if(that.rooms.length<that.pagesize){
						that.loadStatus="noMore";
					}
					that.owners=that.rooms[0].owners
					that.TabCur = that.rooms[0].id;
					that.scrollLeft = -60;
				}else{
					that.$common.errorToShow(data.message,function(){
						uni.navigateBack({
							
						})
					});
				}
			})
			
			/**
			 * 页面数据监听程序
			 * @param {Object} data
			 */
			uni.$on(this.onevent,function(data){
				var updatetype=data.updatetype;//login
				if(updatetype=="roomusers"){//登记完成后更新数据
					//自数据库中重新更新记录值
					this.initdatas();
				}
			}.bind(this))
			
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			pageToLower(e){
				console.log("this.loadStatus===="+this.loadStatus);
				if(this.loadStatus=="more"){
					this.currpage=this.currpage+1;
					this.initdatas(function(){
					},"up");
				}
			},
			initdatas(callback,listtype){//下啦刷新加房间下的所有用户
				var that=this;
				var params=this.$common.getParams();
				this.loadStatus = 'loading';
				params.currpage=this.currpage;
				params.pagesize=this.pagesize;
				params.id=this.TabCur;//房间标识
				
				this.$api.roomusers(params,function(result){
					if(result.success){
						if(listtype=="up")//上拉加载
							that.owners = [...that.owners, ...result.data];
						else
							that.owners=result.data;
						
						if (that.pagesize < result.data.length) {
							that.loadStatus = 'more'
							that.currpage ++
						} else {
							// 数据已加载完毕
							that.loadStatus = 'noMore'
						}
						console.log("that.loadStatus===="+that.loadStatus);
						if(callback){
							callback();
						} 
					}else{
						that.$common.errorToShow(result.message)
					}
					
				})
			},
			tabSelect(e) {
				this.roomindex = e.currentTarget.dataset.index;
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.index - 1) * 60;
				for(var i=0;i<this.rooms.length;i++){
					var room=this.rooms[i];
					if(this.TabCur==room.id){
						this.owners=room.owners;
					}
				}
			},
			addOwner(e){
				var params=new Object();
				params.floorindex=this.requestParams.floorindex;//
				params.roomindex=this.roomindex;//
				params.storeyid=this.requestParams.storeyid;//门派
				params.room_id=this.TabCur;
				params.onevent=this.onevent;//门派
				this.$common.navigateTo("../main/addOwner",params)
			},
			openRecords(e){
				var params=new Object();
				params.userid=e.currentTarget.dataset.userid;
				params.qrcode=e.currentTarget.dataset.qrcode;
				this.$common.navigateTo("./records",params)
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
.cu-card.article>.cu-item .title{
	line-height: 85rpx;
}
.cu-card.article>.cu-item .content .text-content {
	height: auto;
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
