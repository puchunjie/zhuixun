<template>
    <div class="parent-mana-container">
		<div class="top">
			<p>全部家长：{{ parentList.length }}</p>
		</div>
        <div class="item" v-for="item in parentList" :key="item.parentId">
            <image class="gender-img" :src="'/static/head2.png'"></image>
            <div class="info">
                <h3 class="name">{{ item.realName}}</h3>
				<p v-show="shop.showParentTel == 1" class="phone" >{{ item.mobilePhone}}</p>
				<div class="ac-btn" v-show="item.state ==1">新增</div>
				<div class="ac-btn" v-show="item.state ==2">跟进</div>
				<div class="ac-btn" v-show="item.state ==3">到访</div>
				<div class="ac-btn" v-show="item.state ==4">试听</div>
				<div class="ac-btn" v-show="item.state ==5">签约</div>
				<div class="ac-btn" v-show="item.state ==8">禁用</div>
				<div class="ac-btn" v-show="item.state ==9">删除</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            parentList: [],
			shop:'',
        }
    },
	computed: {
	    ...mapGetters(['userinfo'])
	},
	onLoad() {
		this.getShop();
	},
	methods: {
		getShop() {
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/shop/view`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { shopId: this.userinfo.shopId},
			    success: res => {
					console.info(this.userinfo.shopId);
			        if (res.data.code === 0) {
			            this.shop = res.data.data;
			        }else{
						uni.showToast({
							title:res.data.fieldErrors[0].message,
							icon: 'none',
							duration: 1000
						})
					}
					this.getParentList();
			    }
			});
		},
		getParentList() {
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/parent/list`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { shopId: this.userinfo.shopId,pageNo:0,pageSize:1000},
			    success: res => {
			        if (res.data.code === 0) {
			            this.parentList = res.data.data;
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
	},
}
</script>

<style lang="less">
@import url('../../../styles/base.less');
page {
	background:#F2F2F2;
	padding: 0 40upx;
}

.parent-mana-container {
    padding-top: 18upx;
	border-radius: 8upx;
	.top {
		background:#FFFFFF;
		width: 100%;
		padding: 20upx 30upx 30upx;
		margin-bottom: 20upx;
	}
    .item {
		background:#FFFFFF;
        position: relative;
        display: flex;
        width: 100%;
        padding: 20upx 30upx 30upx;
		border: 1px solid rgba(230, 230, 230, 1);
        overflow: hidden;
        .gender-img {
            display: block;
            width: 106upx;
            height: 106upx;
            border-radius: 106upx;
            border: 5upx solid rgba(236, 246, 244, 1);
        }
        .info {
            flex: 1;
            margin-left: 25upx;
            .phone {
                font-size: 30upx;
                color: #181818;
                line-height: 30upx;
            }
            .name {
                font-size: 28upx;
                color: @base_gray;
                margin-top: 20upx;
            }
        }
        .ac-btn {
            position: absolute;
            width: 150upx;
            height: 44upx;
            line-height: 44upx;
            text-align: center;
            font-size: 28upx;
            color: #1C5C54;
            right: 0;
            top: 46upx;
        }
    }
}
</style>