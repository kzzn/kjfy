<template name="mainpage">
	<view>
		<cu-custom  bgColor="text-white" :bgColor="barColor" :isBack="false">
			<block slot="content">慧生活流控管家</block>
		</cu-custom>
		<swiper id="adview" class="screen-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500">
			
				<swiper-item v-for="(item,index) in ads" :key="index" >
					<image :src="item.titleImg" mode="aspectFill" @tap="openAds()" :data-isurl="item.isurl" :data-url="item.url" :data-id="item.id"></image>
				</swiper-item>
			
		</swiper>
		<view class=" cu-list grid col-3 no-border" v-if="webUser.rolename=='物业'?true:false">
			<view class="cu-item  " @tap="addOwner()">
				<view class="cu-avatar xl cu-avatar-btn round shadow" :class="'bg-'+bgColor">添加业主</view>
			</view>
			<view class="cu-item " @tap="manager()">
				<view class="cu-avatar xl cu-avatar-btn round shadow" :class="'bg-'+bgColor">小区管理</view>
			</view>
			<view class="cu-item " @tap="location()">
				<view class="cu-avatar xl cu-avatar-btn round shadow" :class="'bg-'+bgColor">签到</view>
			</view>
		</view>
		<view >
			<view  v-if="webUser.rolename=='物业'?true:false" class="fab-box fab rightBottom" @tap="registerCode()">
				<view class="fab-circle bottom " :class="'bg-'+bgColor" style="right: 0px;">
					<text class="cuIcon-scan text-white xl" style="font-size: 20px;" ></text>
				</view>
			</view>
			<view  v-if="webUser.rolename=='业主'?true:false" class="fab-box fab rightBottom" @tap="addFamily()">
				<view class="fab-circle bottom" :class="'bg-'+bgColor" style="right: 0px;">
					<text class="cuIcon-add text-white xl" style="font-size: 20px;" ></text>
				</view>
			</view>
		</view>
		
		<view id="titleview" class="cu-bar bg-white solid-bottom margin-top">
			<view class="action"  v-if="webUser.rolename=='业主'?true:false">
				<text class="cuIcon-friendfamous text-orange "></text> 
				家庭成员
			</view>
			<view class="action"  v-if="webUser.rolename=='物业'?true:false" >
				<text class="cuIcon-title text-orange "></text> 
				出入记录
			</view>
		</view>
		<scroll-view  v-if="webUser.rolename=='业主'?true:false" id="datasview" :style="{height:scrollviewHeight+'px'}" @scrolltolower="pageToLower" scroll-y="true" class="page scroll-Y">
			<view class="cu-card article" v-for="(owner,index) in owners" :key="index" :id="owner.id" >
				<view class="cu-item shadow" @tap="openRecords"  :data-qrcode="owner.qrcode" :data-userid="owner.id">
					<view class="title"><view class="text-cut">{{owner.name}} ({{owner.cardid}})</view></view>
					<view class="content">
						<image :src="baseUrl+owner.qrcode" mode="aspectFit" style="width: 100px;height: 100px;"></image>
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
		
		<!--@scroll="scorllFn"-->
		<scroll-view  v-if="webUser.rolename=='物业'?true:false" id="datasview" :style="{height:scrollviewHeight+'px'}" scroll-y="true" class="page scroll-Y" @scrolltolower="pageToLower"  >
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
					<view class="">
						<view class="text-grey text-xs">{{item.createDate}}</view>
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
	components: {
		uniFab
	},
	data() {
		return {
			barColor:this.barColor,
			bgColor:this.bgColor,
			recods:[],
			owners:[],
			ads:[],
			modalName: null,
			gridCol: 3,
			gridBorder: false,
			menuBorder: false,
			menuArrow: false,
			menuCard: false,
			skin: false,
			listTouchStart: 0,
			listTouchDirection: null,
			onevent:"mainindex",
			loadStatus: 'more',
			currpage:1,
			pagesize:20,
			initpagedata:false,
			scrollviewHeight:0,
			scrollTop: 5 ,// 设定触发条件的距离
			timer: null, // 保存定时器
			webUser:this.$webUser(),
			baseUrl:this.baseurl,
		};
	},
	onLaunch(){
	},
	mounted() {
		//console.log("=webuser==="+JSON.stringify(this.webUser))
		var that=this;
		if(this.webUser!=null){
			var selector=uni.createSelectorQuery().in(this);
			var datasview=selector.select("#datasview");
			datasview.boundingClientRect((data)=>{
				if(data!=null){
					var adviewHeight=data.top;
					// #ifndef MP-ALIPAY
					if(that.StatusBar<50)that.StatusBar=50;
					// #endif
					// #ifdef MP-ALIPAY
					//that.StatusBar=0;
					// #endif
					that.scrollviewHeight=that.phoneHeight-adviewHeight-that.StatusBar;
				}
			}).exec();
		}
		
		this.initpagedata=true;
		
		/**
		 * 初始化广告信息
		 */
		var adparams=new Object();
		adparams.type="首页广告";//type为广告类型，未指定获取全部
		this.$api.ADList(adparams,function(result){
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
			if(updatetype=="updaterecode"){//登记完成后更新数据
				//自数据库中重新更新记录值
				this.initdatas();
			}else if(updatetype=="pulldown"){//下拉刷新
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
			} else if(updatetype=="roomusers"){//上啦加载
				this.currpage=1;
				this.viewlist=[];//滞空list
				this.initdatas(function(){
					uni.stopPullDownRefresh();
				});
			} 
			
		}.bind(this))
	},
	methods: {
		pageToLower(e){//到底部执行上拉加载
			if(this.loadStatus=="more"){
				this.currpage=this.currpage+1;
				this.initdatas(function(){
				},"up");
			}
			
		},
		openRecod(e){
			var recodeid=e.currentTarget.dataset.id;
			var params=new Object();
			params.recodeid=recodeid;
			this.$common.navigateTo("./main/viewRegister",params)
		},
		initfamily(callback,listtype){////业主查看家庭成员
			var that=this;
			var params=this.$common.getParams();
			this.loadStatus = 'loading';
			params.currpage=this.currpage;
			params.pagesize=this.pagesize;
			params.id=this.webUser.roomid;//房间标识
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
		initdatas(callback,listtype){//物业查看登记记录
			if(this.webUser.rolename=="业主"){
				this.initfamily(callback,listtype);
				return;
			}
			
			var that=this;
			var params=this.$common.getParams();
			this.loadStatus = 'loading';
			params.currpage=this.currpage;
			params.pagesize=this.pagesize;
			params.id="";
			params.type="";//type为时间范围，1本日，2本周，3本月，4本季度（未指定未本日
						
			this.$api.recods(params,function(result){
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
		},
		showModal(e) {
			this.modalName = e.currentTarget.dataset.target
		},
		hideModal(e) {
			this.modalName = null
		},
		shareApp(e){
			var param=new Object();
			param.onevent=this.onevent;
			this.$common.navigateTo("./main/shareApp",param)
		},
		addOwner(e){
			var param=new Object();
			param.onevent=this.onevent;
			this.$common.navigateTo("./main/addOwner",param)
		},
		addFamily(e){
			var param=new Object();
			param.onevent=this.onevent;
			param.room_id=this.webUser.roomId;
			this.$common.navigateTo("./main/addFamily",param)
		},
		manager(e){
			var param=new Object();
			param.onevent=this.onevent;
			this.$common.navigateTo("./main/manager",param)
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
					var ownerid=res.result
					var param=new Object();
					param.onevent=that.onevent;
					param.ownerid=ownerid;
					that.$common.navigateTo("./main/register",param);
			    },
				fail:function(res){
					//that.$common.errorToShow(res.errMsg)
				}
			}); 
		},
		openActicle(e){
			var articleid=e.currentTarget.dataset.id;
			var params=new Object();
			params.articleid=articleid;
			this.$common.navigateTo("./notice/article",params)
		},
		openAds(e){
			console.log("openAds=======================")
			var isurl=e.currentTarget.dataset.isurl;
			var url=e.currentTarget.dataset.url;
			var params=new Object();
			
			console.log(isurl);
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
		},
		openRecords(e){
			var params=new Object();
			params.userid=e.currentTarget.dataset.userid;
			params.qrcode=e.currentTarget.dataset.qrcode;
			this.$common.navigateTo("/pages/main/records",params)
		},
		postAffair(e){//诉求申报
			this.$common.navigateTo("/pages/main/addAffair",{})
		},
		location(e){
			var that=this;
			this.$common.loadToShow();
			
			
			var locationParam=new Object();
			// #ifndef MP-ALIPAY
				locationParam.type="gcj02";
			//#endif
			locationParam.success=function (res) {
				that.$common.loadToHide();
				if(res){
					const latitude = res.latitude;
					const longitude = res.longitude;
					that.$common.errorToShow("请确认地址正确后点击返回键！",function(){
						uni.openLocation({
							latitude: latitude,
							longitude: longitude,
							name:"慧生活",
							address:"考勤登记",
							success: function () {
								
							}
						});
						
						console.log("打开地图成功");
						that.$common.modelShow("签到签退","已获取当前位置，是否确认签到签退？",function(){
							var params=that.$common.getParams("location");
							params.longitude=res.longitude;
							params.latitude=res.latitude;
							params.address=res.address;
							that.$api.location(params,function(res){
								if(res.success){
									that.$common.successToShow("执行签到成功");
								}else{
									that.$common.errorToShow(res.message);
								}
							})
						}) 
					})
					
				}
			}
			locationParam.fail=function(res){
				that.$common.errorToShow("定位失败"+JSON.stringify(res))
			}
			uni.getLocation(locationParam);
		}
	}
}
</script>

<style>
	
	.cu-avatar.xl{
		font-size: 12px;
		margin-left: 25%;
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