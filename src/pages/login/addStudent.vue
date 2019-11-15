<template>
    <view class="login-container">
        <div class="switch-bar">
            <div class="sw-item active">添加未报名学员</div>
            <div class="sw-item" @click="goLogin">已有追寻账户登录</div>
        </div>
    
        <div class="login-form">
            <div class="form-group">
                <div class="label">姓名</div>
                <div class="value">
                    <input v-model="form.mobile" placeholder="请填写姓名" type="text">
                </div>
            </div>
            <div class="form-group">
                <div class="label">生日</div>
                <div class="value">
                    <span class="placeholder">请选择</span>
                </div>
                <i class="iconfont iconarrow"></i>
            </div>
            <div class="form-group">
                <div class="label">性别</div>
                <div class="value">
                    <div class="sex-switch">
                        <div class="item" :class="{ 'active': form.sex === sex.value }" @click="setSex(sex)" v-for="sex in sexes" :key="sex.value">
                            <image class="img" :src="sex.img"></image>
                            <p class="sw-label">{{ sex.label }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="label">城市</div>
                <div class="value">
                    <span class="placeholder">请选择城市</span>
                </div>
                <i class="iconfont iconarrow"></i>
            </div>
            <div class="form-group">
                <div class="label">手机号</div>
                <div class="value">
                    <input v-model="form.mobile" placeholder="请输入关联手机号" type="number">
                </div>
                <getCode class="get-code" :phone="form.mobile"></getCode>
            </div>
            <div class="form-group">
                <div class="label">短信验证</div>
                <div class="value">
                    <input v-model="form.mobile" placeholder="请填写收到的短信验证码" type="number">
                </div>
            </div>
        </div>
    
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
                mobile: '',
                password: '',
                sex: 1
            },
            sexes: [{
                label: '男',
                img: '/static/man.png',
                value: 1
            },{
                label: '女',
                img: '/static/man.png',
                value: 2
            }]
        }
    },
    methods: {
        ...mapActions(['setUserInfo']),
        goLogin(){
            uni.redirectTo({ url: '/pages/login/parent' })
        },
        setSex(sex){
            this.form.sex = sex.value;
        },
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
