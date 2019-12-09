<template>
    <div class="user-info">
		<div class="form-div">
			<div class="form-group">
			    <div class="label">二维码</div>
			    <div class="value">
					<div class="erweima-warp" >
						<tki-qrcode style="display:inline-block" ref="qrcode" cid="cid" :val="link" :size="200" unit="upx" loadMake onval/>
					</div>
			    </div>
			</div>
		</div>
        <div class="form-div">
			<div class="form-group">
			    <div class="label">编号</div>
			    <div class="value" style="padding-top: 36rpx;padding-right: 45rpx;">{{studentcode}}
			    </div>
			</div>
            <div class="form-group">
                <div class="label">姓名</div>
                <div class="value">
                    <input v-model="form.studentName" placeholder="请输入姓名" />
                </div>
            </div>
            <div class="form-group">
                <div class="label">家长手机</div>
                <div class="value">
                    <input v-model="form.mobilePhone" placeholder="请填写手机号" />
                </div>
            </div>
            <dateSelect title="生日" v-model="form.birthday"></dateSelect>
            <singleElection title="性别" v-model="form.gender" :data="[{value: 1,label: '男'},{value: 2,label: '女'}]"></singleElection>
			<div class="form-group">
			    <div class="label">家庭住址</div>
			    <div class="value" style="padding-top: 36rpx;padding-right: 45rpx;">{{homeAddress}}</div>
			</div>
		</div>
        <div class="submit-btn-fixed" @click="submit">提交</div>
    </div>
</template>

<script>
import Vue from "vue";
import df from 'dateformat-util'
import dateSelect from '~/dateSelect.vue'
import singleElection from '~/singleElection.vue'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import tkiQrcode from 'tki-qrcode/components/tki-qrcode/tki-qrcode.vue'
export default  Vue.extend({
    components: { dateSelect, singleElection,tkiQrcode},
	data() {
	    return {
	        form: {
	            mobilePhone: '',
				birthday:'',
				gender:1,
				studentName:'',
				studentId:0
	        },
			studentcode:'',
			homeAddress:'',
			link:''
	    }
	},
	computed: {
	    ...mapGetters(['isTeacher']),
		...mapGetters(['userinfo']),
	},
	methods:{
		...mapActions(['setUserInfo', 'setTeacher']),
		onShow() {
			this.getStu();
		},
		onLoad(e){
			this.form.studentId = e.studentId
			this.link='zhuixun/student/qc/'+this.form.studentId;
		},
		getStu(){
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/student/view`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: {studentId:this.form.studentId},
			    success: res => {
			        if (res.data.code === 0) {
						this.form.mobilePhone = res.data.data.mobilePhone;
						this.form.birthday = df.format(new Date(res.data.data.birthday*1000),"yyyy-MM-dd");
						this.form.gender = res.data.data.gender;
						this.form.studentName = res.data.data.studentName;
						this.studentcode = res.data.data.studentcode;
						this.homeAddress = res.data.data.homeAddress;
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
			if(this.form.birthday == ''){
				uni.showToast({
					title:'出生日期不能为空',
					icon: 'none',
					duration: 1000
				})
				return;
			}
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/student/modifyV2`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: this.form,
			    success: res => {
			        if (res.data.code === 0) {
						uni.showToast({
							title:'修改成功',
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