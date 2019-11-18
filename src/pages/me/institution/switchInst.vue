<template>
    <div class="switch-container">
        <div class="item" v-for="(item,i) in list" :key="i">
            <div class="head">
                <image class="logo-img" :src="item.icon"></image>
                <div class="name">{{ item.name }}</div>
                <image src="/static/home/jiantou.png" class="arrow"></image>
            </div>
            <div class="action-btns">
                <div class="btn">退出机构</div>
                <div v-if="item.active" class="btn green">当前机构</div>
                <div v-else class="btn">切换机构</div>
            </div>
        </div>

        <div class="submit-btn large">+加入机构</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [{
                name: '追寻艺术培训学校',
                icon: '/static/home/logo01.png',
                active: true
            }, {
                name: '追寻艺术培训学校',
                icon: '/static/home/logo01.png',
                active: false
            }]
        }
    },
}
</script>

<style lang="less">
@import url('../../../styles/base.less');
page {
    padding: 20upx 40upx 0;
    background: #fff;
}

.switch-container {
    width: 100%;

    .item{
        width: 100%;
        border-radius: 8upx;
        overflow: hidden;
        border: 1px solid #ccc;
        margin-bottom: 20upx;

        .head{
            position: relative;
            width: 100%;
            height: 130upx;
            line-height: 70upx;
            display: flex;
            padding: 30upx 20upx;
            .logo-img{
                display: block;
                width: 70upx;
                height: 70upx;
                margin-right: 20upx;
                border-radius: 50upx;
            }

            .name{
                font-size: 32upx;
                color: #222;
            }

            .arrow{
                display: block;
                width: 28upx;
                height: 32upx;
                position: absolute;
                right: 20upx;
                top: 50upx;
            }
        }

        .action-btns{
            width: 100%;
            border-top: 1px solid #ccc;
            display: flex;
            height: 73upx;
            line-height: 73upx;
            text-align: center;
            font-size: 28upx;
            color: @gray_black;
            .btn{
                width: 50%;
                height: 100%;
                &:not(:last-child){
                    border-right: 1px solid #ccc;
                }

                &.green{
                    color: @base_green;
                }
            }
        }
    }
}
</style>