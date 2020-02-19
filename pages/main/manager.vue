<template>
	<view>
		<cu-custom :isBack="true" bgColor="text-white" :bgColor="barColor">
			<block slot="backText">返回</block>
			<block slot="content">社区管理</block>
		</cu-custom>
		<swiper class="screen-swiper round-dot fixed" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500">
			<swiper-item v-for="(item,index) in ads" :key="index" @tap="openAds" :data-isurl="item.isurl" :data-url="item.url" :data-id="item.id">
				<image :src="item.titleImg" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<uni-notice-bar v-if="warnmsg!=''?true:false" :scrollable="true" :single="true" :text="warnmsg" />
		<view class="VerticalBox">
			<scroll-view id="datasview" :style="{height:scrollviewHeight+'px'}" class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" >
				<view class="cu-item" :class="index==tabCur?'text-'+bgColor:''" v-for="(item,index) in list" :key="index" @tap="TabSelect" :data-name="item.name"
				 :data-id="index">
					{{item.name}}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation :style="{height:scrollviewHeight+'px'}"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-top padding-lr" v-for="(item,index) in list" :key="index" :id="'main-'+index">
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<text class="cuIcon-title" :class="'text-'+bgColor"></text>{{item.name}}</view>
					</view>
					<view class="cu-list menu-avatar">
						<view class="menuitem bg-white" v-for="(unit,unitindex) in item.units" :key="unitindex" ><!--单元-->
							<view class="content">
								<view class="text-grey margin-xs">{{unit.name}}</view>
								<view class="grid col-4 padding-sm">
									<view class="margin-tb-sm text-center" v-for="(storey,storeyindex) in unit.layers"  :key="storeyindex"><!--楼层-->
										<button :data-floorindex="[index,unitindex,storeyindex]" :data-build="item.name" :data-unit="unit.name" :data-storeyid="storey.id" :data-storey="storey.name" @tap="openRooms" :class="'bg-'+bgColor" class="cu-btn round shadow sm margin-right-xs">{{storey.name}}</button>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	export default {
		components: {
			uniNoticeBar
		},
		data() {
			return {
				barColor:this.barColor,
				bgColor:this.bgColor,
				list: [],
				ads:[],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				build:"",
				warnmsg:"",
				scrollviewHeight:400
			};
		},
		mounted() {
			var that=this;
			var selector=uni.createSelectorQuery().in(this);
			var datasview=selector.select("#datasview");
			datasview.boundingClientRect((data)=>{
				if(data){
					var adviewHeight=data.top;
					that.scrollviewHeight=that.phoneHeight-adviewHeight;
				}
			}).exec();
			
			var params=new Object();
			params.id="10001";
			this.$api.article(params,function(data){
				if(data.success){
					that.warnmsg=data.data.content;
				}else{
					that.$common.errorToShow(data.message)
				}
				
			})
		},
		onLoad(e) {
			var that=this;
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			
			/**
			 * 初始化广告信息
			 */
			var adparams=new Object();
			adparams.type="社区管理";//type为广告类型，未指定获取全部
			this.$api.ADList(adparams,function(result){
				console.log("result===="+JSON.stringify(result));
				if(result.success){
					that.ads=result.data;
				}else{
					that.$common.errorToShow(result.message)
				}
			});
			
			
			let list = [{}];
			var that=this;
			var param=this.$common.getParams("floorlist");
			this.$api.floorlist({},function(data){
				var floorlist=data.data;
				for (let i = 0; i < floorlist.length; i++) {
					list[i] =floorlist[i];
					list[i].name = floorlist[i]["name"];
					list[i].id = i;
					list[i].scoreid = i;
				}
				that.list = list;
				that.build=that.list[0].name;
			})
			
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			openRooms(e){
				var params=new Object();
				params.build= e.currentTarget.dataset.build;
				params.unit = e.currentTarget.dataset.unit;
				params.storey = e.currentTarget.dataset.storey;
				params.storeyid = e.currentTarget.dataset.storeyid;
				params.floorindex= e.currentTarget.dataset.floorindex;
				this.$common.navigateTo("../main/rooms",params);
			},
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.scoreid - 1) * 50;
				this.build = e.currentTarget.dataset.name;
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				   return false  //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.list[i].scoreid);
						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].scoreid - 1) * 50
						this.tabCur = this.list[i].scoreid
						console.log(scrollTop)
						return false
					}
				}
			},
			openActicle(e){
				var articleid=e.currentTarget.dataset.id;
				var params=new Object();
				params.articleid=articleid;
				this.$common.navigateTo("../notice/article",params)
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
					this.$common.navigateTo("./notice/ads",params)
				}
			} 
		}
	}
</script>

<style>

	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}
	.cu-list.menu-avatar>.cu-item{
		height: 100px;
	}
	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}
	.cu-list.menu-avatar>.cu-item .content{
		width: 100%;
		left: 10px;
	}
	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}
	.menuitem{
		
	}
</style>
