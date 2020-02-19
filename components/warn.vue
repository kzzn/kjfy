<template name="warnpage">
	<view>
		<cu-custom  bgColor="text-white" :bgColor="barColor" :isBack="false">
			<block slot="content">慧生活流控管家</block>
		</cu-custom>
		<swiper class="screen-swiper round-dot fixed" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500">
			<swiper-item v-for="(item,index) in ads" :key="index" @tap="openAds" :data-id="item.id" :data-isurl="item.isurl" :data-url="item.url">
				<image :src="item.titleImg" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<scroll-view id="datasview" :style="{height:scrollviewHeight+'px'}" scroll-y="true" class="page scroll-Y">
		
			<view class="cu-card dynamic" style="margin-bottom: 45px;">
				<view class="cu-item shadow">
					<view class="cu-bar bg-white solid-bottom">
						<view class="action">
							<text class="cuIcon-title text-orange "></text> 体温预警
						</view>
					</view>
					<view class="text-content solids-top">
						<view class="flex padding-top justify-between">
							<view class="radius">
								<view class="flex  align-center">
									<view class="radius">
										<view class="cu-avatar round lg bg-red" >高</view>
									</view>
									<view class="padding-sm margin-xs radius">{{warndata.moretemperature}}人</view>
								</view>
								
							</view>
							<view class="radius">
								<view class="flex  align-center">
									<view class="radius">
										<view class="cu-avatar round lg bg-blue" >低</view>
									</view>
									<view class="padding-sm margin-xs radius">{{warndata.littletemperature}}人</view>
								</view>
								
							</view>
						</view>
					</view>
				</view>
				
				<view class="cu-item shadow">
					<view class="cu-bar bg-white solid-bottom">
						<view class="action">
							<text class="cuIcon-title text-orange "></text> 居住预警
						</view>
					</view>
					<view class="text-content solids-top">
						<view class="flex padding-top justify-between">
							<view class="radius">
								<view class="flex  align-center">
									<view class="radius">
										<view class="cu-avatar round lg bg-red" >返</view>
									</view>
									<view class="padding-sm margin-xs radius">{{warndata.epidemicfrom}}人</view>
								</view>
							</view>
							<view class="radius">
								<view class="flex  align-center">
									<view class="radius">
										<view class="cu-avatar round lg bg-blue" >往</view>
									</view>
									<view class="padding-sm margin-xs radius">{{warndata.epidemicfromto}}人</view>
								</view>
								
							</view>
						</view>
					</view>
				</view>
				
				
				<view class="cu-item shadow">
					<view class="cu-bar bg-white solid-bottom">
						<view class="action">
							<text class="cuIcon-title text-orange "></text> 出入超限
						</view>
					</view>
					<view class="text-content solids-top">
						<view class="flex padding-top justify-between">
							<view class="radius">
								<view class="flex  align-center">
									<view class="radius">
										<view class="cu-avatar round lg bg-red" >多</view>
									</view>
									<view class="padding-sm margin-xs radius">{{warndata.moreout}}人（出入5次/日）</view>
								</view>
								
							</view>
							<view class="radius">
								<view class="flex  align-center">
									<view class="radius">
										<view class="cu-avatar round lg bg-blue" >少</view>
									</view>
									<view class="padding-sm margin-xs radius">{{warndata.littleout}}人（3天以上未出行）</view>
								</view>
								
							</view>
						</view>
					</view>
				</view>
				
				<view class="cu-item shadow">
					<view class="cu-bar bg-white solid-bottom">
						<view class="action">
							<text class="cuIcon-title text-orange "></text> 来访超限
						</view>
					</view>
					<view class="text-content solids-top">
						<view class="flex padding-top justify-between">
							<view class="radius">
								<view class="flex  align-center">
									<view class="radius">
										<view class="cu-avatar round lg bg-red" >多</view>
									</view>
									<view class="padding-sm margin-xs radius">{{warndata.morevistor}}户多于3访客/每日</view>
								</view>
								
							</view>
							<view class="radius">
								<view class="flex  align-center">
									<view class="radius">
										<view class="cu-avatar round lg bg-blue" >少</view>
									</view>
									<view class="padding-sm margin-xs radius">{{warndata.littlevistor}}户3天内没有访客</view>
								</view>
								
							</view>
						</view>
					</view>
				</view>
				
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
				onevent:"warnindex",
				ads:"",
				warndata:{},
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
				that.scrollviewHeight=that.phoneHeight-adviewHeight-that.StatusBar;
			}).exec();
			
			/**
			 * 初始化广告信息
			 */
			var adparams=new Object();
			adparams.type="公告位置";//type为广告类型，未指定获取全部
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
					that.warndata={};//滞空list
					console.log("======");
					this.initdatas(function(){
						console.log("======加载数据完成");
						uni.stopPullDownRefresh();
					});
				}
			}.bind(this))
		},
		methods: {
			initdatas(callback,listtype){
				var that=this;
				var params=this.$common.getParams();
				this.loadStatus = 'loading'
				this.$api.warndatas(params,function(result){
					console.log("======"+JSON.stringify(result));
					if(result.success){
						that.warndata=result.data;
					}else{
						that.$common.errorToShow(result.message)
					}
					if(callback){
						callback();
					} 
					
				})
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

</style>
