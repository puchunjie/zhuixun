<template>
    <div class="user-info">
        <div class="form-div">
            <div class="form-group log-sp">
                <div class="label" style="height:155upx;line-height:155upx;padding:0">
                    <img class="logo-img" v-if="portrait == '' || portrait == null" src="/static/logo.png" alt="">
					<img class="logo-img" v-else :src="portrait" alt="">
                </div>
                <div class="value">
					<upload ref="upload" @onChange="imgChange"></upload>
					<!-- <i class="iconfont arrow iconarrow"></i> -->
                    <!-- <div class="select" style="text-align:left">更换头像</div> -->
                </div>
            </div>
        </div>
    
        <div class="form-div">
            <div class="form-group">
                <div class="label">姓名</div>
                <div class="value">
                    <input v-model="form.userName" placeholder="填写请" />
                </div>
            </div>
            <div class="form-group">
                <div class="label">手机号</div>
                <div class="value">
                    <input v-model="form.mobilePhone" placeholder="填写请" />
                </div>
            </div>
            <dateSelect title="生日" v-model="form.birthdayStr" :value="form.birthdayStr"></dateSelect>
            <singleElection title="性别" v-model="form.gender" :data="[{value: 1,label: '男'},{value: 2,label: '女'}]"></singleElection>
        </div>
    
        <div class="form-div">
			<div class="form-group">
			    <div class="label">教龄(年)</div>
			    <div class="value">
			        <input v-model="form.teachYear" style="width:68%;display: inline-block;padding-right:0px;" placeholder="填写请" />
					<!-- <input style="width:16%;display: inline-block;" value="年"/> -->
			    </div>
			</div>
            <singleElection v-model="form.degree" title="学历" :data="[{value: 1,label: '高中'},{value: 2,label: '中专'},{value: 3,label: '大专'},{value: 4,label: '本科'},{value: 5,label: '硕士'},{value: 6,label: '博士'},{value: 7,label: '博士后'}]"></singleElection>
            <div class="form-group">
                <div class="label">院校</div>
                <div class="value">
                    <input v-model="form.college" placeholder="填写请" />
                </div>
            </div>
			<div class="form-group">
			    <div class="label">教学特点</div>
			    <div class="value">
			        <input v-model="form.remark" placeholder="填写请"/>
			    </div>
			</div>
        </div>
    
        <div class="submit-btn-fixed" @click="submit">提交</div>
    </div>
</template>

<script>
import Vue from "vue";
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
	            imgfile: '',
				teacherId:0,
				birthdayStr:'',
				gender:0,
				teachYear:0,
				degree:0,
				college:'',
				remark:'',
				userName:'',
	        },
			portrait: '',
	    }
	},
	computed: {
	    ...mapGetters(['isTeacher']),
		...mapGetters(['userinfo']),
	},
	methods:{
		...mapActions(['setUserInfo', 'setTeacher']),
		imgChange(imgs){
			console.info(imgs);
		    this.form.imgfile = imgs;
			this.portrait = this.imgUrl+imgs;
		},
		onShow() {
			this.form.mobilePhone = this.userinfo.mobilePhone;
			if(this.userinfo.portrait != null && this.userinfo.portrait != ''){
				this.portrait = this.imgUrl+this.userinfo.portrait;
			}
			this.form.teacherId = this.userinfo.teacherId;
			this.form.birthdayStr = this.userinfo.birthday;
			this.form.gender = this.userinfo.gender;
			this.form.teachYear = this.userinfo.teachYear;
			this.form.degree = this.userinfo.degree;
			this.form.college = this.userinfo.college;
			this.form.remark = this.userinfo.remark;
			this.form.userName = this.userinfo.userName;
		},
		submit(){
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/teacher/modifyV2`,
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
			            this.setUserInfo(res.data.data);
			            uni.switchTab({
			                url: '../../me/index'
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