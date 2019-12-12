<template>
    <div class="user-info">
        <div class="form-div">
            <div class="form-group">
                <div class="label">姓名</div>
                <div class="value">
                    <input v-model="form.studentName" placeholder="请输入姓名" />
                </div>
            </div>
            <div class="form-group">
                <div class="label">手机号</div>
                <div class="value">
                    <input v-model="form.mobilePhone" placeholder="请填写手机号" />
                </div>
            </div>
            <dateSelect title="出生日期" v-model="form.birthday"></dateSelect>
            <singleElection title="性别" v-model="form.gender" :data="[{value: 1,label: '男'},{value: 2,label: '女'}]"></singleElection>
        </div>
    
        <div class="submit-btn-fixed" @click="submit">提交</div>
    </div>
</template>

<script>
import Vue from "vue";
import df from 'dateformat-util'
import upload from '@/components/uploadPortrait.vue'
import dateSelect from '~/dateSelect.vue'
import singleElection from '~/singleElection.vue'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
export default  Vue.extend({
    components: { dateSelect, singleElection,upload},
	data() {
	    return {
	        form: {
	            mobilePhone: '',
				birthday:'',
				gender:1,
				studentName:'',
				parentId:0
	        },
	    }
	},
	computed: {
	    ...mapGetters(['isTeacher']),
		...mapGetters(['userinfo']),
	},
	methods:{
		...mapActions(['setUserInfo', 'setTeacher']),
		onShow() {
			this.form.mobilePhone = this.userinfo.mobilePhone;
			this.form.parentId = this.userinfo.parentId;
		},
		submit(){
			if(this.form.studentName == ''){
				uni.showToast({
					title:'姓名不能为空',
					icon: 'none',
					duration: 1000
				})
				return;
			}
			if(this.form.mobilePhone == ''){
				uni.showToast({
					title:'手机号不能为空',
					icon: 'none',
					duration: 1000
				})
				return;
			}
			if(this.form.birthday==''){
				uni.showToast({
					title:'出生日期不能为空',
					icon: 'none',
					duration: 1000
				})
				return;
			}
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/student/addV2`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: this.form,
			    success: res => {
			        if (res.data.code === 0) {
						uni.showToast({
							title:'添加成功',
							icon: 'none',
							duration: 1000
						})
			            uni.navigateTo({
			                url: '../../me/studentMana/index'
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
})
</script>

<style lang="less">
@import url('../../../styles/base.less');
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