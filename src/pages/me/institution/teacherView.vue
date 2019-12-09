<template>
	<div class="class-detail-teacher">
		<div class="class-info">
		    <p class="p5">
			<image class="logo" :src="teacher.portrait"></image>
				<span>{{teacher.userName }}</span>
				<span class="smallfont">{{teacher.college }}</span>
				<span class="smallfont" v-if="teacher.degree == 1">高中</span>
				<span class="smallfont" v-if="teacher.degree == 2">中专</span>
				<span class="smallfont" v-if="teacher.degree == 3">大专</span>
				<span class="smallfont" v-if="teacher.degree == 4">本科</span>
				<span class="smallfont" v-if="teacher.degree == 5">硕士</span>
				<span class="smallfont" v-if="teacher.degree == 6">博士</span>
				<span class="smallfont" v-if="teacher.degree == 7">博士后</span>
			</p>
		</div>
		
		<div class="class-info">
		    {{remark}}
		</div>
		
		<div class="class-info">
			<p class="p5">
				<image class="logo" :src="shop.logoPic"></image>
				{{shop.shopName }}
			</p>
			<p class="p6" @click="openToInstDetail">
				查看机构
			</p>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
			teacherId:0,
			teacher:'',
			remark:'',
			shopId:0,
			shop:''
        }
    },
    computed: {
		...mapGetters(['isTeacher']),
		...mapGetters(['userinfo']),
    },
    methods: {
		getTeacherDetail(){
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/teacher/view`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { teacherId: this.teacherId},
			    success: res => {
			        if (res.data.code === 0) {
			            this.teacher = res.data.data;
						this.teacher.portrait = this.imgUrl + this.teacher.portrait;
						this.remark = this.teacher.remark
			        }
			    }
			});
		},
		getShopDetail(){
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/shop/view`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { shopId: this.shopId},
			    success: res => {
			        if (res.data.code === 0) {
			            this.shop = res.data.data;
						this.shop.logoPic = this.imgUrl + this.shop.logoPic;
			        }
			    }
			});
		},
		openToTeachers(){
			uni.navigateTo({
				url: '../../me/institution/instTeachers?shopId='+this.shopId
			});
		},
		openToInstDetail(){
			uni.navigateTo({
				url:'../../me/institution/instView?shopId='+this.shop.shopId
			})
		},
    },
	onLoad(e) {
		this.teacherId = e.teacherId;
		this.shopId = e.shopId
	},
	onShow() {
		this.getTeacherDetail();
		this.getShopDetail();
	}
}
</script>

<style lang="less">
@import url('../../../styles/base.less');
page {
    padding: 20upx 20upx 160upx;
}

.class-detail-teacher {
    .class-info {
		margin-top: 20rpx;
        width: 100%;
        border-radius: 8upx;
        background: #fff;
        overflow: hidden;
        padding-bottom: 27upx;
        box-shadow: 0 6upx 6upx 0 rgba(74, 98, 139, 0.15);
		padding: 20rpx;
        .header {
            display: flex;
            width: 100%;
            height: 60upx;
            line-height: 60upx;
            color: #fff;
            background: @dark_green;
            padding: 0 40upx;
            font-size: 26upx;
            justify-content: space-between;
        }
        .body {
            width: 100%;
            padding: 20upx 40upx;
            .class-name {
                position: relative;
                height: 34upx;
                line-height: 34upx;
                color: @dark_green;
                font-size: 30upx;
                font-weight: 500;
                .tag {
                    display: inline-block;
                    padding: 0 19upx;
                    height: 34upx;
                    line-height: 32upx;
                    border: 1upx solid #FF7052;
                    color: #FF7052;
                    font-size: 24upx;
                    margin-left: 20upx;
                    font-weight: normal;
                }
                &:before {
                    left: -30upx;
                    top: 5upx;
                    display: block;
                    position: absolute;
                    content: '';
                    width: 20upx;
                    height: 20upx;
                    border: 2upx solid rgba(204, 204, 204, 1);
                    border-radius: 50%;
                }
            }
            .gp {
                width: 100%;
                height: 26upx;
                font-size: 26upx;
                color: #0A9187;
                line-height: 26upx;
                margin-top: 24upx;
                display: flex;
                .left,
                .right {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .tip {
            position: relative;
            width: 670upx;
            margin: 30upx auto 0;
            padding: 20upx 46upx;
            background: #EDF8F6;
            color: #7FBCB4;
            font-size: 28upx;
            line-height: 34upx;
            &:before {
                left: 21upx;
                top: 23upx;
                display: block;
                position: absolute;
                content: '!';
                width: 20upx;
                height: 20upx;
                border: 2upx solid #7FBCB4;
                border-radius: 50%;
                color: #7FBCB4;
                font-size: 18upx;
                text-align: center;
                line-height: 20upx;
            }
        }
		.bottom-btn {
			margin-top:20rpx;
		}
		.bottom-btn .btn {
			width: 260rpx;
			height: 60rpx;
			line-height: 60rpx;
			border-right: 8rpx;
			border: 1px solid transparent;
			color: #fff;
			text-align: center;
			font-size: 34rpx;
			border-radius: 8rpx;
		}
    }
	
    .student-list {
        width: 100%;
        background: #fff;
        border-radius: 8upx;
        margin-top: 20upx;
        overflow: hidden;
        .item-content{
            padding: 20upx 20upx 0;
            .item{
                width: 100%;
                height: 100upx;
                line-height: 100upx;
                color: @gray_black;
                font-size: 30upx;
                font-weight: 500;
                padding-left: 20upx;
                &:not(:last-child){
                    border-bottom: 1px solid #E6E6E6;
                }
            }
        }
    }
	.tip {
	    float: right;
	    color: #7FBCB4;
	}
}	.p1{
		height:72upx;
		line-height: 72upx;
		font-size:32upx;
		font-family: "微软雅黑";
		color: #333333;
	}
	.p2{
		height:44upx;
		line-height: 44upx;
		font-size:28upx;
		font-family: "微软雅黑";
		color: #8E8E8E;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.p2 img{
		margin-left:60upx;
		width:28upx;
		height:28upx;
	}
	.p3{
		padding-top: 20upx;
		padding-bottom: 20upx;
	}
	.p4{
		color:#333333;
		height:72upx;
		line-height: 72upx;
		font-size:32upx;
		font-family: "微软雅黑";
		font-weight: bolder;
	}
	.p5{
		height:120upx;
		line-height: 120upx;
		font-size:36upx;
		text-align: left;
		color: #333333;
	}
	.p6{
		text-align: center;
		color: #fff;
		background:#1ABC9C;
		padding-top: 16upx;
		padding-bottom: 16upx;
		border-radius: 10upx;
		font-size: 32upx;
	}
	.logo{
		width:80upx;
		height: 80upx;
		vertical-align: middle;
	}
	.smallfont{
		font-size: 26rpx;
		color: #0A9187;
		padding-left: 10rpx;
	}
</style>