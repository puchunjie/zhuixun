<template>
    <view class='get-code-container' @click="getCodeClick">
        {{codeSend ? '短信发送中..' : getCodeMsg}}</view>
</template>

<script>
import { isMobile } from '@/utils/index.js'
export default {
    props: {
        phone: {
            type: [Number, String],
            default: ''
        }
    },
    data() {
        return {
            codeSend: false,
            loading: false,
            getCodeStatus: 0,
            waitCodeCount: 60,
            waitIntervalHolder: null,
        }
    },
    computed: {
        canGetCode() {
            return this.getCodeStatus === 0 || this.getCodeStatus === 2
        },
        getCodeMsg() {
            switch (this.getCodeStatus) {
                case 0:
                    return "获取验证码";
                    break;
                case 1:
                    return this.waitCodeCount + "秒后重新获取";
                    break;
                case 2:
                    return "重新获取验证码";
                    break;
            }
        }
    },
    methods: {
        getCodeClick() {
            if (!isMobile(this.phone)) {
                return uni.showToast({ title: "必须输入手机号!", icon: "none" })
            }
            if (this.getCodeStatus === 1) {
                uni.showToast({ title: "请不要重复获取验证码", icon: "none" })
                return
            }
            this.codeSend = true;
            uni.request({
                method: 'POST',
                url: `${this.doMain}/parent/sendAuthCode`,
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: { mobilePhone: this.phone },
                success: res => {
                    this.codeSend = false;
                    if (res.data.code === 0) {
                        this.getCodeStatus = 1;
                        this.waitCodeCount = 60;
                        this.waitIntervalHolder = setInterval(() => {
                            if (this.waitCodeCount <= 0) {
                                this.getCodeStatus = 2;
                                this.waitCodeCount = 60;
                                clearInterval(this.waitIntervalHolder)
                            } else {
                                this.waitCodeCount -= 1
                            }
                        }, 1000);
                        uni.showToast({
                            title: '验证码已发送到您的手机,请注意查收!',
                            duration: 1000
                        });
                        this.$emit('onSuccess', res.data.data);
                    } else {
                        uni.showToast(res.data.msg)
                    }
                }
            })
        }
    }
}
</script>
