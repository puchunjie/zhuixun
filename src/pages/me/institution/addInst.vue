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
                        <upload ref="upload" @onChange="fujianChange" ></upload>
                    </div>
                </div>
            </div>
            <citySelect ref="cityPicker" noPadding @onConfirm="cityOnConfirm"></citySelect>
            <div class="form-group">
                <div class="label">详细地址</div>
                <div class="value">
                    <input v-model="form.shopAddress" placeholder="请输入详细地址" type="text">
                </div>
            </div>
			<view class="section form-group">
			    <view class="section__title label">开始时间</view>
			    <picker class="value" v-model="form.openTime" mode="time" start="09:01" end="21:01" @change="bindStartTimeChange">
			        <view style="height: 50upx;">
			            {{form.openTime || '请选择营业开始时间'}}
			        </view>
			    </picker>
			</view>
			<view class="section form-group">
			    <view class="section__title label">结束时间</view>
			    <picker class="value" style="line-height: 50upx;" v-model="form.stopTime" mode="time" start="09:01" end="21:01" @change="bindStopTimeChange">
			        <view style="height: 50upx;">
			            {{form.stopTime|| '请选择营业结束时间'}}
			        </view>
			    </picker>
			</view>
			<div class="query-btn">
				<div class="btn" @click="submit" :data-type="1">+添加</div>
			</div>
        </div>
    
    </view>
</template>

<script>
import citySelect from '@/components/citySelect.vue'
import dateSelect from '@/components/dateSelect.vue'
import upload from '@/components/upload.vue'
export default {
    components: { citySelect, dateSelect, upload },
    data() {
        return {
            form: {
                shopName: '',
                stopTime: '',
                openTime: '',
                shopAddress: '',
                provinceId: 0,
                cityId: 0,
                districtId: 0,
				creatorId:'',
				logoImg:'',
				
            },
        }
    },
    methods: {
        ...mapActions(['setUserInfo']),
        fujianChange(imgs) {
            this.form.logoImg = imgs;
        },
        submit() {
            uni.request({
                method: 'POST',
                url: `${this.doMain}/shop/teacher/addShop`,
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
        },
		bindStartTimeChange: function(e) {
			this.form.openTime = e.detail.value
		},
		bindStopTimeChange: function(e) {
			this.form.stopTime = e.detail.value
		},
    }
}
</script>

<style lang="less">
@import url('./addInst.less');
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
</style>
