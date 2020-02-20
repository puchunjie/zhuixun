<template>
    <div class="evaluate-container">
        <div class="top" v-if="parentEvaluation">
            <div class="tit">对老师<span>{{parentEvaluation.parentName}}</span>的评价</div>
            <div class="conetnt">{{parentEvaluation.evaluationContent}}</div>
            <div class="view-img">
                <img class="img" v-for="img in parentEvaluation.studentLessonEvaluationPicList" :src="img.picUrl">
            </div>
        </div>

        <div class="top mt20" v-if="teacherEvaluation">
			<div class="tit">对学员<span>{{teacherEvaluation.studentName}}</span>的评价</div>
			<div class="text-area">
				<div class="conetnt">{{teacherEvaluation.evaluationContent}}</div>
			</div>

			<div class="view-img">
				<img class="img" v-for="img in teacherEvaluation.studentLessonEvaluationPicList" :src="img.picUrl">
			</div>

			<div class="rate">
				<p class="t">- 评分 -</p>
				<reteCom label="课堂互动" v-model="teacherEvaluation.score1"></reteCom>
				<reteCom label="专业成绩" v-model="teacherEvaluation.score2"></reteCom>
				<reteCom label="学习热情" v-model="teacherEvaluation.score3"></reteCom>
				<reteCom label="表达力" v-model="teacherEvaluation.score4"></reteCom>
				<reteCom label="注意力" v-model="teacherEvaluation.score5"></reteCom>
			</div>
		</div>

	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import upload from '~/upload.vue'
import reteCom from '~/reteCom.vue'
export default {
	components: {upload,reteCom},
	data() {
		return {
			teacherEvaluation:{},
			parentEvaluation:{},
			studentLessonId:0
		}
	},
	computed: {
		...mapGetters(['userinfo'])
	},
	methods:{
		onLoad(e){
			this.studentLessonId = e.studentLessonId;
		},
		onShow(){
			this.getDetail();
		},
		getDetail(){
			uni.request({
				method: 'POST',
				url: `${this.doMain}/evaluation/viewEvaluationByStudentLessonIdV2`,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {studentLessonId:this.studentLessonId},
				success: res => {
					if (res.data.code === 0) {
						this.teacherEvaluation = res.data.data.teacherEvaluation;
						if(this.teacherEvaluation != null && this.teacherEvaluation.studentLessonEvaluationPicList != null && this.teacherEvaluation.studentLessonEvaluationPicList.length > 0){
							for (let i = 0; i < this.teacherEvaluation.studentLessonEvaluationPicList.length; i++) {
								this.teacherEvaluation.studentLessonEvaluationPicList[i].picUrl = this.imgUrl+this.teacherEvaluation.studentLessonEvaluationPicList[i].picUrl ;
							}
						}
						this.parentEvaluation = res.data.data.parentEvaluation;
						if(this.parentEvaluation != null && this.parentEvaluation.studentLessonEvaluationPicList != null && this.parentEvaluation.studentLessonEvaluationPicList.length > 0){
							for (let i = 0; i < this.parentEvaluation.studentLessonEvaluationPicList.length; i++) {
								this.parentEvaluation.studentLessonEvaluationPicList[i].picUrl = this.imgUrl+this.parentEvaluation.studentLessonEvaluationPicList[i].picUrl ;
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
		}
	}
}
</script>

<style lang="less">
@import url('../../../styles/base.less');
.evaluate-container {
	padding-bottom: 150upx;
   
	.mt20{
		margin-top: 20upx;
	}
   .top{
	   width: 100%;
	   background: #fff;
	   padding: 30upx 40upx 20upx;

	   .tit{
		   font-size: 30upx;
		   color: #999;
		   line-height: 30upx;
		   span{
			   color: #0A9187;
		   }
	   }

	   .conetnt{
		   margin-top: 29upx;
		   color: #333;
		   font-size: 28upx;
		   line-height: 46upx;
	   }

	   .view-img{
		   width: 100%;
		   display: flex;
		   flex-wrap: wrap;
			.img{
				display: block;
				width: 125upx;
				height: 125upx;
				margin-right: 10upx;
				margin-top: 10upx;
			}
	   }

	   .text-area{
		   width: 100%;
		   height: 300upx;
		   border-radius: 8upx;
		   border: 1px solid #E6E6E6;
		   padding: 30upx 20upx;
		   margin-top: 32upx;
	   }
   }

   .up-class .upload-container{
	   padding: 0;
	   margin-top: 20upx;
   }

   .t{
	   height: 80upx;
	   line-height: 80upx;
	   font-size: 28upx;
	   color: #333;
	   text-align: center;
	   border-top: 1px solid #E6E6E6;
   }
}
</style>