<template>
    <div class="find-container">
        <div class="scroll-warp">
            <scroll-view scroll-x class="scroll-view">
                <div class="item" :class="{'active': active === i}"
                @click="changeNav(nav,i)" 
                v-for="(nav,i) in navs" :key="i">{{ nav.label }}</div>
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
            navs: [{
                label: '家长课堂',
                value: ''
            }, {
                label: '形体舞蹈',
                value: ''
            }, {
                label: '声乐朗诵',
                value: ''
            }, {
                label: '器乐',
                value: ''
            }, {
                label: '校长来了',
                value: ''
            }, {
                label: '机构咨讯',
                value: ''
            }],
            active: 0,
            list: [{
                title: '5岁前读完1000本书？ 掌握这些方法就不难了',
                type: '家长课堂',
                img: '/static/view-img.png'
            },{
                title: '5岁前读完1000本书？ 掌握这些方法就不难了',
                type: '家长课堂',
                img: '/static/view-img.png'
            },{
                title: '5岁前读完1000本书？ 掌握这些方法就不难了',
                type: '家长课堂',
                img: '/static/view-img.png'
            },{
                title: '5岁前读完1000本书？ 掌握这些方法就不难了',
                type: '家长课堂',
                img: '/static/view-img.png'
            },{
                title: '5岁前读完1000本书？ 掌握这些方法就不难了',
                type: '家长课堂',
                img: '/static/view-img.png'
            },{
                title: '5岁前读完1000本书？ 掌握这些方法就不难了',
                type: '家长课堂',
                img: '/static/view-img.png'
            },{
                title: '5岁前读完1000本书？ 掌握这些方法就不难了',
                type: '家长课堂',
                img: '/static/view-img.png'
            },{
                title: '5岁前读完1000本书？ 掌握这些方法就不难了',
                type: '家长课堂',
                img: '/static/view-img.png'
            }]
        }
    },
    methods: {
        changeNav(nav,i){
            this.active = i;
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