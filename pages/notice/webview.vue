<template>
	<view class="page">
		<web-view  :src="webviewsrc"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewsrc:"",
			}
		},
		onLoad(e) {
			console.log(e.src+"=============="+this.webviewStyles)
			this.webviewsrc=e.src;
		},
		methods: {
			
		}
	}
</script>

<style>
	.page{
		margin-top: 100px;
	}
</style>
