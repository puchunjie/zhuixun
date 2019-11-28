<template>
    <view class="login-container">
        <div class="holder"></div>
    
        <div class="login-form">
            <div class="login-form-group">
                <div class="label">账号</div>
                <div class="value">
                    <input v-model="form.mobilePhone" class="mobile" placeholder="请填写手机号码" type="number">
					<getCode class="get-code" :phone="form.mobilePhone" @onSuccess="getYZM"></getCode>
                </div>
            </div>
            <div class="login-form-group">
                <div class="label">验证码</div>
                <div class="value">
                    <input v-model="form.yzm" placeholder="请填写收到的短信验证码" type="number">
                </div>
            </div>
        </div>
    
        <div class="submit-btn" @click="submit">登录</div>
        <p class="link" @click="goLogin">用密码登录</p>
    
    </view>
</template>

<script>
import getCode from '~/getCode'
import { mapActions } from 'vuex'
export default {
	components: {getCode},
    data() {
        return {
            form: {
                mobilePhone: '',
                yzm: '',
				yzmtrue:''
            }
        }
    },
    methods: {
        ...mapActions(['setUserInfo', 'setTeacher']),
		goLogin(){
		    uni.redirectTo({ url: '/pages/login/parent' })
		},
		getYZM(data){
			this.form.yzmtrue = data
		},
        submit() {
			if(this.form.mobilePhone == ''){
				uni.showToast({
					title:"请填写手机号",
					icon: 'none',
					duration: 1000
				})
				return false;
			}
			if(this.form.yzm == ''){
				uni.showToast({
					title:"请填写短信验证码",
					icon: 'none',
					duration: 1000
				})
				return false;
			}
			if(this.form.yzmtrue != this.$md5(this.form.yzm)){
				uni.showToast({
					title:"验证码错误",
					icon: 'none',
					duration: 1000
				})
				return false;
			}
            uni.request({
                method: 'POST',
                url: `${this.doMain}/parent/login`,
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: {mobilePhone:this.form.mobilePhone},
                success: res => {
                    if (res.data.code === 0) {
                        this.setUserInfo(res.data.data);
                        this.setTeacher(false);
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
@import url('./login.less');
.login-container .login-form .login-form-group .get-code {
	width: 210rpx;
	height: 38rpx;
	line-height: 38rpx;
	text-align: center;
	border: 1rpx solid #0A9187;
	border-radius: 8rpx;
	font-size: 27rpx;
	color: #0A9187;
	display: inline-block !important;
	padding: 8rpx;
}
.mobile{
	display: inline-block !important;
	width: 260rpx;

}

</style>
