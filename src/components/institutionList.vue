<template>
    <div class="jigou-list">
        <div class="empty" v-if="list.length === 0">
            <image class="add-icon" src="/static/home/add.png"></image>请添加机构
        </div>
    
        <div class="item" v-for="(item,i) in list" :key="i">
            <image class="icon" mode="aspectFill" :src="item.icon"></image>
            <div class="info">
                <h3 class="time">{{ item.time }}</h3>
                <div class="place">
                    <i class="place-icon iconfont icontouzijigou00"></i> {{ item.place }}
                </div>
    
                <image class="arrow" src="/static/home/jiantou.png"></image>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default: function() {
                return [{
                    icon: '/static/home/logo01.png',
                    time: '2019-03-07 周六 14:00',
                    place: '追寻艺术培训'
                }, {
                    icon: '/static/home/logo01.png',
                    time: '2019-03-07 周六 14:00',
                    place: '追寻艺术培训'
                }]
            }
        }
    },
    data() {
        return {

        }
    },
}
</script>

<style lang="less">
.jigou-list {
    margin-bottom: 70upx;
    .empty {
        width: 100%;
        height: 100upx;
        line-height: 100upx;
        background: rgba(237, 242, 241, 1);
        border: 1px solid rgba(204, 220, 218, 1);
        border-radius: 8upx;
        text-align: center;
        font-size: 30upx;
        color: #014E48;
        .add-icon {
            display: inline-block;
            width: 26upx;
            height: 26upx;
            margin-right: 15upx;
        }
    }
    .item {
        position: relative;
        display: flex;
        width: 100%;
        height: 130upx;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 8upx;
        padding: 30upx 21upx;
        &:not(:last-child) {
            margin-bottom: 30upx;
        }
        .icon {
            display: block;
            width: 70upx;
            height: 70upx;
            border: 3upx solid rgba(214, 240, 235, 1);
            border-radius: 50%
        }
        .info {
            margin-left: 30upx;
            flex: 1;
            .time {
                font-size: 30upx;
                color: #333;
                line-height: 30upx;
                height: 30upx;
                font-weight: 500;
            }
            .place {
                margin-top: 15upx;
                height: 26upx;
                line-height: 26upx;
                color: #666;
                .place-icon {
                    font-size: 24upx;
                    margin-right: 10upx;
                }
            }
        }
        .arrow {
            position: absolute;
            right: 21upx;
            width: 28upx;
            height: 32upx;
            top: 49upx;
        }
    }
}
</style>