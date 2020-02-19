<template >
	<view>
		<cu-custom :isBack="true" bgColor="text-white" :bgColor="barColor">
			<block slot="backText">返回</block>
			<block slot="content">注册{{requestParams.registertype}}</block>
		</cu-custom>
		<form style="margin-bottom: 85px;">
			<view class="cu-form-group" v-if="scantype==''?true:false">
				<view class="title">区划</view>
				<!-- #ifndef MP-ALIPAY -->
				<picker mode="multiSelector" @change="AreaChange" @columnchange="AreaColumnChange" :value="areaIndex" :range="areaArray">
					<view class="picker">
						{{areaArray[0][areaIndex[0]]}}，{{areaArray[1][areaIndex[1]]}}，{{areaArray[2][areaIndex[2]]}}
					</view>
				</picker>
				<!-- #endif -->
				<!-- #ifdef MP-ALIPAY -->
				<picker @change="provinceChange" :value="provinceIndex" :range="areaArray[0]">
					<view class="uni-input">{{areaArray[0][provinceIndex]}}</view>
				</picker>
				<picker @change="cityChange" :value="cityIndex" :range="areaArray[1]">
					<view class="uni-input">{{areaArray[1][cityIndex]}}</view>
				</picker>
				<picker @change="countyChange" :value="countyIndex" :range="areaArray[2]">
					<view class="uni-input">{{areaArray[2][countyIndex]}}</view>
				</picker>
				<!-- #endif -->
				<text class='cuIcon-locationfill' :class="'text-'+bgColor"></text>
			</view>
			<view class="cu-form-group" v-if="scantype==''?true:false">
				<view class="title">街道</view>
				<picker @change="streetChange" :value="streetindex" :range="streetPicker" :range-key="name">
					<view class="picker">
						{{streetindex>-1?streetPicker[streetindex]:'请选择社区'}}
					</view>
				</picker>
				<text class='cuIcon-locationfill' :class="'text-'+bgColor"></text>
			</view>
			
			<view class="cu-form-group" v-if="scantype==''?true:false">
				<view class="title">社区</view>
				<picker @change="communityChange" :value="communityindex" :range="communityPicker" :range-key="name">
					<view class="picker">
						{{communityindex>-1?communityPicker[communityindex]:'请选择社区'}}
					</view>
				</picker>
				<text class='cuIcon-locationfill' :class="'text-'+bgColor"></text>
			</view>
			
			<view class="cu-form-group" v-if="(requestParams.registertype=='业主'&&scantype=='')?true:false">
				<view class="title">小区</view>
				<picker @change="villageChange" :value="villageindex" :range="villagePicker" :range-key="name">
					<view class="picker">
						{{villageindex>-1?villagePicker[villageindex]:'请选择社区'}}
					</view>
				</picker>
				<text class='cuIcon-locationfill' :class="'text-'+bgColor"></text>
			</view>
			
			<view class="cu-form-group" v-if="requestParams.registertype=='业主'?true:false">
				<view class="title">楼层</view>
				<!-- #ifndef MP-ALIPAY -->
				<picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray">
					<view class="picker">
						{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}
					</view>
				</picker>
				<!-- #endif -->
				<!-- #ifdef MP-ALIPAY -->
				<picker @change="floorChange" :value="floorIndex" :range="multiArray[0]">
					<view class="uni-input">{{multiArray[0][floorIndex]}}</view>
				</picker>
				<picker @change="unitsChange" :value="unitsIndex" :range="multiArray[1]">
					<view class="uni-input">{{multiArray[1][unitsIndex]}}</view>
				</picker>
				<picker @change="layersChange" :value="layersIndex" :range="multiArray[2]">
					<view class="uni-input">{{multiArray[2][layersIndex]}}</view>
				</picker>
				<!-- #endif -->
				<text class='cuIcon-locationfill' :class="'text-'+bgColor"></text>
			</view>
			
			<view class="cu-form-group" v-if="requestParams.registertype=='业主'?true:false">
				<view class="title">门牌</view>
				<picker @change="RomeChange" :value="roomindex" :range="roomsPicker" :range-key="name">
					<view class="picker">
						{{roomindex>-1?roomsPicker[roomindex]:'居住房屋门牌号'}}
					</view>
				</picker>
				<text class='cuIcon-newsfill' :class="'text-'+bgColor"></text>
			</view>
			<view class="cu-form-group">
				<view class="title"  v-if="requestParams.registertype=='物业'?true:false">小区名字</view>
				<view class="title"  v-if="requestParams.registertype=='业主'?true:false">您的姓名</view>
				<input placeholder="请在此输入名字" name="input" v-model="entry.name" :focus="namefocus"></input>
				<text class='cuIcon-peoplefill' :class="'text-'+bgColor"></text>
			</view>
			<view class="cu-form-group">
				<view class="title">联系电话</view>
				<input placeholder="11位手机号码" :placeholder="requestParams.registertype=='物业'?'位手机号码':'手机号码作为登录账号'" name="input" v-model="entry.phone" :focus="phonefocus"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag' :class="'text-'+bgColor">
						+86
					</view>
					<view class="cu-tag" :class="'line-'+bgColor">
						中国大陆
					</view>
				</view>
			</view>
			<view class="cu-form-group" v-if="requestParams.registertype=='业主'?true:false">
				<view class="title">身份证号</view>
				<input placeholder="用于检测账号的唯一性" name="cardid" v-model="entry.cardid"></input>
				<text class='cuIcon-new text-xxl' :class="'text-'+bgColor"></text>
			</view>
			<view class="cu-form-group" v-if="requestParams.registertype=='业主'?true:false">
				<view class="title">登录密码默认手机号后6位</view>
			</view>
			<view class="cu-form-group" v-if="requestParams.registertype=='物业'?true:false"> 
				<view class="title"><text class='cuIcon-new text-xxl' :class="'text-'+bgColor"></text>登录账号</view>
				<input placeholder="请输入唯一登录账号,字母加数字" name="loginName" v-model="entry.loginName"></input>
			</view>
			<view class="cu-form-group" v-if="requestParams.registertype=='物业'?true:false">
				<view class="title"><text class='cuIcon-new text-xxl' :class="'text-'+bgColor"></text>登录密码</view>
				<input password="true"  placeholder="输入您的登录密码" name="password" v-model="entry.password"></input>
			</view>
			<view class="cu-form-group" v-if="requestParams.registertype=='物业'?true:false">
				<view class="title"><text class='cuIcon-sound text-xxl' :class="'text-'+bgColor"></text>确认密码</view>
				<input password="true" placeholder="确认密码" name="surepassword" v-model="entry.surepassword"></input>
			</view>
			
			<!-- <view class="cu-form-group" v-if="requestParams.registertype=='物业'?true:false">
				<view class="cuIcon-warn" v-html="warnmsg"></view>
			</view> -->
			
			<view id="titleview" class="cu-bar bg-white solid-bottom margin-top"  v-if="requestParams.registertype=='物业'?true:false">
				<view class="action" >
					<text class="cuIcon-global text-orange "></text> 
					建筑信息
				</view>
			</view>
			<view class="cu-form-group" v-if="requestParams.registertype=='物业'?true:false">
				<view class="title">建筑数</view>
				<input placeholder="小区总计楼栋数,整数型数字" name="floor" v-model="entry.floor"></input>
			</view>
			<view class="cu-form-group" v-if="requestParams.registertype=='物业'?true:false">
				<view class="title">单元数</view>
				<input placeholder="每栋楼的最多单元数,整数型数字" v-model="entry.unit"></input>
			</view>
			<view class="cu-form-group" v-if="requestParams.registertype=='物业'?true:false">
				<view class="title">楼层数</view>
				<input placeholder="每个单元的最高楼层,整数型数字" v-model="entry.layer"></input>
			</view>
			<view class="cu-form-group" style="margin-bottom: 50px;" v-if="requestParams.registertype=='物业'?true:false">
				<view class="title">户数</view>
				<input placeholder="每层户数,整数型数字"  v-model="entry.room"></input>
			</view>
		</form> 
		<view class="box">
			<view class="cu-bar tabbar bg-white shadow foot">
				<view class="submit" :class="'bg-'+bgColor" @tap="register">确认注册</view>
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
				requestParams:{},
				areaArray:[['省'],['市'],['区']],
				areaIndex:[0,0,0],
				communitys:[],
				communityPicker:["请先选择街道"],
				communityid:"",
				communityindex:0,
				streets:[],
				streetPicker:["请先选择区划"],
				streetid:"",
				streetindex:0,
				villages:[],
				villagePicker:["请先选择社区"],
				villageid:"",
				villageindex:0,
				floorlist: [],
				multiArray: [['楼号'],['楼层'],['单元']],
				multiIndex: [0, 0, 0],
				rooms: [],
				roomsPicker:["请选择房间"],
				room_id: "",
				roomindex:0,
				entry:{},
				warnmsg:"",
				adcodeid:"",
				scantype:"",
				areas:{},
				provinceIndex:0,
				cityIndex:0,
				countyIndex:0,
				floorIndex:0,
				unitsIndex:0,
				layersIndex:0,
				
			}
		},
		onLoad(e) {
			var that=this;
			var codecontent=e.codecontent
			if(codecontent&&codecontent!=null){
				e.codecontent=decodeURIComponent(e.codecontent);
				var result =e.codecontent.split("\_");
				if(result.length==2){
					var type=result[1];
					
					this.scantype=type;
					if(type=="物业"){
						this.villageid=result[0];
						this.villageChange();
						e.registertype="业主";
					}else if(type=="社区"){
						this.communityid=result[0];
						this.communityChange();
						e.registertype="物业";
					}
					this.requestParams=e;
					return;
				}else{
					this.$common.errorToShow("解码失败",function(){
						uni.navigateBack({
							
						});
						return;
					})
				}
			}else{
				e.registertype=decodeURIComponent(e.registertype);
			}
			this.requestParams=e;
			this.$common.loadToShow("正在定位中....");
			this.areas=this.$api.getAreas();
			
			var locationParam=new Object();
			// #ifndef MP-ALIPAY
				locationParam.type="gcj02";
			//#endif
			locationParam.success=function (res) {
				
					that.$api.baidu({location:res.latitude+","+res.longitude},function(res){
						console.log("获取地址====="+JSON.stringify(res))
						that.$common.loadToHide();
						if(res){
							if(res.status==0){
								var result=res.result;
								var town_code=result.addressComponent.town_code
								that.initdatas(town_code);
							}else{
								that.initdatas();
							}
						}else{
							that.initdatas();
						}
					})
			    }
			locationParam.fail=function(res){
					that.$common.loadToHide();
					that.initdatas();
					that.$common.errorToShow("定位失败"+JSON.stringify(res))
				}
			uni.getLocation(locationParam);
			
			/* if(e.registertype=="物业"){
				var params=new Object();
				params.id="10001";
				this.$api.article(params,function(data){
					if(data.success){
						that.warnmsg=data.data.content;
					}else{
						that.$common.errorToShow(data.message)
					}
					
				})
			} */
		},
		methods: {
			provinceChange(e){
				this.provinceIndex=e.detail.value;
				var dataArray=new Array();
				dataArray[0] = this.areaArray[0];
				dataArray[1] = this.entryArray(this.areas[this.provinceIndex].children);
				dataArray[2] = this.entryArray(this.areas[this.provinceIndex].children[0].children);	
				this.areaArray=dataArray;
				this.areaIndex[0]=this.provinceIndex;
				this.AreaChange();
			},
			cityChange(e){
				this.cityIndex=e.detail.value;
				var dataArray=new Array();
				dataArray[0] = this.areaArray[0];
				dataArray[1] = this.areaArray[1];
				dataArray[2] = this.entryArray(this.areas[this.provinceIndex].children[this.cityIndex].children);	
				this.areaArray=dataArray;
				this.areaIndex[1]=this.cityIndex;
				this.AreaChange();
			},
			countyChange(e){
				this.countyIndex=e.detail.value;
				this.areaIndex[2]=this.countyIndex;
				this.AreaChange();
			},
			
			floorChange(e){
				this.floorIndex=e.detail.value;
				var dataArray=new Array();
				dataArray[0] = this.f[0];
				dataArray[1] = this.entryArray(this.multiArray[this.floorIndex].children);
				dataArray[2] = this.entryArray(this.multiArray[this.floorIndex].children[0].children);	
				this.areaArray=dataArray;
				this.multiIndex[0]=this.floorIndex;
				this.AreaChange();
			},
			unitsChange(e){
				this.unitsIndex=e.detail.value;
				var dataArray=new Array();
				dataArray[0] = this.areaArray[0];
				dataArray[1] = this.areaArray[1];
				dataArray[2] = this.entryArray(this.multiArray[this.floorIndex].children[this.unitsIndex].children);	
				this.areaArray=dataArray;
				this.multiIndex[1]=this.unitsIndex;
				this.AreaChange();
			},
			layersChange(e){
				this.layersIndex=e.detail.value;
				this.multiIndex[2]=this.layersIndex;
				//获取房间信息
				var p = new Object();
				p.detail = new Object()
				p.detail['value'] = this.multiIndex;
				this.MultiChange(p);
			},
			
			initdatas(adcode){//初始化区域
				var pcode="";
				var ccode="";
				var qcode="";
				this.adcodeid=adcode;
				if(adcode&&adcode.length>=6){
					pcode=adcode.substring(0,2)+"0000";
					ccode=adcode.substring(0,4)+"00";
					qcode=adcode.substring(0,6);
				}
				/*********初始化qu'hua区划数据***********/				
				var areardatas=new Array();
				var provinceArray=new Array();
				var cityArray=new Array();
				var countyArray=new Array();
				for(var i=0;i<this.areas.length;i++){
					var province=this.areas[i];
					provinceArray.push(province.name);
					if(pcode!=""){
						if(province.code==pcode){
							this.areaIndex[0]=i;
							var citys=province.children;
							for(var j=0;j<citys.length;j++){
								var city=citys[j];
								cityArray.push(city.name);
								if(ccode==city.code){
									this.areaIndex[1]=j;
									var countys=city.children;
									for(var c=0;c<countys.length;c++){
										var county=countys[c];
										countyArray.push(county.name);
										if(qcode==county.code){
											this.areaIndex[2]=c;
										}
									}
								}
							}
						}
					}else{
						if(i==0){
							var citys=this.areas[0].children;
							for(var j=0;j<citys.length;j++){
								var city=citys[i];
								cityArray.push(city.name);
								if(j==0){
									var countys=city.children;
									for(var c=0;c<countys.length;c++){
										var county=countys[c];
										countyArray.push(county.name);
									}
									
								}
							}
						}
					}
					
				}
				areardatas.push(provinceArray);
				areardatas.push(cityArray);
				areardatas.push(countyArray);
				this.areaArray=areardatas;
				/*********初始化区划数据结束***********/
				this.AreaChange();
			},
			villageChange(e){//小区选择
				if(e){
					this.villageindex= e.detail.value;
					this.villageid = this.villages[e.detail.value].id;//选择的小区标识
				}
				/*********根据小区获取楼层信息*******/
				var params=new Object();
				params.id=this.villageid;
				params.type="4";
				var that=this;
				this.$api.arealist(params,function(res){//小区楼栋信息
					if(res.success){
						console.log(JSON.stringify(res))
						if(res.data.length==0)
							that.$common.errorToShow("未找到楼栋信息，请联系管理员加入")
						else{
							that.floorlist=res.data;
							var initbuild = that.floorlist[that.multiIndex[0]];
							var initunit = initbuild.units[that.multiIndex[1]];
							
							var buildArray = that.entryArray(res.data); //楼栋
							var unitArray = that.entryArray(initbuild.units); //单元
							var layerArray = that.entryArray(initunit.layers); //楼层
							var rtnArray = new Array();
							
							//this.layerid=datas[0].units[0].layers[0].id;在获取房间逻辑中初始化
							rtnArray.push(buildArray);
							rtnArray.push(unitArray);
							rtnArray.push(layerArray);
							that.multiArray = rtnArray;
							//获取房间信息
							var p = new Object();
							p.detail = new Object()
							p.detail['value'] = that.multiIndex;
							that.MultiChange(p);
						}
						
					}else{
						that.$common.errorToShow(res.message)
					}
				})
			},
			communityChange(e){//社区选择
				if(e){
					this.communityindex= e.detail.value;
					this.communityid = this.communitys[e.detail.value].id;//选择的社区标识
				}
				/*********初始化小区列表*******/
				if(this.requestParams.registertype=="业主"){
					var params=new Object();
					params.id=this.communityid;
					params.type="3";
					var that=this;
					this.$api.arealist(params,function(res){//小区离别哦
						console.log("刷新小区===="+that.communityid+"==="+JSON.stringify(res.data))
						if(res.success){
							if(res.data.length==0)
								that.$common.errorToShow("未找到小区信息，请联系管理员加入")
							else{
								that.villages=res.data;
								that.villagePicker = that.entryArray(res.data);
								that.villageid = that.villages[0].id;
								that.villageChange();
							}
						}else{
							that.$common.errorToShow(res.message)
						}
					})
				}
				
			},
			streetChange(e){
				if(e){
					this.streetindex= e.detail.value;
					this.streetid = this.streets[e.detail.value].id;//选择的社区标识
				}
				var params=new Object();
				params.id=this.streetid;
				params.type="2";
				var that=this;
				this.$api.arealist(params,function(res){//she社区列表获取
					if(res.success){
						if(res.data.length==0)
							that.$common.errorToShow("未找到社区信息，请联系管理员加入")
						else{
							that.communitys=res.data;
							that.communityPicker = that.entryArray(res.data);
							that.communityid = that.communitys[0].id;
							that.communityChange();
							
						}
					}else{
						that.$common.errorToShow(res.message)
					}
				})
			},
			entryArray(list){//将对象转化成数组
				var rtnArray = new Array();
				for (var u = 0; u < list.length; u++) {
					var entry = list[u];
					rtnArray.push(entry.name);
				}
				return rtnArray;
			},
			MultiChange(e) { //楼层选择确认
				let that = this;
				this.multiIndex = e.detail.value;
				this.layerid = this.floorlist[this.multiIndex[0]].units[this.multiIndex[1]].layers[this.multiIndex[2]].id;
				var params=new Object();
				params.id=this.layerid;
				params.type="5";
				this.$api.arealist(params, function(result) {
					if (result.success) {
						that.rooms = result.data;
						var pickers = that.entryArray(result.data);
						that.roomsPicker = pickers;
						that.room_id = that.rooms[0].id;
					} else {
						that.$common.errorToShow("获取楼层房间失败==" + result.message)
					}
				})
			},
			MultiColumnChange(e) { //漏乘选择变化
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
			},
			AreaChange(){//区划确认选择
				var province=this.areas[this.areaIndex[0]];
				var city=province.children[this.areaIndex[1]];
				var county=city.children[this.areaIndex[2]];
				/**********获取选择区划下的社区列表**************/
				var params=new Object();
				params.id=county.code+"000000";
				params.type="1";
				var that=this;
				console.log(JSON.stringify(params))
				this.$api.arealist(params,function(res){//获取街道信息
					console.log(JSON.stringify(res))
					if(res.success){
						if(res.data.length==0) 
							that.$common.errorToShow("您选择的区划未找到街道信息，请联系管理员加入")
						else{
							that.streets=res.data;
							that.streetPicker = that.entryArray(res.data);
							//console.log("刷新街道列表= "+JSON.stringify(that.streets)+"===="+that.adcodeid);
							if(that.adcodeid&&that.adcodeid!=""){
								for(var i=0;i<that.streets.length;i++){
									var street=that.streets[i];
									if(street.id==(that.adcodeid+"000")){
										that.streetindex=i;
										break;
									}
								}
								that.streetid = that.adcodeid+"000";
							}else{
								that.streetid = that.streets[0].id;
							}
							that.streetChange();
						}
					}else{
						that.$common.errorToShow(res.message)
					}
				})
				
			},
			AreaColumnChange(e){
				var data = {
					dataArray: [],
					dataIndex: this.areaIndex
				};
				data.dataIndex[e.detail.column] = e.detail.value;
				switch (e.detail.column) {
					case 0:
						data.dataArray[0] = this.areaArray[0];
						data.dataArray[1] = this.entryArray(this.areas[data.dataIndex[0]].children);
						data.dataArray[2] = this.entryArray(this.areas[data.dataIndex[0]].children[0].children);
						data.dataIndex[1] = 0;
						data.dataIndex[2] = 0;
						break;
					case 1:
						data.dataArray[0] = this.areaArray[0];
						data.dataArray[1] = this.areaArray[1];
						data.dataArray[2] = this.entryArray(this.areas[data.dataIndex[0]].children[data.dataIndex[1]].children);
						data.dataIndex[2] = 0;
						break;
					default:
						data.dataArray = this.areaArray;
						break;
				}
				this.areaArray = data.dataArray;
				this.areaIndex = data.dataIndex;
			},
			discriCard() {
				var UUserCard=this.entry.cardid
				//获取出生日期 
				UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
				//获取性别 
				if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
					this.entry.sex="男";
					//是男则执行代码 ... 
				} else {
					this.entry.sex="那个";
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
				this.entry.age=age;
				//年龄 age 
			},
			register(){//开始注册
				var registertype=this.requestParams.registertype;//注册d登记类型
				var isphone = this.$common.isPhoneNumber(this.entry.phone);
				if (!isphone) {
					this.$common.errorToShow("请输入正确的手机号码");
					return;
				}
				if (!this.$common.isBlack(this.entry.name)) {
					this.$common.errorToShow("名字必须填写");
					return;
				}
				
				var params=this.$common.getParams("register",this.entry);
				params.registertype=registertype;//注册类型
				params.province=this.areaArray[0][this.areaIndex[0]];
				params.city=this.areaArray[1][this.areaIndex[1]];
				params.county=this.areaArray[2][this.areaIndex[2]];
				params.streetid=this.streetid;//街道
				params.community=this.communityid;//社区标识
				var that=this;
				
				if(registertype=="业主"){
					if(this.room_id==""){
						this.$common.errorToShow("请选择您居住房间")
						return;
					}
					var iscard = this.$common.isCardNumber(this.entry.cardid);
					if (!iscard) {
						this.$common.errorToShow("请输入正确的身份证号");
						this.idcardfocus = true;
						return;
					}else{
						this.discriCard();
					}
					params.age=this.entry.age;
					params.sex=this.entry.sex;
					params.roomId=this.room_id;//小区标识
					console.log("================"+JSON.stringify(params))
					this.$api.registerowner(params,function(res){
						if(res.success){
							that.$common.successToShow("注册成功",function(){
								uni.navigateBack({
									
								})
							});
							
						}else{
							that.$common.errorToShow(res.message)
						}
					})
				}else if(registertype=="物业"){
					console.log("params.floor===="+params.floor)
					if(!this.$common.isInteger(params.floor)){
						this.$common.errorToShow("建筑数必须是整数");
						return;
					}
					if(!this.$common.isInteger(params.unit)){
						this.$common.errorToShow("每栋楼拥有的单元数必须是整数");
						return;
					}
					if(!this.$common.isInteger(params.layer)){
						this.$common.errorToShow("每单元的楼层数必须是整数");
						return;
					}
					if(!this.$common.isInteger(params.room)){
						this.$common.errorToShow("每层户数必须是整数");
						return;
					}
					params.village=params.name;
					
					if(this.communityid==""){
						this.$common.errorToShow("请选择您所属的社区")
						return;
					}
					//用户名
					if (!this.$common.isBlack(this.entry.loginName)) {
						this.$common.errorToShow("用户名必须填写");
						return;
					}
					 var zg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]*$/;
					if (!zg.test(this.entry.loginName)) {
						this.$common.errorToShow("用户名必须包含数字和字母");
						return;
					}
					//密码校验
					if (!this.$common.isBlack(this.entry.password)) {
						this.$common.errorToShow("请填写密码");
						return;
					}
					if(this.entry.password!=this.entry.surepassword){
						this.$common.errorToShow("两次密码输入不一致");
						return;
					}
					console.log("====="+JSON.stringify(params))
					this.$api.registersys(params,function(res){
						if(res.success){
							that.$common.successToShow("注册成功",function(){
								uni.navigateBack({
									
								})
							})
						}else{
							that.$common.errorToShow(res.message)
						}
					})
				}
				
			}
		}
	}
</script>

<style>

</style>
