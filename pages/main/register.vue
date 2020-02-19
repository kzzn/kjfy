<template>
	<view>
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="text-white" :bgColor="barColor">
				<block slot="backText">返回</block>
				<block slot="content">门卫登记</block>
			</cu-custom>
		</view>
		<form>
			<view class="flex solid-bottom justify-between cu-form-group">
				<view class="padding-sm margin-xs radius">
					<text class='cuIcon-peoplefill ' :class="'text-'+bgColor" style="font-size: 30px;"></text>
					<text >{{owner.name}}</text>
				</view>
				<view class="padding-sm margin-xs radius">
					<text class='cuIcon-phone ' :class="'text-'+bgColor"  style="font-size: 30px;"></text>
					<text >{{owner.phone}}</text>
				</view>
			</view>
			<view class="flex solid-bottom align-center bg-white">
				<view class="margin-xs radius cuIcon-card " :class="'text-'+bgColor" style="font-size: 30px;"></view>
				<view class="margin-xs radius">{{owner.cardid}}</view>
			</view>
			<view class="flex solid-bottom align-center bg-white">
				<view class="margin-xs radius cuIcon-locationfill " :class="'text-'+bgColor" style="font-size: 30px;"></view>
				<view class="margin-xs radius">{{owner.address}}</view>
			</view>
			<view class="cu-form-group margin-top hide" style="display: none;">
				<view class="title"><text class='cuIcon-timefill' :class="'text-'+bgColor"></text>登记时间</view>
				<picker mode="time" :value="time" start="09:01" end="21:01" @change="TimeChange">
					<view class="picker">
						{{time}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title"><text class='cuIcon-titles text-xxl' :class="'text-'+bgColor"></text>当前体温</view>
				<input placeholder="当前体温" name="input" v-model="register.temperature"  :focus="temperaturefocus"></input>°C
			</view>
			<view class="cu-form-group">
				<view class="title"><text class='cuIcon-title text-xxl' :class="'text-'+bgColor"></text>出行方式</view>
				<radio-group  @change="outtypeChange">
					<radio class="radio orange" checked="true" value="步行" name="triptype">步行</radio>
					<radio  class="radio orange"  value="驾车" name="triptype">驾车</radio>
				</radio-group>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class='cuIcon-deliver_fill text-xxl' :class="'text-'+bgColor"></text>车牌号码</view>
				<input placeholder="驾车出行的请填写车牌号码" name="car" v-model="register.car"  :focus="carnofocus"></input>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class='cuIcon-edit text-xxl' :class="'text-'+bgColor"></text>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</view>
				<textarea maxlength="-1" v-model="register.remarks" placeholder="请在此输入备注信息"></textarea>
			</view>
		</form>
		<view class="box">
			<view class="cu-bar tabbar bg-white shadow foot">
				<view class="submit" @tap="saveRegister('出')">外出登记</view>
				<view class="submit" :class="'bg-'+bgColor" @tap="saveRegister('进')">进入登记</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barColor:this.barColor,
				bgColor:this.bgColor,
				owner:{},
				register:{},
				requestParams:{},
				time: '12:01',
				date: '2018-12-25',
				temperaturefocus:false,
				carnofocus:false,
				triptype:"步行",
			}
		},
		onLoad(e) {
			this.time=this.$common.dateFormat("HH:MM",new Date());
			this.date=this.$common.dateFormat("YYYY-mm-dd",new Date());
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			this.requestParams=e;
			let list = [{}];
			var that=this;
			var param=this.$common.getParams("getuserbyid");
			param.id=this.requestParams.ownerid;
			
			this.$api.getuserbyid(param,function(data){
				console.log(JSON.stringify(param)+"===="+JSON.stringify(data));
				if(data.success){
					that.owner=data.data;
				}else{
					that.$common.errorToShow(data.message,function(){
						uni.navigateBack({
							
						})
					});
				}
				
			})
			
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			TimeChange(e) {
				this.time = e.detail.value
			},
			outtypeChange(e){
				this.triptype=e.detail.value;
			},
			saveRegister(registetype){
				var that=this;
				var params=this.$common.getParams("saveRegister");
				params.pid=this.requestParams.ownerid;//业主标识
				params.temperature=this.register.temperature;//体温
				params.state=registetype;//外出 进入
				params.triptype=this.triptype;//出行方式
				params.car=this.register.car;//车牌号码
				params.remarks=this.register.remarks;//备注
				
				this.$api.register(params,function(result){
					console.log(JSON.stringify(params)+"===="+JSON.stringify(result));
					if(result.success){
						that.$common.successToShow("登记成功",function(){
							uni.$emit(that.requestParams.onevent,{updatetype:'updaterecode',params:result.data});//刷新父页面数据
							uni.navigateBack({});
						});
					}else{
						that.$common.errorToShow(result.message)
					}
				
				})
			}
		}
	}
</script>

<style>
.uni-radio-input-checked:after {
	position:fixed
}
</style>
