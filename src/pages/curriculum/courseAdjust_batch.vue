<template>
    <div class="user-info">
        <div class="form-div">
			<dateSelect title="选择日期" v-model="beforeAdjustmentTimeStr" ></dateSelect>
			<dateSelect title="调课后日期" v-model="afterAdjustmentTimeStr"></dateSelect>
		</div>
    
        <div class="submit-btn-fixed" @click="submit">提交申请</div>
    </div>
</template>

<script>
import dateSelect from '@/components/dateSelect.vue'
import { mapGetters } from 'vuex'
export default {
   components: {dateSelect},
	data() {
	    return {
			beforeAdjustmentTimeStr:'',
			afterAdjustmentTimeStr:'',
	    }
	},
	computed: {
	    ...mapGetters(['isTeacher']),
		...mapGetters(['userinfo']),
	},
	onShow() {
	},
	methods:{
		submit(){
			if(this.beforeAdjustmentTimeStr == ''){
				uni.showToast({
					title:"调课前时间不能为空",
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
			    url: `${this.doMain}/course/piLiangTiaoKe`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: {tiaokeId:this.userinfo.teacherId,
					   tiaoKeName:this.userinfo.userName,
					   shopId: this.userinfo.shopId,
					   beforeAdjustmentTimeStr: this.beforeAdjustmentTimeStr,
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