<template>
    <div class="me-container">
        <div class="green-bg">
            <i class="iconfont iconziyuan setting"></i>
        </div>
        <div class="jigou-ll">
            <div class="info-panel">
                <div class="head">
                    {{userName}}
                    <div class="btn" @tab="openToAddShopOrStudent">＋{{ isTeacher ? '增加新机构' : '增加新学员' }}</div>
                </div>
                <div class="content">
                    <image class="h-logo" src='/static/boy.png'></image>
                    <div v-if="isTeacher" class="body" @click="goSwitch">
                        <p class="number">服务于{{fuWuJiGouNum}}个机构</p>
                        <p class="word">{{banJiShouKeNum}}个班级授课 {{studentNum}}个学生</p>
                    </div>
                    <div v-else class="body" @click="goStudentMana">
                        <p class="number">ID：{{studentcode}}</p>
                        <p class="word">{{shopNums}}个机构学习 剩余学时：{{unLearnNum}}</p>
                    </div>
    
                    <i class="iconfont arrow iconarrow"></i>
                </div>
            </div>
            <institutionListForParent v-if="!isTeacher" :list="shopList"></institutionListForParent>
        </div>

        <teacherMenu v-if="isTeacher"></teacherMenu>
        <parentMenu v-else></parentMenu>
        <div class="fix-btottom">
            <div class="btn" @click="quitToIndex">退出</div>
        </div>
    </div>
</template>

<script>
import institutionListForParent from '@/components/institutionListForParent.vue'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import teacherMenu from './teacherMenu.vue'
import parentMenu from './parentMenu.vue'
export default {
    components: {
        institutionListForParent,
        teacherMenu,
        parentMenu
    },
    data() {
        return {
            userName:'xxxx',
			portrait:'',
			fuWuJiGouNum:'',
			banJiShouKeNum:'',
			studentNum:'',
			shopList:[],
			unLearnNum:0,
			studentcode:'',
			shopNums:0,
			
			
        }
    },
    computed: {
        ...mapGetters(['isTeacher']),
		...mapGetters(['userinfo']),
    },
    methods: {
		...mapActions(['setUserInfo', 'setTeacher']),
        goSwitch(){
            uni.navigateTo({url: '/pages/me/institution/switchInst'})
        },
        goStudentMana(){
            uni.navigateTo({url: '/pages/me/studentMana/index'})
        },
		openToAddShopOrStudent(){
			if(this.isTeacher){
				uni.navigateTo({url: '/pages/me/institution/add'});
			}else{
				uni.navigateTo({url: '/pages/me/studentMana/add'});
			}
		},
		getTeacherCenter(){
			uni.request({
				method: 'POST',
				url: `${this.doMain}/teacher/center`,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {"teacherId":this.userinfo.teacherId},
				success: res => {
					console.info(res);
					if (res.data.code === 0) {
						var resData = res.data.data;
						this.setUserInfo(resData.teacher);
						this.userName = this.userinfo.userName;
						this.portrait = this.userinfo.portrait;
						this.fuWuJiGouNum = resData.fuWuJiGouNum;
						this.banJiShouKeNum = resData.banJiShouKeNum;
						this.studentNum = resData.studentNum;
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
		getParentCenter(){
			uni.request({
				method: 'POST',
				url: `${this.doMain}/parent/center`,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {"parentId":this.userinfo.parentId},
				success: res => {
					console.info(res);
					var resData = res.data.data;
					if (res.data.code === 0) {
						var student = resData.student;
						this.userName = student.studentName;
						this.unLearnNum = resData.unLearnNum;
						if(student.studentcode != null){
							this.studentcode = student.studentcode;
						}
						this.shopList = resData.shops;
						if(this.shopList != null && this.shopList.length > 0){
							this.shopNums = this.shopList.length;
							for (let i = 0; i < this.shopList.length; i++) {
								this.shopList[i].logoPic = this.imgUrl+this.shopList[i].logoPic ;
							}
						}
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
		quitToIndex(){
			this.setUserInfo({});
			this.setTeacher(null);
			uni.navigateTo({url: '/pages/transfer/index'});
		}
    },
	onLoad() {
		if(this.isTeacher){
			this.getTeacherCenter();
		}else{
			this.getParentCenter();
		}
	},
}
</script>

<style lang="less">
@import url('../../styles/base.less');
page{
    padding-bottom: 20upx;
}
.me-container {
	position: absolute;
    .green-bg {
        position: relative;
        width: 100%;
        height: 185upx;
        background: @dark_green;
        .setting {
            position: absolute;
            color: #fff;
            font-size: 40upx;
            right: 40upx;
            top: 20upx;
        }
    }
    .jigou-ll {
        position: relative;
        width: 100%;
        padding: 135upx 40upx 30upx;
        background: #fff;
        .info-panel {
            position: absolute;
            width: 670upx;
            height: 206upx;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0upx 5upx 10upx 1upx rgba(21, 169, 140, 0.2);
            border-radius: 8upx;
            left: 40upx;
            top: -100upx;
            overflow: hidden;
            .head {
                display: flex;
                width: 100%;
                height: 70upx;
                line-height: 70upx;
                font-size: 30upx;
                color: @base_black;
                padding-left: 40upx;
                justify-content: space-between;
                .btn {
                    width: 336upx;
                    background: #CFE9E7;
                    text-align: center;
                    color: @base_green;
                    font-size: 28upx;
                    border-radius: 0 8upx 0 8upx;
                }
            }
            .content {
                position: relative;
                display: flex;
                width: 100%;
                padding: 0 24upx 30upx 30upx;
                .h-logo {
                    display: block;
                    width: 106upx;
                    height: 106upx;
                }
                .body {
                    flex: 1;
                    color: @base_gray;
                    font-size: 28upx;
                    margin-left: 25upx;
                    .number {
                        height: 22upx;
                        line-height: 22upx;
                        margin-top: 36upx;
                    }
                    .word {
                        height: 28upx;
                        line-height: 28upx;
                        margin-top: 20upx;
                    }
                }
            }
            .arrow {
                position: absolute;
                font-size: 40upx;
                color: @base_gray;
                right: 24upx;
                top: 44upx;
            }
        }
    }
    .fix-btottom {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #fff;
        .btn {
            width: 711upx;
            height: 99upx;
            background: rgba(29, 92, 84, 1);
            margin: 17upx auto;
            text-align: center;
            color: #fff;
            line-height: 99upx;
            font-size: 34upx;
        }
    }
}
</style>