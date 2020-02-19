<template name="noticepage">
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
		<scroll-view id="datasview" :style="{height:scrollviewHeight+'px'}" scroll-y class="page" >
			<view class="cu-card dynamic no-card article" v-for="(article,index) in articles" :key="index" :id="article.id" @tap="openActicle" :data-id="article.id" >
				<view class="cu-item shadow">
					<view class="title"><view class="text-cut">{{article.title}} </view></view>
					<view class="content">
						<image  :src="article.titleImg==''?defaultimg:article.titleImg" mode="aspectFill" ></image>
						<view class="desc">
							<view class="text-content" v-html="article.content"></view>
							<view>
								<view :class="'bg-'+bgColor" class="cu-tag light sm round">{{article.createDate}} 发布</view>
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
	import parseHtml from "@/config/parseHTML.js"
	export default {
		data() {
			return {
				barColor:this.barColor,
				bgColor:this.bgColor,
				articles:[],
				ads:[],
				loadStatus:"more",
				defaultimg:this.defaultimg,
				onevent:"noticeindex",
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
				// #ifndef MP-ALIPAY
				if(that.StatusBar<50)that.StatusBar=50;
				// #endif
				// #ifdef MP-ALIPAY
				that.StatusBar=0;
				// #endif
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
					this.currpage=1;
					this.viewlist=[];//滞空list
					this.initdatas(function(){
						uni.stopPullDownRefresh();
					});
				}else if(updatetype=="pullup"){//上啦加载
					this.currpage=this.currpage+1;
					this.initdatas(function(){
					
					},"up");
					console.log("已加载到底部")
				} 
			}.bind(this))
		},
		methods: {
			initdatas(callback,listtype){
				var that=this;
				var params=this.$common.getParams();
				params.currpage=this.currpage;
				params.pagesize=this.pagesize;
				params.type="";//请求内容{type:''},type为公告类型，未指定获取全部 小区公告、活动公告
				this.loadStatus = 'loading'
				this.$api.articles(params,function(result){
					
					var articles=result.data;
					
					//#ifdef MP-ALIPAY
						for(var i=0;i<articles.length;i++){
							var article=articles[i];
							var content=article.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
							let newArr = [];
							let arr = parseHtml(content);
							arr.forEach((item, index) => {
								newArr.push(item)
							})
							article.content = newArr;
						}
						
					//#endif
					
					
					if(listtype=="up")//上拉加载
						that.articles = [...that.articles, ...articles];
					else
						that.articles=articles;
					if (that.pagesize < articles.length) {
						that.loadStatus = 'more'
						that.currpage ++
					} else {
						// 数据已加载完毕
						that.loadStatus = 'noMore'
					}
					if(callback){
						callback();
					} 
				})
			},
			openActicle(e){
				var articleid=e.currentTarget.dataset.id;
				var params=new Object();
				params.articleid=articleid;
				this.$common.navigateTo("./notice/article",params)
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
.cu-card.article>.cu-item .content>uni-image{
	width: 65px;
	height: 65px;
}
.cu-card.article > .cu-item .content > image{
	width: 65px;
	height: 65px;
}

.cu-card.article>.cu-item .content .text-content{
	height: 65px;
}
</style>
