 <template>
 	<view>
 		<cu-custom bgColor="text-white" :bgColor="barColor" :isBack="true"><block slot="backText">返回</block><block slot="content">诉求详情</block></cu-custom>
 		<view class="cu-card dynamic">
 			<view class="cu-item shadow">
 				<view class="cu-list menu-avatar">
 					<view class="cu-item">
						<view :class="'bg-'+bgColor" class="cu-avatar xs cu-avatar-btn round shadow">诉</view>
 						<view class="content flex-sub">
 							<view class="text-gray text-sm flex justify-between">
 								{{entry.createDate}}
 							</view>
 						</view>
 					</view>
 				</view>
 				<view class="text-content">
 					{{entry.content}}
 				</view>
 				<view class="cu-list menu-avatar comment solids-top">
 					<view class="cu-item">
						<view class="cu-avatar xs cu-avatar-btn round bg-gradual-green shadow">回</view>
						<view class="content"  v-if="entry.status=='未回复'">
							未回复
						</view>
 						<view class="content"  v-if="entry.status!='未回复'">
 							<view class="text-grey">{{entry.receiptDate}}</view>
 							<view class="text-gray text-content text-df">
								{{entry.receipt}}
 							</view>
 						</view>
 					</view>
 				</view>
 			</view>
 		</view>
		<view id="titleview" class="cu-bar bg-white solid-bottom" v-if="(entry.status=='已评价'||entry.status=='已回复')?true:false" >
			<view class="action" >
				<text class="cuIcon-title text-orange "></text> 
				处理结果
			</view>
		</view>
		<view class="cu-card no-card dynamic margin-top" v-if="(entry.status=='已评价'||entry.status=='已回复')?true:false">
			<view class="cu-item shadow">
				<form v-if="entry.status=='已回复'?true:false">
					<view class="cu-form-group">
						<view class="title"><text :class="'text'+bgColor" class='cuIcon-edit text-xxl'></text>评分</view>
						<uni-rate :value="ratevalue" @change="onChange" />
					</view>
					<view class="cu-form-group">
						<view class="title"><text :class="'text-'+bgColor" class='cuIcon-edit text-xxl'></text>内容</view>
						<textarea maxlength="-1" v-model="entry.opinion" placeholder="请在此输入您的评价内容"></textarea>
					</view>
					<view class="cu-form-group">
						<button class="cu-btn round shadow bg-red" @tap="rated('未解决')">未解决</button>
						<button class="cu-btn round shadow" :class="'bg-'+bgColor" @tap="rated('已解决')">已解决</button>
					</view>
				</form>
				<form v-if="entry.status=='已评价'?true:false">
					<view class="cu-form-group">
						<view class="title"><text class='cuIcon-edit text-xxl' :class="'text-'+bgColor"></text>评分</view>
						<uni-rate :value="entry.satisfaction"  />
					</view>
					<view class="cu-form-group">
						<view class="title"><text class='cuIcon-edit text-xxl' :class="'text-'+bgColor"></text>内容</view>
						<view class="content">{{entry.opinion}}</view>
					</view>
					<view class="cu-form-group">
						<view class="title"><text class='cuIcon-edit text-xxl' :class="'text-'+bgColor"></text>结果</view>
						<view class="content">{{entry.solved}}</view>
					</view>
				</form>
			</view>
		</view>
 	</view>
 </template>
 
 <script>
	 import uniRate from '@/components/uni-rate/uni-rate.vue'
	 import uniSection from '@/components/uni-section/uni-section.vue'
 	export default {
		components: {
			uniRate,
			uniSection
		},
 		data() {
 			return { 
				barColor:this.barColor,
				bgColor:this.bgColor,
 				requestParams:{},
				ratevalue:4,
 				entry:{}
 			}
 		},
 		onLoad(e) {
 			this.requestParams=e;
 			uni.showLoading({
 				title: '加载中...',
 				mask: true
 			});
 			var params=new Object();
 			params.id=this.requestParams.affairid;
 			var that=this;
 			this.$api.affair(params,function(data){
				console.log(""+JSON.stringify(data))
 				if(data.success){
 					that.entry=data.data;
 				}else{
 					that.$common.errorToShow(data.message)
 				}
 				
 			})
 		},
 		methods: {
 			rated(tsolved){
				var that=this;
				this.$common.modelShow("评价确认","您是否确认您的评价",function(){
					var params=that.$common.getParams("rated",that.entry);
					params.id=that.requestParams.affairid;
					params.satisfaction=that.ratevalue;//满意度
					params.solved=tsolved;//
					that.$api.rate(params,function(res){
						if(res.success){
							that.$common.successToShow("评价成功",function(){
								uni.$emit(that.requestParams.onevent, {
									updatetype: 'affairs',
									params: {}
								}); //刷新父页面数据		
								uni.navigateBack();
							})
						}else{
							that.$common.errorToShow(res.message);
						}
					})
				})
			},
			onChange(e){
				this.ratevalue=e.value;
				console.log('rate发生改变:' + JSON.stringify(e))
			}
 		}
 	}
 </script>
 <style>
 
 </style>
 