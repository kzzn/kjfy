<template>
	<view>
		<cu-custom bgColor="text-white" :bgColor="barColor" :isBack="true"><block slot="backText">返回</block><block slot="content">信息</block></cu-custom>
		<view class="cu-card dynamic no-card article" >
			<view class="cu-item shadow">
				<view class="solid-bottom padding">
					<view class="title text-center"><view class="text-cut">{{entry.title}} </view></view>
					<view :class="'bg-'+bgColor" class="cu-tag light sm round padding">{{entry.createDate}} 发布</view>
				</view>
				<view class="content margin-top fixe" v-html="entry.content">
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import parseHtml from "@/config/parseHTML.js"
	export default {
		data() {
			return {
				barColor:this.barColor,
				bgColor:this.bgColor,
				requestParams:{},
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
			params.id=this.requestParams.articleid;
			let list = [{}];
			var that=this;
			this.$api.ADInfo(params,function(data){
				if(data.success){
					var article=data.data;
					//#ifdef MP-ALIPAY
						var content=article.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
						let newArr = [];
						let arr = parseHtml(content);
						arr.forEach((item, index) => {
							newArr.push(item)
						})
						article.content = newArr;
					//#endif
					that.entry=article;
				}else{
					that.$common.errorToShow(data.message)
				}
				
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
