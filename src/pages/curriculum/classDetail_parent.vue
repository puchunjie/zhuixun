<template>
	<div class="class-detail-teacher">
		<div class="tankuang" v-if="isQrShow">
		</div>
		<div class="erweima-warp" v-if="isQrShow">
			<p class="tip-word">请向老师出示二维码签到</p>
			<tki-qrcode style="display:inline-block" ref="qrcode" cid="cid" :val="studentId" :size="200" unit="upx" loadMake onval/>
			<p class="tip-word" @click="hideQr">关闭</p>
		</div>
	    <div class="class-info">
	        <div class="body">
	            <div class="class-name">当前班级：{{courseClassStudentLesson.className }}</div>
	            <div class="gp">
	                <div class="left">时间：{{courseClassStudentLesson.startTime | dateformat }} - {{courseClassStudentLesson.endTime | dateformatHM }}</div>
	            </div>
	            <div class="gp">
	                <div class="left">地址：{{shop.districtFullName}}</div>
	            </div>
	            <div class="gp">
	                <div class="left">耗费课时：{{course.lessonMinutes}}</div>
	            </div>
				<div class="bottom-btn">
				    <div class="btn orange" @click="showQr">签到</div>
				    <div class="btn green">请假</div>
				</div>
	        </div>
	    </div>
		<div class="class-info">
		    <div class="body">
		        <p class="p4">上课须知</p>
				<p class="p2">1、请自备画架、画板、铅笔、碳棒等上课必要耗材。</p>
				<p class="p2">2、本课程没有课间休息，课程连贯到底。</p>
				<p class="p2">3、上课迟到早退不补学时。</p>
				<p class="p2">4、无故改课、换课、缺课学时不退。</p>
			</div>
		</div>
		<div class="class-info">
		    <p class="p4">课程介绍</p>
		    {{course.description }}
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
import tkiQrcode from 'tki-qrcode/components/tki-qrcode/tki-qrcode.vue'
import { mapGetters } from 'vuex'
export default {
    components: {tkiQrcode},
    data() {
        return {
			studentLessonId:null,
			courseClassStudentLesson:"",
			course:null,
			shop:null,
			qrsize: 120, // 二维码大小
			studentId: 0,
			isQrShow:false,
			
        }
    },
    computed: {
		...mapGetters(['isTeacher']),
		...mapGetters(['userinfo']),
    },
    methods: {
		getCourseDetail(){
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/course/studentLesson/view`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { studentLessonId: this.studentLessonId},
			    success: res => {
					console.info(res.data);
			        if (res.data.code === 0) {
			            var resData = res.data.data;
						this.course = resData.course;
						this.shop = resData.shop;
						this.courseClassStudentLesson = resData.courseClassStudentLesson;
						this.shop.logoPic = this.imgUrl + this.shop.logoPic;
						this.studentId = this.courseClassStudentLesson.studentId;
			        }
			    }
			});
		},
		teacherSign(){
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/course/teacher/sign`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { lessonId: this.lessonId , teacherId: this.userinfo.teacherId},
			    success: res => {
					console.info(res.data);
			        if (res.data.code === 0) {
			            uni.showToast({
			            	title:'老师签到成功',
			            	icon: 'none',
			            	duration: 1000
			            })
						this.isSign = 1;
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
		openToStudentSign(){
			uni.navigateTo({
				url: '../curriculum/studentRegistration?lessonId='+this.studentLessonId
			});
		},
		showQr(){
			this.isQrShow = true;
		},
		hideQr(){
			this.isQrShow = false;
		}
    },
	onLoad(e) {
		this.studentLessonId = e.studentLessonId;
		this.getCourseDetail();
	}
}
</script>

<style lang="less">
@import url('../../styles/base.less');
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

    .bottom-btn{
        width: 100%;
        height: 135upx;
        background: #fff;
        bottom: 0;
        left: 0;
        z-index: 10;
        display: flex;
        justify-content: space-between;
        padding: 17upx 20upx;
        border-top: 1px solid #DADADA;
        .btn{
            width: 344upx;
            height: 100%;
            line-height: 100upx;
            border-right: 8upx;
            border: 1px solid transparent;
            color: #fff;
            text-align: center;
            font-size: 34upx;
            border-radius: 8upx;
            &.orange{
                background-color: #1E9FFF;
                border-color: #1E9FFF;
            }
            &.green{
                background-color: #0B9186;
                border-color: #1ABC9C;
            }
        }
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
		text-align: center;
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