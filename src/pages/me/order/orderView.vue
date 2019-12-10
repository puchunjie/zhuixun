<template>
    <div class="order-module">
    	 <div class="form-content" style="margin-bottom: .1rem;height: auto; border: 1px solid #EBEBEB">
				<p class="p2">
					<span class="span1" style="font-weight: bolder;">{{shop.shopName}}</span>
				</p>
				<p class="p1">{{order.createdTimestamp | dateformatYMDHM}}</p>
				<p class="p2">
					<span class="span1">{{order.className }}</span>
					<span class="span2">{{order.studentName }}</span>
				</p>
			</div>
			<div class="form-content" style="margin-bottom: .1rem;height: auto; border: 1px solid #EBEBEB">
				<div class="table" width="100%;" style="margin: 10px;">
					<div class="table-tr" v-if="shop.showLessonPrice == 1">
						<div class="table-th" style="width: 40%;">课程名称</div>
						<div class="table-th" style="width: 20%;">单价</div>
						<div class="table-th" style="width: 20%;">课时</div>
						<div class="table-th" style="width: 20%;">总价</div>
					</div>
					<div class="table-tr" v-else-if="shop.showLessonPrice != 1">
						<div class="table-th" style="width: 70%;">课程名称</div>
						<div class="table-th" style="width: 30%;">课时</div>
					</div>
					<div class="table-tr" v-for="item in orderCourseList" :key="item.orderCourseId">
						<div class="table-td" v-if="shop.showLessonPrice == 1">{{item.courseName }}</div>
						<div class="table-td" v-if="shop.showLessonPrice == 1">{{item.lessonPrice| priceFilter}}</div>
						<div class="table-td" v-if="shop.showLessonPrice == 1">{{item.classHour }}</div>
						<div class="table-td" v-if="shop.showLessonPrice == 1">{{item.totalPrice| priceFilter }}</div>
						<div class="table-td" v-if="shop.showLessonPrice != 1">{{item.courseName }}</div>
						<div class="table-td" v-if="shop.showLessonPrice != 1">{{item.classHour }}</div>
					</div>
				</div>
			</div>
			<div class="form-content" style="margin-bottom: .1rem;height: auto; border: 1px solid #EBEBEB">
				<p class="p2">
					<span class="span1">合计：</span>
					<span class="span2" style="color:#000;">￥{{order.totalAmount | priceFilter}}元</span>
				</p>
				<p class="p2">
					<span class="span1">优惠金额：</span>
					<span class="span2" style="color:#000;"> <span v-if="order.discountAmount >0">-</span>￥{{order.discountAmount | priceFilter}}元</span>
				</p>
				<p class="p2">
					<span class="span1">实付金额：</span>
					<span class="span2" style="color:red;">￥{{order.payedAmount | priceFilter}}元</span>
				</p>
			</div>
			<div class="submit-btn-fixed" v-if="order.state == 0" @click="openToPay">去支付</div>
			<div class="submit-btn-fixed" v-if="order.state == 1" >已支付</div>
		</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
			orderId:0,
			order:'',
			shop:'',
			orderCourseList:[]
        }
    },
    computed: {
        ...mapGetters(['userinfo'])
    },
	onShow() {
		this.getOrderDetail();
	},
	onLoad(e) {
		this.orderId= e.orderId;
	},
    methods: {
		getOrderDetail() {
			uni.showLoading({
				title:'数据加载中'
			})
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/order/orderDetailedV2`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { orderId:this.orderId},
			    success: res => {
					uni.hideLoading();
			        if (res.data.code === 0) {
						this.order = res.data.data;
						this.shop = this.order.shop;
						this.orderCourseList = this.order.orderCourseList;
						console.info(this.orderCourseList);
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
		openToPay(){
			/*uni.showLoading({
				title:'数据处理中'
			})
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/order/prepay`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { orderId:this.orderId},
			    success: res => {
					uni.hideLoading();
			        if (res.data.code === 0) {
						uni.requestPayment({
						    provider: 'wxpay',
						    timeStamp: res.data.data.timeStamp+'',
						    nonceStr: res.data.data.nonceStr,
						    package: 'prepay_id='+res.data.data.package,
						    signType: 'MD5',
						    paySign: res.data.data.paySign,
						    success: function (res) {
								uni.showToast({
									title:'支付成功',
									icon: 'none',
									duration: 1000
								})
						        this.getOrderDetail();
						    },
						    fail: function (err) {
								uni.showToast({
									title:JSON.stringify(err),
									icon: 'none',
									duration: 1000
								})
						    }
						});
			        }else{
						uni.showToast({
							title:res.data.fieldErrors[0].message,
							icon: 'none',
							duration: 1000
						})
					}
			    }
			});*/
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
.form-content{
	background: #fff;
}

.p1{
	padding: 0 10px 0 10px;
	height:24px;
	line-height: 24px;
	font-size:14px;
	font-family: "微软雅黑";
	color: #A7A7A7;
	margin-top: 10px;
}
.p2{
	padding: 0 10px 0 10px;
	padding-bottom:50px;
	height:36px;
	line-height: 36px;
	font-size:20px;
	font-family: "微软雅黑";
	color: #333333;
	/* font-weight: bolder; */
	border-bottom: 1px solid #E9E9E9;
}
.span1{
	display: inline-block;
	float: left;
}
.span2{
	display: inline-block;
	float: right;
	color:#0B9186;
}
.p3{
	height:40px;
	line-height:40px;
	padding: 0 10px 0 10px;
	font-size:16px;
	font-family: "微软雅黑";
	color: #424242;
}
.p3 i{
	float: right;
}

.table, .table div {
margin: 0 auto;
}

.table {
display: table;
width: 100%;
border-collapse: collapse; //合并边框
box-sizing: border-box;
}

.table-tr {
display: table-row; //此元素会作为一个表格行显示（类似 <tr>）
height: 92rpx;
}

.table-th {
display: table-cell; //此元素会作为一个表格单元格显示（类似 <td> 和 <th>）
font-weight: bold;
text-align: left;
vertical-align: middle;
}

.table-td {
display: table-cell;
text-align: left;
vertical-align: middle;
}
</style>