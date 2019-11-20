<template>
    <div class="class-detail-teacher">
        <div class="class-info">
            <div class="header">
                <div class="text">未签到：4</div>
                <div class="text">已签到：1</div>
                <div class="text">请假：0</div>
            </div>
            <div class="body">
                <div class="class-name">古筝—龚怡文 <span class="tag">签到中</span></div>
                <div class="gp">
                    <div class="left">古筝</div>
                    <div class="right">2018-12-27(周四)</div>
                </div>
                <div class="gp">
                    <div class="left">C课室</div>
                    <div class="right">14:50-15:30</div>
                </div>
                <div class="gp">
                    <div class="left">林艳</div>
                    <div class="right">5人</div>
                </div>
            </div>
            <div class="tip">2018-12-27 08:02系统自动开放签到表,签到表将于8小时后自动归档</div>
        </div>
    
        <div class="student-list">
            <zxTabs :options="tabs" @tabChange="tabChange" :labelFormat="labelFormat"></zxTabs>
            <div class="item-content">
                <div class="item" v-for="(item,i) in list" :key="i">{{  item.name }}</div>
            </div>
        </div>

        <div class="bottom-btn">
            <div class="btn orange">添加试听学员</div>
            <div class="btn green">学员签到</div>
        </div>
    </div>
</template>

<script>
import zxTabs from '@/components/tabs.vue'
export default {
    components: {zxTabs},
    data() {
        return {
            tabs: [{
                label: '正式学员',
                value: 1,
                num: 5
            },{
                label: '试听学员',
                value: 2,
                num: 0
            }],
            list: [{
                name: '孙瑞'
            },{
                name: '孙瑞'
            },{
                name: '孙瑞'
            },{
                name: '孙瑞'
            },{
                name: '孙瑞'
            },{
                name: '孙瑞'
            }]
        }
    },
    computed: {

    },
    methods: {
        tabChange(tab){
            console.log(tab)
            // 根据值去请求接口 重新赋值List
            // this.list = []
        },
        labelFormat(tab){
            return `${tab.label}${tab.num}`
        }
    },
}
</script>

<style lang="less">
@import url('../../styles/base.less');
page {
    padding: 20upx 20upx 160upx;
}

.class-detail-teacher {
    .class-info {
        width: 100%;
        border-radius: 8upx;
        background: #fff;
        overflow: hidden;
        padding-bottom: 27upx;
        box-shadow: 0 6upx 6upx 0 rgba(74, 98, 139, 0.15);
        .header {
            display: flex;
            width: 100%;
            height: 60upx;
            line-height: 60upx;
            color: #fff;
            background: @dark_green;
            padding: 0 40upx;
            font-size: 26upx;
            justify-content: space-between;
        }
        .body {
            width: 100%;
            padding: 20upx 40upx;
            .class-name {
                position: relative;
                height: 34upx;
                line-height: 34upx;
                color: @dark_green;
                font-size: 30upx;
                font-weight: 500;
                .tag {
                    display: inline-block;
                    padding: 0 19upx;
                    height: 34upx;
                    line-height: 32upx;
                    border: 1upx solid #FF7052;
                    color: #FF7052;
                    font-size: 24upx;
                    margin-left: 20upx;
                    font-weight: normal;
                }
                &:before {
                    left: -30upx;
                    top: 5upx;
                    display: block;
                    position: absolute;
                    content: '';
                    width: 20upx;
                    height: 20upx;
                    border: 2upx solid rgba(204, 204, 204, 1);
                    border-radius: 50%;
                }
            }
            .gp {
                width: 100%;
                height: 26upx;
                font-size: 26upx;
                color: @gray_black;
                line-height: 26upx;
                margin-top: 24upx;
                display: flex;
                .left,
                .right {
                    width: 50%;
                    height: 100%;
                }
            }
        }
        .tip {
            position: relative;
            width: 670upx;
            margin: 30upx auto 0;
            padding: 20upx 46upx;
            background: #EDF8F6;
            color: #7FBCB4;
            font-size: 28upx;
            line-height: 34upx;
            &:before {
                left: 21upx;
                top: 23upx;
                display: block;
                position: absolute;
                content: '!';
                width: 20upx;
                height: 20upx;
                border: 2upx solid #7FBCB4;
                border-radius: 50%;
                color: #7FBCB4;
                font-size: 18upx;
                text-align: center;
                line-height: 20upx;
            }
        }
    }
    .student-list {
        width: 100%;
        background: #fff;
        border-radius: 8upx;
        margin-top: 20upx;
        overflow: hidden;
        .item-content{
            padding: 20upx 20upx 0;
            .item{
                width: 100%;
                height: 100upx;
                line-height: 100upx;
                color: @gray_black;
                font-size: 30upx;
                font-weight: 500;
                padding-left: 20upx;
                &:not(:last-child){
                    border-bottom: 1px solid #E6E6E6;
                }
            }
        }
    }

    .bottom-btn{
        position: fixed;
        width: 100%;
        height: 135upx;
        background: #fff;
        bottom: 0;
        left: 0;
        z-index: 10;
        display: flex;
        justify-content: space-between;
        padding: 17upx 20upx;
        border-top: 1px solid #DADADA;
        .btn{
            width: 344upx;
            height: 100%;
            line-height: 100upx;
            border-right: 8upx;
            border: 1px solid transparent;
            color: #fff;
            text-align: center;
            font-size: 34upx;
            border-radius: 8upx;
            &.orange{
                background-color: #FA8D45;
                border-color: #FA8D45;
            }
            &.green{
                background-color: #0B9186;
                border-color: #1ABC9C;
            }
        }
    }
}
</style>