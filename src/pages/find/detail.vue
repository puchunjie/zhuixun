<template>
    <div class="find-detail-container">
        <h3 class="title">5岁前读完1000本书？ 掌握这些方法就不难了!</h3>
        <div class="desc">
            <span class="type">原创</span> 家长课堂 小米 2019-03-12
        </div>
        <rich-text class="rich-text" :nodes="richText"></rich-text>
    </div>
</template>

<script>
import { escape2Html } from '@/utils'
export default {
    data() {
        return {
            text: `
                            在美国游学的时候，对其教育体系的了解中，有一个事情让我印象很深－美国孩子爱读书。
就我们所住的社区旁边，大大小小有三四个图书馆，无论什么时间去，都能看到很多孩子聚精会神的趴在那边看书。
有些图书馆里能看到有一个活动宣传：“1000 Books before Kindergarten”，即5岁前读完1000本书。这是美国的一个公益活动，在很多地方都有。
5岁前读完1000本书意义何在?
这个活动吸引了我的兴趣，去了解了一下才知道，原来许多研究认为孩子在三岁前，大脑已达到其成人体积的80％。在孩子生命的前1000天内，大脑发育最快。 幼儿的大脑每秒创造多达200万个新连接。早期经历和互动是儿童大脑发育的关键因素。

　　有统计，在学校比较出类拔萃的孩子有一个重要的一个特点是幼儿时期在家喜欢读书。<img src="https://shicai56-statics.oss-cn-shanghai.aliyuncs.com/static/mini/zh/imgs/bg.png">
                        `
        }
    },
    computed: {
        richText(){
            return escape2Html(this.text)
        }
    }
}
</script>

<style lang="less">
page {
    background: #fff;
    padding: 48upx 40upx;
}

@import url('../../styles/base.less');
.find-detail-container {
    width: 100%;
    .title {
        color: @gray_black;
        font-size: 38upx;
        line-height: 52upx;
    }
    .desc {
        width: 100%;
        height: 74upx;
        line-height: 24upx;
        font-size: 24upx;
        margin-top: 28upx;
        color: @light_gray;
        padding-bottom: 50upx;
        .type {
            color: #0B9186;
            margin-right: 30upx;
        }
    }
}
</style>