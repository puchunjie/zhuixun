<template>
    <div class="evaluate-container">
        <div class="top">
            <div class="tit">家长<span>高吸</span>的评价</div>
            <div class="conetnt">老师讲课很有耐心！</div>
            <div class="view-img">
                <img class="img" v-for="img in imgs" :src="img" :key="img">
            </div>
        </div>

        <div class="top mt20">
            <div class="tit">家长<span>高吸</span>的评价</div>
            <div class="text-area">
                <textarea name="" id="" cols="30" rows="10" placeholder="请填写您的当前想法"></textarea>
            </div>

            <upload class="up-class"></upload>

            <div class="rate">
                <p class="t">- 评分 -</p>
                <reteCom label="课堂互动" v-model="num"></reteCom>
                <reteCom label="课堂互动" v-model="num"></reteCom>
                <reteCom label="课堂互动" v-model="num"></reteCom>
                <reteCom label="课堂互动" v-model="num"></reteCom>
                <reteCom label="课堂互动" v-model="num"></reteCom>
            </div>
        </div>

        <div class="submit-btn-fixed">提交</div>
    </div>
</template>

<script>
import upload from '~/upload.vue'
import reteCom from '~/reteCom.vue'
export default {
    components: {upload,reteCom},
    data() {
        return {
            num: 2,
            imgs: ['/static/view-img.png']
        }
    },
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