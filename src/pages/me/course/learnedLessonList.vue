<template>
    <div class="lesson-module">
        <div class="item"  v-for="item in lessonList" :key="item.studentLessonId">
            <div class="top">
				<div class="tit">
					课程：{{item.courseName}}
					<div v-show="item.lessonType == 1" class="state-ttg">试听课</div>
				</div>
				<div class="detail">
					<div class="title">消耗课时：</div>
					<div class="content">{{item.classHours == null ? 0 :item.classHours}}节</div>
				</div>
				<div class="detail">
					<div class="title">学生：</div>
					<div class="content">{{item.studentName}}</div>
				</div>
				<div class="detail">
					<div class="title">时间：</div>
					<div class="content">{{item.startTime | dateformatYMD}}  {{item.startTime | dateformatHM}}-{{item.endTime | dateformatHM}}</div>
				</div>
            </div>
            <div class="bottom">
				签到时间：
				<span  v-show="item.state !=3">{{item.signTime | dateformat}} </span>
				<span  v-show="item.state ==3">旷课未签到 </span>
			</div>
        </div>
        <p v-if="lessonList.length === 0" class="no-lesson">暂无记录~</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            lessonList: []
        }
    },
    computed: {
        ...mapGetters(['userinfo'])
    },
	onLoad() {
		this.getLessonList();
	},
    methods: {
		getLessonList() {
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/course/parent/learnedLesson`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { parentId: this.userinfo.parentId},
			    success: res => {
			        if (res.data.code === 0) {
			            this.lessonList = res.data.data;
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
.lesson-module {
    margin-top: 30upx;
    min-height: 280upx;
    .no-lesson {
        line-height: 280upx;
        color: #999;
        font-size: 26upx;
        text-align: center;
    }
    .item {
        width: 100%;
        background: rgba(255,255,255,1);
        border: 1px solid rgba(230, 230, 230, 1);
        border-radius: 8upx;
        margin-top: 20upx;
        .top {
			width: 100%;
			.tit{
				position: relative;
				display: flex;
				padding: 0 30upx 0 30upx;	
				width: 100%;
				height: 80upx;
				line-height: 80upx;
				font-size: 30upx;
				color: #242039;
				font-weight:bold;
				border-bottom: 1px solid rgba(229,229,229,1);
				.state-ttg {
					position: absolute;
					width: 120upx;
					height: 36upx;
					line-height: 36upx;
					text-align: center;
					font-size: 26upx;
					color: rgba(28,92,84,1);
					background: rgba(10, 145, 135, 1);
					border-radius:18upx;
					right: 10upx;
					top: 22upx;
				}
			}	
			.detail{
				padding: 0 30upx 0 30upx;	
				width: 100%;
				height: 60upx;
				line-height: 60upx;
				font-size: 26upx;
				.title{
					float: left;
					color: #999999;
					width: 145upx;
				}
				.content{
					float: left;
					color: #333333;
				}
			}
        }
        .bottom {
			padding: 0 30upx 0 30upx;	
            width: 100%;
            height: 80upx;
			line-height: 80upx;
            font-size: 26upx;
            color: #0A9187;
            border-top: 1px solid rgba(229,229,229,1);
            padding: 0 30upx 0 30upx;
			font-weight:500;
        }
    }
}
</style>