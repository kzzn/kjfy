<template>
	<view class="bg-white">
		<cu-custom bgColor="text-white" :bgColor="barColor" :isBack="true"><block slot="backText">返回</block><block slot="content">分享下载</block></cu-custom>
		<view class="box">
			<view class="bg-white">
				<view class="flex solid-bottom padding align-center  justify-center">
					<view class="margin-xs radius">
						<image src="../../static/logo.png" style="width: 100rpx;height: 100rpx;"></image>
					</view>
					<view class="padding-sm margin-xs radius text-bold text-xl">智慧物业</view>
				</view>
			</view>
			
			<view class="bg-shadeBottom" style="height:calc(100vh - 305upx)">
				<view class="flex " style="height: 50px;"></view>
				<view class="flex padding align-center justify-center bg-white " style="width: 60%;margin-left: 20%;">
					<image :src="downloadQR" style="height: 180px;"></image>
				</view>
				<view class="flex  align-center  justify-center">
					<view class="padding-sm margin-xs radius text-xl">打开手机扫描二维码下载业主客户端</view>
				</view>
				<view class="flex  align-center  justify-center">
					<view class="padding-sm margin-xs radius text-sm">客服电话:0471-3328256</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barColor:this.barColor,
				downloadQR:this.downloadQR
			}
		},
		onLoad() {
			var that=this;
			this.$api.appUpdate({},function(result){
				if(result.success){
					var vdata=result.data;
					var newversiondb=vdata.version;//当前版本号如1.1.0
					var downloadurl=vdata.url;//apk下载地址 http://ip:port/xx.apk
					that.downloadQR=that.baseurl+vdata.qrcode;//apk下载二维码 http://ip:port/xx.jpg
				}else{
					that.$common.errorToShow(result.message)
				}
				
			})
		},
		methods: {
			
		}
	}
</script>
<style>

</style>
