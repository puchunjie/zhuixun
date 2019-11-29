<template>
    <div class="order-module">
    	<div class="item"  v-for="item in orderList" :key="item.orderId">
    		<p class="p1">{{item.createdTimestamp | dateformat}}</p>
    		<p class="p2">
				<span class="span1">{{item.className}}</span>
				<span class="span2">￥{{item.payedAmount | priceFilter}}</span>
			</p>
    	</div>
    	<p v-if="orderList.length === 0" class="no-order">暂无记录~</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            orderList: []
        }
    },
    computed: {
        ...mapGetters(['userinfo'])
    },
	onLoad() {
		this.getOrderList();
	},
    methods: {
		getOrderList() {
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/order/listPaidEdOrder`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { parentId: this.userinfo.parentId},
			    success: res => {
			        if (res.data.code === 0) {
			            this.orderList = res.data.data;
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
    },
}
</script>

<style lang="less">
@import url('../../../styles/base.less');
page {
	padding: 18upx 20upx 20upx;
	background:#F2F2F2;
}
.order-module {
	.no-order {
	    line-height: 280upx;
	    color: #999;
	    font-size: 26upx;
	    text-align: center;
	}
	.item{
		width: 100%;
		height: auto;
		background-color: #fff;
		border:1upx solid rgba(204,204,204,1);
		border-radius:8upx;
		margin-bottom: 20upx;
		.p1 {
			font-size:30upx;
			line-height:46upx;
			color:#666666;
			padding:20upx 20upx 20upx 20upx;
		}
		.p2 {
			border-top: 1px solid #E5E5E5;
			padding:20upx 20upx 20upx 20upx;
			.span1{
				font-size:30upx;
				line-height:49upx;
				font-weight:bold;
				color:#242039;
			}
			.span2{
				line-height:49upx;
				font-size:30upx;
				font-weight:bold;
				color:#0A9187;
				float: right;
			}
		}
	}
}
</style>