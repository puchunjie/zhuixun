<template>
    <view class="addinst-container">
        <div class="addinst-form">
            <div class="form-group">
                <div class="label">机构名称</div>
                <div class="value">
                    <input v-model="form.shopName" placeholder="请输入机构名称" type="text">
                </div>
            </div>
            <div class="form-div">
                <div class="form-group block">
                    <div class="label">机构LOGO</div>
                    <div class="value">
                        <upload ref="upload" @onChange="fujianChange"></upload>
                    </div>
                </div>
            </div>
            <!-- <div class="form-group">
    			    <div class="label">机构LOGO</div>
    			    <div class="value">
    			        <input v-model="form.logoImg" placeholder="请选择机构图片" type="text">
    			    </div>
    			</div> -->
            <citySelect ref="cityPicker" noPadding @onConfirm="cityOnConfirm"></citySelect>
            <!-- <div class="form-group">
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
    			</div> -->
            <div class="form-group">
                <div class="label">详细地址</div>
                <div class="value">
                    <input v-model="form.shopAddress" placeholder="请输入详细地址" type="text">
                </div>
            </div>
            <dateSelect required v-model="form.openTime" title="开始时间"></dateSelect>
            <dateSelect required v-model="form.stopTime" title="结束时间"></dateSelect>
            <!-- <div class="form-group">
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
    			</div> -->
        </div>
    
    </view>
</template>

<script>
import { mapActions } from 'vuex'
import citySelect from '@/components/citySelect.vue'
import dateSelect from '@/components/dateSelect.vue'
import upload from '@/components/upload.vue'
export default {
    components: { citySelect, dateSelect, upload },
    data() {
        return {
            form: {
                shopName: '',
                password: '',
                stopTime: '',
                openTime: '',
                shopAddress: '',
                provinceId: 0,
                cityId: 0,
                districtId: 0
            },
            sexes: [{
                label: '男',
                img: '/static/boy.png',
                value: 1
            }, {
                label: '女',
                img: '/static/girl.png',
                value: 2
            }]
        }
    },
    methods: {
        ...mapActions(['setUserInfo']),
        goLogin() {
            uni.redirectTo({ url: '/pages/login/parent' })
        },
        fujianChange(imgs) {
            this.form.logoImg = imgs;
        },
        setSex(sex) {
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
        },
        cityOnConfirm(data) {
            this.form.provinceId = data.value[0];
            this.form.cityId = data.value[1];
            this.form.districtId = data.value[2];
        }
    }
}
</script>

<style lang="less">
@import url('./addInst.less');
</style>
