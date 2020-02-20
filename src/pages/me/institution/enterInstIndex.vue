<template>
	<view class="transfer-container">
		<div class="select-item" :class="{ 'active': active === i }" v-for="(enter,i) in enters" :key="i" @click="goRouter(enter,i)">
			<div class="choose_img">
				<image class="head" :src="enter.icon"></image>
			</div>
			<p class="choose_label">
				{{ enter.label }}
			</p>
		</div>
	</view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	computed: {
	    ...mapGetters(['isTeacher']),
		...mapGetters(['userinfo']),
	},
	data() {
		return {
			enters: [{
				label: '扫一扫',
				icon: '/static/sao.png',
				url: 'sao'
			},{
				label: '搜一搜',
				icon: '/static/sou.png',
				url: 'sou'
			}],
			active: NaN,
			shopId:0
		}
	},
	onLoad() {
	},
	onShow(){
	},
	methods: {
		goRouter(enter,i){
			this.active = i;
			if(i === 0 ){
				this.sao();
			}else if(i === 1 && this.isTeacher){
				setTimeout(() => {
					uni.navigateTo({url: '/pages/me/institution/enterInstForSearch'})
				},500)
			}else if(i === 1 && !this.isTeacher){
				setTimeout(() => {
					uni.navigateTo({url: '/pages/me/institution/enterInstForSearchParent'})
				},500)
			}
			
		},
		sao(){
			uni.scanCode({
				scanType:['qrCode'],
				success:  res => {
					let result = res.result; // 当needResult 为 1 时，扫码返回的结果
					if(result !=null && result !=''){
						let index = result.lastIndexOf("\/");  
						let shopIdStr  = result .substring(index + 1, result.length);
						if(shopIdStr !=null && shopIdStr !=''){
							this.shopId = shopIdStr;
							if(this.isTeacher){
								this.enterForTeacher();
							}else{
								this.enterForParent();
							}
						}else{
							uni.showToast({
								title:'扫描结果错误',
								icon: 'none',
								duration: 1000
							})
						}
					}
				}
			});
		},
		enterForTeacher(){
			uni.showLoading({ title: '处理中' });
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/shop/teacher/joinShop`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { shopId: this.shopId , teacherId: this.userinfo.teacherId},
			    success: res => {
					uni.hideLoading();
					if (res.data.code === 0) {
						uni.showToast({
							title:'申请成功',
							icon: 'none',
							duration: 1000
						})
			        }else{
						uni.showToast({
							title:res.data.fieldErrors[0].message,
							icon: 'none',
							duration: 1000
						})
					}
			    }
			});
		},
		enterForParent(){
			uni.showLoading({ title: '处理中' });
			uni.request({
				method: 'POST',
				url: `${this.doMain}/shop/parent/joinShop`,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: { shopId: this.shopId , parentId: this.userinfo.parentId},
				success: res => {
					uni.hideLoading();
					if (res.data.code === 0) {
						uni.showToast({
							title:'申请成功',
							icon: 'none',
							duration: 1000
						})
					}else{
						uni.showToast({
							title:res.data.fieldErrors[0].message,
							icon: 'none',
							duration: 1000
						})
					}
				}
			});
		}
	}
}
</script>

<style lang="less">
@import url("../../../styles/base.less");
.transfer-container {
	padding-top: 40upx;
	.select-item {
		width: 710upx;
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
			width: 300upx;
			height: 300upx;
			margin-left: 144upx;
		}

		&.active{
			border-color: @base_green;
		}
		
	}
}
.choose_img {
	border-radius: 8upx;
	text-align: center;
}
.choose_label {
	font-size: 56upx;
	color: #666;
	text-align: center;
}
</style>
