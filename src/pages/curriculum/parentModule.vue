<template>
    <div class="parent-module">
        <div class="jigou-list-container mt30">
			<label>课日程总数 {{list.length}}</label>
            <div class="item" v-for="(item,i) in list" :key="i" >
                <div class="info" @click="openToCourse" :data-studentlessonid="item.studentLessonId">
                    <h3 class="time">课程：{{ item.courseName }}
						<span class="name lessontype" v-if="item.lessonType === 0">正式课</span>
						<span class="name lessontype" v-if="item.lessonType === 1">试听课</span>
						<span class="name lessontype" v-if="item.lessonType === 2">临时课</span>
					</h3>
                    <div class="place">
						{{ item.startTime | dateformatYMD }}
						{{ item.startTime | dateformatHM }}-{{ item.endTime | dateformatHM }}
                    </div>
                </div>
				<div class="lessonbottom">
					<div class="place">
					     教室：{{ item.classRoom}}  &nbsp;&nbsp;学员：{{ item.studentName}}
						 <span v-if="item.state === 2">已请假</span>
						 <span v-if="item.state === 1">已签到</span>
						 <span v-if="item.state === 3">已旷课</span>
						 <span class="qingjia" @click="openToLeave" :data-studentlessonid="item.studentLessonId" v-if="item.state === 0">请假</span>
						 <!-- TODO 这个请假是要跳弹框的，我跳转到了请假那里 -->
					</div>
				</div>
            </div>
            <p v-if="list.length === 0" class="no-class">今日暂无课程~</p>
        </div>
    </div>
</template>

<script>
export default {
	props: {
	    list: {
	        type: Array,
	        default: function() {
	            return []
	        }
	    }
	},
    data() {
        return {
			leaveReason:'',
			payShow:false,
			actions: [{
			        name: '取消'
			    },
			    {
			        name: '',
			        color: '#ed3f14',
			        loading: false
			    }
			],
			studentLessonId: ''
        }
    },
	methods:{
		openToCourse(e){
			var studentLessonId = e.currentTarget.dataset.studentlessonid;
			uni.navigateTo({
				url: '../curriculum/classDetail_parent?studentLessonId='+studentLessonId
			});
		},
		openToLeave(e){
			// this.payShow = true;
			// this.studentLessonId = e.currentTarget.dataset.studentlessonid;
			uni.navigateTo({
				url:'../me/leave/student'
			})
		},
		handleClick({ leaveReason }) {
		    if (leaveReason === '') {
				uni.showToast({
				    title: '请填写请假理由'
				})
		        this.payShow = false;
		    } else {
				console.info(leaveReason);
		        this.actions[1].loading = true;
		        uni.request({
		            method: 'POST',
		            url: `${this.doMain}/leave/addLevaeForJson`,
		            header: {
		                'content-type': 'application/x-www-form-urlencoded'
		            },
		            data: {
		                leaveReason: leaveReason,
		                studentLessonId: this.studentLessonId
		            },
		            success: res => {
		                if (res.data.code === 0) {
		                    this.actions[1].loading = false;
		                    uni.showToast({
		                        title: '请假成功'
		                    })
		                    this.payShow = false
		                }
		            }
		        });
		
		    }
		},
	}
}
</script>

<style lang="less">
.parent-module {
    .mt30 {
        margin-top: 30upx;
        min-height: 280upx;
        .no-class {
            line-height: 280upx;
            color: #999;
            font-size: 26upx;
            text-align: center;
        }
    }
	.lessontype{
		display: inline-block;
		background-color: rgba(171, 204, 255, 0.4);;
		color: #7ba1dd;
		text-align: center;
		border-radius: .15rem;
		margin-left: .1rem;
	}
	.lessonbottom{
	    position: relative;
	    width: 100%;
	    padding-left: 30upx;
	    color: #333333;
		border-top: 1px solid #999;
		padding-top: 30upx;

	}
	
	.qingjia{
	    float: right;
	    border: 1px solid #0b9186;
	    text-align: center;
	    color: #0b9186;
		width:100rpx;

	}
	.jigou-list-container .item{
		height:230upx;
		display: flex;
		flex-direction: column;
		padding-bottom: 30upx;

	}
}
</style>