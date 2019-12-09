<template>
    <div class="leave-container">
        <div class="form-div">
            <dateSelect title="选择时间" v-model="date"></dateSelect>
            <div class="form-div">
                <!-- <div class="label">请假学员</div>
                <div class="value">
                    <div class="select" :class="{ 'vvv': form.studentName!=='' }">
                        {{ form.studentName !== '' ? form.studentName : '请选择'}}
                        <i class="iconfont arrow iconarrow"></i></div>
                </div> -->
				<singleElection title="请假学员" v-model="studentId" :data="studentArray" @onConfirm="getStudentId"></singleElection>
            </div>
        </div>
    
        <div class="class-div">
            <div class="query-class">请点击查询并选择请假课程</div>
            <div class="query-btn">
                <div class="btn" @click="getList">查询</div>
            </div>
            <div class="list-conetnt">
                <div class="class-item" :class="{ 'checked': item.check }" @click="check(item,i)" v-for="(item,i) in classList" :key="i">
                    <h3 class="jigou">{{ item.a }}</h3>
                    <div class="desc">
                        <div class="b">{{ item.b }}</div>
                        <div class="c">{{ item.c }}</div>
                        <div class="d">{{ item.d }}</div>
                    </div>
    
                    <i class="iconfont iconxuanze check"></i>
                </div>
            </div>
        </div>

        <div class="form-div">
            <div class="form-group block">
                <div class="label">请假理由</div>
                <div class="value">
                    <textarea v-model="form.leaveReason" class="text-area" placeholder="填写请假理由" />
                </div>
            </div>
        </div>

        <div class="submit-btn-fixed" @click="submit">确定</div>
    
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import dateSelect from '@/components/dateSelect.vue'
import singleElection from '@/components/singleElection.vue'
export default {
    components: { dateSelect,singleElection },
    data() {
        return {
            classList: [],
			studentArray: [],
			studentList: [],
			studentId:0,
			date:'',
			form:{
				studentLessonId:0,
				leaveReason:''
			}
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
			this.form.studentLessonId = item.value;
        },
		onShow(){
			this.getStuList();
		},
        getList() {
			this.classList = [];
			if(this.date == ''){
				uni.showToast({
					title:"请选择时间",
					icon: 'none',
					duration: 1000
				})
				return;
			}
			if(this.studentId == 0){
				uni.showToast({
					title:"请选择学生",
					icon: 'none',
					duration: 1000
				})
				return;
			}
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/course/student/listCourseClassStudentLessonByStudentId`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: {studentId:this.studentId,date:this.date,states:'0'},
			    success: res => {
			        if (res.data.code === 0) {
						console.info(res.data.data)
						let classListTemp = res.data.data;
						if(classListTemp.length == 0){
							uni.showToast({
								title:"此学生该日期没有课程",
								icon: 'none',
								duration: 1000
							});
						}else{
							for (var i = 0; i < classListTemp.length; i++) {
								let item = {value:classListTemp[i].studentLessonId,a:classListTemp[i].shopName,b:classListTemp[i].className,c:classListTemp[i].classRoom,d:classListTemp[i].startTimeStr+'-'+classListTemp[i].endTimeStr};
								this.classList.push(item); 
								this.classList.map(item => {
									item.check = false;
									return item;
								});
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
			});
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
						for (var i = 0; i < this.studentList.length; i++) {
							let item = {value:this.studentList[i].studentId,label:this.studentList[i].studentName};
							this.studentArray.push(item); 
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
		},
		getStudentId(data){
			this.studentId = data.value;
		},
		submit(){
			if(this.form.studentLessonId == 0){
				uni.showToast({
					title:"请选择请假课程",
					icon: 'none',
					duration: 1000
				})
				return;
			}
			if(this.form.leaveReason == ''){
				uni.showToast({
					title:"请填写请假原因",
					icon: 'none',
					duration: 1000
				})
				return;
			}
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/leave/addLevaeForJson`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: this.form,
			    success: res => {
			        if (res.data.code === 0) {
						uni.showToast({
							title:"请假成功",
							icon: 'none',
							duration: 1000
						});
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