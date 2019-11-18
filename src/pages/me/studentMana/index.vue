<template>
    <div class="sutdent-mana-container">
        <div class="item" :class="{ 'active': active === i }" v-for="(item,i) in list" :key="i">
            <image class="gender-img" :src="item.gender === 1 ? '/static/boy.png' : '/static/girl.png'"></image>
            <div class="info">
                <h3 class="name">{{ item.name }}</h3>
                <p class="desc">{{ item.id }}</p>
                <p class="desc">{{ item.institutionNum }}2个机构学习 剩余学时：{{ item.time }}</p>
            </div>
            <div class="ac-btn">{{ active === i ? '当前登录' : '点击切换' }}</div>
        </div>

        <div class="submit-btn large">+添加学员</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [{
                name: '张靓颖',
                gender: 2,
                id: 'ID： No.1915 1603 7930',
                institutionNum: 2,
                time: 1199
            }, {
                name: '容祖儿',
                gender: 2,
                id: 'ID： No.1915 1603 7930',
                institutionNum: 2,
                time: 1199
            }, {
                name: '周杰伦',
                gender: 1,
                id: 'ID： No.1915 1603 7930',
                institutionNum: 2,
                time: 1199
            }],
            active: 0
        }
    },
}
</script>

<style lang="less">
@import url('../../../styles/base.less');
page {
    background: #fff;
    padding: 0 40upx;
}

.sutdent-mana-container {
    padding-top: 18upx;
    .item {
        position: relative;
        display: flex;
        width: 100%;
        padding: 20upx 30upx 30upx;
        border-radius: 8upx;
        border: 1px solid #ccc;
        margin-bottom: 20upx;
        overflow: hidden;
        .gender-img {
            display: block;
            width: 106upx;
            height: 106upx;
            border-radius: 106upx;
            border: 5upx solid rgba(236, 246, 244, 1);
        }
        .info {
            flex: 1;
            margin-left: 25upx;
            .name {
                font-size: 30upx;
                color: #181818;
                line-height: 30upx;
            }
            .desc {
                font-size: 28upx;
                color: @base_gray;
                margin-top: 20upx;
            }
        }
        .ac-btn {
            position: absolute;
            width: 150upx;
            height: 44upx;
            line-height: 44upx;
            text-align: center;
            font-size: 24upx;
            color: #fff;
            background: rgba(118, 189, 212, 1);
            border-radius: 8upx 0 8upx 8upx;
            right: 0;
            top: 0;
        }
        &.active {
            .ac-btn {
                background: @base_green;
            }
        }
    }
}
</style>