<template>
    <div class="audition-container">
        <div class="form-div">
            <singleElection title="近期课程" v-model="courseId" @onConfirm="getClassList"  :data="courseList"></singleElection>
            <singleElection title="选择班级" v-model="classId" @onConfirm="getClass" :data="classList"></singleElection>
            <dateSelect title="选择时间" v-model="dateStr"></dateSelect>
        </div>
    
        <div class="class-div">
            <div class="query-btn">
                <div class="btn" @click="getCourseLessonList">查询</div>
            </div>
            <div class="time-title">选择时段</div>
            <div class="class-list">
                <p class="empty" v-if="courseLessonList.length === 0">无数据</p>
                <div class="cls-item" v-for="(item,i) in courseLessonList" :key="i" @click="chooseLesson" :data-lessonid="item.lessonId">
				{{ item.startTimeStr }}-{{item.endTimeStr}}
				<i class="iconfont icon-duigou checked" v-if="item.lessonId==lessonId">√</i>
				</div>
            </div>
        </div>
    
        <div class="search-div">
            <div class="submit-btn nomargin" style="width:100%" @click="scanStu">扫一扫</div>
    
            <div class="search-warp">
                <div class="box">
                    <i class="isearch iconfont iconsousuo"></i>
                    <input type="text" v-model="studentNameLike" placeholder="查询学生">
                </div>
                <div @click="searchStu">搜索</div>
            </div>
    
            <div class="su-list">
                <div class="st-item" :class="{ 'active': item.studentId==studentId }" v-for="item in studentList" @click="chooseStu" :data-studentid="item.studentId">
                    <p>家长姓名：{{item.parentName}}</p>
                    <p>家长手机号：{{item.parentMobilePhone}}</p>
                    <p>学生姓名：{{item.studentName}}</p>
                    <i class="icheck iconfont iconxuanzejiaobiao"></i>
                </div>
            </div>
        </div>
        <div class="submit-btn-fixed" @click="submit">确定</div>
    
    </div>
</template>

<script>
import Vue from "vue";
import singleElection from '@/components/singleElection.vue'
import dateSelect from '@/components/dateSelect.vue'
import { mapGetters } from 'vuex'
export default Vue.extend({
    components: { dateSelect, singleElection },
    data() {
        return {
			courseList:[],
			courseLessonList:[],
			studentList:[],
            classList: [],
			courseId:0,
			classId:0,
			lessonId:0,
			studentNameLike:'',
			studentId:0,
			dateStr:'',
			studentId2:0,
			flag:0,//添加试听学员的入口0为首页和我的  1位课程详情
        }
    },
	computed: {
		...mapGetters(['userinfo'])
	},
	onShow(){
		this.getCourseList();
		if(this.flag == 1){
			this.getClassListV2();
		}
	},
	onLoad(e) {
		if(e.flag == 1){
			this.flag = e.flag;
			this.courseId = e.courseId;
			this.classId = e.classId;
			this.dateStr = e.dateStr;
		}
	},
    methods: {
        check(item, i) {
            item.check = !item.check;
        },
        getClassList(data) {
			this.classList = [];
			this.courseId = data.value;
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/course/courseClass/listByCourseId`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: {shopId:this.userinfo.shopId,courseId:this.courseId},
			    success: res => {
			        if (res.data.code === 0) {
						if(res.data.data != null && res.data.data.length > 0){
							this.classList = res.data.data;
							this.classList.map(item => {
								return{
									value:item.classId, 
									lable:item.className
								}
							});
						}
			        }
			    }
			});
        },
		getClassListV2() {
			this.classList=[];
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/course/courseClass/listByCourseId`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: {shopId:this.userinfo.shopId,courseId:this.courseId},
			    success: res => {
			        if (res.data.code === 0) {
						if(res.data.data != null && res.data.data.length > 0){
							this.classList = res.data.data;
							this.classList.map(item => {
								return{
									value:item.classId, 
									lable:item.className
								}
							});
						}
			        }
			    }
			});
		},
		getClass(data){
			this.classId = data.value;
		},
		getCourseList(){
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/course/listByShopId`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: {shopId:this.userinfo.shopId},
			    success: res => {
			        if (res.data.code === 0) {
						if(res.data.data != null && res.data.data.length > 0){
							this.courseList = res.data.data;
							this.courseList.map(item => {
								return{
									value:item.courseId, 
									lable:item.courseName
								}
							});
							// for (var i = 0; i < res.data.data.length; i++) {
							// 	let item = new Object();
							// 	item["value"]=res.data.data[i].courseId;
							// 	item["label"]=res.data.data[i].courseName;
							// 	// this.courseList.push({value:res.data.data[i].courseId,lable:res.data.data[i].courseName});
							// 	console.info(this.courseList);
							// 	console.info(item);
							// }
						}
			        }
			    }
			});
		},
		getCourseLessonList(){
			if(this.classId == 0){
				uni.showToast({
					title:'请选择班级',
					icon: 'none',
					duration: 1000
				})
				return;
			}
			if(this.dateStr == ''){
				uni.showToast({
					title:'请选择日期',
					icon: 'none',
					duration: 1000
				})
				return;
			}
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/course/courseLesson/listByClassId`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: {classId:this.classId, dateStr:this.dateStr},
			    success: res => {
			        if (res.data.code === 0) {
			            this.courseLessonList = res.data.data;
						this.courseLessonList.map(item => {
							item.check = false;                
							return item            
						})
			        }
			    }
			});
		},
		chooseLesson(e){
			this.lessonId = e.currentTarget.dataset.lessonid;
		},
		chooseStu(e){
			this.studentId = e.currentTarget.dataset.studentid;
		},
		searchStu(){
			if(this.studentNameLike == ''){
				uni.showToast({
					title:'请扫选择学生',
					icon: 'none',
					duration: 1000
				})
				return;
			}
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/student/searchForFuzzy`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: {shopId:this.userinfo.shopId, contentLike:this.studentNameLike},
			    success: res => {
			        if (res.data.code === 0) {
			            this.studentList = res.data.data;
			        }
			    }
			});
		},
		scanStu(){
			uni.scanCode({
			    /*onlyFromCamera: true,*/
				scanType:['qrCode'],
			    success:  res => {
					let result = res.result; // 当needResult 为 1 时，扫码返回的结果
					if(result !=null && result !=''){
						let index = result.lastIndexOf("\/");  
						let studentIdStr  = result .substring(index + 1, result.length);
						if(studentIdStr !=null && studentIdStr !=''){
							this.studentId2 = studentIdStr;
							this.viewStudent();
						}else{
							uni.showToast({
								title:'扫描结果错误',
								icon: 'none',
								duration: 1000
							})
						}
					}
			    }
			});
		},
		viewStudent(){
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/student/view`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: {studentId:this.studentId2},
			    success: res => {
			        if (res.data.code === 0 && res.data.data != null) {
						this.studentId = res.data.data.studentId;
			            this.studentList = [];
						this.studentList.push(res.data.data);
			        }else{
						uni.showToast({
							title:'未查询到相关信息',
							icon: 'none',
							duration: 1000
						})
					}
			    }
			});
		},
		submit(){
			if(this.lessonId == 0){
				uni.showToast({
					title:'请选择时段',
					icon: 'none',
					duration: 1000
				})
				return;
			}
			if(this.studentId == 0){
				uni.showToast({
					title:'请扫选择学生',
					icon: 'none',
					duration: 1000
				})
				return;
			}
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/course/courseLessonApply/add`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: {teacherId:this.userinfo.teacherId, studentId:this.studentId,lessonId:this.lessonId},
			    success: res => {
			        uni.showToast({
			        	title:'申请成功',
			        	icon: 'none',
			        	duration: 1000
			        })
					uni.switchTab({
						url:'../index/index'
					})
			    }
			});
		}
    }
})
</script>

<style lang="less">
@import url('../../styles/base.less');
.audition-container {
    padding-bottom: 150upx;
    .class-div {
        margin-top: 20upx;
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
        .time-title {
            width: 710upx;
            margin: 0 auto;
            height: 100upx;
            line-height: 100upx;
            color: @base_black;
            font-size: 30upx;
            padding: 0 20upx;
            background: #fff;
            border-bottom: 1px solid #ccc;
        }
        .class-list {
            width: 710upx;
            margin: 0 auto;
            background-color: #fff;
            min-height: 100upx;
            padding: 0 20upx;
            .empty {
                color: @base_black;
                font-size: 30upx;
                height: 100upx;
                line-height: 100upx;
            }
        }
    }
    .search-div {
        width: 100%;
        margin-top: 20upx;
        background: #fff;
        padding: 20upx 40upx;
        .search-warp {
            width: 100%;
            height: 100upx;
            margin-top: 20upx;
            display: flex;
            justify-content: space-between;
            line-height: 100upx;
            .box {
                position: relative;
                width: 590upx;
                height: 100upx;
                border: 1px solid #ccc;
                border-radius: 8upx;
                padding: 30upx 30upx 30upx 87upx;
                font-size: 30upx;
                input {
                    display: block;
                    width: 100%;
                    height: 100%;
                    line-height: 100upx;
                    font-size: 30upx;
                    margin: 0;
                    padding: 0;
                    outline: 0;
                    border: 0;
                }
                .isearch {
                    position: absolute;
                    font-size: 40upx;
                    color: #999;
                    left: 30upx;
                    top: 0;
                }
            }
        }
    }
    .su-list {
        .st-item {
            position: relative;
            width: 100%;
            margin-top: 20upx;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(204, 204, 204, 1);
            border-radius: 4px;
            padding: 27upx 20upx;
            font-size: 26upx;
            overflow: hidden;

            p {
                height: 44upx;
                line-height: 44upx;
            }
            .icheck {
                position: absolute;
                display: none;
                font-size: 80upx;
                color: @dark_green;
            }
            &.active {
                color: @dark_green;
                border-color: @dark_green;
                .icheck {
                    display: inline-block;
                    right: -2upx;
                    bottom: -2upx;
                }
            }
        }
    }
}
.icon-duigou.checked {
	color: #0b9186;
	float:right;
}
</style>