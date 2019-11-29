<template>
    <div class="order-module">
    	<div class="item"  v-for="item in orderList" :key="item.orderId">
			<span class="dian"></span>
    		<p class="p1">
				<span class="span1">{{item.studentName}}</span>
				<span class="span2">{{item.className}}</span>
			</p>
    		<p class="p2">
				<span class="span1"> 剩余课时：{{item.remainClassHour}}</span>
				<span  v-show="item.orderAgainState ==0" class="span2"> 提醒次数：{{item.orderAgainMsgNum}}</span>
			</p>
			<div class="bottom"> 
				<div class="ac-btn">排课</div>
				<div class="ac-btn">提醒</div>
				<div class="ac-btn">缴费</div>
			</div>
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
			    url: `${this.doMain}/order/listorderAgains`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { teacherId: this.userinfo.teacherId},
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
		overflow: hidden;	
		position: relative;
		width: 100%;
		height: auto;
		background-color: #fff;
		border:1upx solid rgba(204,204,204,1);
		border-radius:8upx;
		margin-bottom:20upx;
		.dian{
			position: absolute;
			width:48upx;
			height:54upx;
			left:-25upx;
			top:-25upx;
			border-radius:50%;;
			background-color:#0A9187;
		}
		.p1 {
			font-weight:bold;
			color:#242039;
			font-size:30upx;
			font-weight:bold;
			line-height:49upx;
			padding:20upx 20upx 20upx 20upx;
			.span1{
			}
			.span2{
				float: right;
			}
		}
		.p2 {
			font-size:26upx;
			line-height:46upx;
			color:#666666;
			font-weight:500;
			border-top: 1px solid #E5E5E5;
			padding:20upx 20upx 20upx 20upx;
			.span1{
			}
			.span2{
				float: right;
			}
		}
	}
	.bottom{
		position: relative;
		display: flex;
		width: 100%;
		height: 80upx;
		.ac-btn{
			position: absolute;
			float: right;
			width: 140upx;
			height: 47upx;
			line-height: 44upx;
			text-align: center;
			font-size: 26upx;
			color: #fff;
			background: #0A9187;
			right: 10upx;
			top: 10upx;
		}
	}
}
</style>