<template>
    <div class="leave-container">
        <div class="class-div">
            <div class="query-class">请选择学生</div>
            <div class="list-conetnt">
                <div class="class-item" :class="{ 'checked': item.check }" @click="check(item,i)" v-for="(item,i) in studentList" :key="i">
                    <h3 class="jigou">{{ item.studentName }}</h3>
                    <!-- <div class="desc">
                        <div class="b">{{ item.b }}</div>
                        <div class="c">{{ item.c }}</div>
                        <div class="d">{{ item.d }}</div>
                    </div> -->
    
                    <i class="iconfont iconxuanze check"></i>
                </div>
            </div>
        </div>

        <div class="form-div" style="text-align: center;" v-if="link != ''">
            <div class="label" style="padding-top:20upx;">请向老师出示二维码签到</div>
            <div class="value" style="padding-top:20upx;">
            	<div class="erweima-warp" >
            		<tki-qrcode style="display:inline-block" ref="qrcode" cid="cid" :val="link" :size="200" unit="upx" loadMake onval/>
            	</div>
            </div>
        </div>

    
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import dateSelect from '@/components/dateSelect.vue'
import singleElection from '@/components/singleElection.vue'
import tkiQrcode from 'tki-qrcode/components/tki-qrcode/tki-qrcode.vue'
export default {
    components: { dateSelect,singleElection,tkiQrcode },
    data() {
        return {
			studentList: [],
			link:'',
			studentId:0
        }
    },
    computed: {
        ...mapGetters(['isTeacher']),
		...mapGetters(['userinfo']),
    },
    methods: {
		...mapActions(['setUserInfo', 'setTeacher']),
        check(item,i){
            item.check = !item.check;
			this.studentId = item.studentId;
			this.link = 'zhuixun/student/qc/'+this.studentId
        },
		onShow(){
			this.getStuList();
		},
		getStuList(){
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/parent/listStudentForParent`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: {parentId:this.userinfo.parentId},
			    success: res => {
			        if (res.data.code === 0) {
						this.studentList = res.data.data;
						if(this.studentList.length > 0){
							this.studentList.map(item => {
								item.check = false;
								return item;
							});
						}else{
							uni.showToast({
								title:"您还没有添加学生呢",
								icon: 'none',
								duration: 1000
							})
						}
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
@import url('../../../styles/base.less');
.leave-container {
    padding-bottom: 150upx;
    .class-div {
        background: #fff;
        margin-top: 20upx;
        .query-class {
            width: 100%;
            height: 55upx;
            line-height: 55upx;
            background: #EBFAF9;
            color: #70BEB8;
            font-size: 26upx;
            padding: 0 40upx;
        }
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
            }
        }
        .list-conetnt {
            padding: 0 40upx;
        }
        .class-item {
            position: relative;
            width: 100%;
            height: 135upx;
            padding: 30upx 0;
            font-size: 28upx;
            color: @gray_black;
            &:not(:last-child) {
                border-bottom: 1px solid #E5E5E5;
            }
            .jigou {
                height: 27upx;
                line-height: 27upx;
            }
            .desc {
                display: flex;
                margin-top: 20upx;
                height: 27upx;
                line-height: 27upx;
                .b {
                    width: 230upx;
                }
                .c {
                    width: 180upx;
                }
            }
            .check {
                position: absolute;
                right: 40upx;
                bottom: 30upx;
                font-size: 40upx;
                color: #ccc;
            }
            &.checked .check {
                color: @dark_green;
            }
        }
    }
}
</style>