<template>
    <div class="class-detail-teacher">
        <div class="class-info">
            <div class="header">
                <div class="text">未签到：{{unSignNum}}</div>
                <div class="text">已签到：{{signNum}}</div>
                <div class="text">请假：{{qingJiaNum}}</div>
            </div>
            <div class="body">
                <div class="class-name">{{courseLesson.className}} <span class="tag">签到中</span></div>
                <div class="gp">
                    <div class="left">{{courseLesson.courseName}}</div>
                    <div class="right">{{courseLesson.startTime | dateformatYMD}}({{courseLesson.startTime | dateformatWeek}})</div>
                </div>
                <div class="gp">
                    <div class="left">{{courseLesson.classRoom}}</div>
                    <div class="right">{{courseLesson.startTime | dateformatHM}}-{{courseLesson.endTime | dateformatHM}}</div>
                </div>
                <div class="gp">
                    <div class="left">{{courseLesson.teacherName}}</div>
                    <div class="right">{{studentNum}}人</div>
                </div>
            </div>
            <div class="tip">2018-12-27 08:02系统自动开放签到表,签到表将于8小时后自动归档</div>
        </div>
    
        <div class="student-list">
            <zxTabs :options="tabs" @tabChange="tabChange" :labelFormat="labelFormat"></zxTabs>
            <div class="item-content">
                <div class="item" v-for="(item,i) in list" :key="i">{{item.studentName }}
					<span v-if="item.isSign == 1" class="tip">已签到</span>
					<span v-if="item.state == 2" class="tip">已请假</span>
					<span v-if="item.state == 3" class="tip">已旷课</span>
				</div>
				
            </div>
        </div>

        <div class="bottom-btn">
            <div class="btn orange">添加试听学员</div>
            <div class="btn green" v-if="isSign === 0" @click="teacherSign">老师签到</div>
			<div class="btn green" v-if="isSign === 1" @click="openToStudentSign">学员签到</div>
        </div>
    </div>
</template>

<script>
import zxTabs from '@/components/tabs.vue'
import { mapGetters } from 'vuex'
export default {
    components: {zxTabs},
    data() {
        return {
            tabs: [{
                label: '正式学员',
                value: 1,
                num: 5
            },{
                label: '试听学员',
                value: 2,
                num: 0
            }],
            list: [],
			lessonId:null,
			courseLesson:"",
			course:null,
			shop:null,
			unSignNum:null,
			signNum:0,
			qingJiaNum:0,
			shiTingStudentNum:0,
			normalStudentNum:0,
			shiTingStudentLessonList:[],
			normalStudentLessonList:[],
			studentNum:0,
			isSign:0,
			
			
        }
    },
    computed: {
		...mapGetters(['isTeacher']),
		...mapGetters(['userinfo']),
    },
    methods: {
        tabChange(tab){
            console.log(tab)
            if(tab.num == 1){
				this.list = this.normalStudentLessonList;
			}else{
				this.list = this.shiTingStudentLessonList;
			}
        },
        labelFormat(tab){
            return `${tab.label}${tab.num}`
        },
		getCourseDetail(){
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/course/courseLesson/viewV2`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { lessonId: this.lessonId , teacherId: this.userinfo.teacherId},
			    success: res => {
					console.info(res.data);
			        if (res.data.code === 0) {
			            var resData = res.data.data;
						this.courseLesson = resData.courseLesson;
						this.course = resData.course;
						this.shop = resData.shop;
						this.unSignNum = resData.unSignNum;
						this.signNum = resData.signNum;
						this.qingJiaNum = resData.qingJiaNum;
						this.shiTingStudentNum = resData.shiTingStudentNum;
						this.normalStudentNum = resData.normalStudentNum;
						this.shiTingStudentLessonList = resData.shiTingStudentLessonList;
						this.normalStudentLessonList = resData.normalStudentLessonList;
						this.list = this.normalStudentLessonList;
						this.isSign = resData.sign.state;
						this.tabs =[{
						    label: '正式学员',
						    value: 1,
						    num: this.shiTingStudentNum
						},{
						    label: '试听学员',
						    value: 2,
						    num: this.shiTingStudentNum
						}];
						this.studentNum = this.shiTingStudentLessonList.length+this.normalStudentLessonList.length;
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
				url: '../curriculum/studentRegistration?lessonId='+this.lessonId
			});
		}
    },
	onLoad(e) {
		this.lessonId = e.lessonId;
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
                color: @gray_black;
                line-height: 26upx;
                margin-top: 24upx;
                display: flex;
                .left,
                .right {
                    width: 50%;
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
        position: fixed;
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
                background-color: #FA8D45;
                border-color: #FA8D45;
            }
            &.green{
                background-color: #0B9186;
                border-color: #1ABC9C;
            }
        }
    }
}
</style>