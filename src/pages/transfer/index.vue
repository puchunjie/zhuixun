<template>
	<view class="transfer-container">
		<div class="select-item" :class="{ 'active': active === i }" v-for="(enter,i) in enters" :key="i" @click="goRouter(enter,i)">
			<image class="head" :src="enter.icon"></image>
			{{ enter.label }}
		</div>
	</view>
</template>

<script>
export default {
	data() {
		return {
			enters: [{
				label: '我是家长/学生',
				icon: '/static/head1.png',
				url: '/pages/login/addStudent'
			},{
				label: '我是老师',
				icon: '/static/head2.png',
				url: '/pages/login/teacher'
			}],
			active: NaN
		}
	},
	onLoad() {

	},
	methods: {
		goRouter(enter,i){
			this.active = i;
			setTimeout(() => {
				uni.navigateTo({url: enter.url})
			},500)
		}
	}
}
</script>

<style lang="less">
@import url("../../styles/base.less");
.transfer-container {
	padding-top: 245upx;
	.select-item {
		display: flex;
		width: 710upx;
		height: 213upx;
		line-height: 141upx;
		background: #fff;
		border: 1px solid @line_gray;
		border-radius: 8upx;
		margin: 0 auto 60upx;
		padding: 36upx 58upx;
		font-size: 40upx;
		font-weight: bold;
		.head{
			display: block;
			width: 140upx;
			height: 140upx;
			margin-right: 97upx;
		}

		&.active{
			border-color: @base_green;
		}
	}
}
</style>
