<template>
    <div class="menu-panel">
        <div class="menu-item" v-for="(menu,i) in menus" :key="i">
            <i class="iconfont icon" :class="menu.icon" :style="{color: menu.color}"></i>
            <p class="label">{{ menu.label }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menus: [{
                icon: 'iconico',
                label: '课程评价',
                color: '#5BDBB4',
                path: ''
            }, {
                icon: 'iconico',
                label: '购课清单',
                color: '#5BDBB4',
                path: ''
            }, {
                icon: 'iconico',
                label: '系统通知',
                color: '#EC8873',
                path: ''
            }, {
                icon: 'iconico',
                label: '客服帮助',
                color: '#55D0F8',
                path: ''
            }, {
                icon: 'iconico',
                label: '上课签到',
                color: '#5BDBB4',
                path: ''
            }, {
                icon: 'iconico',
                label: '上课历史',
                color: '#FDC44A',
                path: ''
            }, {
                icon: 'iconico',
                label: '我要请假',
                color: '#5BDBB4',
                path: '/pages/me/leave/student'
            }, {
                icon: 'iconico',
                label: '课程购买',
                color: '#6EC828',
                path: ''
            }]
        }
    },
}
</script>

<style lang="less">
@import url('../../styles/base.less');
.menu-panel {
    width: 100%;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20upx;
    .menu-item {
        width: 25%;
        text-align: center;
        padding: 28upx 0 50upx 0;
        .icon {
            font-size: 50upx;
        }
        .label {
            font-size: 24upx;
            color: @gray_black;
            margin-top: 36upx;
        }
    }
}
</style>