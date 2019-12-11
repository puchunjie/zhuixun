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
			lessonlist: [],
			startTime: null,
			interval: null
		}
	},
	computed: {
		...mapGetters(['isTeacher', 'userinfo']),
	},
	methods: {
		...mapActions(['setUserInfo', 'setTeacher']),
		tapDate(data) {
			console.log(data.fullDate);
			this.startTime = data.fullDate;
			if (this.isTeacher) {
				this.getCourseLessonList();
			} else {
				this.getCourseLessonListForParent();
			}
		},
		getCourseLessonList() {
			uni.request({
				method: 'POST',
				url: `${this.doMain}/course/courseLessonList`,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: { "teacherId": this.userinfo.teacherId, "shopId": this.userinfo.shopId, "startTime": this.startTime },
				success: res => {
					if (res.data.code === 0) {
						console.info(res.data.data);
						this.lessonlist = res.data.data;
					} else {
						uni.showToast({
							title: res.data.fieldErrors[0].message,
							icon: 'none',
							duration: 1000
						})
					}
				}
			})
		},
		getCourseLessonListForParent() {
			uni.request({
				method: 'POST',
				url: `${this.doMain}/course/parent/listCourseClassStudentLessonByParentId`,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: { "parentId": this.userinfo.parentId, "date": this.startTime },
				success: res => {
					if (res.data.code === 0) {
						console.info(res.data.data);
						this.lessonlist = res.data.data;
					} else {
						uni.showToast({
							title: res.data.fieldErrors[0].message,
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
		},
		getData() {
			console.log('获取信息')
		},
		start() {
			//避免重复多次轮询
			/*if(this.interval) return
			console.log('开始')
			this.interval = setInterval(() => {
				//do something
				this.getData();
			}, 2000);*/
		},
		stop() {
			console.log('销毁');
			this.interval = null;
		}
	},
	onShow() {
		this.startTime = this.getNowFormatDate();
		/*this.setUserInfo({parentId:4,shopId:6});*/
		/*this.setUserInfo({teacherId:14,shopId:6,userName:'梁慧'});
		this.setTeacher(true);*/
		if (this.isTeacher) {
			this.getCourseLessonList();
		} else {
			this.getCourseLessonListForParent();
		}
		//一级页面在onShow中开始，二级页面在onLoad中开始
		this.start();
	},
	onUnload() {
		// 一级页面 不会再内存中销毁 用这个生命周期函数清除轮询
		this.stop();
	},
	onHide() {
		// 二级页面 清除轮询 用这个钩子
		this.stop();
	}

}
</script>

<style lang="less">
@import url('../../styles/base.less');
@import url('../../styles/institutionslIst.less');
page {
	padding: 18upx 20upx 20upx;
	background: #fff;
}

button {
	width: 25%;
	text-align: center;
	padding: 28rpx 0 50rpx 0;
}

.curriculum-container {}
</style>