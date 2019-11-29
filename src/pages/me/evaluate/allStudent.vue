<template>
    <div class="evaluate-container">
        <div class="top mt20">
            <div class="tit">对全班级学员的评价</div>
            <div class="text-area">
                <textarea name="" id="" v-model="form.evaluationContent" cols="30" rows="10" placeholder="请填写您的当前想法"></textarea>
            </div>

            <upload class="up-class" @onChange="imgChange"></upload>

            <div class="rate">
                <p class="t">- 评分 -</p>
                <reteCom label="课堂互动" v-model="form.score1"></reteCom>
                <reteCom label="专业成绩" v-model="form.score2"></reteCom>
                <reteCom label="学习热情" v-model="form.score3"></reteCom>
                <reteCom label="表达力" v-model="form.score4"></reteCom>
                <reteCom label="注意力" v-model="form.score5"></reteCom>
            </div>
        </div>

        <div class="submit-btn-fixed" @click="submit">提交</div>
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
			form: {
				score1: 5,
				score2: 5,
				score3: 5,
				score4: 5,
				score5: 5,
				lessonId:0,
				evaluationContent:'',
				evaluationType:0,
				evaluatorId:0,
				evaluatorName:'',
				product_files:''
			}
			
        }
    },
    computed: {
		...mapGetters(['userinfo'])
    },
	methods:{
		onLoad(e){
			this.form.lessonId = e.lessonId
		},
		imgChange(imgs){
			console.info(imgs);
		    this.form.product_files = imgs;
		},
		submit(){
			if(this.form.evaluationContent == ''){
				uni.showToast({
					title:"请填写评价内容",
					icon: 'none',
					duration: 1000
				});
				return
			}
			this.form.evaluatorId = this.userinfo.teacherId;
			this.form.evaluatorName = this.userinfo.userName;
			console.info(this.form);
			uni.request({
				method: 'POST',
				url: `${this.doMain}/evaluation/addEvaluationForClassV2`,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: this.form,
				success: res => {
					if (res.data.code === 0) {
						uni.showToast({
							title:"评价成功",
							icon: 'none',
							duration: 1000
						});
						uni.navigateTo({
							url: '../../me/evaluate/chooseStudent?lessonId='+this.form.lessonId
						});
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