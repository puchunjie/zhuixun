<template>
    <div class="leave-container">
        <div class="form-div">
            <!-- ScEnumKey在utils/enums.js中维护 用于静态枚举值 动态值传入data : [value:1,label:'xxx'] -->
            <singleElection title="请假类型" v-model="form.leaveType" ScEnumKey="leaveTypeEnum"></singleElection>
            <dateSelect title="开始时间" v-model="form.leaveStartTimeStr"></dateSelect>
            <dateSelect title="结束时间" v-model="form.leaveEndTimeStr"></dateSelect>
        </div>
    
        <div class="form-div">
            <div class="form-group block">
                <div class="label">请假理由</div>
                <div class="value">
                    <textarea v-model="form.leaveReason" class="text-area" placeholder="填写请假理由" />
                </div>
            </div>
        </div>

        <div class="submit-btn-fixed" @click="submit">提交</div>
    </div>
</template>

<script>
import singleElection from '~/singleElection.vue'
import dateSelect from '~/dateSelect.vue'
import { mapGetters } from 'vuex'
export default {
    components: {dateSelect,singleElection},
    data() {
        return {
            form: {
				leaveType:'',
                leaveStartTimeStr: '',
                leaveEndTimeStr: '',
                leaveReason: '',
				teacherId: 0
            }
        }
    },
	computed: {
		...mapGetters(['isTeacher']),
		...mapGetters(['userinfo']),
	},
	methods:{
		submit() {
			if(this.form.leaveType == ''){
				uni.showToast({
					title:"请选择请假类型",
					icon: 'none',
					duration: 1000
				})
				return false;
			}
			if(this.form.leaveStartTimeStr == ''){
				uni.showToast({
					title:"请选择请假开始时间",
					icon: 'none',
					duration: 1000
				})
				return false;
			}
			if(this.form.leaveEndTimeStr == ''){
				uni.showToast({
					title:"请选择请假结束时间",
					icon: 'none',
					duration: 1000
				})
				return false;
			}
			if(this.form.leaveReason == ''){
				uni.showToast({
					title:"请选择请假理由",
					icon: 'none',
					duration: 1000
				})
				return false;
			}
			this.form.teacherId = this.userinfo.teacherId;
			uni.request({
				method: 'POST',
				url: `${this.doMain}/leave/teacherLeave/add`,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: this.form,
				success: res => {
					if (res.data.code === 0) {
						uni.showToast({
							title:"请假成功",
							icon: 'none',
							duration: 1000
						})
						uni.switchTab({
							url: '/pages/index/index'
						});
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
	}
}
</script>

<style lang="less">
@import url('../../../styles/base.less');
</style>