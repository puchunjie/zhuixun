<template>
    <div class="curriculum-container">
        <calendar @selected="tapDate"></calendar>
        <teacherModule v-if="isTeacher" :list="lessonlist"></teacherModule>
        <parentModule v-else></parentModule>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import calendar from '@/components/calendar.vue'
import parentModule from './parentModule'
import teacherModule from './teacherModule'
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
        tapDate(data) {
            console.log(data.fullDate);
			this.startTime = data.fullDate;
			this.getCourseLessonList();
        },
		getCourseLessonList(){
			console.info(this.userinfo.teacherId);
			console.info(this.userinfo.shopId);
			console.info(this.startTime);
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
		}
    },
	onShow() {
		if(this.isTeacher == 1){
			this.getCourseLessonList();
		}
	},

}
</script>

<style lang="less">
@import url('../../styles/base.less');
@import url('../../styles/institutionslIst.less');
page {
    padding: 18upx 20upx 20upx;
    background: #fff;
}

.curriculum-container {
    
}
</style>