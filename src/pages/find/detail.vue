<template>
    <div class="find-detail-container">
        <h3 class="title">{{articleName}}</h3>
        <div class="desc">
            <span class="type" v-if="isYuanChuang == 1">原创</span>
			 <span class="type" v-if="isYuanChuang == 0">转载</span>
			{{typeName}} {{author}} {{createdTimestamp | dateformatYMD}}
        </div>
        <rich-text class="rich-text" :nodes="richText"></rich-text>
    </div>
</template>

<script>
import { escape2Html } from '@/utils'
export default {
    data() {
        return {
			articleId:0,
			isYuanChuang:0,
			typeName:'',
			author:'',
			createdTimestamp:0,
			content:'',
			articleName:'',
			
		}
    },
    computed: {
        richText(){
            return escape2Html(this.content)
        }
		
    },
	methods: {
	    getArticleDetail() {
	        uni.request({
	            method: 'POST',
	            url: `${this.doMain}/article/view`,
	            header: {
	                'content-type': 'application/x-www-form-urlencoded'
	            },
	            data: { articleId: this.articleId },
	            success: res => {
					console.info(res.data);
	                if (res.data.code === 0) {
	                    this.isYuanChuang = res.data.data.isYuanChuang;
						this.typeName = res.data.data.typeName;
						this.author = res.data.data.author;
						this.createdTimestamp = res.data.data.createdTimestamp;
						this.content = res.data.data.content;
						this.articleName = res.data.data.articleName;
	                }
	            }
	        });
	    }
	},
	onLoad:function(e) {
		this.articleId = e.articleId;
	    this.getArticleDetail();
	},
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