<template>
    <div class="curriculum-container">
        <calendar @selected="tapDate"></calendar>
        <teacherModule v-if="isTeacher" :list="lessonlist"></teacherModule>
        <parentModule v-else :list="lessonlist"></parentModule>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import calendar from '@/components/calendar.vue'
import parentModule from './courseListParentModule'
import teacherModule from './courseListTeacherModule'
export default {
    components: {
        calendar,
        parentModule,
        teacherModule
    },
	data() {
	    return {
			lessonlist:[],
			startTime:null,
	    }
	},
    computed: {
        ...mapGetters(['isTeacher']),
		...mapGetters(['userinfo']),
    },
    methods: {
		...mapActions(['setUserInfo', 'setTeacher']),
        tapDate(data) {
            console.log(data.fullDate);
			this.startTime = data.fullDate;
			if(this.isTeacher){
				this.getCourseLessonList();
			}else{
				this.getCourseLessonListForParent();
			}
        },
		getCourseLessonList(){
			uni.request({
				method: 'POST',
				url: `${this.doMain}/course/courseLessonList`,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {"teacherId":this.userinfo.teacherId,"shopId":this.userinfo.shopId,"startTime":this.startTime},
				success: res => {
					if (res.data.code === 0) {
						console.info(res.data.data);
						this.lessonlist = res.data.data;
					}else{
						uni.showToast({
							title:res.data.fieldErrors[0].message,
							icon: 'none',
							duration: 1000
						})
					}
				}
			})
		},
		getCourseLessonListForParent(){
			uni.request({
				method: 'POST',
				url: `${this.doMain}/course/parent/listCourseClassStudentLessonByParentId`,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {"parentId":this.userinfo.parentId, "date":this.startTime,states:'1'},
				success: res => {
					if (res.data.code === 0) {
						this.lessonlist = res.data.data;
					}else{
						uni.showToast({
							title:res.data.fieldErrors[0].message,
							icon: 'none',
							duration: 1000
						})
					}
				}
			})
		},
		getNowFormatDate() {
		  var date = new Date();
		  var seperator1 = "-";
		  var year = date.getFullYear();
		  var month = date.getMonth() + 1;
		  var strDate = date.getDate();
		  if (month >= 1 && month <= 9) {
		    month = "0" + month;
		  }
		  if (strDate >= 0 && strDate <= 9) {
		    strDate = "0" + strDate;
		  }
		  var currentdate = year + seperator1 + month + seperator1 + strDate;
		  return currentdate;
		}
    },
	onShow() {
		this.startTime = this.getNowFormatDate();
		/*this.setUserInfo({parentId:4,shopId:6});*/
		/*this.setUserInfo({teacherId:14,shopId:6});
		this.setTeacher(true);*/
		if(this.isTeacher){
			this.getCourseLessonList();
		}else{
			this.getCourseLessonListForParent();
		}
	},

}
</script>

<style lang="less">
@import url('../../../styles/base.less');
@import url('../../../styles/institutionslIst.less');
page {
    padding: 18upx 20upx 20upx;
    background: #fff;
}
button{
	width: 25%;
	text-align: center;
	padding: 28rpx 0 50rpx 0;
}
.curriculum-container {
    
}
</style>