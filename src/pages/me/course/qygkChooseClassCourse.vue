<template>
    <div class="order-module">
    	<div class="item" >
			<span class="dian"></span>
    		<p class="p1">
				<span class="span1">班级：{{courseClass.className}}</span>
			</p>
    		<p class="p2" v-for="(item,index) in classCourseList" :key="item.courseId">
				<span class="span1"> 课程：{{item.courseName}}</span>
				<span class="span1"> 时间：{{item.weekday}}({{item.startTimeStr}}-{{item.endTimeStr}})</span>
				<span class="span1"> 老师：{{item.teacherName}} | {{item.lessonMinutes}}分钟</span>
				<span class="span1">
					<span class="span2">单价：{{item.lessonPrice/100}}元 |</span>
					<input class="span2" style="width:60upx;border:1upx solid #0A9187" :value="item.lessonNum" @input="modifyLessonNum" :data-index="index"/>
					节
				</span>
				<span class="span1"> 总价：{{item.totalPrice/100}}元</span>
			</p>
			<p class="p2">
				<span class="span1">总价：{{courseClass.totalPrice/100}}/元</span>
			</p>
			<div class="bottom"> 
				<div class="ac-btn2" @click="submit">下一步</div>
			</div>
    	</div>
    	<p v-if="classList.length === 0" class="no-order">暂无记录~</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            classCourseList: [],
			studentId:0,
			classId:0,
			courseIds:'',
			lessonNums:'',
			courseClass:null
        }
    },
    computed: {
        ...mapGetters(['userinfo'])
    },
    methods: {
		onShow() {
			this.getClassCourseList();
		},
		onLoad(e) {
			this.classId = e.classId;
			this.studentId = e.studentId;
		},
		getClassCourseList() {
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/course/listCourseClassCourse`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { teacherId: this.userinfo.teacherId,classId:this.classId},
			    success: res => {
			        if (res.data.code === 0) {
						this.courseClass = res.data.data;
						if(this.courseClass != null){
							this.classCourseList = this.courseClass.classCourseList;
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
		openToCreatOrder(){
			/* let url = '../../me/course/qygkCreatOrder?classId='+this.classId+'&studentId='this.studentId+'&courseIds='+this.courseIds+'&lessonNums='+this.lessonNums;
			uni.navigateTo({
				url: url
			}) */
		},
		modifyLessonNum(e){
			var index = e.currentTarget.dataset.index;
			var newLessonNum = e.detail.value;
			this.classCourseList[index].lessonNums = newLessonNum;
			let oldNum = this.classCourseList[index].lessonNums;
			let oldPrice = this.classCourseList[index].totalPrice;
			let newPrice = this.classCourseList[index].lessonNums*this.classCourseList[index].lessonPrice;
			this.classCourseList[index].totalPrice = newPrice;
			this.courseClass.totalPrice = this.courseClass.totalPrice-oldPrice+newPrice;
		},
		submit(){
			let courseIds = '';
			let lessonNums = '';
			for (var i = 0; i < this.classCourseList.length; i++) {
				if(this.classCourseList[i].lessonNum == ''){
					uni.showToast({
						title:"请填写购买课时，不买请填0",
						icon: 'none',
						duration: 1000
					})
					return
				}
				if(this.classCourseList[i].lessonNum < 0){
					uni.showToast({
						title:"课时必须大于等于零",
						icon: 'none',
						duration: 1000
					})
					return
				}
				courseIds += this.classCourseList[i].courseId+',';
				lessonNums += this.classCourseList[i].lessonNum+',';
			}
			
			uni.navigateTo({
				 url: '../../me/course/qygkCreatOrder?studentId='+this.studentId+'&classId='+this.classId
				 +'&courseIds='+courseIds
				 +'&lessonNums='+lessonNums
				 +'&totalAmount='+this.courseClass.totalPrice
				 +'&className='+this.courseClass.className
			});
		}
    }
}
</script>

<style lang="less">
@import url('../../../styles/base.less');
page {
	padding: 18upx 20upx 20upx;
	background:#F2F2F2;
}
.order-module {
	.no-order {
	    line-height: 280upx;
	    color: #999;
	    font-size: 26upx;
	    text-align: center;
	}
	.item{
		overflow: hidden;	
		position: relative;
		width: 100%;
		height: auto;
		background-color: #fff;
		border:1upx solid rgba(204,204,204,1);
		border-radius:8upx;
		margin-bottom:20upx;
		.dian{
			position: absolute;
			width:48upx;
			height:54upx;
			left:-25upx;
			top:-25upx;
			border-radius:50%;;
			background-color:#0A9187;
		}
		.p1 {
			font-weight:bold;
			color:#242039;
			font-size:30upx;
			font-weight:bold;
			line-height:49upx;
			padding:20upx 20upx 20upx 20upx;
			.span1{
			}
			.span2{
				float: right;
			}
		}
		.p2 {
			font-size:26upx;
			line-height:46upx;
			color:#666666;
			font-weight:500;
			border-top: 1px solid #E5E5E5;
			padding:20upx 20upx 20upx 20upx;
			.span1{
			}
			.span2{
				float: left;
			}
		}
	}
	.bottom{
		position: relative;
		display: flex;
		width: 100%;
		height: 80upx;
		.ac-btn{
			position: absolute;
			float: right;
			width: 140upx;
			height: 47upx;
			line-height: 44upx;
			text-align: center;
			font-size: 26upx;
			color: #fff;
			background: #0A9187;
			right: 20upx;
			top: 17upx;
		}
		.ac-btn2{
			position: absolute;
			float: right;
			width: 140upx;
			height: 47upx;
			line-height: 44upx;
			text-align: center;
			font-size: 26upx;
			color: #fff;
			background: #0A9187;
			right: 40upx;
		}
	}
}
.span1{
		display: block;
	}
.span2{
	display:inline;
}
</style>