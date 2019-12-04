<template>
    <div class="sutdent-mana-container">
        <div class="item"  :class="{ 'active': item.studentId === defaultStudentId }" v-for="(item,i) in list" :key="i">
            <image class="gender-img" :src="item.gender === 1 ? '/static/boy.png' : '/static/girl.png'"></image>
            <div class="info" @click="viewStu" :data-studentid="item.studentId">
                <h3 class="name">{{ item.studentName }}</h3>
                <p class="desc" v-if="item.studentcode == null || item.studentcode != ''">{{ item.studentcode }}</p>
                <p class="desc" v-if="item.joinShopNum == null || item.joinShopNum != ''">{{ item.joinShopNum }}个机构学习 剩余学时：{{ item.unLearnNum }}</p>
				<p class="desc" v-else>0个机构学习 剩余学时：0</p>
            </div>
            <div class="ac-btn" @click="changeStu" :data-studentid="item.studentId">{{ item.studentId === defaultStudentId ? '当前登录' : '点击切换' }}</div>
        </div>

        <div class="submit-btn large" @click="openToAddStu">+添加学员</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	computed: {
	    ...mapGetters(['isTeacher']),
		...mapGetters(['userinfo']),
	},
    data() {
        return {
            list: [],
			defaultStudentId:0
        }
    },
	onShow(){
		this.getStudentList();
	},
	methods:{
		openToAddStu(){
			uni.navigateTo({url: '/pages/me/studentMana/add'});
		},
		getStudentList(){
			console.info(this.userinfo)
			uni.request({
				method: 'POST',
				url: `${this.doMain}/student/parent/list`,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {"parentId":this.userinfo.parentId},
				success: res => {
					if (res.data.code === 0) {
						this.list = res.data.data.studentList;
						this.defaultStudentId = res.data.data.defaultStudentId;
					}else{
						uni.showToast({
							title:res.data.fieldErrors[0].message,
							icon: 'none',
							duration: 1000
						})
					}
				}
			})
		},
		changeStu(e){
			let studentId = e.currentTarget.dataset.studentid;
			uni.request({
				method: 'POST',
				url: `${this.doMain}/parent/modifyDefaultStudentId`,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {"parentId":this.userinfo.parentId,studentId:studentId},
				success: res => {
					if (res.data.code === 0) {
						uni.showToast({
							title:'切换成功',
							icon: 'none',
							duration: 1000
						})
						uni.switchTab({
							url:'../../index/index'
						})
					}else{
						uni.showToast({
							title:res.data.fieldErrors[0].message,
							icon: 'none',
							duration: 1000
						})
					}
				}
			})
		},
		viewStu(e){
			let studentId = e.currentTarget.dataset.studentid;
			uni.navigateTo({
			    url: '../../me/studentMana/view?studentId='+studentId
			});
		}
	}
}
</script>

<style lang="less">
@import url('../../../styles/base.less');
page {
    background: #fff;
    padding: 0 40upx;
}

.sutdent-mana-container {
    padding-top: 18upx;
    .item {
        position: relative;
        display: flex;
        width: 100%;
        padding: 20upx 30upx 30upx;
        border-radius: 8upx;
        border: 1px solid #ccc;
        margin-bottom: 20upx;
        overflow: hidden;
        .gender-img {
            display: block;
            width: 106upx;
            height: 106upx;
            border-radius: 106upx;
            border: 5upx solid rgba(236, 246, 244, 1);
        }
        .info {
            flex: 1;
            margin-left: 25upx;
            .name {
                font-size: 30upx;
                color: #181818;
                line-height: 30upx;
            }
            .desc {
                font-size: 28upx;
                color: @base_gray;
                margin-top: 20upx;
            }
        }
        .ac-btn {
            position: absolute;
            width: 150upx;
            height: 44upx;
            line-height: 44upx;
            text-align: center;
            font-size: 24upx;
            color: #fff;
            background: rgba(118, 189, 212, 1);
            border-radius: 8upx 0 8upx 8upx;
            right: 0;
            top: 80rpx;
        }
        &.active {
            .ac-btn {
                background: @base_green;
            }
        }
    }
}
</style>