<template>
    <view class="login-container">
        <div class="login-form">
            <div class="form-group">
                <div class="label">机构名称</div>
                <div class="value">
                    <input v-model="form.shopName" placeholder="请输入机构名称" type="text">
                </div>
            </div>
			<div class="form-group">
			    <div class="label">机构LOGO</div>
			    <div class="value">
			        <input v-model="form.logoImg" placeholder="请选择机构图片" type="text">
			    </div>
			</div>
            <div class="form-group">
                <div class="label">选择省</div>
                <div class="value">
                     <citySelect required @onConfirm="cityOnConfirm"></citySelect>
                </div>
                <i class="iconfont iconarrow"></i>
            </div>
			<div class="form-group">
			    <div class="label">选择市</div>
			    <div class="value">
			        <span class="placeholder">选择机构所在市</span>
			    </div>
			    <i class="iconfont iconarrow"></i>
			</div>
			<div class="form-group">
			    <div class="label">选择区</div>
			    <div class="value">
			        <span class="placeholder">选择机构所在区</span>
			    </div>
			    <i class="iconfont iconarrow"></i>
			</div>
            <div class="form-group">
                <div class="label">详细地址</div>
                <div class="value">
                    <input v-model="form.shopAddress" placeholder="请输入详细地址" type="text">
                </div>
            </div>
			<div class="form-group">
			    <div class="label">开始时间</div>
			    <div class="value">
			        <input v-model="form.openTime" placeholder="请选择营业开始时间" type="text">
			    </div>
			</div>
			<div class="form-group">
			    <div class="label">结束时间</div>
			    <div class="value">
			        <input v-model="form.stopTime" placeholder="请选择营业结束时间" type="text">
			    </div>
			</div>
        </div>
    
    </view>
</template>

<script>
import { mapActions } from 'vuex'
import singleElection from '@/components/singleElection.vue'
import citySelect from '@/components/citySelect.vue'
export default Vue.extend({
    components: {singleElection,citySelect},
    data() {
        return {
            form: {
                shopName: '',
                password: '',
                stopTime: '',
				openTime:'',
				shopAddress:'',
				provinceId:0,
				cityId:0,
				districtId:0
				
            },
            sexes: [{
                label: '男',
                img: '/static/boy.png',
                value: 1
            },{
                label: '女',
                img: '/static/girl.png',
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
        }/*,
        cityOnConfirm(data) {
            this.form.provinceId = data.value[0];
            this.form.cityId = data.value[1];
            this.form.districtId = data.value[2];
        }*/
    }
}
</script>

<style lang="less">
@import url('./addInst.less');
</style>
