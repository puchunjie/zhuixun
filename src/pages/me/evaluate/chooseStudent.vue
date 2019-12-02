<template>
	<div class="class-detail-teacher">
	    <div class="class-info">
	        <div class="body">
	            <div class="class-name">当前班级：{{courseLesson.className }}</div>
				 <div class="class-name">当前课程：{{courseLesson.courseName }}</div>
				<div class="bottom-btn">
				    <div class="btn orange" @click="openToAllStudentEvaluate">发布全班级评价</div>
				    <div class="btn green" @click="openToChooseCourse">切换班级课程</div>
				</div>
	        </div>
	    </div>
		<div class="content class-info">
			<div class="sd-item" :class="{ 'check': item.check }" v-for="(item,i) in studentLesson" :key="i" @click="check(item)">
				<i v-if="item.teacherEvaluationed === 0" class="iconfont iconxuanze" :class="{ 'check': item.check }"></i> {{ item.studentName }}
				<span v-if="item.teacherEvaluationed === 1" class="tip">已评价</span>
			</div>
			
			<div class="fix-btottom">
				<div class="btn" @click="submit">提交</div>
			</div>
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
			lessonId:0,
			courseLesson:"",
			studentLesson:[],
			unEvaluationSize:0,
			studentLessonId:0,
			studentName:''
        }
    },
    computed: {
		...mapGetters(['isTeacher']),
		...mapGetters(['userinfo']),
    },
    methods: {
		check(item) {
			this.studentLesson.map(item => {
			    item.check = false;
			    return item
			})
		    item.check = !item.check;
			this.studentLessonId = item.studentLessonId;
			this.studentName = item.studentName;
		},
		getLessonDetail(){
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/evaluation/courseLesson/view`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { lessonId: this.lessonId},
			    success: res => {
					console.info(res.data);
			        if (res.data.code === 0) {
			            var resData = res.data.data;
						this.courseLesson = resData.courseLesson;
						this.studentLesson = resData.studentLesson;
						this.unEvaluationSize = resData.unEvaluationSize;
						if(this.studentLesson != null && this.studentLesson.length > 0){
							this.studentLesson.map(item => {
								item.check = false;
								return item
							})
						}
			        }
			    }
			});
		},
		openToChooseCourse(){
			uni.navigateTo({
				url: '../../me/evaluate/chooseCourse'
			});
		},
		openToAllStudentEvaluate(e){
			if(this.studentLesson.length <= 0){
				uni.showToast({
					title:"当前班级没有学生签到，无法发布",
					icon: 'none',
					duration: 1000
				})
				return;
			}
			if(this.unEvaluationSize == 0){
				uni.showToast({
					title:"当前班级学员已全部评价，无法发布",
					icon: 'none',
					duration: 1000
				})
				return;
			}
			uni.navigateTo({
				url: '../../me/evaluate/allStudent?lessonId='+this.courseLesson.lessonId
			});
		},
		submit(){
			if(this.studentLessonId == 0){
				uni.showToast({
					title:'请选择学生',
					icon: 'none',
					duration: 1000
				})
				return;
			}
			uni.navigateTo({
				url: '../../me/evaluate/singleStudent?studentLessonId='+this.studentLessonId+'&studentName='+this.studentName+'&lessonId='+this.courseLesson.lessonId
			});
		}
    },
	onLoad(e) {
		this.lessonId = e.lessonId;
	},
	onShow() {
		this.getLessonDetail();
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
			line-height: 52rpx;
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
			margin-top: 20upx;
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
}
.content {
        margin-top: 20upx;
        width: 100%;
        background-color: #fff;
        overflow: hidden;
        .sd-item {
            position: relative;
            width: 100%;
            height: 106upx;
            line-height: 106upx;
            padding: 0 40upx 0 90upx;
            color: @gray_black;
            font-size: 30upx;
            .iconfont {
                position: absolute;
                color: #ccc;
                font-size: 36upx;
                margin-right: 18upx;
                left: 40upx;
            }
            &:not(:last-child) {
                border-bottom: 1px solid @line_gray;
            }
            .tip {
                position: absolute;
                right: 40upx;
                color: @light_gray;
            }
            &.check .iconfont {
                color: @base_green;
            }
            &.b {
                border-bottom: 1px solid @line_gray;
            }
        }
    }
    .fix-btottom {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #fff;
        .btn {
            width: 711upx;
            height: 99upx;
            background: rgba(29, 92, 84, 1);
            margin: 17upx auto;
            text-align: center;
            color: #fff;
            line-height: 99upx;
            font-size: 34upx;
        }
    }
	
</style>