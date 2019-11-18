<template>
    <div class="parent-module">
        <div class="jigou-list-container mt30">
            <div class="item" v-for="(item,i) in list" :key="i">
                <image class="icon" mode="aspectFill" :src="item.icon"></image>
                <div class="info">
                    <h3 class="time">{{ item.time }}<span class="name">{{ item.name }}</span></h3>
                    <div class="place">
                        <i class="place-icon iconfont icontouzijigou00"></i> {{ item.place }}
                    </div>
    
                    <image class="arrow" src="/static/home/jiantou.png"></image>
                </div>
            </div>
            <p v-if="list.length === 0" class="no-class">今日暂无课程~</p>
        </div>
    
        <div class="add-btn-normal">添加课程</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [{
                icon: '/static/home/logo01.png',
                time: '2019-03-07 周六 14:00',
                place: '追寻艺术培训',
                name: '周杰伦'
            }, {
                icon: '/static/home/logo01.png',
                time: '2019-03-07 周六 14:00',
                place: '追寻艺术培训',
                name: '周杰伦轮'
            }]
        }
    },
}
</script>

<style lang="less">
.parent-module {
    .mt30 {
        margin-top: 30upx;
        min-height: 280upx;
        .no-class {
            line-height: 280upx;
            color: #999;
            font-size: 26upx;
            text-align: center;
        }
    }
}
</style>