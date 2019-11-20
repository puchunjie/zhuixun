<template>
    <div class="find-container">
        <div class="scroll-warp">
            <scroll-view scroll-x class="scroll-view">
                <div class="item" :class="{'active': active === i}"
                @click="changeNav(nav,i)" 
                v-for="(nav,i) in navs" :key="i">{{ nav.typeName }}</div>
            </scroll-view>
        </div>

        <div class="list-content">
            <div class="item" v-for="(item,i) in list" :key="i">
                <h3 class="title">{{ item.title }}</h3>
                <image class="img" :src="item.img"></image>
                <span class="type">{{ item.type }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            navs: null,
            active: 0,
            list: null,
			typeId:0
        }
    },
	onShow:function(){
		this.getArticleTypeList();
		this.getArticleList();
	},
    methods: {
        changeNav(nav,i){
            this.active = i;
			this.typeId = nav.typeId;
        },
		getArticleTypeList(){
			uni.request({
				method: 'POST',
				url: '${this.doMain}/article/listArticleTypeByPage',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data:{pageNo:1, pageSize:100},
				success: res => {
					if (res.data.code === 0) {
						this.navs=res.data.data;
						console.log(this.articleTypeList);
					}
				}
			});
		},
		getArticleList(){
			uni.request({
				method: 'POST',
				url: '${this.doMain}/article/listArticleByTypeId',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data:{typeId:this.typeId},
				success: res => {
					if (res.data.code === 0) {
						this.navs=res.data.data;
						console.log(this.articleTypeList);
					}
				}
			});
		}
    },
}
</script>

<style lang="less">
@import url('../../styles/base.less');
page{
    padding-top: 94upx;
}
.find-container {
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

            &.active{
                color: @dark_green;
                &:after{
                    background: rgba(26, 188, 156, 1);
                }
            }
        }
    }

    .list-content{
        width: 100%;
        background: #fff;
        padding: 0 40upx 20upx;
        .item{
            display: flex;
            position: relative;
            margin-bottom: 25upx;
            padding-top: 40upx;
            width: 100%;
            justify-content: space-between;

            .title{
                width: 418upx;
                .clampEllipsis;
                font-size: 30upx;
                color: #222;
                font-weight: 500;
                line-height: 44upx;
            }

            .img{
                display: block;
                width: 220upx;
                height: 164upx;
                border-radius: 8upx;
            }

            .type{
                position: absolute;
                left: 0;
                bottom: 0;
                font-size: 24upx;
                color: @light_gray;
            }
        }
    }
}
</style>