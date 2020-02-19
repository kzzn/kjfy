<template>
	<view>
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="text-white" :bgColor="barColor">
				<block slot="backText">返回</block>
				<block slot="content">添加业主</block>
			</cu-custom>
		</view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">住址</view>
				<picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray">
					<view class="picker">
						{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}
					</view>
				</picker>
				<text class='cuIcon-locationfill ' :class="'text-'+bgColor"></text>
			</view>
			<view class="cu-form-group">
				<view class="title">门牌</view>
				<picker @change="RomeChange" :value="roomindex" :range="roomsPicker" :range-key="name">
					<view class="picker">
						{{roomindex>-1?roomsPicker[roomindex]:'居住房屋门牌号'}}
					</view>
				</picker>
				<text class='cuIcon-newsfill' :class="'text-'+bgColor"></text>
			</view>
			<view class="cu-form-group">
				<view class="title">姓名</view>
				<input placeholder="业主姓名" name="input" v-model="owner.name" :focus="namefocus"></input>
				<text class='cuIcon-peoplefill' :class="'text-'+bgColor"></text>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input placeholder="11位手机号码" name="input" v-model="owner.phone" :focus="phonefocus"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag' :class="'text-'+bgColor">
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
				multiArray: [
					[],
					[],
					[]
				],
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
			this.$api.floorlist({}, function(result) {
				var datas = result.data;
				that.floorlist = datas;
				var rtnArray = new Array();
				var buildArray = new Array(); //楼栋
				var unitArray = new Array(); //单元
				var layerArray = new Array(); //楼层

				var initstoreyid = that.requestParams.storeyid;

				buildArray = that.entryArray(datas); //楼栋


				if (initstoreyid && initstoreyid != null) {
					//根据楼层门牌添加业主
					that.multiIndex = that.requestParams.floorindex.split(",");
					var initbuild = that.floorlist[that.multiIndex[0]];
					var initunit = initbuild.units[that.multiIndex[1]];
					//var initlayer=initunit.layers[that.multiIndex[2]];
					console.log("initunit=====" + JSON.stringify(initunit));
					unitArray = that.entryArray(initbuild.units); //单元
					console.log("unitArray=====" + JSON.stringify(unitArray));
					layerArray = that.entryArray(initunit.layers); //楼层

				} else {
					unitArray = that.entryArray(datas[0].units); //单元
					layerArray = that.entryArray(datas[0].units[0].layers); //楼层
				}

				//this.layerid=datas[0].units[0].layers[0].id;在获取房间逻辑中初始化
				rtnArray.push(buildArray);
				rtnArray.push(unitArray);
				rtnArray.push(layerArray);
				that.multiArray = rtnArray;

				console.log(JSON.stringify(that.multiArray));
				//获取房间信息
				var p = new Object();
				p.detail = new Object()
				p.detail['value'] = that.multiIndex;
				that.MultiChange(p);

			})

		},
		methods: {
			entryArray(list) {
				var rtnArray = new Array();
				for (var u = 0; u < list.length; u++) {
					var entry = list[u];
					rtnArray.push(entry.name);
				}
				return rtnArray;
			},
			RomeChange(e) { //单选确认
				this.roomindex = e.detail.value;
				this.room_id = this.rooms[e.detail.value].id
				console.log(this.room_id + "======room_id");
			},
			MultiChange(e) { //多选确认
				let that = this;
				this.multiIndex = e.detail.value;
				this.layerid = this.floorlist[this.multiIndex[0]].units[this.multiIndex[1]].layers[this.multiIndex[2]].id;
				this.$api.rooms({
					"id": this.layerid
				}, function(result) {
					if (result.success) {
						that.rooms = result.data;
						var pickers = that.entryArray(result.data);
						that.roomsPicker = pickers;

						var initroomid = that.requestParams.room_id;
						if (initroomid && initroomid != null) { //根据房间号添加业主
							that.room_id = initroomid
							that.roomindex = that.requestParams.roomindex;
						} else {
							that.room_id = that.rooms[0].id;
						}
					} else {
						that.$common.errorToShow("获取楼层房间失败==" + result.message)
					}
				})
			},
			MultiColumnChange(e) { //选择过程中列变化+
				console.log("变化前====" + JSON.stringify(this.multiArray))
				var data = {
					dataArray: [],
					dataIndex: this.multiIndex
				};
				data.dataIndex[e.detail.column] = e.detail.value;
				switch (e.detail.column) {
					case 0:
						data.dataArray[0] = this.multiArray[0];
						data.dataArray[1] = this.entryArray(this.floorlist[data.dataIndex[0]].units);
						data.dataArray[2] = this.entryArray(this.floorlist[data.dataIndex[0]].units[0].layers);
						data.dataIndex[1] = 0;
						data.dataIndex[2] = 0;
						break;
					case 1:
						data.dataArray[0] = this.multiArray[0];
						data.dataArray[1] = this.multiArray[1];
						var layers = this.floorlist[data.dataIndex[0]].units[data.dataIndex[1]].layers
						data.dataArray[2] = this.entryArray(layers);
						data.dataIndex[2] = 0;
						break;
					default:
						data.dataArray = this.multiArray;
						break;
				}
				this.multiArray = data.dataArray;
				this.multiIndex = data.dataIndex;
				console.log("变化后====" + JSON.stringify(this.multiArray))
			},
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
				
				if (!isphone) {
					this.$common.errorToShow("请输入正确的手机号码");
					this.phonefocus = true;
					return;
				}
				var iscard = this.$common.isCardNumber(this.owner.cardid);
				if (!iscard) {
					this.$common.errorToShow("请输入正确的身份证号");
					this.idcardfocus = true;
					return;
				}else{
					this.discriCard();
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
				if (!this.$common.isBlack(this.layerid)) {
					this.$common.errorToShow("住址必须选择");
					return;
				}
				
				var ownerparam = this.$common.getParams("saveOwner", this.owner);
				ownerparam.roomId = this.room_id;
				console.log("ownerparam===============" + JSON.stringify(ownerparam));

				this.$common.modelShow("确认保存", "您是否确定保存业主信息？", function() {
					that.$api.saveOwner(ownerparam, function(result) {
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
