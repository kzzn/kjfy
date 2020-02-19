<template>
	<view>
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="text-white" :bgColor="barColor">
				<block slot="backText">返回</block>
				<block slot="content">密码修改</block>
			</cu-custom>
		</view>
		<view class="cu-form-group">
			<view class="title"><text class='cuIcon-edit text-xxl' :class="'text-'+bgColor"></text>原密码</view>
			<input placeholder="原密码" name="oldpwd" v-model="oldpwd"></input>
		</view>
		<view class="cu-form-group">
			<view class="title"><text class='cuIcon-new text-xxl' :class="'text-'+bgColor"></text>新密码</view>
			<input password="true" placeholder="新密码" name="newpwd" v-model="newpwd"></input>
		</view>
		<view class="cu-form-group">
			<view class="title"><text class='cuIcon-sound text-xxl' :class="'text-'+bgColor"></text>确认密码</view>
			<input password="true" placeholder="确认密码" name="surepwd" v-model="surepwd"></input>
		</view>
		<view class="padding flex flex-direction">
			<button @click="updatepwd" class="cu-btn margin-tb-sm lg" :class="'bg-'+bgColor" :loading="isupdate?true:false">确认修改</button> 
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barColor:this.barColor,
				bgColor:this.bgColor,
				oldpwd:"",
				newpwd:"",
				surepwd:"",
				isupdate:false
			}
		},
		methods: {
			updatepwd(){
				this.isupdate=true;
				var param=this.$common.getParams("");
				param.oldpwd=this.oldpwd;
				param.newpwd=this.newpwd;
				param.surepwd=this.surepwd;
				var that=this;
				this.$api.updatepwd(param,function(result){
					if(result.success){
						that.$common.successToShow(result.message,function(){
							uni.navigateBack({
								
							})
						})
						
					}else{
						that.$common.errorToShow(result.message)
					}
					that.isupdate=false;
				})
				
			}
		}
	}
</script>

<style>

</style>
