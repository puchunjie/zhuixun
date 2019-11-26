<template>
    <div class="class-container">
        <div class="scroll-warp">
			<h3 class="title">{{ item.articleName }}</h3>
        </div>
    
        <div class="list-content">
            <div class="item" v-for="(item,i) in list" :key="i" @tap="openToDetail" :data-articleId="item.articleId">
                <h3 class="title">{{ item.articleName }}</h3>
                <image class="img" :src="item.thumbPic"></image>
                <span class="type">{{ item.articleSubheading }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            courseClassList: null
        }
    },
    computed: {
        ...mapGetters(['userinfo'])
    },
    methods: {
		getClassList() {
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/article/listArticleTypeByPage`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { teacherId: this.userinfo.teacherId},
			    success: res => {
			        if (res.data.code === 0) {
			            this.courseClassList = res.data.data;
			        }
			    }
			});
		}
			
    },
}
</script>

<style lang="less">
@import url('../../styles/base.less');
page {
    /* padding-top: 94upx; */
	background:#F2F2F2;

}

/* .find-container {
    .scroll-warp {
        position: fixed;
        width: 100%;
        height: 94upx;
        padding: 0 13upx;
        overflow: hidden;
        background-color: #fff;
        left: 0;
        top: 0;
        z-index: 10;
        border-bottom: 20upx solid #F2F2F2;
    }
    .scroll-view {
        display: flex;
        white-space: nowrap;
        width: 100%;
        height: 74upx;
        line-height: 70upx;
        color: #181818;
        font-size: 26upx;
        .item {
            position: relative;
            display: inline-block;
            width: auto;
            height: 100%;
            margin-left: 25upx;
            &:after {
                content: '';
                position: absolute;
                display: block;
                width: 90%;
                left: 5%;
                bottom: 0;
                height: 6upx;
                background: none;
                border-radius: 3upx;
            }
            &.active {
                color: @dark_green;
                &:after {
                    background: rgba(26, 188, 156, 1);
                }
            }
        }
    }
    .list-content {
        width: 100%;
        background: #fff;
        padding: 0 40upx 20upx;
        .item {
            display: flex;
            position: relative;
            margin-bottom: 25upx;
            padding-top: 40upx;
            width: 100%;
            justify-content: space-between;
            .title {
                width: 418upx;
                .clampEllipsis;
                font-size: 30upx;
                color: #222;
                font-weight: 500;
                line-height: 44upx;
				height: 88upx;
            }
            .img {
                display: block;
                width: 220upx;
                height: 164upx;
                border-radius: 8upx;
            }
            .type {
				width: 418upx;
				.clampEllipsis(1);
                position: absolute;
                left: 0;
                bottom: 0;
                font-size: 24upx;
                color: @light_gray;
				line-height: 24upx;
				height:24upx;
            }
        }
    }
} */
</style>