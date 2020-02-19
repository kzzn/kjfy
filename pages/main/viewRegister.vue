<template>
	<view>
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="text-white" :bgColor="barColor">
				<block slot="backText">返回</block>
				<block slot="content">出入登记</block>
			</cu-custom>
		</view>
		<form>
			<view class="flex solid-bottom justify-between cu-form-group">
				<view class="padding-sm margin-xs radius">
					<text class='cuIcon-peoplefill ' :class="'text-'+bgColor" style="font-size: 30px;"></text>
					<text >{{recode.name}}</text>
				</view>
				<view class="padding-sm margin-xs radius">
					<text class='cuIcon-phone ' :class="'text-'+bgColor"  style="font-size: 30px;"></text>
					<text >{{recode.phone}}</text>
				</view>
			</view>
			<view class="flex solid-bottom align-center bg-white">
				<view class="margin-xs radius cuIcon-card " :class="'text-'+bgColor"  style="font-size: 30px;"></view>
				<view class="margin-xs radius">{{recode.cardid}}</view>
			</view>
			<view class="flex solid-bottom align-center bg-white">
				<view class="margin-xs radius cuIcon-locationfill" :class="'text-'+bgColor"  style="font-size: 30px;"></view>
				<view class="margin-xs radius">{{recode.address}}</view>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title"><text class='cuIcon-timefill' :class="'text-'+bgColor"></text>登记时间</view>
				<view class="margin-xs radius">{{recode.createDate}}</view>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class='cuIcon-titles text-xxl' :class="'text-'+bgColor"></text>登记体温</view>
				<view class="margin-xs radius">{{recode.temperature}}°C</view>
				
			</view>
			<view class="cu-form-group">
				<view class="title"><text class='cuIcon-titles text-xxl' :class="'text-'+bgColor"></text>出行方式</view>
				<view class="margin-xs radius">{{recode.triptype}}</view>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class='cuIcon-deliver_fill text-xxl' :class="'text-'+bgColor"></text>车牌号码</view>
				<view class="margin-xs radius">{{recode.car}}</view>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class='cuIcon-title text-xxl' :class="'text-'+bgColor"></text>登记类型</view>
				<view class="margin-xs radius">{{recode.state}}</view>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class='cuIcon-edit text-xxl' :class="'text-'+bgColor"></text>备注</view>
				<view class="margin-xs radius">{{recode.remarks}}</view>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barColor:this.barColor,
				bgColor:this.bgColor,
				recode:{},
			}
		},
		onLoad(e) {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			this.requestParams=e;
			
			let list = [{}];
			var that=this;
			var param=this.$common.getParams("recode");
			param.id=this.requestParams.recodeid;
			this.$api.viewRecode(param,function(data){
				console.log(JSON.stringify(data));
				if(data.success){
					that.recode=data.data;
				}else{
					that.$common.errorToShow(data.message)
				}
			})
			
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
