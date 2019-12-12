<template>
    <div class="user-info">
        <div class="form-div">
            <div class="form-group">
                <div class="label">姓名</div>
                <div class="value">
                    <input v-model="form.realName" placeholder="请输入姓名" />
                </div>
            </div>
			<div class="form-group">
			    <div class="label">昵称</div>
			    <div class="value">
			        <input v-model="form.nickName" placeholder="请输入昵称" />
			    </div>
			</div>
            <div class="form-group">
                <div class="label">手机号</div>
                <div class="value">
                    <input v-model="form.mobilePhone" placeholder="请填写手机号" />
                </div>
            </div>
            <singleElection title="性别" v-model="form.gender" :data="[{value: 1,label: '男'},{value: 2,label: '女'}]"></singleElection>
        </div>
		<div class="query-btn">
		    <div class="btn" @click="submit">+添加</div>
		</div>
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
				realName:'',
				nickName:'',
				gender:1,
				teacherId:0
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
			this.form.teacherId = this.userinfo.teacherId;
		},
		submit(){
			if(this.form.realName == ''){
				uni.showToast({
					title:'姓名不能为空',
					icon: 'none',
					duration: 1000
				})
				return;
			}
			if(this.form.nickName == ''){
				uni.showToast({
					title:'昵称不能为空',
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
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/parent/add`,
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
			                url: '../../me/parent/parentList'
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
	.query-btn {
	    width: 100%;
	    padding: 20upx 40upx;
	    .btn {
	        width: 100%;
	        height: 66upx;
	        line-height: 66upx;
	        text-align: center;
	        border: 1px dotted @dark_green;
	        border-radius: 8upx;
	        color: @dark_green;
	        background: #fff;
	    }
	}
}
</style>