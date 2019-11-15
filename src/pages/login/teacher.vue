<template>
    <view class="login-container">
        <div class="holder"></div>
    
        <div class="login-form">
            <div class="form-group">
                <div class="label">账号</div>
                <div class="value">
                    <input v-model="form.mobile" placeholder="请填写手机号码" type="number">
                </div>
            </div>
            <div class="form-group">
                <div class="label">密码</div>
                <div class="value">
                    <input v-model="form.password" placeholder="填写密码" type="password">
                </div>
            </div>
        </div>
    
        <div class="submit-btn" @click="submit">登录</div>
        <p class="link">用验证码登录</p>
    
    </view>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            form: {
                mobile: '',
                password: ''
            }
        }
    },
    methods: {
        ...mapActions(['setUserInfo']),
        submit() {
            uni.request({
                method: 'POST',
                url: `${this.doMain}/user/login`,
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: this.form,
                success: res => {
                    if (res.data.code === 0) {
                        this.setUserInfo(res.data.data)
                        uni.switchTab({
                            url: '/pages/index/index'
                        });
                    }
                }
            });
        }
    }
}
</script>

<style lang="less">
@import url('./login.less');
</style>
