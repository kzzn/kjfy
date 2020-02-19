<template>
	<view>
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="text-white" :bgColor="barColor">
				<block slot="backText">返回</block>
				<block slot="content">添加家庭成员</block>
			</cu-custom>
		</view>
		<form>
			<view class="cu-form-group">
				<view class="title">姓名</view>
				<input placeholder="业主姓名" name="input" v-model="owner.name" :focus="namefocus"></input>
				<text class='cuIcon-peoplefill' :class="'text-'+bgColor"></text>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input placeholder="11位手机号码" name="input" v-model="owner.phone" :focus="phonefocus"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag ' :class="'text-'+bgColor">
						+86
					</view>
					<view class="cu-tag" :class="'line-'+bgColor">
						中国大陆
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">身份证号</view>
				<input placeholder="身份证号" name="input" v-model="owner.cardid" :focus="idcardfocus"></input>
				<text class='cuIcon-card' :class="'text-'+bgColor"></text>
			</view>


		</form>
		<view class="box">
			<view class="cu-bar tabbar bg-white shadow foot">
				<view class="submit" :class="'bg-'+bgColor" @tap="saveOwner()">保存</view>
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
				owner: {},
				multiArray: [[],[],	[]],
				rooms: [],
				roomsPicker: [],
				roomindex: "0",
				room_id: "",
				idcardfocus: false,
				phonefocus: false,
				namefocus: false,
				room_idfocus: false,
				addrfocus: false,
				floorlist: [],
				multiIndex: [0, 0, 0],
				layerid: "",
				requestParams: ""
			}
		},
		onLoad(e) {
			var that = this;
			this.requestParams = e;
			this.room_id=e.room_id;
		},
		methods: {
			discriCard() {
				var UUserCard=this.owner.cardid
				//获取出生日期 
				UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
				//获取性别 
				if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
					this.owner.sex="男";
					//是男则执行代码 ... 
				} else {
					this.owner.sex="那个";
					//是女则执行代码 ... 
				}
				//获取年龄 
				var myDate = new Date();
				var month = myDate.getMonth() + 1;
				var day = myDate.getDate();
				var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
				if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <=day) {
					age++;
				}
				this.owner.age=age;
				//年龄 age 
			},
			saveOwner(e) {
				var that = this;
				var isphone = this.$common.isPhoneNumber(this.owner.phone);
				var iscard = this.$common.isCardNumber(this.owner.cardid);
				if (!isphone) {
					this.$common.errorToShow("请输入正确的手机号码");
					this.phonefocus = true;
					return;
				}
				if (!iscard) {
					this.$common.errorToShow("请输入正确的身份证号");
					this.idcardfocus = true;
					return;
				}

				if (!this.$common.isBlack(this.owner.name)) {
					this.$common.errorToShow("姓名必须填写");
					this.idnamefocus = true;
					return;
				}
				if (!this.$common.isBlack(this.room_id)) {
					this.$common.errorToShow("门牌号必须选择");
					return;
				}
				this.discriCard();
				var ownerparam = this.$common.getParams("saveOwner", this.owner);
				ownerparam.roomId = this.room_id;
				console.log("ownerparam===============" + JSON.stringify(ownerparam));

				this.$common.modelShow("确认保存", "保存后将不可变更修改，您是否确定保存信息？", function() {
					that.$api.registerowner(ownerparam, function(result) {
						if (result.success) {
							that.$common.successToShow("保存成功", function() {
								if (that.requestParams.onevent && that.requestParams.onevent != "") {
									uni.$emit(that.requestParams.onevent, {
										updatetype: 'roomusers',
										params: {}
									}); //刷新父页面数据		
								}
								uni.navigateBack({}); //返回主页	

							})
						} else {
							that.$common.errorToShow(result.message, function() {

							});
						}
					})
				})

			}
		}
	}
</script>

<style>

</style>
