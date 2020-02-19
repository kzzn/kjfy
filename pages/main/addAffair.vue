<template>
	<view>
		<cu-custom :isBack="true" bgColor="text-white" :bgColor="barColor">
			<block slot="backText">返回</block>
			<block slot="content">诉求申报</block>
		</cu-custom>
		<view class="flex justify-between">
			<view class="padding-sm margin-xs radius">申报人：{{webUser.username}}</view>
			<view class="padding-sm margin-xs radius">申报时间：{{ctime}}</view>
		</view>
		<form>
			<view  class="bg-white">
				<view class="action" >
					<text class="cuIcon-comment text-orange "></text> 
					诉求内容：
				</view>
				<view class="cu-form-group solid-top" >
					<textarea maxlength="-1" v-model="content" placeholder="请在此输入您的诉求"></textarea>
				</view>
			</view>
		</form>
		<view class="padding flex flex-direction">
			<button @tap="postAffair" :class="'bg-'+bgColor" class="cu-btn margin-tb-sm lg" :loading="islogin?true:false">上报</button> 
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barColor:this.barColor,
				bgColor:this.bgColor,
				webUser:this.$webUser(),
				requestParams:{},
				ctime:"",
				content:"",
				islogin:false
			}
		},
		onLoad(e) {
			this.ctime=this.$common.dateFormat("yyyy-mm-dd HH:MM", new Date());
			this.requestParams=e;
		},
		methods: {
			postAffair(e){
				var params=this.$common.getParams();
				params.content=this.content;
				if(!this.content||this.content.trim("")<10){
					this.$common.errorToShow("诉求内容不得少于10个文字")
					return;
				}
				params.title="无标题";
				var that=this;
				that.$common.modelShow("诉求申请","您是否确定上报申请？",function(){
					that.$api.postAffair(params,function(res){
						if(res.success){
							console.log("that.requestParams.onevent====="+that.requestParams.onevent)
							if (that.requestParams.onevent && that.requestParams.onevent != "") {
								uni.$emit(that.requestParams.onevent, {
									updatetype: 'affairs',
									params: {}
								}); //刷新父页面数据		
							}
							that.$common.successToShow("申诉成功", function() {
								uni.navigateBack({}); //返回主页	
							
							})
						}else{
							that.$common.errorToShow(res.message);
						}
					})
				})
				
			}
		}
	}
</script>

<style>

</style>
