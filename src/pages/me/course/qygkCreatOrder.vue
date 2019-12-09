<template>
    <div class="order-module">
    	<div class="item" >
			<span class="dian"></span>
    		<p class="p1">
				<span class="span1">您当前购买课程:{{className}}</span>
			</p>
    		<p class="p2" >
				<span class="span1"> 应付：{{totalAmount/100}}元</span>
			</p>
			<p class="p2" >
				<span class="span1">
					<span class="span2">实付：</span>
					<input class="span2" style="width:200upx;border:1upx solid #0A9187" :value="totalAmount/100" @input="modifyPayedAmount"/>
					元
				</span>
			</p>
			<p class="p2">
				<span class="span1">缴费方式：
					<radio-group @change="modifyPayType" id="payType"> 
						<radio value="5" checked="true"/>现金
						<radio value="6" />银行转账
						<radio value="7" />网银
						<radio value="1" />支付宝
						<radio value="2" />微信
					</radio-group>
				</span>
			</p>
			<p class="p2">
				<span class="span1">是否缴费：
					<radio-group @change="modifyIsPay" id="isPay"> 
						<radio value="0" checked="true"/>否
						<radio value="1" />是
					</radio-group>
				</span>
			</p>
			<div class="bottom"> 
				<div class="submit-btn-fixed" @click="submit">确认下单</div>
			</div>
    	</div>
    	<p v-if="classList.length === 0" class="no-order">暂无记录~</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
			studentId:0,
			classId:0,
			courseIds:'',
			lessonNums:'',
			totalAmount:0,
			payType:5,
			isPay:0,
			className:'',
			payedAmount:0
        }
    },
    computed: {
        ...mapGetters(['userinfo'])
    },
	onShow() {
		
	},
	onLoad(e) {
		this.studentId = e.studentId;
		this.classId = e.classId
		this.courseIds = e.courseIds
		this.lessonNums = e.lessonNums
		this.totalAmount = e.totalAmount
		this.className = e.className
		this.payedAmount = e.totalAmount/100
	},
    methods: {
		submit() {
			uni.showLoading({
				title:'数据处理中'
			})
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/order/addOrder`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { teacherId: this.userinfo.teacherId,courseIds:this.courseIds,lessonNums:this.lessonNums,
				payedAmount:this.payedAmount, classId:this.classId,studentId:this.studentId,payType:this.payType,isPay:this.isPay},
			    success: res => {
					uni.hideLoading();
			        if (res.data.code === 0) {
						let orderId = res.data.data.order.orderId;
						let qrCodeUrl = res.data.data.qrCodeUrl;
						let qrCodeUrls = ['',''];
						if(qrCodeUrl != null && qrCodeUrl != ''){
							qrCodeUrls = qrCodeUrl.split("?")
						}
						let qrCodeUrlPs = ['',''];
						if(qrCodeUrls[1] != null && qrCodeUrls[1] != ''){
							qrCodeUrlPs = qrCodeUrls[1].split("=")
						}
						// let subStr=new RegExp('=');
						// qrCodeUrl = qrCodeUrl.replace(subStr,"_");
						console.info(qrCodeUrl)
			            uni.navigateTo({
			            	 url: '../../me/course/qygkCreatOrderSuccess?orderId='+orderId+'&qrCodeUrl1='+qrCodeUrls[0]+'&qrCodeUrl2='+qrCodeUrlPs[0]+'&qrCodeUrl3='+qrCodeUrlPs[1]
			            });
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
		modifyPayType(e){
			this.payType = e.target.value;
		},
		modifyIsPay(e){
			this.isPay = e.target.value;
		},
		modifyPayedAmount(e){
			this.payedAmount = e.detail.value
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
				float: left;
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
			right: 20upx;
			top: 17upx;
		}
		.ac-btn2{
			position: absolute;
			float: right;
			width: 140upx;
			height: 47upx;
			line-height: 44upx;
			text-align: center;
			font-size: 26upx;
			color: #fff;
			background: #0A9187;
			right: 190upx;
			top: 17upx;
		}
	}
}
</style>