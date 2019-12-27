<template>
    <div class="user-info">
        <div class="form-div">
			<dateSelect title="选择日期" v-model="beforeAdjustmentTimeStr" @bindChange="getLessonList"></dateSelect>
            <singleElection title="选择课程" v-model="lessonId" @onConfirm="getLessonTime" :data="lessonArray"></singleElection>
			<div class="form-group">
				<div class="label">调课时间</div>
				<div class="value" style="line-height: 106rpx;padding-right: 28rpx;">{{lessonTime}}</div>
			</div>
			<dateSelect title="调课后日期" v-model="afterAdjustmentTimeStr"></dateSelect>
		</div>
    
        <div class="submit-btn-fixed" @click="submit">提交申请</div>
    </div>
</template>

<script>
import singleElection from '@/components/singleElection.vue'
import dateSelect from '@/components/dateSelect.vue'
import df from 'dateformat-util'
import { mapGetters } from 'vuex'
export default {
   components: {singleElection,dateSelect},
	data() {
	    return {
			beforeAdjustmentTimeStr:'',
			lessonId: 0,
			afterAdjustmentTimeStr:'',
			lessonArray:[],
			lessonList:[],
			lessonTime:''
	    }
	},
	computed: {
	    ...mapGetters(['isTeacher']),
		...mapGetters(['userinfo']),
	},
	onShow() {
		this.beforeAdjustmentTimeStr = df.format(new Date(),"yyyy-MM-dd")
		this.getLessonList()
	},
	methods:{
		getLessonList(){
			if(this.beforeAdjustmentTimeStr == ''){
				uni.showToast({
					title:'请选择调课日期',
					icon: 'none',
					duration: 1000
				})
				return
			}
			this.lessonArray = [];
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/course/shop/listCourseLesson`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: {shopId:this.userinfo.shopId, dateTimeStr:this.beforeAdjustmentTimeStr},
			    success: res => {
			        if (res.data.code === 0) {
						this.lessonList = res.data.data || [];
						for (var i = 0; i < this.lessonList.length; i++) {
							let item = {value:this.lessonList[i].lessonId,label:this.lessonList[i].courseName+'-'+this.lessonList[i].className};
							this.lessonArray.push(item);
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
		getLessonTime(data){
			this.lessonId = data.value;
			for (var i = 0; i < this.lessonList.length; i++) {
				if(this.lessonId*1 === this.lessonList[i].lessonId*1){
					this.lessonTime = df.format(new Date(this.lessonList[i].startTime*1000),"hh:mm")
										+"-"
										+df.format(new Date(this.lessonList[i].endTime*1000),"hh:mm");
				}
			}
		},
		submit(){
			if(this.beforeAdjustmentTimeStr == ''){
				uni.showToast({
					title:"调课前时间不能为空",
					icon: 'none',
					duration: 1000
				})
				return;
			}
			if(this.lessonId == 0){
				uni.showToast({
					title:"课程不能为空",
					icon: 'none',
					duration: 1000
				})
				return;
			}
			if(this.afterAdjustmentTimeStr == ''){
				uni.showToast({
					title:"调课后时间不能为空",
					icon: 'none',
					duration: 1000
				})
				return;
			}
			uni.showLoading({ title: '处理中' });
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/course/danJieTiaoKe`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: {tiaokeId:this.userinfo.teacherId,
					   tiaoKeName:this.userinfo.userName,
					   shopId: this.userinfo.shopId,
					   beforeAdjustmentTimeStr: this.beforeAdjustmentTimeStr,
					   lessonId: this.lessonId,
					   afterAdjustmentTimeStr: this.afterAdjustmentTimeStr,
						},
			    success: res => {
			        if (res.data.code === 0) {
						uni.showToast({
							title:"调课成功",
							icon: 'none',
							duration: 1000
						});
						uni.switchTab({
							url:'../index/index'
						})
			        }else{
						uni.showToast({
							title:res.data.fieldErrors[0].message,
							icon: 'none',
							duration: 1000
						})
					}
					uni.hideLoading();
			    }
			});
		}
	}
}
</script>

<style lang="less">
@import url('../../styles/base.less');
.user-info {
    padding-bottom: 150upx;
    .log-sp{
        height: 155upx;
        line-height: 155upx;
        padding: 24upx 40upx;
    }
    .logo-img{
        display: block;
        width: 106upx;
        height: 106upx;
        border-radius: 106upx;
    }
}
</style>