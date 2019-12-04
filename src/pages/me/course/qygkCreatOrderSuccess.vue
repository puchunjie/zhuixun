<template>
    <div class="order-module">
		<div class="tankuang" v-if="isQrShow">
		</div>
		<div class="erweima-warp" v-if="isQrShow">
			<p class="tip-word" v-if="order.payType == 1"> 请用支付宝扫如上二维码进行支付</p>
			<p class="tip-word" v-if="order.payType == 2"> 请用微信扫如上二维码进行支付</p>
			<tki-qrcode style="display:inline-block" ref="qrcode" cid="cid" :val="qrCodeUrl" :size="200" unit="upx" loadMake onval/>
			<p class="tip-word" @click="hideQr">关闭</p>
		</div>
    	<div class="item" >
			<span class="dian"></span>
    		<p class="p1" style="text-align: center;">
				<span class="span1">下单成功</span>
			</p>
			<p class="p1">
				<span class="span2">所属班级：{{order.className}}</span>
			</p>
			<p class="p1">
				<span class="span2">课程安排：{{order.orderCourseList.length}}</span>
			</p>
			<p class="p1">
				<span class="span2">课程金额：{{order.payedAmount/100}}</span>
			</p>
			<p class="p1" v-if="order.payType != 1 && order.payType != 2" >
				<span class="span2" v-if="order.state == 0">是否缴费：否</span>
				<span class="span2" v-if="order.state == 1">是否缴费：是</span>
			</p>
			<div class="bottom"> 
				<div class="ac-btn" @click="showQr" v-show="order.payType == 1 || order.payType == 2">显示收款码</div>
				<div class="ac-btn2" @click="sendQr" v-show="order.payType == 1 || order.payType == 2">发送收款码</div>
			</div>
			
			<div class="bottom">
				<div class="submit-btn-fixed" @click="openToPage">返回</div>
			</div>
			
    	</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tkiQrcode from 'tki-qrcode/components/tki-qrcode/tki-qrcode.vue'
export default {
	components: {tkiQrcode},
    data() {
        return {
            order: null,
			orderId:0,
			qrCodeUrl:'',
			isQrShow:false,
			timerIndex:''//定时器
        }
    },
    computed: {
        ...mapGetters(['userinfo'])
    },
	onShow() {
		this.getOrder();
	},
	onLoad(e) {
		this.orderId = e.orderId;
		this.qrCodeUrl = e.qrCodeUrl1+'?'+e.qrCodeUrl2+'='+e.qrCodeUrl3;
	},
    methods: {
		getOrder() {
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/order/orderDetailed`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { orderId: this.orderId},
			    success: res => {
			        if (res.data.code === 0) {
			            this.order = res.data.data;
						// if(this.order.state == 0 && (this.order.payType == 1 || this.order.payType == 2)){
						// 	this.timerIndex = setInterval(function(){
						// 		uni.request({
						// 		    method: 'POST',
						// 		    url: `${this.doMain}/order/orderDetailed`,
						// 		    header: {
						// 		        'content-type': 'application/x-www-form-urlencoded'
						// 		    },
						// 		    data: { orderId: this.orderId},
						// 		    success: res => {
						// 		        if (res.data.code === 0) {
						// 		            this.order = res.data.data;
						// 					if(this.order.state != 0 && (this.order.payType == 1 || this.order.payType == 2)){
						// 						if(this.timerIndex != '')
						// 						clearInterval(this.timerIndex);
						// 					}
						// 		        }
						// 		    }
						// 		});
						// 	},5000);
						// }else if(this.order.state != 0 && (this.order.payType == 1 || this.order.payType == 2)){
						// 	if(this.timerIndex != '')
						// 	clearInterval(this.timerIndex);
						// }
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
		getOrderV2() {
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/order/orderDetailed`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { orderId: this.orderId},
			    success: res => {
			        if (res.data.code === 0) {
			            this.order = res.data.data;
						if(this.order.state != 0 && (this.order.payType == 1 || this.order.payType == 2)){
							if(this.timerIndex != '')
							uni.clearInterval(this.timerIndex);
						}
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
		openToPage(){
			uni.navigateTo({
				 url: '../../me/index'
			});
		},
		showQr(){
			this.isQrShow = true;
		},
		hideQr(){
			this.isQrShow = false;
		},
		sendQr(){
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/order/sendTiXing`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { orderId: this.orderId,teacherId:this.userinfo.teacherId},
			    success: res => {
			        if (res.data.code === 0) {
			            uni.showToast({
			            	title:'发送成功',
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
			float: left;
			width: 40%;
			height: 47upx;
			line-height: 44upx;
			text-align: center;
			font-size: 26upx;
			color: #fff;
			background: #0A9187;
			left: 20upx;
			top: 17upx;
		}
		.ac-btn2{
			position: absolute;
			float: right;
			width: 40%;
			height: 47upx;
			line-height: 44upx;
			text-align: center;
			font-size: 26upx;
			color: #fff;
			background: #0A9187;
			right: 20upx;
			top: 17upx;
		}
	}
}
.erweima-warp {
	    width: 670rpx;
	    height: 450rpx;
	    padding: 60rpx 0;
	    border-radius: 8rpx;
	    border: 1px solid #ccc;
	    margin: 113rpx auto 10rpx;
	    text-align: center;
	    z-index: 999;
	    position: absolute;
	    background: #fff;
	    margin-left: 32rpx;
	}
	.tip-word {
	    font-size: 28upx;
	    color: #333;
	    text-align: center;
	    line-height: 56upx;
	    margin-bottom: 50upx;
		
	}
	.tankuang{
		position: absolute;
		background: #000;
		width: 100%;
		height: 100%;
		opacity: 0.5;
		z-index:888
	}
</style>